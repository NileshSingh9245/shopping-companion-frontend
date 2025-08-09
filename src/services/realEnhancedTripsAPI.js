// Real Enhanced Trips API with comprehensive functionality
// Integrates with user profile system for a complete MVP experience

const ENHANCED_TRIPS_KEY = 'shopping_companion_enhanced_trips'
const TRIP_PARTICIPANTS_KEY = 'shopping_companion_trip_participants'
const TRIP_CHAT_KEY = 'shopping_companion_trip_chat'

class RealEnhancedTripsAPI {
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
        },
        {
          id: 'enhanced-trip-3',
          title: 'Weekly Grocery Run - Cost Sharing',
          description: 'Join our weekly grocery shopping trip! We split bulk purchases and transportation costs. Great for families and budget-conscious shoppers.',
          organizer: {
            id: 8,
            name: 'Lakshmi Iyer',
            email: 'lakshmi.iyer@example.com',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            rating: 4.7,
            completedTrips: 31,
            verified: true
          },
          targetStores: [
            { id: 'store-7', name: 'Reliance Fresh', category: 'grocery', rating: 4.4 },
            { id: 'store-8', name: 'More Supermarket', category: 'grocery', rating: 4.2 }
          ],
          scheduledDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedDuration: 2,
          maxParticipants: 4,
          currentParticipants: 3,
          participants: [
            { id: 8, name: 'Lakshmi Iyer', role: 'organizer', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
            { id: 9, name: 'Divya Kumar', role: 'participant', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
            { id: 10, name: 'Suresh Babu', role: 'participant', joinedAt: now.toISOString(), avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
          ],
          status: 'open',
          visibility: 'public',
          category: 'grocery',
          location: {
            city: 'Coimbatore',
            area: 'Sarvanampatti',
            coordinates: { lat: 11.0711, lng: 77.0056 },
            address: 'Reliance Fresh, Sarvanampatti, Coimbatore'
          },
          shoppingList: [
            { item: 'Rice (25kg bag)', category: 'staples', priority: 'high', estimatedPrice: 1500 },
            { item: 'Fresh vegetables', category: 'fresh', priority: 'high', estimatedPrice: 800 },
            { item: 'Household items', category: 'cleaning', priority: 'medium', estimatedPrice: 500 }
          ],
          budget: {
            estimated: 3000,
            shared: true,
            currency: 'INR',
            splitExpenses: true
          },
          requirements: ['Carry bags', 'Shopping list ready', 'Payment method'],
          tags: ['grocery', 'weekly', 'bulk', 'cost-sharing', 'regular'],
          createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: now.toISOString(),
          isUserCreated: false,
          tripType: 'regular',
          ageGroup: '25-50',
          difficulty: 'easy',
          weatherDependent: false,
          groupChat: {
            enabled: true,
            messageCount: 2
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

      this.chats['enhanced-trip-3'] = [
        {
          id: 'chat-5',
          senderId: 8,
          senderName: 'Lakshmi Iyer',
          message: 'Let\'s coordinate our shopping lists to avoid duplicate purchases',
          timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
          type: 'text'
        },
        {
          id: 'chat-6',
          senderId: 9,
          senderName: 'Divya Kumar',
          message: 'Great idea! I need rice and dal. What about vegetables?',
          timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
          type: 'text'
        }
      ]

      this.saveChats()
    }
  }

  // API Methods

  // Get all trips with filters
  async getAllTrips(filters = {}) {
    try {
      let filteredTrips = [...this.trips]

      // Apply filters
      if (filters.category && filters.category !== 'all') {
        filteredTrips = filteredTrips.filter(trip => trip.category === filters.category)
      }

      if (filters.status && filters.status !== 'all') {
        filteredTrips = filteredTrips.filter(trip => trip.status === filters.status)
      }

      if (filters.location) {
        const searchTerm = filters.location.toLowerCase()
        filteredTrips = filteredTrips.filter(trip => 
          trip.location.city.toLowerCase().includes(searchTerm) ||
          trip.location.area.toLowerCase().includes(searchTerm)
        )
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredTrips = filteredTrips.filter(trip =>
          trip.title.toLowerCase().includes(searchTerm) ||
          trip.description.toLowerCase().includes(searchTerm) ||
          trip.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          trip.organizer.name.toLowerCase().includes(searchTerm)
        )
      }

      // Sort by date
      filteredTrips.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))

      return {
        success: true,
        data: filteredTrips,
        total: filteredTrips.length
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get trip by ID
  async getTripById(tripId) {
    try {
      const trip = this.trips.find(t => t.id === tripId)
      if (!trip) {
        return {
          success: false,
          error: 'Trip not found'
        }
      }

      return {
        success: true,
        data: trip
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Create new trip
  async createTrip(tripData, organizerId) {
    try {
      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        return {
          success: false,
          error: 'User profiles not available'
        }
      }

      const profiles = userProfileStorage.getAllProfiles()
      const organizer = profiles.find(p => p.id === organizerId)
      
      if (!organizer) {
        return {
          success: false,
          error: 'Organizer profile not found'
        }
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

      return {
        success: true,
        data: newTrip
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Join trip
  async joinTrip(tripId, userId) {
    try {
      const tripIndex = this.trips.findIndex(t => t.id === tripId)
      if (tripIndex === -1) {
        return {
          success: false,
          error: 'Trip not found'
        }
      }

      const trip = this.trips[tripIndex]

      // Check if already joined
      if (trip.participants.some(p => p.id === userId)) {
        return {
          success: false,
          error: 'Already joined this trip'
        }
      }

      // Check if trip is full
      if (trip.currentParticipants >= trip.maxParticipants) {
        return {
          success: false,
          error: 'Trip is full'
        }
      }

      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        return {
          success: false,
          error: 'User profiles not available'
        }
      }

      const profiles = userProfileStorage.getAllProfiles()
      const user = profiles.find(p => p.id === userId)
      
      if (!user) {
        return {
          success: false,
          error: 'User profile not found'
        }
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

      return {
        success: true,
        data: trip
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Leave trip
  async leaveTrip(tripId, userId) {
    try {
      const tripIndex = this.trips.findIndex(t => t.id === tripId)
      if (tripIndex === -1) {
        return {
          success: false,
          error: 'Trip not found'
        }
      }

      const trip = this.trips[tripIndex]
      const participantIndex = trip.participants.findIndex(p => p.id === userId)

      if (participantIndex === -1) {
        return {
          success: false,
          error: 'Not a participant of this trip'
        }
      }

      const participant = trip.participants[participantIndex]

      // Don't allow organizer to leave
      if (participant.role === 'organizer') {
        return {
          success: false,
          error: 'Organizer cannot leave the trip'
        }
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

      return {
        success: true,
        data: trip
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Send message to trip chat
  async sendMessage(tripId, userId, message) {
    try {
      const trip = this.trips.find(t => t.id === tripId)
      if (!trip) {
        return {
          success: false,
          error: 'Trip not found'
        }
      }

      // Check if user is a participant
      if (!trip.participants.some(p => p.id === userId)) {
        return {
          success: false,
          error: 'Only participants can send messages'
        }
      }

      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        return {
          success: false,
          error: 'User profiles not available'
        }
      }

      const profiles = userProfileStorage.getAllProfiles()
      const user = profiles.find(p => p.id === userId)
      
      if (!user) {
        return {
          success: false,
          error: 'User profile not found'
        }
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

      return {
        success: true,
        data: newMessage
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get trip messages
  async getTripMessages(tripId) {
    try {
      const messages = this.chats[tripId] || []
      return {
        success: true,
        data: messages
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get user's trips
  async getUserTrips(userId) {
    try {
      const userTrips = this.trips.filter(trip =>
        trip.organizer.id === userId ||
        trip.participants.some(p => p.id === userId)
      )

      return {
        success: true,
        data: userTrips
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Update trip
  async updateTrip(tripId, updateData, userId) {
    try {
      const tripIndex = this.trips.findIndex(t => t.id === tripId)
      if (tripIndex === -1) {
        return {
          success: false,
          error: 'Trip not found'
        }
      }

      const trip = this.trips[tripIndex]

      // Check if user is organizer
      if (trip.organizer.id !== userId) {
        return {
          success: false,
          error: 'Only organizer can update the trip'
        }
      }

      // Update trip data
      const updatedTrip = {
        ...trip,
        ...updateData,
        updatedAt: new Date().toISOString()
      }

      this.trips[tripIndex] = updatedTrip
      this.saveTrips()

      return {
        success: true,
        data: updatedTrip
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Delete trip
  async deleteTrip(tripId, userId) {
    try {
      const tripIndex = this.trips.findIndex(t => t.id === tripId)
      if (tripIndex === -1) {
        return {
          success: false,
          error: 'Trip not found'
        }
      }

      const trip = this.trips[tripIndex]

      // Check if user is organizer
      if (trip.organizer.id !== userId) {
        return {
          success: false,
          error: 'Only organizer can delete the trip'
        }
      }

      // Remove trip
      this.trips.splice(tripIndex, 1)
      delete this.participants[tripId]
      delete this.chats[tripId]

      this.saveTrips()
      this.saveParticipants()
      this.saveChats()

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

// Export singleton instance
const realEnhancedTripsAPI = new RealEnhancedTripsAPI()
export default realEnhancedTripsAPI
