// Enhanced trips API that combines real data with seed data for a rich user experience
import { api } from './authAPI'
import seedDataAPI from './seedDataAPI'
import userTripsStorage from './userTripsStorage'
import demoConfig from '../config/demo'

const tripsAPI = {
  // Get trips near location with seed data fallback
  getNearbyTrips: async (coordinates, filters = {}) => {
    // If demo mode is enabled, skip API calls entirely
    if (demoConfig.DEMO_MODE) {
      const userTrips = userTripsStorage.getPublicTrips()
      const seedTrips = seedDataAPI.getSeedTrips(filters)
      const combinedTrips = [...userTrips, ...seedTrips]
      
      return {
        success: true,
        data: {
          trips: combinedTrips,
          totalTrips: combinedTrips.length,
          realTripsCount: 0,
          userTripsCount: userTrips.length,
          seedTripsCount: seedTrips.length
        },
        message: 'Showing user and demo trips (demo mode)'
      }
    }

    try {
      const params = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        radius: filters.radius || 10,
        ...(filters.category && { category: filters.category }),
        ...(filters.status && { status: filters.status })
      }
      
      // Get real data from API
      const response = await api.get('/trips/nearby', { params })
      const realTrips = response.data?.data?.trips || []
      
      // Get user-created public trips
      const userTrips = userTripsStorage.getPublicTrips()
      
      // Get seed data
      const seedTrips = seedDataAPI.getSeedTrips(filters)
      
      // Combine all data sources
      const combinedTrips = [...realTrips, ...userTrips, ...seedTrips]
      
      return {
        ...response.data,
        data: {
          ...response.data.data,
          trips: combinedTrips,
          totalTrips: combinedTrips.length,
          realTripsCount: realTrips.length,
          userTripsCount: userTrips.length,
          seedTripsCount: seedTrips.length
        }
      }
    } catch (error) {
      // Silently handle API failures (401, network errors, etc.) - just fall back to local data
      if (demoConfig.LOG_API_FAILURES && error.response?.status !== 401) {
        console.info('API unavailable, using local data only:', error.message)
      }
      
      // Get user-created public trips
      const userTrips = userTripsStorage.getPublicTrips()
      const seedTrips = seedDataAPI.getSeedTrips(filters)
      const combinedTrips = [...userTrips, ...seedTrips]
      
      return {
        success: true,
        data: {
          trips: combinedTrips,
          totalTrips: combinedTrips.length,
          realTripsCount: 0,
          userTripsCount: userTrips.length,
          seedTripsCount: seedTrips.length
        },
        message: 'Showing user and demo trips (API unavailable)'
      }
    }
  },

  // Create new trip (try API first, fallback to local storage)
  createTrip: async (tripData, userId, userInfo) => {
    // If demo mode is enabled, skip API and store locally
    if (demoConfig.DEMO_MODE) {
      const trip = userTripsStorage.createTrip({
        ...tripData,
        organizer: {
          id: userId,
          name: userInfo?.name || 'User',
          profilePicture: userInfo?.avatar || '',
          rating: userInfo?.buddyRating || 0,
          completedTrips: userInfo?.totalTrips || 0
        }
      }, userId)
      
      return {
        success: true,
        data: { trip },
        message: 'Trip created and stored locally (demo mode)'
      }
    }

    try {
      // Try to create via API first
      const response = await api.post('/trips', tripData)
      return response.data
    } catch (error) {
      // For any API failures, fallback to local storage without logging
      if (demoConfig.LOG_API_FAILURES && error.response?.status !== 401) {
        console.info('API unavailable, storing trip locally:', error.response?.status || 'Network error')
      }
      const trip = userTripsStorage.createTrip({
        ...tripData,
        organizer: {
          id: userId,
          name: userInfo?.name || 'User',
          profilePicture: userInfo?.avatar || '',
          rating: userInfo?.buddyRating || 0,
          completedTrips: userInfo?.totalTrips || 0
        }
      }, userId)
      
      return {
        success: true,
        data: { trip },
        message: 'Trip created and stored locally'
      }
    }
  },

  // Get trip details (check user trips, demo trips, then API)
  getTripDetails: async (tripId) => {
    // Check if it's a user-created trip
    const userTrip = userTripsStorage.getTripById(tripId)
    if (userTrip) {
      return {
        success: true,
        data: { trip: userTrip },
        message: 'User trip details'
      }
    }
    
    // Check if it's a demo trip
    if (tripId.startsWith('demo-')) {
      const demoTrip = seedDataAPI.seedTrips.find(trip => trip.id === tripId)
      if (demoTrip) {
        return {
          success: true,
          data: { trip: demoTrip },
          message: 'Demo trip details'
        }
      }
    }
    
    // Otherwise, fetch from real API
    try {
      const response = await api.get(`/trips/${tripId}`)
      return response.data
    } catch (error) {
      throw new Error('Trip not found')
    }
  },

  // Join a trip (user trips, then API)
  joinTrip: async (tripId, userId, userInfo) => {
    if (tripId.startsWith('demo-')) {
      throw new Error('Cannot join demo trips. Please create a real account and trip to participate.')
    }
    
    // Check if it's a user trip
    const userTrip = userTripsStorage.getTripById(tripId)
    if (userTrip) {
      const updatedTrip = userTripsStorage.joinTrip(tripId, userId, {
        name: userInfo?.name || 'User',
        avatar: userInfo?.avatar || '',
        rating: userInfo?.buddyRating || 0
      })
      
      if (updatedTrip) {
        return {
          success: true,
          data: { trip: updatedTrip },
          message: 'Successfully joined trip'
        }
      } else {
        throw new Error('Failed to join trip or already joined')
      }
    }
    
    // Otherwise try API
    try {
      const response = await api.post(`/trips/${tripId}/join`)
      return response.data
    } catch (error) {
      throw new Error('Failed to join trip via API')
    }
  },

  // Leave a trip (user trips, then API)
  leaveTrip: async (tripId, userId) => {
    if (tripId.startsWith('demo-')) {
      throw new Error('Cannot leave demo trips. This is demonstration data.')
    }
    
    // Check if it's a user trip
    const userTrip = userTripsStorage.getTripById(tripId)
    if (userTrip) {
      const updatedTrip = userTripsStorage.leaveTrip(tripId, userId)
      
      if (updatedTrip) {
        return {
          success: true,
          data: { trip: updatedTrip },
          message: 'Successfully left trip'
        }
      } else {
        throw new Error('Failed to leave trip')
      }
    }
    
    // Otherwise try API
    try {
      const response = await api.post(`/trips/${tripId}/leave`)
      return response.data
    } catch (error) {
      throw new Error('Failed to leave trip via API')
    }
  },

  // Get user's trips (include user-created trips)
  getUserTrips: async (userId) => {
    try {
      // Get user-created trips
      const userTrips = userTripsStorage.getTripsByUser(userId)
      
      // Try to get trips from API too
      const response = await api.get('/trips/user/my-trips')
      const apiTrips = response.data?.data?.trips || []
      
      // Combine both sources
      const allTrips = [...userTrips, ...apiTrips]
      
      return {
        success: true,
        data: { 
          trips: allTrips,
          userCreatedCount: userTrips.length,
          apiTripsCount: apiTrips.length
        },
        message: 'User trips retrieved'
      }
    } catch (error) {
      // Silently handle API failures and return user-created trips
      if (error.response?.status !== 401) {
        console.info('API unavailable, showing user-created trips only:', error.message)
      }
      const userTrips = userTripsStorage.getTripsByUser(userId)
      
      return {
        success: true,
        data: { 
          trips: userTrips,
          userCreatedCount: userTrips.length,
          apiTripsCount: 0
        },
        message: 'User-created trips only'
      }
    }
  },

  // Get user's trips filtered by status (include user-created trips)
  getUserTripsByStatus: async (status = 'all', userId) => {
    try {
      // Get user-created trips by status
      const userTrips = status === 'all' ? 
        userTripsStorage.getTripsByUser(userId) : 
        userTripsStorage.getTripsByStatus(status, userId)
      
      // Try to get trips from API too
      const response = await api.get('/trips/user/my-trips', { 
        params: { status } 
      })
      const apiTrips = response.data?.data?.trips || []
      
      // Combine both sources
      const allTrips = [...userTrips, ...apiTrips]
      
      return {
        success: true,
        data: { 
          trips: allTrips,
          userCreatedCount: userTrips.length,
          apiTripsCount: apiTrips.length
        },
        message: 'User trips by status retrieved'
      }
    } catch (error) {
      // Silently handle API failures and return user-created trips
      if (error.response?.status !== 401) {
        console.info('API unavailable, showing user-created trips only:', error.message)
      }
      const userTrips = status === 'all' ? 
        userTripsStorage.getTripsByUser(userId) : 
        userTripsStorage.getTripsByStatus(status, userId)
      
      return {
        success: true,
        data: { 
          trips: userTrips,
          userCreatedCount: userTrips.length,
          apiTripsCount: 0
        },
        message: 'User-created trips only'
      }
    }
  },

  // Get live trips with seed data fallback
  getLiveTrips: async () => {
    try {
      const response = await api.get('/trips/user/my-trips', { 
        params: { status: 'live' } 
      })
      const realTrips = response.data?.data?.trips || []
      
      // For live trips, we don't mix with seed data to avoid confusion
      return response.data
    } catch (error) {
      // Silently handle API failures
      if (error.response?.status !== 401) {
        console.info('API unavailable for live trips:', error.message)
      }
      return {
        success: true,
        data: { trips: [] },
        message: 'No live trips found'
      }
    }
  },

  // Get past trips (real trips only)
  getPastTrips: async () => {
    try {
      const response = await api.get('/trips/user/my-trips', { 
        params: { status: 'past' } 
      })
      return response.data
    } catch (error) {
      // Silently handle API failures
      if (error.response?.status !== 401) {
        console.info('API unavailable for past trips:', error.message)
      }
      return {
        success: true,
        data: { trips: [] },
        message: 'No past trips found'
      }
    }
  },

  // Get upcoming trips with optional seed data
  getUpcomingTrips: async (includeSeedData = true) => {
    try {
      const response = await api.get('/trips/user/my-trips', { 
        params: { status: 'upcoming' } 
      })
      
      if (includeSeedData) {
        const realTrips = response.data?.data?.trips || []
        const seedTrips = seedDataAPI.getSeedTrips({ status: 'open' })
        
        return {
          ...response.data,
          data: {
            ...response.data.data,
            trips: [...realTrips, ...seedTrips],
            realTripsCount: realTrips.length,
            seedTripsCount: seedTrips.length
          }
        }
      }
      
      return response.data
    } catch (error) {
      if (includeSeedData) {
        // Silently handle API failures and return seed data
        if (error.response?.status !== 401) {
          console.info('API unavailable, showing demo trips only:', error.message)
        }
        const seedTrips = seedDataAPI.getSeedTrips({ status: 'open' })
        return {
          success: true,
          data: { 
            trips: seedTrips,
            realTripsCount: 0,
            seedTripsCount: seedTrips.length
          },
          message: 'Showing demo trips (API unavailable)'
        }
      }
      
      return {
        success: true,
        data: { trips: [] },
        message: 'No upcoming trips found'
      }
    }
  },

  // Helper function to check if trip is demo data
  isDemoTrip: (tripId) => {
    return tripId && tripId.startsWith('demo-')
  }
}

export default tripsAPI
