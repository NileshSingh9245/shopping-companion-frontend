import axios from 'axios'
import config from '../config/environment.js'

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

  // Auth endpoints - Using dummy data for demo
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Get existing users from localStorage (registered users)
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
        const allUsers = [...dummyUsers, ...storedUsers]
        
        const user = allUsers.find(u => 
          u.email === credentials.email && u.password === credentials.password
        )
        
        if (user) {
          const { password, ...userWithoutPassword } = user
          const token = `dummy_token_${user.id}_${Date.now()}`
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
                message: 'Invalid email or password'
              }
            }
          })
        }
      }, 500) // Simulate network delay
    })
  },

  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Get existing users from localStorage (registered users)
        const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
        const allUsers = [...dummyUsers, ...storedUsers]
        
        // Check for existing email
        const existingUserByEmail = allUsers.find(u => u.email === userData.email)
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

        // Check for existing phone number
        const existingUserByPhone = allUsers.find(u => u.phone === userData.phone)
        if (existingUserByPhone) {
          reject({
            response: {
              data: {
                message: 'An account with this phone number already exists'
              }
            }
          })
          return
        }

        const newUser = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...userData,
          role: 'user',
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
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612db2e?w=150&h=150&fit=crop&crop=face',
          isVerified: false,
          isShoppingBuddy: false,
          buddyRating: 0,
          totalTrips: 0,
          bio: 'New member of Shopping Companion',
          createdAt: new Date(),
          updatedAt: new Date()
        }

        // Add to stored users (so future registrations can check against it)
        storedUsers.push(newUser)
        localStorage.setItem('registered_users', JSON.stringify(storedUsers))
        
        const { password, ...userWithoutPassword } = newUser
        const token = `dummy_token_${newUser.id}_${Date.now()}`
        
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
