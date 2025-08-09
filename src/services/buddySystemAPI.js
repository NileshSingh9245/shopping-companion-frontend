// Enhanced Buddy System with real connections, messaging, and compatibility
// Integrates with userProfileStorage for realistic user interactions

const BUDDY_CONNECTIONS_KEY = 'shopping_companion_buddy_connections'
const BUDDY_MESSAGES_KEY = 'shopping_companion_buddy_messages'
const BUDDY_REQUESTS_KEY = 'shopping_companion_buddy_requests'

class BuddySystemAPI {
  constructor() {
    this.connections = this.loadConnections()
    this.messages = this.loadMessages()
    this.requests = this.loadRequests()
    this.initializeSeedData()
  }

  // Load data from localStorage
  loadConnections() {
    try {
      const stored = localStorage.getItem(BUDDY_CONNECTIONS_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading buddy connections:', error)
      return {}
    }
  }

  loadMessages() {
    try {
      const stored = localStorage.getItem(BUDDY_MESSAGES_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading buddy messages:', error)
      return {}
    }
  }

  loadRequests() {
    try {
      const stored = localStorage.getItem(BUDDY_REQUESTS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading buddy requests:', error)
      return []
    }
  }

  // Save data to localStorage
  saveConnections() {
    try {
      localStorage.setItem(BUDDY_CONNECTIONS_KEY, JSON.stringify(this.connections))
    } catch (error) {
      console.error('Error saving buddy connections:', error)
    }
  }

  saveMessages() {
    try {
      localStorage.setItem(BUDDY_MESSAGES_KEY, JSON.stringify(this.messages))
    } catch (error) {
      console.error('Error saving buddy messages:', error)
    }
  }

  saveRequests() {
    try {
      localStorage.setItem(BUDDY_REQUESTS_KEY, JSON.stringify(this.requests))
    } catch (error) {
      console.error('Error saving buddy requests:', error)
    }
  }

  // Initialize with seed buddy connections and messages
  initializeSeedData() {
    // Get user profile storage instance
    const userProfileStorage = this.getUserProfileStorage()
    if (!userProfileStorage) return

    const profiles = userProfileStorage.getAllProfiles()
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (Object.keys(this.connections).length === 0 && profiles.length > 0) {
      // Initialize some connections for the current user
      if (currentUser.id) {
        this.connections[currentUser.id] = [2, 3, 5, 8] // Connected to some seed users
        
        // Add reciprocal connections
        this.connections[2] = this.connections[2] || []
        this.connections[3] = this.connections[3] || []
        this.connections[5] = this.connections[5] || []
        this.connections[8] = this.connections[8] || []
        
        if (!this.connections[2].includes(currentUser.id)) this.connections[2].push(currentUser.id)
        if (!this.connections[3].includes(currentUser.id)) this.connections[3].push(currentUser.id)
        if (!this.connections[5].includes(currentUser.id)) this.connections[5].push(currentUser.id)
        if (!this.connections[8].includes(currentUser.id)) this.connections[8].push(currentUser.id)

        // Add some connections between seed users
        this.connections[2] = [...(this.connections[2] || []), 3, 5]
        this.connections[3] = [...(this.connections[3] || []), 2, 8]
        this.connections[5] = [...(this.connections[5] || []), 2, 6]
        this.connections[8] = [...(this.connections[8] || []), 3, 6]
        this.connections[6] = [5, 8]

        this.saveConnections()
      }

      // Initialize some sample messages
      if (Object.keys(this.messages).length === 0 && currentUser.id) {
        const now = new Date()
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)

        this.messages[this.getConversationId(currentUser.id, 2)] = [
          {
            id: 'msg-1',
            senderId: 2,
            receiverId: currentUser.id,
            message: 'Hey! Are you interested in joining our weekend shopping trip to Phoenix Mall?',
            timestamp: yesterday.toISOString(),
            read: true,
            type: 'text'
          },
          {
            id: 'msg-2',
            senderId: currentUser.id,
            receiverId: 2,
            message: 'That sounds great! What time are you planning to meet?',
            timestamp: twoHoursAgo.toISOString(),
            read: true,
            type: 'text'
          },
          {
            id: 'msg-3',
            senderId: 2,
            receiverId: currentUser.id,
            message: 'We\'re meeting at 2 PM at the main entrance. Would you like to join us?',
            timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
            read: false,
            type: 'text'
          }
        ]

        this.messages[this.getConversationId(currentUser.id, 3)] = [
          {
            id: 'msg-4',
            senderId: 3,
            receiverId: currentUser.id,
            message: 'Hi! I saw you\'re also into electronics shopping. Want to team up for better deals?',
            timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
            read: false,
            type: 'text'
          }
        ]

        this.saveMessages()
      }

      // Initialize some pending requests
      if (this.requests.length === 0 && currentUser.id) {
        this.requests = [
          {
            id: 'req-1',
            fromUserId: 6,
            toUserId: currentUser.id,
            fromUserName: 'Karthik Reddy',
            fromUserAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            message: 'Hi! I\'d like to connect with you for shopping trips in Coimbatore.',
            timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
            status: 'pending'
          },
          {
            id: 'req-2',
            fromUserId: 7,
            toUserId: currentUser.id,
            fromUserName: 'Meera Nair',
            fromUserAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            message: 'Would love to be shopping buddies! I\'m into fashion and electronics.',
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
            status: 'pending'
          }
        ]

        this.saveRequests()
      }
    }
  }

  // Helper to get user profile storage
  getUserProfileStorage() {
    try {
      // Import the user profile storage
      const userProfileData = localStorage.getItem('shopping_companion_user_profiles')
      return userProfileData ? { getAllProfiles: () => JSON.parse(userProfileData) } : null
    } catch (error) {
      return null
    }
  }

  // Generate conversation ID from two user IDs
  getConversationId(userId1, userId2) {
    return [userId1, userId2].sort().join('-')
  }

  // Get all available buddies (potential connections)
  async getAllBuddies(currentUserId, filters = {}) {
    try {
      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        return { success: false, error: 'User profiles not available' }
      }

      const profiles = userProfileStorage.getAllProfiles()
      let buddies = profiles.filter(profile => profile.id !== currentUserId)

      // Apply filters
      if (filters.location) {
        buddies = buddies.filter(buddy =>
          buddy.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          buddy.location.area.toLowerCase().includes(filters.location.toLowerCase())
        )
      }

      if (filters.interests && filters.interests.length > 0) {
        buddies = buddies.filter(buddy =>
          buddy.preferences.categories.some(category =>
            filters.interests.includes(category)
          )
        )
      }

      if (filters.rating) {
        buddies = buddies.filter(buddy => buddy.stats.averageRating >= filters.rating)
      }

      // Add connection status to each buddy
      const currentUserConnections = this.connections[currentUserId] || []
      buddies = buddies.map(buddy => ({
        ...buddy,
        isConnected: currentUserConnections.includes(buddy.id),
        mutualConnections: this.getMutualConnections(currentUserId, buddy.id).length,
        compatibilityScore: this.calculateCompatibility(currentUserId, buddy.id)
      }))

      // Sort by compatibility score
      buddies.sort((a, b) => b.compatibilityScore - a.compatibilityScore)

      return {
        success: true,
        data: buddies
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Calculate compatibility score between two users
  calculateCompatibility(userId1, userId2) {
    try {
      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) return 0

      const profiles = userProfileStorage.getAllProfiles()
      const user1 = profiles.find(p => p.id === userId1)
      const user2 = profiles.find(p => p.id === userId2)

      if (!user1 || !user2) return 0

      let score = 0

      // Location compatibility (same city = +30, same area = +20)
      if (user1.location.city === user2.location.city) {
        score += 30
        if (user1.location.area === user2.location.area) {
          score += 20
        }
      }

      // Shopping categories compatibility
      const commonCategories = user1.preferences.categories.filter(cat =>
        user2.preferences.categories.includes(cat)
      )
      score += commonCategories.length * 10

      // Budget range compatibility
      const budget1 = user1.preferences.budgetRange
      const budget2 = user2.preferences.budgetRange
      if (budget1.min <= budget2.max && budget2.min <= budget1.max) {
        score += 15
      }

      // Shopping style compatibility
      if (user1.preferences.shoppingStyle === user2.preferences.shoppingStyle) {
        score += 10
      }

      // Experience level compatibility
      const expDiff = Math.abs(user1.stats.totalTrips - user2.stats.totalTrips)
      if (expDiff <= 5) score += 10
      else if (expDiff <= 15) score += 5

      // Rating compatibility
      const ratingDiff = Math.abs(user1.stats.averageRating - user2.stats.averageRating)
      if (ratingDiff <= 0.5) score += 10
      else if (ratingDiff <= 1.0) score += 5

      return Math.min(score, 100) // Cap at 100
    } catch (error) {
      return 0
    }
  }

  // Get mutual connections between two users
  getMutualConnections(userId1, userId2) {
    const connections1 = this.connections[userId1] || []
    const connections2 = this.connections[userId2] || []
    return connections1.filter(id => connections2.includes(id))
  }

  // Send buddy request
  async sendBuddyRequest(fromUserId, toUserId, message = '') {
    try {
      // Check if already connected
      const fromConnections = this.connections[fromUserId] || []
      if (fromConnections.includes(toUserId)) {
        return {
          success: false,
          error: 'Already connected to this user'
        }
      }

      // Check if request already exists
      const existingRequest = this.requests.find(req =>
        req.fromUserId === fromUserId && req.toUserId === toUserId && req.status === 'pending'
      )
      if (existingRequest) {
        return {
          success: false,
          error: 'Request already sent'
        }
      }

      // Get user info
      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        return { success: false, error: 'User profiles not available' }
      }

      const profiles = userProfileStorage.getAllProfiles()
      const fromUser = profiles.find(p => p.id === fromUserId)
      
      if (!fromUser) {
        return {
          success: false,
          error: 'User not found'
        }
      }

      // Create request
      const request = {
        id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fromUserId,
        toUserId,
        fromUserName: fromUser.personalInfo.name,
        fromUserAvatar: fromUser.personalInfo.avatar,
        message: message || `Hi! I'd like to connect with you for shopping trips.`,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }

      this.requests.push(request)
      this.saveRequests()

      return {
        success: true,
        data: request
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Accept buddy request
  async acceptBuddyRequest(requestId, userId) {
    try {
      const requestIndex = this.requests.findIndex(req => req.id === requestId)
      if (requestIndex === -1) {
        return {
          success: false,
          error: 'Request not found'
        }
      }

      const request = this.requests[requestIndex]
      
      // Verify user can accept this request
      if (request.toUserId !== userId) {
        return {
          success: false,
          error: 'Unauthorized to accept this request'
        }
      }

      // Add connections
      if (!this.connections[request.fromUserId]) {
        this.connections[request.fromUserId] = []
      }
      if (!this.connections[request.toUserId]) {
        this.connections[request.toUserId] = []
      }

      this.connections[request.fromUserId].push(request.toUserId)
      this.connections[request.toUserId].push(request.fromUserId)

      // Update request status
      this.requests[requestIndex].status = 'accepted'

      this.saveConnections()
      this.saveRequests()

      return {
        success: true,
        data: { message: 'Buddy request accepted' }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Decline buddy request
  async declineBuddyRequest(requestId, userId) {
    try {
      const requestIndex = this.requests.findIndex(req => req.id === requestId)
      if (requestIndex === -1) {
        return {
          success: false,
          error: 'Request not found'
        }
      }

      const request = this.requests[requestIndex]
      
      // Verify user can decline this request
      if (request.toUserId !== userId) {
        return {
          success: false,
          error: 'Unauthorized to decline this request'
        }
      }

      // Update request status
      this.requests[requestIndex].status = 'declined'
      this.saveRequests()

      return {
        success: true,
        data: { message: 'Buddy request declined' }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get buddy requests for user
  async getBuddyRequests(userId) {
    try {
      const pendingRequests = this.requests.filter(req =>
        req.toUserId === userId && req.status === 'pending'
      )

      return {
        success: true,
        data: pendingRequests
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get user's connections
  async getUserConnections(userId) {
    try {
      const connectionIds = this.connections[userId] || []
      
      const userProfileStorage = this.getUserProfileStorage()
      if (!userProfileStorage) {
        return { success: false, error: 'User profiles not available' }
      }

      const profiles = userProfileStorage.getAllProfiles()
      const connections = connectionIds.map(id => {
        const profile = profiles.find(p => p.id === id)
        if (profile) {
          return {
            ...profile,
            lastMessage: this.getLastMessage(userId, id),
            unreadCount: this.getUnreadCount(userId, id)
          }
        }
        return null
      }).filter(Boolean)

      return {
        success: true,
        data: connections
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Send message
  async sendMessage(senderId, receiverId, message) {
    try {
      // Check if users are connected
      const senderConnections = this.connections[senderId] || []
      if (!senderConnections.includes(receiverId)) {
        return {
          success: false,
          error: 'Users are not connected'
        }
      }

      const conversationId = this.getConversationId(senderId, receiverId)
      
      const newMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderId,
        receiverId,
        message,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'text'
      }

      if (!this.messages[conversationId]) {
        this.messages[conversationId] = []
      }

      this.messages[conversationId].push(newMessage)
      this.saveMessages()

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

  // Get conversation messages
  async getConversation(userId1, userId2) {
    try {
      const conversationId = this.getConversationId(userId1, userId2)
      const messages = this.messages[conversationId] || []

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

  // Mark messages as read
  async markMessagesAsRead(userId, otherUserId) {
    try {
      const conversationId = this.getConversationId(userId, otherUserId)
      const messages = this.messages[conversationId] || []

      messages.forEach(message => {
        if (message.receiverId === userId && !message.read) {
          message.read = true
        }
      })

      this.saveMessages()

      return {
        success: true,
        data: { message: 'Messages marked as read' }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get last message between two users
  getLastMessage(userId1, userId2) {
    const conversationId = this.getConversationId(userId1, userId2)
    const messages = this.messages[conversationId] || []
    return messages.length > 0 ? messages[messages.length - 1] : null
  }

  // Get unread message count
  getUnreadCount(userId, otherUserId) {
    const conversationId = this.getConversationId(userId, otherUserId)
    const messages = this.messages[conversationId] || []
    return messages.filter(msg => msg.receiverId === userId && !msg.read).length
  }

  // Remove buddy connection
  async removeBuddy(userId, buddyId) {
    try {
      // Remove from both users' connection lists
      if (this.connections[userId]) {
        this.connections[userId] = this.connections[userId].filter(id => id !== buddyId)
      }
      if (this.connections[buddyId]) {
        this.connections[buddyId] = this.connections[buddyId].filter(id => id !== userId)
      }

      this.saveConnections()

      return {
        success: true,
        data: { message: 'Buddy connection removed' }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get recommended buddies based on compatibility
  async getRecommendedBuddies(userId, limit = 5) {
    try {
      const allBuddiesResult = await this.getAllBuddies(userId)
      if (!allBuddiesResult.success) {
        return allBuddiesResult
      }

      const unconnectedBuddies = allBuddiesResult.data.filter(buddy => !buddy.isConnected)
      const recommended = unconnectedBuddies
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
        .slice(0, limit)

      return {
        success: true,
        data: recommended
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
const buddySystemAPI = new BuddySystemAPI()
export default buddySystemAPI
