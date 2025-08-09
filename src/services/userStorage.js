// User storage service - manages registered users in localStorage
// This simulates a user database for demo mode

const USERS_STORAGE_KEY = 'shopping_companion_users'

class UserStorage {
  constructor() {
    this.users = this.loadUsers()
    this.initializeSeedData()
  }

  // Load users from localStorage
  loadUsers() {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading users:', error)
      return []
    }
  }

  // Save users to localStorage
  saveUsers() {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users))
    } catch (error) {
      console.error('Error saving users:', error)
    }
  }

  // Initialize with seed data if no users exist
  initializeSeedData() {
    if (this.users.length === 0) {
      const seedUsers = [
        {
          id: 1,
          name: 'Admin User',
          email: '2421255@cog.com',
          role: 'master_admin',
          isMasterAdmin: true,
          adminPermissions: ['master_admin', 'manage_users', 'manage_stores', 'view_analytics', 'system_settings'],
          avatar: null,
          profilePicture: null,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          phone: '+1-555-0101',
          address: '123 Admin Street, Admin City, AC 12345',
          status: 'active',
          location: { area: 'Admin City, AC' },
          joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          lastActive: new Date().toLocaleDateString(),
          totalTrips: 15,
          bio: 'Master Administrator with full system access'
        },
        {
          id: 2,
          name: 'Nilesh Kumar Singh',
          email: 'nileshkumarsingh9245@gmail.com',
          role: 'user',
          isMasterAdmin: false,
          adminPermissions: [],
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          phone: '6200759921',
          address: 'Coimbatore, Tamil Nadu, India',
          status: 'active',
          location: { area: 'Coimbatore, Tamil Nadu' },
          joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          lastActive: new Date().toLocaleDateString(),
          totalTrips: 25,
          bio: '🚀 Full-Stack Developer & App Creator | Built Shopping Companion to revolutionize the shopping experience with AI-powered buddy matching and smart trip planning. Passionate about creating user-centric applications that solve real-world problems. Available for collaboration and custom development projects!'
        },
        {
          id: 3,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          role: 'user',
          isMasterAdmin: false,
          adminPermissions: [],
          avatar: null,
          profilePicture: null,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          phone: '+1-555-0102',
          address: '456 Oak Avenue, User City, UC 67890',
          status: 'active',
          location: { area: 'User City, UC' },
          joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleDateString(),
          totalTrips: 8,
          bio: 'Regular user who loves shopping'
        },
        {
          id: 4,
          name: 'Bob Wilson',
          email: 'bob@example.com',
          role: 'user',
          isMasterAdmin: false,
          adminPermissions: [],
          avatar: null,
          profilePicture: null,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          phone: '+1-555-0103',
          address: '789 Pine Street, Demo Town, DT 11111',
          status: 'active',
          location: { area: 'Demo Town, DT' },
          joinDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleDateString(),
          totalTrips: 12,
          bio: 'Frequent shopper and bargain hunter'
        },
        {
          id: 5,
          name: 'Carol Smith',
          email: 'carol@example.com',
          role: 'user',
          isMasterAdmin: false,
          adminPermissions: [],
          avatar: null,
          profilePicture: null,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          phone: '+1-555-0104',
          address: '321 Elm Drive, Sample City, SC 22222',
          status: 'inactive',
          location: { area: 'Sample City, SC' },
          joinDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          totalTrips: 5,
          bio: 'Occasional shopper'
        },
        {
          id: 6,
          name: 'David Brown',
          email: 'david@example.com',
          role: 'admin',
          isMasterAdmin: false,
          adminPermissions: ['manage_users', 'manage_stores', 'view_analytics'],
          avatar: null,
          profilePicture: null,
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          phone: '+1-555-0105',
          address: '654 Cedar Lane, Admin Town, AT 33333',
          status: 'active',
          location: { area: 'Admin Town, AT' },
          joinDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toLocaleDateString(),
          totalTrips: 20,
          bio: 'System administrator with user management privileges'
        }
      ]
      
      this.users = seedUsers
      this.saveUsers()
      console.log('Initialized seed user data')
    }
  }

  // Get all users
  getAllUsers() {
    return this.users
  }

  // Get user by ID
  getUserById(userId) {
    return this.users.find(user => user.id === userId)
  }

  // Get user by email
  getUserByEmail(email) {
    return this.users.find(user => user.email === email)
  }

  // Create new user
  createUser(userData) {
    const newUser = {
      id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
      ...userData,
      role: userData.role || 'user',
      isMasterAdmin: false,
      adminPermissions: userData.adminPermissions || [],
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: true
    }

    this.users.push(newUser)
    this.saveUsers()
    return newUser
  }

  // Update user
  updateUser(userId, updates) {
    const userIndex = this.users.findIndex(user => user.id === userId)
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      this.saveUsers()
      return this.users[userIndex]
    }
    return null
  }

  // Delete user
  deleteUser(userId) {
    const userIndex = this.users.findIndex(user => user.id === userId)
    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1)[0]
      this.saveUsers()
      return deletedUser
    }
    return null
  }

  // Update last login
  updateLastLogin(userId) {
    const user = this.getUserById(userId)
    if (user) {
      user.lastLogin = new Date().toISOString()
      this.saveUsers()
    }
  }

  // Get users by role
  getUsersByRole(role) {
    return this.users.filter(user => user.role === role)
  }

  // Get active users
  getActiveUsers() {
    return this.users.filter(user => user.isActive)
  }

  // Get user statistics
  getUserStats() {
    const total = this.users.length
    const active = this.users.filter(user => user.isActive).length
    const admins = this.users.filter(user => user.role === 'admin' || user.role === 'master_admin').length
    const newThisWeek = this.users.filter(user => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return new Date(user.createdAt) > weekAgo
    }).length

    return {
      total,
      active,
      admins,
      newThisWeek
    }
  }

  // Clear all users (for testing)
  clearAllUsers() {
    this.users = []
    this.saveUsers()
  }

  // Ban user
  banUser(userId, reason = 'Violation of terms', duration = null, bannedBy = null) {
    const user = this.getUserById(userId)
    if (user && user.id !== 1) { // Can't ban master admin
      user.status = 'banned'
      user.banInfo = {
        reason,
        bannedAt: new Date().toISOString(),
        bannedBy,
        duration, // null for permanent, number for days
        expiresAt: duration ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString() : null
      }
      user.isActive = false
      user.updatedAt = new Date().toISOString()
      this.saveUsers()
      return user
    }
    return null
  }

  // Unban user
  unbanUser(userId, unbannedBy = null) {
    const user = this.getUserById(userId)
    if (user && user.status === 'banned') {
      user.status = 'active'
      user.banInfo = {
        ...user.banInfo,
        unbannedAt: new Date().toISOString(),
        unbannedBy
      }
      user.isActive = true
      user.updatedAt = new Date().toISOString()
      this.saveUsers()
      return user
    }
    return null
  }

  // Promote user to admin
  promoteToAdmin(userId, permissions = [], promotedBy = null) {
    const user = this.getUserById(userId)
    if (user && user.role !== 'master_admin') {
      user.role = 'admin'
      user.adminPermissions = permissions.length > 0 ? permissions : ['manage_users', 'manage_stores', 'view_analytics']
      user.promotionInfo = {
        promotedAt: new Date().toISOString(),
        promotedBy,
        previousRole: user.role
      }
      user.updatedAt = new Date().toISOString()
      this.saveUsers()
      return user
    }
    return null
  }

  // Demote admin to user
  demoteFromAdmin(userId, demotedBy = null) {
    const user = this.getUserById(userId)
    if (user && user.role === 'admin') {
      user.role = 'user'
      user.adminPermissions = []
      user.demotionInfo = {
        demotedAt: new Date().toISOString(),
        demotedBy,
        previousRole: 'admin'
      }
      user.updatedAt = new Date().toISOString()
      this.saveUsers()
      return user
    }
    return null
  }

  // Add user activity log
  logUserActivity(userId, action, details = {}) {
    const user = this.getUserById(userId)
    if (user) {
      if (!user.activityLog) user.activityLog = []
      
      user.activityLog.unshift({
        id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        action,
        details,
        timestamp: new Date().toISOString(),
        ipAddress: 'demo-ip', // In real app, this would be actual IP
        userAgent: navigator.userAgent || 'Unknown'
      })
      
      // Keep only last 100 activities
      if (user.activityLog.length > 100) {
        user.activityLog = user.activityLog.slice(0, 100)
      }
      
      this.saveUsers()
      return user.activityLog[0]
    }
    return null
  }

  // Get user activity log
  getUserActivity(userId, limit = 50) {
    const user = this.getUserById(userId)
    if (user && user.activityLog) {
      return user.activityLog.slice(0, limit)
    }
    return []
  }

  // Check if ban is expired
  checkBanExpiry(userId) {
    const user = this.getUserById(userId)
    if (user && user.status === 'banned' && user.banInfo?.expiresAt) {
      const now = new Date()
      const expiryDate = new Date(user.banInfo.expiresAt)
      
      if (now >= expiryDate) {
        // Auto-unban
        this.unbanUser(userId, 'system-auto-unban')
        return true
      }
    }
    return false
  }

  // Get banned users
  getBannedUsers() {
    return this.users.filter(user => user.status === 'banned')
  }

  // Search users
  searchUsers(query, filters = {}) {
    let results = this.users

    // Text search
    if (query) {
      const searchLower = query.toLowerCase()
      results = results.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.phone && user.phone.includes(query))
      )
    }

    // Apply filters
    if (filters.role) {
      results = results.filter(user => user.role === filters.role)
    }

    if (filters.status) {
      results = results.filter(user => user.status === filters.status)
    }

    if (filters.isActive !== undefined) {
      results = results.filter(user => user.isActive === filters.isActive)
    }

    if (filters.createdAfter) {
      const afterDate = new Date(filters.createdAfter)
      results = results.filter(user => new Date(user.createdAt) >= afterDate)
    }

    return results
  }

  // Bulk operations
  bulkBanUsers(userIds, reason = 'Bulk ban', bannedBy = null) {
    const results = []
    userIds.forEach(userId => {
      const result = this.banUser(userId, reason, null, bannedBy)
      if (result) results.push(result)
    })
    return results
  }

  bulkUnbanUsers(userIds, unbannedBy = null) {
    const results = []
    userIds.forEach(userId => {
      const result = this.unbanUser(userId, unbannedBy)
      if (result) results.push(result)
    })
    return results
  }

  // Enhanced user statistics
  getDetailedUserStats() {
    const basic = this.getUserStats()
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    return {
      ...basic,
      banned: this.users.filter(user => user.status === 'banned').length,
      newThisMonth: this.users.filter(user => new Date(user.createdAt) >= monthAgo).length,
      activeThisWeek: this.users.filter(user => 
        user.lastLogin && new Date(user.lastLogin) >= weekAgo
      ).length,
      verifiedUsers: this.users.filter(user => user.isVerified).length,
      shoppingBuddies: this.users.filter(user => user.isShoppingBuddy).length
    }
  }
}

// Export singleton instance
const userStorage = new UserStorage()
export default userStorage
