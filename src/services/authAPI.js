import axios from 'axios'
import config from '../config/environment.js'
import demoConfig from '../config/demo.js'
import userStorage from './userStorage.js'
import SecureMasterAuth from './secureMasterAuth.js'

const API_BASE_URL = config.API_URL + '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 errors more gracefully
    if (error.response?.status === 401) {
      // Only auto-logout for auth-related endpoints
      const isAuthEndpoint = error.config?.url?.includes('/auth/') || 
                            error.config?.url?.includes('/verify-token')
      
      if (isAuthEndpoint) {
        // Clear token but don't redirect immediately
        localStorage.removeItem('token')
        console.info('Auth token invalid, clearing token')
      } else {
        // For other endpoints, just log silently - this is expected in demo mode
        console.debug('API call failed (401) - likely in demo mode:', error.config?.url)
      }
    } else if (error.response?.status >= 500) {
      console.warn('Server error:', error.response?.status)
    }
    return Promise.reject(error)
  }
)

// Dummy users data for frontend-only mode
const dummyUsers = [
  {
    id: '1',
    name: 'Admin VibeCoding',
    email: 'admin-vibeCoding@cognizant.com',
    password: 'password123', // In real app, this would be hashed
    phone: '+91-9876543210',
    role: 'admin',
    location: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      area: 'Sarvanampatti',
      coordinates: { latitude: 11.0696, longitude: 77.0428 }
    },
    preferences: {
      shoppingCategories: ['all'],
      budget: 'all',
      communicationStyle: 'professional',
      languages: ['Tamil', 'English', 'Hindi']
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    isShoppingBuddy: true,
    buddyRating: 5.0,
    totalTrips: 50,
    bio: 'Platform administrator and VibeCoding expert. Ensuring great shopping experiences for everyone!',
    adminPermissions: ['manage_users', 'manage_stores', 'manage_trips', 'view_analytics', 'moderate_reviews'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Priya Krishnan',
    email: 'priya@example.com',
    password: 'password123',
    phone: '+91-9876543211',
    role: 'user',
    location: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      area: 'Sarvanampatti',
      coordinates: { latitude: 11.0696, longitude: 77.0428 }
    },
    preferences: {
      shoppingCategories: ['electronics', 'clothing', 'books'],
      budget: 'mid-range',
      communicationStyle: 'friendly',
      languages: ['Tamil', 'English']
    },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612db2e?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    isShoppingBuddy: true,
    buddyRating: 4.8,
    totalTrips: 15,
    bio: 'Love exploring new stores and finding great deals! Native Tamil speaker, happy to help newcomers.',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    password: 'password123',
    phone: '+91-9876543212',
    role: 'user',
    location: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      area: 'Brookefields',
      coordinates: { latitude: 11.0168, longitude: 77.0061 }
    },
    preferences: {
      shoppingCategories: ['electronics', 'sports', 'gadgets'],
      budget: 'premium',
      communicationStyle: 'casual',
      languages: ['Hindi', 'English', 'Tamil']
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    isShoppingBuddy: true,
    buddyRating: 4.6,
    totalTrips: 22,
    bio: 'Tech enthusiast and gadget lover. Always looking for the latest electronics and best deals.',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
]

const authAPI = {
  // Set auth token for API requests
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    } else {
      delete api.defaults.headers.Authorization
    }
  },

  // Auth endpoints - Using demo mode and user storage
  login: async (credentials) => {
    // If demo mode is disabled, try real API first
    if (!demoConfig.DEMO_MODE) {
      try {
        const response = await api.post('/auth/login', credentials)
        return response
      } catch (error) {
        console.warn('API login failed, falling back to demo mode:', error.message)
      }
    }

    // Demo mode login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check for secure master admin authentication first
        if (SecureMasterAuth.verifyMasterCredentials(credentials.email, credentials.password)) {
          const masterAdminUser = SecureMasterAuth.createMasterAdminUser(credentials.email)
          const token = `secure_master_token_${masterAdminUser.id}_${Date.now()}`
          resolve({
            success: true,
            data: {
              user: masterAdminUser,
              token: token
            }
          })
          return
        }

        // Use user storage for regular login
        const user = userStorage.getUserByEmail(credentials.email)
        
        if (user && credentials.password === 'demo123') { // Demo password for all users
          userStorage.updateLastLogin(user.id) // Update last login
          const { password, ...userWithoutPassword } = user
          const token = `demo_token_${user.id}_${Date.now()}`
          resolve({
            success: true,
            data: {
              user: userWithoutPassword,
              token: token
            }
          })
        } else {
          reject({
            response: {
              data: {
                message: 'Invalid email or password. In demo mode, use password: demo123'
              }
            }
          })
        }
      }, 500) // Simulate network delay
    })
  },

  register: async (userData) => {
    // If demo mode is disabled, try real API first
    if (!demoConfig.DEMO_MODE) {
      try {
        const response = await api.post('/auth/register', userData)
        return response
      } catch (error) {
        console.warn('API register failed, falling back to demo mode:', error.message)
      }
    }

    // Demo mode registration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check for existing email in user storage
        const existingUserByEmail = userStorage.getUserByEmail(userData.email)
        if (existingUserByEmail) {
          reject({
            response: {
              data: {
                message: 'An account with this email already exists'
              }
            }
          })
          return
        }

        // Create new user in storage
        const newUser = userStorage.createUser({
          ...userData,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612db2e?w=150&h=150&fit=crop&crop=face',
          location: {
            city: 'Coimbatore',
            state: 'Tamil Nadu',
            area: userData.area || 'Sarvanampatti',
            coordinates: { latitude: 11.0696, longitude: 77.0428 }
          },
          preferences: {
            shoppingCategories: ['general'],
            budget: 'mid-range',
            communicationStyle: 'friendly',
            languages: ['English']
          },
          isVerified: false,
          isShoppingBuddy: false,
          buddyRating: 0,
          totalTrips: 0,
          bio: 'New member of Shopping Companion'
        })
        
        const { password, ...userWithoutPassword } = newUser
        const token = `demo_token_${newUser.id}_${Date.now()}`
        
        resolve({
          success: true,
          data: {
            user: userWithoutPassword,
            token: token
          }
        })
      }, 500)
    })
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Logged out successfully'
          }
        })
      }, 200)
    })
  },

  verifyToken: async (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && token.startsWith('dummy_token_')) {
          const userId = token.split('_')[2]
          const user = dummyUsers.find(u => u.id === userId)
          
          if (user) {
            const { password, ...userWithoutPassword } = user
            resolve({
              success: true,
              data: {
                user: userWithoutPassword
              }
            })
          } else {
            reject({
              response: {
                data: {
                  message: 'Invalid token'
                }
              }
            })
          }
        } else {
          reject({
            response: {
              data: {
                message: 'Invalid token'
              }
            }
          })
        }
      }, 300)
    })
  },

  refreshToken: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newToken = `dummy_token_refresh_${Date.now()}`
        resolve({
          success: true,
          data: {
            token: newToken
          }
        })
      }, 200)
    })
  },

  changePassword: async (passwords) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Password changed successfully'
          }
        })
      }, 500)
    })
  },

  getProfile: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem('token')
        if (token && token.startsWith('dummy_token_')) {
          const userId = token.split('_')[2]
          const user = dummyUsers.find(u => u.id === userId)
          
          if (user) {
            const { password, ...userWithoutPassword } = user
            resolve({
              success: true,
              data: {
                user: userWithoutPassword
              }
            })
          } else {
            reject({
              response: {
                data: {
                  message: 'User not found'
                }
              }
            })
          }
        } else {
          reject({
            response: {
              data: {
                message: 'No valid token found'
              }
            }
          })
        }
      }, 300)
    })
  }
}

export default authAPI
export { api }
