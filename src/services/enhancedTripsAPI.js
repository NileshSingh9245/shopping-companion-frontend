// Enhanced trips API that combines real data with seed data for a rich user experience
import { api } from './authAPI'
import seedDataAPI from './seedDataAPI'
import userTripsStorage from './userTripsStorage'
import demoConfig from '../config/demo'

// Enhanced trip storage that integrates with user profile system
const ENHANCED_TRIPS_KEY = 'shopping_companion_enhanced_trips'
const TRIP_PARTICIPANTS_KEY = 'shopping_companion_trip_participants'
const TRIP_CHAT_KEY = 'shopping_companion_trip_chat'

class EnhancedTripStorage {
  constructor() {
    this.trips = this.loadTrips()
    this.participants = this.loadParticipants()
    this.chats = this.loadChats()
    this.initializeEnhancedSeedData()
  }

  loadTrips() {
    try {
      const stored = localStorage.getItem(ENHANCED_TRIPS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading enhanced trips:', error)
      return []
    }
  }

  loadParticipants() {
    try {
      const stored = localStorage.getItem(TRIP_PARTICIPANTS_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading trip participants:', error)
      return {}
    }
  }

  loadChats() {
    try {
      const stored = localStorage.getItem(TRIP_CHAT_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading trip chats:', error)
      return {}
    }
  }

  saveTrips() {
    try {
      localStorage.setItem(ENHANCED_TRIPS_KEY, JSON.stringify(this.trips))
    } catch (error) {
      console.error('Error saving enhanced trips:', error)
    }
  }

  saveParticipants() {
    try {
      localStorage.setItem(TRIP_PARTICIPANTS_KEY, JSON.stringify(this.participants))
    } catch (error) {
      console.error('Error saving trip participants:', error)
    }
  }

  saveChats() {
    try {
      localStorage.setItem(TRIP_CHAT_KEY, JSON.stringify(this.chats))
    } catch (error) {
      console.error('Error saving trip chats:', error)
    }
  }

  // Get user profile storage instance
  getUserProfileStorage() {
    try {
      const userProfileData = localStorage.getItem('shopping_companion_user_profiles')
      return userProfileData ? { getAllProfiles: () => JSON.parse(userProfileData) } : null
    } catch (error) {
      return null
    }
  }

  initializeEnhancedSeedData() {
    if (this.trips.length === 0) {
      const now = new Date()
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

      const enhancedTrips = [
        {
          id: 'enhanced-trip-1',
          title: 'Weekend Mall Shopping Adventure',
          description: 'Planning a fun shopping trip to Phoenix Mall with friends. We\'ll explore fashion, electronics, and food courts. Perfect for a relaxing weekend!',
          organizer: {
            id: 2,
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            rating: 4.8,
            completedTrips: 15,
            verified: true
          },
          targetStores: [
            { id: 'store-1', name: 'Phoenix Mall Coimbatore', category: 'mall', rating: 4.5 },
            { id: 'store-2', name: 'Reliance Digital', category: 'electronics', rating: 4.3 },
            { id: 'store-3', name: 'Lifestyle', category: 'fashion', rating: 4.6 }
          ],
          scheduledDate: tomorrow.toISOString(),
          estimatedDuration: 4,
          maxParticipants: 6,
          currentParticipants: 4,
          participants: [
            { id: 2, name: 'Priya Sharma', role: 'organizer', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
            { id: 3, name: 'Rahul Kumar', role: 'participant', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
            { id: 4, name: 'Sneha Patel', role: 'participant', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
            { id: 5, name: 'Arjun Singh', role: 'participant', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
          ],
          status: 'open',
          visibility: 'public',
          category: 'mall',
          location: {
            city: 'Coimbatore',
            area: 'Gandhipuram',
            coordinates: { lat: 11.0168, lng: 76.9558 },
            address: 'Phoenix MarketCity, Gandhipuram, Coimbatore'
          },
          shoppingList: [
            { item: 'Casual wear', category: 'clothing', priority: 'high', estimatedPrice: 2000 },
            { item: 'Electronics accessories', category: 'electronics', priority: 'medium', estimatedPrice: 1500 },
            { item: 'Home decor items', category: 'home', priority: 'low', estimatedPrice: 1000 }
          ],
          budget: {
            estimated: 5000,
            shared: false,
            currency: 'INR',
            splitExpenses: true
          },
          requirements: ['Valid ID', 'Comfortable shoes', 'Shopping bags'],
          tags: ['mall', 'weekend', 'group', 'casual', 'fun'],
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
          isUserCreated: false,
          tripType: 'recreational',
          ageGroup: '18-35',
          difficulty: 'easy',
          weatherDependent: false,
          groupChat: {
            enabled: true,
            messageCount: 3
          },
          reviews: [],
          bookmarkedBy: [],
          reportedBy: []
        },
        {
          id: 'enhanced-trip-2',
          title: 'Expert Electronics Shopping Guide',
          description: 'Join me for a focused electronics shopping trip! I\'ll help you choose the best gadgets and get great deals. Perfect for first-time laptop buyers.',
          organizer: {
            id: 6,
            name: 'Karthik Reddy',
            email: 'karthik.reddy@example.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            rating: 4.9,
            completedTrips: 23,
            verified: true,
            specialties: ['electronics', 'gadgets']
          },
          targetStores: [
            { id: 'store-4', name: 'Brookefields Mall', category: 'mall', rating: 4.4 },
            { id: 'store-5', name: 'Vijay Sales', category: 'electronics', rating: 4.2 },
            { id: 'store-6', name: 'Croma', category: 'electronics', rating: 4.3 }
          ],
          scheduledDate: nextWeek.toISOString(),
          estimatedDuration: 3,
          maxParticipants: 4,
          currentParticipants: 2,
          participants: [
            { id: 6, name: 'Karthik Reddy', role: 'organizer', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
            { id: 7, name: 'Meera Nair', role: 'participant', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
          ],
          status: 'open',
          visibility: 'public',
          category: 'electronics',
          location: {
            city: 'Coimbatore',
            area: 'Brookefields',
            coordinates: { lat: 11.0510, lng: 76.9760 },
            address: 'Brookefields Mall, Brookefields, Coimbatore'
          },
          shoppingList: [
            { item: 'Gaming laptop', category: 'electronics', priority: 'high', estimatedPrice: 75000 },
            { item: 'Wireless mouse', category: 'electronics', priority: 'medium', estimatedPrice: 2000 },
            { item: 'Bluetooth headphones', category: 'electronics', priority: 'medium', estimatedPrice: 5000 }
          ],
          budget: {
            estimated: 80000,
            shared: false,
            currency: 'INR',
            splitExpenses: false
          },
          requirements: ['Research completed brands', 'Budget decided', 'Specifications list'],
          tags: ['electronics', 'expert', 'guidance', 'laptops', 'gadgets'],
          createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
          isUserCreated: false,
          tripType: 'expert-guided',
          ageGroup: '20-40',
          difficulty: 'medium',
          weatherDependent: false,
          groupChat: {
            enabled: true,
            messageCount: 1
          },
          reviews: [],
          bookmarkedBy: [],
          reportedBy: []
        }
      ]

      this.trips = enhancedTrips
      this.saveTrips()

      // Initialize participants
      enhancedTrips.forEach(trip => {
        this.participants[trip.id] = trip.participants
      })
      this.saveParticipants()

      // Initialize chat messages
      this.chats['enhanced-trip-1'] = [
        {
          id: 'chat-1',
          senderId: 2,
          senderName: 'Priya Sharma',
          message: 'Hey everyone! Looking forward to tomorrow\'s trip. Meet at the main entrance at 2 PM!',
          timestamp: now.toISOString(),
          type: 'text'
        },
        {
          id: 'chat-2',
          senderId: 3,
          senderName: 'Rahul Kumar',
          message: 'Sounds great! Should we plan lunch together too?',
          timestamp: new Date(now.getTime() + 30 * 60 * 1000).toISOString(),
          type: 'text'
        },
        {
          id: 'chat-3',
          senderId: 4,
          senderName: 'Sneha Patel',
          message: 'Perfect! I was thinking the same. Food court at 1 PM?',
          timestamp: new Date(now.getTime() + 45 * 60 * 1000).toISOString(),
          type: 'text'
        }
      ]

      this.chats['enhanced-trip-2'] = [
        {
          id: 'chat-4',
          senderId: 6,
          senderName: 'Karthik Reddy',
          message: 'I\'ll help you compare specs and get the best deals. Bring your research notes!',
          timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
          type: 'text'
        }
      ]

      this.saveChats()
    }
  }

  // Enhanced trip management methods
  async createTrip(tripData, organizerId) {
    try {
      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        throw new Error('User profiles not available')
      }

      const profiles = userProfileStorage.getAllProfiles()
      const organizer = profiles.find(p => p.id === organizerId)
      
      if (!organizer) {
        throw new Error('Organizer profile not found')
      }

      const now = new Date()
      const newTrip = {
        id: `trip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...tripData,
        organizer: {
          id: organizerId,
          name: organizer.personalInfo.name,
          email: organizer.personalInfo.email,
          avatar: organizer.personalInfo.avatar,
          rating: organizer.stats.averageRating,
          completedTrips: organizer.stats.totalTrips,
          verified: organizer.verified || false
        },
        currentParticipants: 1,
        participants: [
          {
            id: organizerId,
            name: organizer.personalInfo.name,
            role: 'organizer',
            joinedAt: now.toISOString(),
            avatar: organizer.personalInfo.avatar
          }
        ],
        status: 'open',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        isUserCreated: true,
        groupChat: {
          enabled: true,
          messageCount: 0
        },
        reviews: [],
        bookmarkedBy: [],
        reportedBy: []
      }

      this.trips.push(newTrip)
      this.participants[newTrip.id] = newTrip.participants
      this.chats[newTrip.id] = []
      
      this.saveTrips()
      this.saveParticipants()
      this.saveChats()

      return newTrip
    } catch (error) {
      throw error
    }
  }

  async joinTrip(tripId, userId) {
    try {
      const tripIndex = this.trips.findIndex(t => t.id === tripId)
      if (tripIndex === -1) {
        throw new Error('Trip not found')
      }

      const trip = this.trips[tripIndex]

      // Check if already joined
      if (trip.participants.some(p => p.id === userId)) {
        throw new Error('Already joined this trip')
      }

      // Check if trip is full
      if (trip.currentParticipants >= trip.maxParticipants) {
        throw new Error('Trip is full')
      }

      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        throw new Error('User profiles not available')
      }

      const profiles = userProfileStorage.getAllProfiles()
      const user = profiles.find(p => p.id === userId)
      
      if (!user) {
        throw new Error('User profile not found')
      }

      // Add participant
      const newParticipant = {
        id: userId,
        name: user.personalInfo.name,
        role: 'participant',
        joinedAt: new Date().toISOString(),
        avatar: user.personalInfo.avatar
      }

      trip.participants.push(newParticipant)
      trip.currentParticipants = trip.participants.length
      trip.updatedAt = new Date().toISOString()

      // Update status if full
      if (trip.currentParticipants >= trip.maxParticipants) {
        trip.status = 'full'
      }

      this.trips[tripIndex] = trip
      this.participants[tripId] = trip.participants

      this.saveTrips()
      this.saveParticipants()

      return trip
    } catch (error) {
      throw error
    }
  }

  async leaveTrip(tripId, userId) {
    try {
      const tripIndex = this.trips.findIndex(t => t.id === tripId)
      if (tripIndex === -1) {
        throw new Error('Trip not found')
      }

      const trip = this.trips[tripIndex]
      const participantIndex = trip.participants.findIndex(p => p.id === userId)

      if (participantIndex === -1) {
        throw new Error('Not a participant of this trip')
      }

      const participant = trip.participants[participantIndex]

      // Don't allow organizer to leave
      if (participant.role === 'organizer') {
        throw new Error('Organizer cannot leave the trip')
      }

      // Remove participant
      trip.participants.splice(participantIndex, 1)
      trip.currentParticipants = trip.participants.length
      trip.updatedAt = new Date().toISOString()

      // Update status if no longer full
      if (trip.status === 'full' && trip.currentParticipants < trip.maxParticipants) {
        trip.status = 'open'
      }

      this.trips[tripIndex] = trip
      this.participants[tripId] = trip.participants

      this.saveTrips()
      this.saveParticipants()

      return trip
    } catch (error) {
      throw error
    }
  }

  async sendMessage(tripId, userId, message) {
    try {
      const trip = this.trips.find(t => t.id === tripId)
      if (!trip) {
        throw new Error('Trip not found')
      }

      // Check if user is a participant
      if (!trip.participants.some(p => p.id === userId)) {
        throw new Error('Only participants can send messages')
      }

      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        throw new Error('User profiles not available')
      }

      const profiles = userProfileStorage.getAllProfiles()
      const user = profiles.find(p => p.id === userId)
      
      if (!user) {
        throw new Error('User profile not found')
      }

      const newMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderId: userId,
        senderName: user.personalInfo.name,
        message: message,
        timestamp: new Date().toISOString(),
        type: 'text'
      }

      if (!this.chats[tripId]) {
        this.chats[tripId] = []
      }

      this.chats[tripId].push(newMessage)
      
      // Update trip message count
      const tripIndex = this.trips.findIndex(t => t.id === tripId)
      if (tripIndex !== -1) {
        this.trips[tripIndex].groupChat.messageCount = this.chats[tripId].length
        this.trips[tripIndex].updatedAt = new Date().toISOString()
      }

      this.saveChats()
      this.saveTrips()

      return newMessage
    } catch (error) {
      throw error
    }
  }

  async getMessages(tripId) {
    return this.chats[tripId] || []
  }

  getAllTrips(filters = {}) {
    let filteredTrips = [...this.trips]

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      filteredTrips = filteredTrips.filter(trip => trip.category === filters.category)
    }

    if (filters.status && filters.status !== 'all') {
      filteredTrips = filteredTrips.filter(trip => trip.status === filters.status)
    }

    if (filters.location) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        trip.location.area.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredTrips = filteredTrips.filter(trip =>
        trip.title.toLowerCase().includes(searchTerm) ||
        trip.description.toLowerCase().includes(searchTerm) ||
        trip.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Sort by date
    filteredTrips.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))

    return filteredTrips
  }

  getTripById(tripId) {
    return this.trips.find(t => t.id === tripId)
  }

  getUserTrips(userId) {
    return this.trips.filter(trip =>
      trip.organizer.id === userId ||
      trip.participants.some(p => p.id === userId)
    )
  }
}

const enhancedTripStorage = new EnhancedTripStorage()

const tripsAPI = {
  // Get trips near location with enhanced seed data
  getNearbyTrips: async (coordinates, filters = {}) => {
    // If demo mode is enabled, use enhanced storage
    if (demoConfig.DEMO_MODE) {
      const enhancedTrips = enhancedTripStorage.getAllTrips(filters)
      const userTrips = userTripsStorage.getPublicTrips()
      const seedTrips = seedDataAPI.getSeedTrips(filters)
      const combinedTrips = [...enhancedTrips, ...userTrips, ...seedTrips]
      
      return {
        success: true,
        data: {
          trips: combinedTrips,
          totalTrips: combinedTrips.length,
          realTripsCount: 0,
          userTripsCount: userTrips.length,
          enhancedTripsCount: enhancedTrips.length,
          seedTripsCount: seedTrips.length
        },
        message: 'Showing enhanced demo trips'
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
      
      // Get enhanced trips
      const enhancedTrips = enhancedTripStorage.getAllTrips(filters)
      
      // Get user-created public trips
      const userTrips = userTripsStorage.getPublicTrips()
      
      // Get seed data
      const seedTrips = seedDataAPI.getSeedTrips(filters)
      
      // Combine all data sources
      const combinedTrips = [...realTrips, ...enhancedTrips, ...userTrips, ...seedTrips]
      
      return {
        success: true,
        data: {
          trips: combinedTrips,
          totalTrips: combinedTrips.length,
          realTripsCount: realTrips.length,
          enhancedTripsCount: enhancedTrips.length,
          userTripsCount: userTrips.length,
          seedTripsCount: seedTrips.length
        },
        message: 'Combined trips from all sources'
      }
    } catch (error) {
      // Fallback to enhanced and local data
      if (demoConfig.LOG_API_FAILURES && error.response?.status !== 401) {
        console.info('API unavailable, showing enhanced demo data:', error.response?.status || 'Network error')
      }
      
      const enhancedTrips = enhancedTripStorage.getAllTrips(filters)
      const userTrips = userTripsStorage.getPublicTrips()
      const seedTrips = seedDataAPI.getSeedTrips(filters)
      const combinedTrips = [...enhancedTrips, ...userTrips, ...seedTrips]
      
      return {
        success: true,
        data: {
          trips: combinedTrips,
          totalTrips: combinedTrips.length,
          realTripsCount: 0,
          enhancedTripsCount: enhancedTrips.length,
          userTripsCount: userTrips.length,
          seedTripsCount: seedTrips.length
        },
        message: 'Enhanced demo trips (API unavailable)'
      }
    }
  },
      
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
