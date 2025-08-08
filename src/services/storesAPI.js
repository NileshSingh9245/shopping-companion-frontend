import { api } from './authAPI'

const storesAPI = {
  // Get stores near location
  getNearbyStores: async (coordinates, filters = {}) => {
    const params = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      radius: filters.radius || 10,
      ...(filters.category && { category: filters.category }),
      ...(filters.priceRange && { priceRange: filters.priceRange })
    }
    const response = await api.get('/stores/nearby', { params })
    return response.data
  },

  // Get store details
  getStoreDetails: async (storeId) => {
    const response = await api.get(`/stores/${storeId}`)
    return response.data
  },

  // Add new store
  addStore: async (storeData) => {
    const response = await api.post('/stores', storeData)
    return response.data
  },

  // Search stores
  searchStores: async (query, coordinates) => {
    const params = {
      ...(coordinates && {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      })
    }
    const response = await api.get(`/stores/search/${encodeURIComponent(query)}`, { params })
    return response.data
  },

  // Update store
  updateStore: async (storeId, updateData) => {
    const response = await api.put(`/stores/${storeId}`, updateData)
    return response.data
  }
}

export default storesAPI
