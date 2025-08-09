import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import authAPI from '../services/authAPI'
import SecureMasterAuth from '../services/secureMasterAuth'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authAPI.login(credentials)
          const { user, token } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
          
          // Set token in localStorage and API headers
          localStorage.setItem('token', token)
          authAPI.setAuthToken(token)
          
          return { success: true, user }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed'
          set({ 
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null
          })
          return { success: false, error: errorMessage }
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authAPI.register(userData)
          const { user, token } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
          
          // Set token in localStorage and API headers
          localStorage.setItem('token', token)
          authAPI.setAuthToken(token)
          
          return { success: true, user }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed'
          set({ 
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null
          })
          return { success: false, error: errorMessage }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        })
        
        // Clear token from localStorage and API headers
        localStorage.removeItem('token')
        authAPI.setAuthToken(null)
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token')
        if (!token) {
          set({ isLoading: false })
          return
        }

        set({ isLoading: true })
        try {
          authAPI.setAuthToken(token)
          const response = await authAPI.verifyToken(token)
          const { user } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
        } catch (error) {
          // Token is invalid, clear it but don't immediately redirect
          console.warn('Token verification failed:', error.message)
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          })
          localStorage.removeItem('token')
          authAPI.setAuthToken(null)
        }
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }))
      },

      // Check if current user is admin
      isAdmin: () => {
        const { user } = get()
        return user && user.role === 'admin'
      },

      // Check if user has specific admin permission
      hasPermission: (permission) => {
        const { user } = get()
        return user && user.role === 'admin' && user.adminPermissions && user.adminPermissions.includes(permission)
      },

      // Master Admin Functions
      isMasterAdmin: () => {
        const { user } = get()
        return SecureMasterAuth.isMasterAdminUser(user)
      },

      hasMasterAdminPermission: (permission) => {
        const { user, isMasterAdmin } = get()
        return isMasterAdmin() && user.adminPermissions && user.adminPermissions.includes(permission)
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
