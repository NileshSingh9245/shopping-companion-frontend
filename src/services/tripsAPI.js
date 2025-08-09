import { api } from './authAPI'

const tripsAPI = {
  // Get trips near location
  getNearbyTrips: async (coordinates, filters = {}) => {
    const params = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      radius: filters.radius || 10,
      ...(filters.category && { category: filters.category }),
      ...(filters.status && { status: filters.status })
    }
    const response = await api.get('/trips/nearby', { params })
    return response.data
  },

  // Create new trip
  createTrip: async (tripData) => {
    const response = await api.post('/trips', tripData)
    return response.data
  },

  // Get trip details
  getTripDetails: async (tripId) => {
    const response = await api.get(`/trips/${tripId}`)
    return response.data
  },

  // Join a trip
  joinTrip: async (tripId) => {
    const response = await api.post(`/trips/${tripId}/join`)
    return response.data
  },

  // Leave a trip
  leaveTrip: async (tripId) => {
    const response = await api.post(`/trips/${tripId}/leave`)
    return response.data
  },

  // Get user's trips (all)
  getUserTrips: async () => {
    const response = await api.get('/trips/user/my-trips')
    return response.data
  },

  // Get user's trips filtered by status
  getUserTripsByStatus: async (status = 'all') => {
    const response = await api.get('/trips/user/my-trips', { 
      params: { status } 
    })
    return response.data
  },

  // Get live trips (happening today)
  getLiveTrips: async () => {
    const response = await api.get('/trips/user/my-trips', { 
      params: { status: 'live' } 
    })
    return response.data
  },

  // Get past trips
  getPastTrips: async () => {
    const response = await api.get('/trips/user/my-trips', { 
      params: { status: 'past' } 
    })
    return response.data
  },

  // Get upcoming trips
  getUpcomingTrips: async () => {
    const response = await api.get('/trips/user/my-trips', { 
      params: { status: 'upcoming' } 
    })
    return response.data
  },

  // Update trip
  updateTrip: async (tripId, updateData) => {
    const response = await api.put(`/trips/${tripId}`, updateData)
    return response.data
  },

  // Cancel trip
  cancelTrip: async (tripId) => {
    const response = await api.delete(`/trips/${tripId}`)
    return response.data
  }
}

export default tripsAPI
