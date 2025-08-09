// User trips storage - stores user-created trips in localStorage
// This simulates a backend database for user-generated content

const USER_TRIPS_KEY = 'shopping_companion_user_trips'

class UserTripsStorage {
  constructor() {
    this.trips = this.loadTrips()
  }

  // Load trips from localStorage
  loadTrips() {
    try {
      const stored = localStorage.getItem(USER_TRIPS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading user trips:', error)
      return []
    }
  }

  // Save trips to localStorage
  saveTrips() {
    try {
      localStorage.setItem(USER_TRIPS_KEY, JSON.stringify(this.trips))
    } catch (error) {
      console.error('Error saving user trips:', error)
    }
  }

  // Create a new trip
  createTrip(tripData, userId) {
    const newTrip = {
      id: `user-trip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...tripData,
      organizer: {
        id: userId,
        ...tripData.organizer
      },
      participants: tripData.participants || [],
      status: tripData.status || 'open',
      visibility: tripData.visibility || 'public', // 'public' or 'private'
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isUserCreated: true
    }

    this.trips.push(newTrip)
    this.saveTrips()
    return newTrip
  }

  // Get all trips
  getAllTrips() {
    return this.trips
  }

  // Get trips by user ID
  getTripsByUser(userId) {
    const userTrips = this.trips.filter(trip => trip.organizer.id === userId)
    console.log('getUserTrips called with userId:', userId)
    console.log('All stored trips:', this.trips)
    console.log('User trips found:', userTrips)
    return userTrips
  }

  // Get public trips (visible in shopping trips list)
  getPublicTrips() {
    return this.trips.filter(trip => trip.visibility === 'public')
  }

  // Get trip by ID
  getTripById(tripId) {
    return this.trips.find(trip => trip.id === tripId)
  }

  // Update trip
  updateTrip(tripId, updates) {
    const tripIndex = this.trips.findIndex(trip => trip.id === tripId)
    if (tripIndex !== -1) {
      this.trips[tripIndex] = {
        ...this.trips[tripIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      this.saveTrips()
      return this.trips[tripIndex]
    }
    return null
  }

  // Delete trip
  deleteTrip(tripId, userId) {
    const tripIndex = this.trips.findIndex(trip => 
      trip.id === tripId && trip.organizer.id === userId
    )
    if (tripIndex !== -1) {
      const deletedTrip = this.trips.splice(tripIndex, 1)[0]
      this.saveTrips()
      return deletedTrip
    }
    return null
  }

  // Join trip
  joinTrip(tripId, userId, userInfo) {
    const trip = this.getTripById(tripId)
    if (trip && !trip.participants.some(p => p.id === userId)) {
      trip.participants.push({
        id: userId,
        ...userInfo,
        joinedAt: new Date().toISOString()
      })
      trip.updatedAt = new Date().toISOString()
      this.saveTrips()
      return trip
    }
    return null
  }

  // Leave trip
  leaveTrip(tripId, userId) {
    const trip = this.getTripById(tripId)
    if (trip) {
      trip.participants = trip.participants.filter(p => p.id !== userId)
      trip.updatedAt = new Date().toISOString()
      this.saveTrips()
      return trip
    }
    return null
  }

  // Get trips by status
  getTripsByStatus(status, userId = null) {
    let trips = userId ? this.getTripsByUser(userId) : this.trips
    
    if (status === 'live') {
      const now = new Date()
      return trips.filter(trip => {
        const tripDate = new Date(trip.scheduledDate)
        const endTime = new Date(tripDate.getTime() + (trip.estimatedDuration || 2) * 60 * 60 * 1000)
        return tripDate <= now && now <= endTime && trip.status === 'open'
      })
    } else if (status === 'past') {
      const now = new Date()
      return trips.filter(trip => {
        const tripDate = new Date(trip.scheduledDate)
        const endTime = new Date(tripDate.getTime() + (trip.estimatedDuration || 2) * 60 * 60 * 1000)
        return endTime < now || trip.status === 'completed'
      })
    } else if (status === 'upcoming') {
      const now = new Date()
      return trips.filter(trip => {
        const tripDate = new Date(trip.scheduledDate)
        return tripDate > now && trip.status === 'open'
      })
    }
    
    return trips.filter(trip => trip.status === status)
  }

  // Clear all trips (for testing)
  clearAllTrips() {
    this.trips = []
    this.saveTrips()
  }
}

// Export singleton instance
const userTripsStorage = new UserTripsStorage()
export default userTripsStorage
