import { api } from './authAPI'

const buddiesAPI = {
  // Get all shopping buddies
  getBuddies: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await api.get(`/buddies${queryParams ? `?${queryParams}` : ''}`)
      return response.data
    } catch (error) {
      console.error('Get buddies error:', error)
      throw error
    }
  },

  // Get buddy by ID
  getBuddyById: async (buddyId) => {
    try {
      const response = await api.get(`/buddies/${buddyId}`)
      return response.data
    } catch (error) {
      console.error('Get buddy error:', error)
      throw error
    }
  },

  // Send buddy request
  sendBuddyRequest: async (buddyId) => {
    try {
      const response = await api.post(`/buddies/request`, { buddyId })
      return response.data
    } catch (error) {
      console.error('Send buddy request error:', error)
      throw error
    }
  },

  // Accept buddy request
  acceptBuddyRequest: async (requestId) => {
    try {
      const response = await api.put(`/buddies/request/${requestId}/accept`)
      return response.data
    } catch (error) {
      console.error('Accept buddy request error:', error)
      throw error
    }
  },

  // Reject buddy request
  rejectBuddyRequest: async (requestId) => {
    try {
      const response = await api.put(`/buddies/request/${requestId}/reject`)
      return response.data
    } catch (error) {
      console.error('Reject buddy request error:', error)
      throw error
    }
  },

  // Get buddy requests
  getBuddyRequests: async () => {
    try {
      const response = await api.get('/buddies/requests')
      return response.data
    } catch (error) {
      console.error('Get buddy requests error:', error)
      throw error
    }
  },

  // Remove buddy connection
  removeBuddy: async (buddyId) => {
    try {
      const response = await api.delete(`/buddies/${buddyId}`)
      return response.data
    } catch (error) {
      console.error('Remove buddy error:', error)
      throw error
    }
  },

  // Report buddy
  reportBuddy: async (buddyId, reason) => {
    try {
      const response = await api.post(`/buddies/${buddyId}/report`, { reason })
      return response.data
    } catch (error) {
      console.error('Report buddy error:', error)
      throw error
    }
  },

  // Search buddies
  searchBuddies: async (query, filters = {}) => {
    try {
      const params = new URLSearchParams({ 
        query, 
        ...filters 
      }).toString()
      const response = await api.get(`/buddies/search?${params}`)
      return response.data
    } catch (error) {
      console.error('Search buddies error:', error)
      throw error
    }
  }
}

export default buddiesAPI
