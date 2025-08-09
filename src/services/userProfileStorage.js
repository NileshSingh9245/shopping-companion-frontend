// Enhanced User Profile Storage with comprehensive functionality
// This replaces the basic user data with a complete profile system

const USER_PROFILES_KEY = 'shopping_companion_user_profiles'
const USER_ACTIVITY_KEY = 'shopping_companion_user_activity'
const USER_PREFERENCES_KEY = 'shopping_companion_user_preferences'

class UserProfileStorage {
  constructor() {
    this.profiles = this.loadProfiles()
    this.initializeSeedData()
  }

  // Load user profiles from localStorage
  loadProfiles() {
    try {
      const stored = localStorage.getItem(USER_PROFILES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading user profiles:', error)
      return []
    }
  }

  // Save profiles to localStorage
  saveProfiles() {
    try {
      localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(this.profiles))
    } catch (error) {
      console.error('Error saving user profiles:', error)
    }
  }

  // Initialize with comprehensive seed data
  initializeSeedData() {
    if (this.profiles.length === 0) {
      const seedProfiles = [
        {
          id: 1,
          personalInfo: {
            name: 'Master Admin',
            email: '2421255@cog.com',
            phone: '+91-9876543200',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            dateOfBirth: '1990-01-01',
            gender: 'male'
          },
          location: {
            city: 'Coimbatore',
            area: 'Sarvanampatti',
            pincode: '641035',
            coordinates: { lat: 11.0696, lng: 77.0428 },
            radius: 25
          },
          role: 'master_admin',
          isMasterAdmin: true,
          adminPermissions: ['master_admin', 'manage_users', 'manage_stores', 'manage_trips', 'view_analytics'],
          preferences: {
            shoppingCategories: ['all'],
            budgetRange: { min: 0, max: 1000000 },
            preferredDays: ['all'],
            preferredTime: 'anytime',
            languages: ['Tamil', 'English', 'Hindi'],
            communicationStyle: 'professional',
            groupSize: 'any'
          },
          socialProfile: {
            bio: 'Platform administrator ensuring great shopping experiences for everyone!',
            interests: ['platform management', 'user experience', 'community building'],
            isPublic: true,
            shareLocation: false,
            allowMessages: true
          },
          statistics: {
            tripsOrganized: 100,
            tripsJoined: 150,
            totalTrips: 250,
            buddyRating: 5.0,
            reliability: 100,
            responseTime: 'instant',
            lastActive: new Date().toISOString()
          },
          achievements: [
            { id: 'platform-creator', name: 'Platform Creator', earned: true, earnedAt: '2024-01-01' },
            { id: 'super-organizer', name: 'Super Organizer', earned: true, earnedAt: '2024-01-01' },
            { id: 'community-leader', name: 'Community Leader', earned: true, earnedAt: '2024-01-01' }
          ],
          settings: {
            notifications: {
              tripInvites: true,
              buddyRequests: true,
              storeUpdates: true,
              promotions: false,
              adminAlerts: true
            },
            privacy: {
              profileVisibility: 'public',
              locationSharing: 'admin-only',
              contactInfo: 'hidden'
            }
          },
          createdAt: '2024-01-01T00:00:00.000Z',
          lastLogin: new Date().toISOString(),
          isActive: true,
          status: 'active'
        },
        {
          id: 2,
          personalInfo: {
            name: 'Priya Krishnan',
            email: 'priya@example.com',
            phone: '+91-9876543210',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
            dateOfBirth: '1995-06-15',
            gender: 'female'
          },
          location: {
            city: 'Coimbatore',
            area: 'Sarvanampatti',
            pincode: '641035',
            coordinates: { lat: 11.0696, lng: 77.0428 },
            radius: 15
          },
          role: 'user',
          isMasterAdmin: false,
          adminPermissions: [],
          preferences: {
            shoppingCategories: ['electronics', 'clothing', 'books'],
            budgetRange: { min: 1000, max: 25000 },
            preferredDays: ['saturday', 'sunday'],
            preferredTime: 'morning',
            languages: ['Tamil', 'English'],
            communicationStyle: 'friendly',
            groupSize: 'small'
          },
          socialProfile: {
            bio: 'Tech enthusiast who loves finding great deals on electronics and gadgets. Always happy to help fellow shoppers!',
            interests: ['technology', 'photography', 'reading'],
            isPublic: true,
            shareLocation: true,
            allowMessages: true
          },
          statistics: {
            tripsOrganized: 8,
            tripsJoined: 15,
            totalTrips: 23,
            buddyRating: 4.8,
            reliability: 92,
            responseTime: 'quick',
            lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          achievements: [
            { id: 'first-trip', name: 'First Trip', earned: true, earnedAt: '2024-02-01' },
            { id: 'helpful-buddy', name: 'Helpful Buddy', earned: true, earnedAt: '2024-03-15' },
            { id: 'tech-expert', name: 'Tech Expert', earned: true, earnedAt: '2024-04-10' },
            { id: 'reliable-organizer', name: 'Reliable Organizer', earned: true, earnedAt: '2024-05-20' }
          ],
          settings: {
            notifications: {
              tripInvites: true,
              buddyRequests: true,
              storeUpdates: true,
              promotions: true
            },
            privacy: {
              profileVisibility: 'public',
              locationSharing: 'buddies-only',
              contactInfo: 'hidden'
            }
          },
          createdAt: '2024-02-01T00:00:00.000Z',
          lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          status: 'active'
        },
        {
          id: 3,
          personalInfo: {
            name: 'Arjun Venkatesh',
            email: 'arjun@example.com',
            phone: '+91-9876543211',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            dateOfBirth: '1992-09-22',
            gender: 'male'
          },
          location: {
            city: 'Coimbatore',
            area: 'Gandhipuram',
            pincode: '641012',
            coordinates: { lat: 11.0168, lng: 76.9558 },
            radius: 20
          },
          role: 'user',
          isMasterAdmin: false,
          adminPermissions: [],
          preferences: {
            shoppingCategories: ['electronics', 'sports', 'automotive'],
            budgetRange: { min: 2000, max: 75000 },
            preferredDays: ['weekend', 'friday-evening'],
            preferredTime: 'afternoon',
            languages: ['Tamil', 'English', 'Hindi'],
            communicationStyle: 'casual',
            groupSize: 'medium'
          },
          socialProfile: {
            bio: 'Gaming enthusiast and sports lover. Looking for buddies to explore electronics stores and sports equipment.',
            interests: ['gaming', 'sports', 'fitness', 'technology'],
            isPublic: true,
            shareLocation: true,
            allowMessages: true
          },
          statistics: {
            tripsOrganized: 12,
            tripsJoined: 18,
            totalTrips: 30,
            buddyRating: 4.6,
            reliability: 88,
            responseTime: 'medium',
            lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
          },
          achievements: [
            { id: 'first-trip', name: 'First Trip', earned: true, earnedAt: '2024-01-15' },
            { id: 'sports-enthusiast', name: 'Sports Enthusiast', earned: true, earnedAt: '2024-03-10' },
            { id: 'active-organizer', name: 'Active Organizer', earned: true, earnedAt: '2024-04-25' }
          ],
          settings: {
            notifications: {
              tripInvites: true,
              buddyRequests: true,
              storeUpdates: false,
              promotions: true
            },
            privacy: {
              profileVisibility: 'public',
              locationSharing: 'public',
              contactInfo: 'buddies-only'
            }
          },
          createdAt: '2024-01-15T00:00:00.000Z',
          lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          status: 'active'
        },
        {
          id: 4,
          personalInfo: {
            name: 'Sneha Raj',
            email: 'sneha@example.com',
            phone: '+91-9876543212',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            dateOfBirth: '1997-03-08',
            gender: 'female'
          },
          location: {
            city: 'Coimbatore',
            area: 'Brookefields',
            pincode: '641062',
            coordinates: { lat: 11.0165, lng: 77.0088 },
            radius: 12
          },
          role: 'user',
          isMasterAdmin: false,
          adminPermissions: [],
          preferences: {
            shoppingCategories: ['clothing', 'accessories', 'cosmetics', 'home-decor'],
            budgetRange: { min: 500, max: 30000 },
            preferredDays: ['saturday', 'sunday', 'weekday-evening'],
            preferredTime: 'afternoon',
            languages: ['Tamil', 'English'],
            communicationStyle: 'friendly',
            groupSize: 'small'
          },
          socialProfile: {
            bio: 'Fashion blogger and style enthusiast. Love helping others find their perfect style and discover new trends.',
            interests: ['fashion', 'photography', 'blogging', 'art'],
            isPublic: true,
            shareLocation: true,
            allowMessages: true
          },
          statistics: {
            tripsOrganized: 15,
            tripsJoined: 25,
            totalTrips: 40,
            buddyRating: 4.9,
            reliability: 95,
            responseTime: 'quick',
            lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
          },
          achievements: [
            { id: 'first-trip', name: 'First Trip', earned: true, earnedAt: '2024-01-20' },
            { id: 'fashion-expert', name: 'Fashion Expert', earned: true, earnedAt: '2024-02-28' },
            { id: 'style-guide', name: 'Style Guide', earned: true, earnedAt: '2024-04-15' },
            { id: 'super-reliable', name: 'Super Reliable', earned: true, earnedAt: '2024-06-01' }
          ],
          settings: {
            notifications: {
              tripInvites: true,
              buddyRequests: true,
              storeUpdates: true,
              promotions: true
            },
            privacy: {
              profileVisibility: 'public',
              locationSharing: 'buddies-only',
              contactInfo: 'hidden'
            }
          },
          createdAt: '2024-01-20T00:00:00.000Z',
          lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          status: 'active'
        },
        {
          id: 5,
          personalInfo: {
            name: 'David Brown',
            email: 'david@example.com',
            phone: '+91-9876543213',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            dateOfBirth: '1988-11-30',
            gender: 'male'
          },
          location: {
            city: 'Coimbatore',
            area: 'Peelamedu',
            pincode: '641004',
            coordinates: { lat: 11.0315, lng: 77.0288 },
            radius: 18
          },
          role: 'admin',
          isMasterAdmin: false,
          adminPermissions: ['manage_users', 'manage_stores', 'view_analytics'],
          preferences: {
            shoppingCategories: ['electronics', 'books', 'grocery'],
            budgetRange: { min: 1000, max: 50000 },
            preferredDays: ['weekday-evening', 'saturday'],
            preferredTime: 'evening',
            languages: ['English', 'Tamil'],
            communicationStyle: 'professional',
            groupSize: 'medium'
          },
          socialProfile: {
            bio: 'Platform administrator and tech professional. Helping maintain the quality and safety of our shopping community.',
            interests: ['technology', 'administration', 'community management'],
            isPublic: true,
            shareLocation: false,
            allowMessages: true
          },
          statistics: {
            tripsOrganized: 5,
            tripsJoined: 10,
            totalTrips: 15,
            buddyRating: 4.7,
            reliability: 90,
            responseTime: 'quick',
            lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          },
          achievements: [
            { id: 'first-trip', name: 'First Trip', earned: true, earnedAt: '2024-03-01' },
            { id: 'trusted-admin', name: 'Trusted Admin', earned: true, earnedAt: '2024-03-01' }
          ],
          settings: {
            notifications: {
              tripInvites: true,
              buddyRequests: true,
              storeUpdates: true,
              promotions: false,
              adminAlerts: true
            },
            privacy: {
              profileVisibility: 'public',
              locationSharing: 'hidden',
              contactInfo: 'admin-only'
            }
          },
          createdAt: '2024-03-01T00:00:00.000Z',
          lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          status: 'active'
        }
      ]
      
      this.profiles = seedProfiles
      this.saveProfiles()
      console.log('Initialized comprehensive user profile seed data')
    }
  }

  // Get user profile by ID
  getUserProfile(userId) {
    return this.profiles.find(profile => profile.id === userId)
  }

  // Get user profile by email
  getUserProfileByEmail(email) {
    return this.profiles.find(profile => profile.personalInfo.email === email)
  }

  // Get all user profiles
  getAllProfiles() {
    return this.profiles
  }

  // Update user profile
  updateUserProfile(userId, updates) {
    const profileIndex = this.profiles.findIndex(profile => profile.id === userId)
    if (profileIndex !== -1) {
      this.profiles[profileIndex] = {
        ...this.profiles[profileIndex],
        ...updates,
        lastUpdated: new Date().toISOString()
      }
      this.saveProfiles()
      return this.profiles[profileIndex]
    }
    return null
  }

  // Update user preferences
  updatePreferences(userId, preferences) {
    const profile = this.getUserProfile(userId)
    if (profile) {
      profile.preferences = { ...profile.preferences, ...preferences }
      profile.lastUpdated = new Date().toISOString()
      this.saveProfiles()
      return profile
    }
    return null
  }

  // Update social profile
  updateSocialProfile(userId, socialData) {
    const profile = this.getUserProfile(userId)
    if (profile) {
      profile.socialProfile = { ...profile.socialProfile, ...socialData }
      profile.lastUpdated = new Date().toISOString()
      this.saveProfiles()
      return profile
    }
    return null
  }

  // Update user settings
  updateSettings(userId, settings) {
    const profile = this.getUserProfile(userId)
    if (profile) {
      profile.settings = { ...profile.settings, ...settings }
      profile.lastUpdated = new Date().toISOString()
      this.saveProfiles()
      return profile
    }
    return null
  }

  // Award achievement to user
  awardAchievement(userId, achievementId, achievementName) {
    const profile = this.getUserProfile(userId)
    if (profile) {
      const existingAchievement = profile.achievements.find(a => a.id === achievementId)
      if (!existingAchievement) {
        profile.achievements.push({
          id: achievementId,
          name: achievementName,
          earned: true,
          earnedAt: new Date().toISOString()
        })
        profile.lastUpdated = new Date().toISOString()
        this.saveProfiles()
        return true
      }
    }
    return false
  }

  // Update user statistics
  updateStatistics(userId, statUpdates) {
    const profile = this.getUserProfile(userId)
    if (profile) {
      profile.statistics = { ...profile.statistics, ...statUpdates }
      profile.lastActive = new Date().toISOString()
      profile.lastUpdated = new Date().toISOString()
      this.saveProfiles()
      return profile
    }
    return null
  }

  // Search profiles by criteria
  searchProfiles(criteria) {
    return this.profiles.filter(profile => {
      let matches = true
      
      if (criteria.location && criteria.radius) {
        const distance = this.calculateDistance(
          criteria.location.lat, criteria.location.lng,
          profile.location.coordinates.lat, profile.location.coordinates.lng
        )
        matches = matches && distance <= criteria.radius
      }
      
      if (criteria.shoppingCategories) {
        const hasCommonCategory = criteria.shoppingCategories.some(cat => 
          profile.preferences.shoppingCategories.includes(cat)
        )
        matches = matches && hasCommonCategory
      }
      
      if (criteria.budgetRange) {
        const budgetOverlap = !(
          criteria.budgetRange.max < profile.preferences.budgetRange.min ||
          criteria.budgetRange.min > profile.preferences.budgetRange.max
        )
        matches = matches && budgetOverlap
      }
      
      if (criteria.minRating) {
        matches = matches && profile.statistics.buddyRating >= criteria.minRating
      }
      
      return matches
    })
  }

  // Calculate distance between two coordinates
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371 // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Get user compatibility score
  getCompatibilityScore(userId1, userId2) {
    const profile1 = this.getUserProfile(userId1)
    const profile2 = this.getUserProfile(userId2)
    
    if (!profile1 || !profile2) return 0
    
    let score = 0
    let factors = 0
    
    // Location proximity (max 25 points)
    const distance = this.calculateDistance(
      profile1.location.coordinates.lat, profile1.location.coordinates.lng,
      profile2.location.coordinates.lat, profile2.location.coordinates.lng
    )
    if (distance <= 5) score += 25
    else if (distance <= 10) score += 20
    else if (distance <= 20) score += 15
    else if (distance <= 30) score += 10
    factors += 25
    
    // Shopping category overlap (max 30 points)
    const commonCategories = profile1.preferences.shoppingCategories.filter(cat =>
      profile2.preferences.shoppingCategories.includes(cat)
    )
    score += Math.min(30, commonCategories.length * 10)
    factors += 30
    
    // Budget compatibility (max 20 points)
    const budgetOverlap = !(
      profile1.preferences.budgetRange.max < profile2.preferences.budgetRange.min ||
      profile1.preferences.budgetRange.min > profile2.preferences.budgetRange.max
    )
    if (budgetOverlap) score += 20
    factors += 20
    
    // Language compatibility (max 15 points)
    const commonLanguages = profile1.preferences.languages.filter(lang =>
      profile2.preferences.languages.includes(lang)
    )
    score += Math.min(15, commonLanguages.length * 5)
    factors += 15
    
    // Communication style compatibility (max 10 points)
    if (profile1.preferences.communicationStyle === profile2.preferences.communicationStyle) {
      score += 10
    }
    factors += 10
    
    return Math.round((score / factors) * 100)
  }

  // Clear all profiles (for testing)
  clearAllProfiles() {
    this.profiles = []
    this.saveProfiles()
  }
}

// Export singleton instance
const userProfileStorage = new UserProfileStorage()
export default userProfileStorage
