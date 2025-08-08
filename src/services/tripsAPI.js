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
    const response = await api.get('/shopping-trips/nearby', { params })
    return response.data
  },

  // Create new trip
  createTrip: async (tripData) => {
    const response = await api.post('/shopping-trips', tripData)
    return response.data
  },

  // Get trip details
  getTripDetails: async (tripId) => {
    const response = await api.get(`/shopping-trips/${tripId}`)
    return response.data
  },

  // Join a trip
  joinTrip: async (tripId) => {
    const response = await api.post(`/shopping-trips/${tripId}/join`)
    return response.data
  },

  // Leave a trip
  leaveTrip: async (tripId) => {
    const response = await api.post(`/shopping-trips/${tripId}/leave`)
    return response.data
  },

  // Get user's trips
  getUserTrips: async () => {
    const response = await api.get('/shopping-trips/user/my-trips')
    return response.data
  },

  // Update trip
  updateTrip: async (tripId, updateData) => {
    const response = await api.put(`/shopping-trips/${tripId}`, updateData)
    return response.data
  },

  // Cancel trip
  cancelTrip: async (tripId) => {
    const response = await api.delete(`/shopping-trips/${tripId}`)
    return response.data
  }
}

export default tripsAPI
