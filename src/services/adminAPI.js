import { api } from './authAPI'

const adminAPI = {
  // User management
  getAllUsers: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await api.get(`/admin/users${queryParams ? `?${queryParams}` : ''}`)
      return response.data
    } catch (error) {
      console.error('Get all users error:', error)
      throw error
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Get user by ID error:', error)
      throw error
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, userData)
      return response.data
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Delete user error:', error)
      throw error
    }
  },

  suspendUser: async (userId, reason, duration) => {
    try {
      const response = await api.put(`/admin/users/${userId}/suspend`, { reason, duration })
      return response.data
    } catch (error) {
      console.error('Suspend user error:', error)
      throw error
    }
  },

  activateUser: async (userId) => {
    try {
      const response = await api.put(`/admin/users/${userId}/activate`)
      return response.data
    } catch (error) {
      console.error('Activate user error:', error)
      throw error
    }
  },

  // Store management
  getAllStores: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await api.get(`/admin/stores${queryParams ? `?${queryParams}` : ''}`)
      return response.data
    } catch (error) {
      console.error('Get all stores error:', error)
      throw error
    }
  },

  approveStore: async (storeId) => {
    try {
      const response = await api.put(`/admin/stores/${storeId}/approve`)
      return response.data
    } catch (error) {
      console.error('Approve store error:', error)
      throw error
    }
  },

  rejectStore: async (storeId, reason) => {
    try {
      const response = await api.put(`/admin/stores/${storeId}/reject`, { reason })
      return response.data
    } catch (error) {
      console.error('Reject store error:', error)
      throw error
    }
  },

  deleteStore: async (storeId) => {
    try {
      const response = await api.delete(`/admin/stores/${storeId}`)
      return response.data
    } catch (error) {
      console.error('Delete store error:', error)
      throw error
    }
  },

  // Trip management
  getAllTrips: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await api.get(`/admin/trips${queryParams ? `?${queryParams}` : ''}`)
      return response.data
    } catch (error) {
      console.error('Get all trips error:', error)
      throw error
    }
  },

  cancelTrip: async (tripId, reason) => {
    try {
      const response = await api.put(`/admin/trips/${tripId}/cancel`, { reason })
      return response.data
    } catch (error) {
      console.error('Cancel trip error:', error)
      throw error
    }
  },

  deleteTrip: async (tripId) => {
    try {
      const response = await api.delete(`/admin/trips/${tripId}`)
      return response.data
    } catch (error) {
      console.error('Delete trip error:', error)
      throw error
    }
  },

  // Reports and moderation
  getReports: async (type = 'all') => {
    try {
      const response = await api.get(`/admin/reports?type=${type}`)
      return response.data
    } catch (error) {
      console.error('Get reports error:', error)
      throw error
    }
  },

  resolveReport: async (reportId, action, notes) => {
    try {
      const response = await api.put(`/admin/reports/${reportId}/resolve`, { action, notes })
      return response.data
    } catch (error) {
      console.error('Resolve report error:', error)
      throw error
    }
  },

  // Analytics
  getPlatformAnalytics: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/admin/analytics?range=${timeRange}`)
      return response.data
    } catch (error) {
      console.error('Get platform analytics error:', error)
      throw error
    }
  },

  getUserAnalytics: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/admin/analytics/users?range=${timeRange}`)
      return response.data
    } catch (error) {
      console.error('Get user analytics error:', error)
      throw error
    }
  },

  getStoreAnalytics: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/admin/analytics/stores?range=${timeRange}`)
      return response.data
    } catch (error) {
      console.error('Get store analytics error:', error)
      throw error
    }
  },

  getTripAnalytics: async (timeRange = '30d') => {
    try {
      const response = await api.get(`/admin/analytics/trips?range=${timeRange}`)
      return response.data
    } catch (error) {
      console.error('Get trip analytics error:', error)
      throw error
    }
  },

  // Platform settings
  getPlatformSettings: async () => {
    try {
      const response = await api.get('/admin/settings')
      return response.data
    } catch (error) {
      console.error('Get platform settings error:', error)
      throw error
    }
  },

  updatePlatformSettings: async (settings) => {
    try {
      const response = await api.put('/admin/settings', settings)
      return response.data
    } catch (error) {
      console.error('Update platform settings error:', error)
      throw error
    }
  },

  // System health
  getSystemHealth: async () => {
    try {
      const response = await api.get('/admin/health')
      return response.data
    } catch (error) {
      console.error('Get system health error:', error)
      throw error
    }
  },

  // Backup and maintenance
  createBackup: async () => {
    try {
      const response = await api.post('/admin/backup')
      return response.data
    } catch (error) {
      console.error('Create backup error:', error)
      throw error
    }
  },

  getBackupStatus: async () => {
    try {
      const response = await api.get('/admin/backup/status')
      return response.data
    } catch (error) {
      console.error('Get backup status error:', error)
      throw error
    }
  }
}

export default adminAPI
