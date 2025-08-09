// Enhanced Store System with reviews, bookmarks, and store owner features
// Provides a complete store ecosystem for the MVP

const ENHANCED_STORES_KEY = 'shopping_companion_enhanced_stores'
const STORE_REVIEWS_KEY = 'shopping_companion_store_reviews'
const STORE_BOOKMARKS_KEY = 'shopping_companion_store_bookmarks'
const STORE_SUBMISSIONS_KEY = 'shopping_companion_store_submissions'

class EnhancedStoreAPI {
  constructor() {
    this.stores = this.loadStores()
    this.reviews = this.loadReviews()
    this.bookmarks = this.loadBookmarks()
    this.submissions = this.loadSubmissions()
    this.initializeSeedData()
  }

  // Load data from localStorage
  loadStores() {
    try {
      const stored = localStorage.getItem(ENHANCED_STORES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading enhanced stores:', error)
      return []
    }
  }

  loadReviews() {
    try {
      const stored = localStorage.getItem(STORE_REVIEWS_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading store reviews:', error)
      return {}
    }
  }

  loadBookmarks() {
    try {
      const stored = localStorage.getItem(STORE_BOOKMARKS_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading store bookmarks:', error)
      return {}
    }
  }

  loadSubmissions() {
    try {
      const stored = localStorage.getItem(STORE_SUBMISSIONS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading store submissions:', error)
      return []
    }
  }

  // Save data to localStorage
  saveStores() {
    try {
      localStorage.setItem(ENHANCED_STORES_KEY, JSON.stringify(this.stores))
    } catch (error) {
      console.error('Error saving enhanced stores:', error)
    }
  }

  saveReviews() {
    try {
      localStorage.setItem(STORE_REVIEWS_KEY, JSON.stringify(this.reviews))
    } catch (error) {
      console.error('Error saving store reviews:', error)
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem(STORE_BOOKMARKS_KEY, JSON.stringify(this.bookmarks))
    } catch (error) {
      console.error('Error saving store bookmarks:', error)
    }
  }

  saveSubmissions() {
    try {
      localStorage.setItem(STORE_SUBMISSIONS_KEY, JSON.stringify(this.submissions))
    } catch (error) {
      console.error('Error saving store submissions:', error)
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

  // Initialize with comprehensive seed data
  initializeSeedData() {
    if (this.stores.length === 0) {
      const seedStores = [
        {
          id: 'store-1',
          name: 'Phoenix MarketCity Coimbatore',
          description: 'One of South India\'s largest shopping malls featuring over 200 brands, food court, entertainment, and parking for 2000+ vehicles.',
          category: 'mall',
          subCategories: ['fashion', 'electronics', 'food', 'entertainment'],
          location: {
            address: 'Phoenix MarketCity, 142, Avinashi Road, Goldwins, Gandhipuram, Coimbatore, Tamil Nadu 641012',
            city: 'Coimbatore',
            area: 'Gandhipuram',
            coordinates: { lat: 11.0168, lng: 76.9558 },
            landmarks: ['Near Gandhipuram Bus Stand', 'Opposite to Brookefields Mall']
          },
          contact: {
            phone: '+91-422-671-4000',
            email: 'info@phoenixmarketcity.com',
            website: 'https://www.phoenixmarketcity.com'
          },
          timings: {
            monday: { open: '10:00', close: '22:00' },
            tuesday: { open: '10:00', close: '22:00' },
            wednesday: { open: '10:00', close: '22:00' },
            thursday: { open: '10:00', close: '22:00' },
            friday: { open: '10:00', close: '22:00' },
            saturday: { open: '10:00', close: '22:00' },
            sunday: { open: '10:00', close: '22:00' }
          },
          features: [
            'Food Court with 30+ restaurants',
            'Multiplex Cinema (PVR)',
            'Kids Play Area',
            'Brand Stores (H&M, Zara, Lifestyle)',
            'Electronics Zone',
            'Free WiFi',
            'ATM Services',
            'Valet Parking'
          ],
          priceRange: 'medium-to-high',
          rating: 4.5,
          reviewCount: 1247,
          images: [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1555529902-5d80615bb060?w=800&h=600&fit=crop'
          ],
          verified: true,
          owner: {
            type: 'corporate',
            name: 'Phoenix Mills Limited',
            verified: true
          },
          amenities: ['parking', 'wifi', 'restrooms', 'food-court', 'atm', 'wheelchair-accessible'],
          tags: ['mall', 'shopping', 'brands', 'food', 'entertainment', 'family-friendly'],
          createdAt: '2023-01-15T10:00:00.000Z',
          updatedAt: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'store-2',
          name: 'Reliance Digital Sarvanampatti',
          description: 'India\'s largest electronics retail chain offering laptops, smartphones, home appliances, and tech accessories with expert guidance.',
          category: 'electronics',
          subCategories: ['smartphones', 'laptops', 'appliances', 'accessories'],
          location: {
            address: 'Reliance Digital, Ground Floor, Sree Kumaran Thangavel Tower, Sarvanampatti, Coimbatore, Tamil Nadu 641035',
            city: 'Coimbatore',
            area: 'Sarvanampatti',
            coordinates: { lat: 11.0711, lng: 77.0056 },
            landmarks: ['Near PSG College', 'Opposite to KFC']
          },
          contact: {
            phone: '+91-422-711-9999',
            email: 'sarvanampatti@reliancedigital.in',
            website: 'https://www.reliancedigital.in'
          },
          timings: {
            monday: { open: '10:00', close: '21:30' },
            tuesday: { open: '10:00', close: '21:30' },
            wednesday: { open: '10:00', close: '21:30' },
            thursday: { open: '10:00', close: '21:30' },
            friday: { open: '10:00', close: '21:30' },
            saturday: { open: '10:00', close: '21:30' },
            sunday: { open: '10:00', close: '21:30' }
          },
          features: [
            'Expert Product Guidance',
            'Extended Warranty Options',
            'EMI Facilities',
            'Home Delivery',
            'Installation Services',
            'Trade-in Programs',
            'Corporate Sales',
            'Bulk Orders'
          ],
          priceRange: 'medium',
          rating: 4.3,
          reviewCount: 892,
          images: [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
          ],
          verified: true,
          owner: {
            type: 'corporate',
            name: 'Reliance Retail Limited',
            verified: true
          },
          amenities: ['parking', 'wifi', 'demo-units', 'expert-support'],
          tags: ['electronics', 'gadgets', 'appliances', 'tech', 'brands'],
          specialOffers: [
            'Student Discounts up to 10%',
            'Exchange Offers',
            'Festival Season Sales',
            'Bulk Purchase Discounts'
          ],
          createdAt: '2023-02-10T10:00:00.000Z',
          updatedAt: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'store-3',
          name: 'Saravana Stores R.S. Puram',
          description: 'Traditional South Indian clothing and lifestyle store famous for silk sarees, ethnic wear, and wedding collections at affordable prices.',
          category: 'traditional',
          subCategories: ['sarees', 'ethnic-wear', 'jewellery', 'home-decor'],
          location: {
            address: '1234, Trichy Road, R.S. Puram, Coimbatore, Tamil Nadu 641002',
            city: 'Coimbatore',
            area: 'R.S. Puram',
            coordinates: { lat: 11.0056, lng: 76.9661 },
            landmarks: ['Near Brookefields Mall', 'Close to R.S. Puram Bus Stop']
          },
          contact: {
            phone: '+91-422-250-0123',
            email: 'rspuram@saravanastores.com',
            website: 'https://www.saravanastores.com'
          },
          timings: {
            monday: { open: '09:30', close: '21:00' },
            tuesday: { open: '09:30', close: '21:00' },
            wednesday: { open: '09:30', close: '21:00' },
            thursday: { open: '09:30', close: '21:00' },
            friday: { open: '09:30', close: '21:00' },
            saturday: { open: '09:30', close: '21:00' },
            sunday: { open: '09:30', close: '21:00' }
          },
          features: [
            'Silk Saree Collection',
            'Wedding Trousseau',
            'Custom Tailoring',
            'Gold Jewellery',
            'Home Decor Items',
            'Gift Packaging',
            'Festival Collections',
            'Bulk Orders for Events'
          ],
          priceRange: 'budget-to-medium',
          rating: 4.6,
          reviewCount: 2156,
          images: [
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=800&h=600&fit=crop'
          ],
          verified: true,
          owner: {
            type: 'family-business',
            name: 'Saravana Stores Pvt Ltd',
            verified: true
          },
          amenities: ['parking', 'trial-rooms', 'alteration-services', 'gift-wrapping'],
          tags: ['traditional', 'sarees', 'ethnic', 'wedding', 'silk', 'affordable'],
          specialOffers: [
            'Wedding Season Discounts',
            'Festival Special Collections',
            'Bulk Order Discounts',
            'Student Pricing'
          ],
          createdAt: '2023-01-20T10:00:00.000Z',
          updatedAt: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'store-4',
          name: 'Brookefields Mall',
          description: 'Premium shopping destination with international and Indian brands, fine dining, and entertainment options in a modern setting.',
          category: 'mall',
          subCategories: ['fashion', 'dining', 'entertainment', 'luxury'],
          location: {
            address: '279/280, Brookefields, Kuniyamuthur, Coimbatore, Tamil Nadu 641008',
            city: 'Coimbatore',
            area: 'Brookefields',
            coordinates: { lat: 11.0510, lng: 76.9760 },
            landmarks: ['Near Codissia Trade Fair Complex', 'Close to Kuniyamuthur']
          },
          contact: {
            phone: '+91-422-661-8000',
            email: 'info@brookefieldsmall.com',
            website: 'https://www.brookefieldsmall.com'
          },
          timings: {
            monday: { open: '10:00', close: '22:00' },
            tuesday: { open: '10:00', close: '22:00' },
            wednesday: { open: '10:00', close: '22:00' },
            thursday: { open: '10:00', close: '22:00' },
            friday: { open: '10:00', close: '22:00' },
            saturday: { open: '10:00', close: '22:00' },
            sunday: { open: '10:00', close: '22:00' }
          },
          features: [
            'Premium Brand Stores',
            'Fine Dining Restaurants',
            'INOX Multiplex',
            'Gaming Zone',
            'Kids Entertainment',
            'Luxury Shopping',
            'Art Galleries',
            'Event Spaces'
          ],
          priceRange: 'high',
          rating: 4.4,
          reviewCount: 1567,
          images: [
            'https://images.unsplash.com/photo-1555529902-5d80615bb060?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=600&fit=crop'
          ],
          verified: true,
          owner: {
            type: 'corporate',
            name: 'Brookefields Mall Pvt Ltd',
            verified: true
          },
          amenities: ['valet-parking', 'wifi', 'concierge', 'luxury-restrooms', 'charging-stations'],
          tags: ['premium', 'luxury', 'dining', 'entertainment', 'brands', 'family'],
          specialOffers: [
            'VIP Shopping Experience',
            'Loyalty Programs',
            'Seasonal Sales',
            'Corporate Discounts'
          ],
          createdAt: '2023-01-25T10:00:00.000Z',
          updatedAt: new Date().toISOString(),
          status: 'active'
        },
        {
          id: 'store-5',
          name: 'Fresh Market Gandhipuram',
          description: 'Local fresh produce market offering vegetables, fruits, spices, and daily essentials at wholesale and retail prices.',
          category: 'grocery',
          subCategories: ['vegetables', 'fruits', 'spices', 'daily-essentials'],
          location: {
            address: 'Fresh Market Complex, Gandhipuram Main Road, Coimbatore, Tamil Nadu 641012',
            city: 'Coimbatore',
            area: 'Gandhipuram',
            coordinates: { lat: 11.0174, lng: 76.9561 },
            landmarks: ['Near Railway Station', 'Close to Bus Stand']
          },
          contact: {
            phone: '+91-422-234-5678',
            email: 'info@freshmarketcbe.com',
            website: null
          },
          timings: {
            monday: { open: '06:00', close: '20:00' },
            tuesday: { open: '06:00', close: '20:00' },
            wednesday: { open: '06:00', close: '20:00' },
            thursday: { open: '06:00', close: '20:00' },
            friday: { open: '06:00', close: '20:00' },
            saturday: { open: '06:00', close: '20:00' },
            sunday: { open: '06:00', close: '18:00' }
          },
          features: [
            'Fresh Daily Produce',
            'Wholesale Prices',
            'Organic Section',
            'Local Vendors',
            'Bulk Purchasing',
            'Home Delivery',
            'Quality Guarantee',
            'Seasonal Specialties'
          ],
          priceRange: 'budget',
          rating: 4.2,
          reviewCount: 456,
          images: [
            'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800&h=600&fit=crop'
          ],
          verified: false,
          owner: {
            type: 'local-business',
            name: 'Gandhipuram Market Association',
            verified: false
          },
          amenities: ['parking', 'fresh-produce', 'bulk-buying', 'local-vendors'],
          tags: ['fresh', 'local', 'budget', 'wholesale', 'vegetables', 'fruits'],
          specialOffers: [
            'Early Morning Discounts',
            'Bulk Purchase Rates',
            'Seasonal Fruit Offers',
            'Organic Produce Deals'
          ],
          createdAt: '2023-03-01T10:00:00.000Z',
          updatedAt: new Date().toISOString(),
          status: 'active'
        }
      ]

      this.stores = seedStores
      this.saveStores()

      // Initialize reviews for some stores
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const now = new Date()

      this.reviews['store-1'] = [
        {
          id: 'review-1',
          userId: 2,
          userName: 'Priya Sharma',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          rating: 5,
          title: 'Amazing shopping experience!',
          review: 'Phoenix Mall has everything you need under one roof. Great brands, excellent food court, and the movie theater is top-notch. Highly recommended for families!',
          visitDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 12,
          verified: true,
          images: []
        },
        {
          id: 'review-2',
          userId: 3,
          userName: 'Rahul Kumar',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          rating: 4,
          title: 'Good but crowded on weekends',
          review: 'Great selection of stores and brands. Food court is excellent. However, it gets very crowded on weekends, especially the parking area.',
          visitDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 8,
          verified: true,
          images: []
        }
      ]

      this.reviews['store-2'] = [
        {
          id: 'review-3',
          userId: 5,
          userName: 'Arjun Singh',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          rating: 4,
          title: 'Great electronics selection',
          review: 'Bought my laptop here. Staff was knowledgeable and helped me choose the right specs. Competitive prices and good after-sales service.',
          visitDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          timestamp: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 6,
          verified: true,
          images: []
        }
      ]

      this.reviews['store-3'] = [
        {
          id: 'review-4',
          userId: 4,
          userName: 'Sneha Patel',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          rating: 5,
          title: 'Best place for traditional wear',
          review: 'Incredible collection of silk sarees! Got my wedding trousseau here. The quality is excellent and prices are very reasonable. Staff is very helpful.',
          visitDate: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString(),
          timestamp: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 15,
          verified: true,
          images: []
        }
      ]

      this.saveReviews()

      // Initialize bookmarks for current user
      if (currentUser.id) {
        this.bookmarks[currentUser.id] = ['store-1', 'store-3']
        this.saveBookmarks()
      }
    }
  }

  // API Methods

  // Get all stores with filters
  async getAllStores(filters = {}) {
    try {
      let filteredStores = [...this.stores]

      // Apply filters
      if (filters.category && filters.category !== 'all') {
        filteredStores = filteredStores.filter(store => store.category === filters.category)
      }

      if (filters.location) {
        const searchTerm = filters.location.toLowerCase()
        filteredStores = filteredStores.filter(store => 
          store.location.city.toLowerCase().includes(searchTerm) ||
          store.location.area.toLowerCase().includes(searchTerm)
        )
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredStores = filteredStores.filter(store =>
          store.name.toLowerCase().includes(searchTerm) ||
          store.description.toLowerCase().includes(searchTerm) ||
          store.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      }

      if (filters.priceRange) {
        filteredStores = filteredStores.filter(store => store.priceRange === filters.priceRange)
      }

      if (filters.verified !== undefined) {
        filteredStores = filteredStores.filter(store => store.verified === filters.verified)
      }

      // Sort by rating by default
      filteredStores.sort((a, b) => b.rating - a.rating)

      return {
        success: true,
        data: filteredStores,
        total: filteredStores.length
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get store by ID
  async getStoreById(storeId) {
    try {
      const store = this.stores.find(s => s.id === storeId)
      if (!store) {
        return {
          success: false,
          error: 'Store not found'
        }
      }

      // Add reviews and review stats
      const storeReviews = this.reviews[storeId] || []
      const storeWithReviews = {
        ...store,
        reviews: storeReviews,
        reviewStats: this.calculateReviewStats(storeReviews)
      }

      return {
        success: true,
        data: storeWithReviews
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Calculate review statistics
  calculateReviewStats(reviews) {
    if (reviews.length === 0) {
      return {
        average: 0,
        total: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    let totalRating = 0

    reviews.forEach(review => {
      distribution[review.rating]++
      totalRating += review.rating
    })

    return {
      average: parseFloat((totalRating / reviews.length).toFixed(1)),
      total: reviews.length,
      distribution
    }
  }

  // Add review
  async addReview(storeId, userId, reviewData) {
    try {
      const store = this.stores.find(s => s.id === storeId)
      if (!store) {
        return {
          success: false,
          error: 'Store not found'
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

      // Check if user already reviewed this store
      const existingReviews = this.reviews[storeId] || []
      if (existingReviews.some(review => review.userId === userId)) {
        return {
          success: false,
          error: 'You have already reviewed this store'
        }
      }

      const newReview = {
        id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        userName: user.personalInfo.name,
        userAvatar: user.personalInfo.avatar,
        rating: reviewData.rating,
        title: reviewData.title,
        review: reviewData.review,
        visitDate: reviewData.visitDate || new Date().toISOString(),
        timestamp: new Date().toISOString(),
        helpful: 0,
        verified: user.verified || false,
        images: reviewData.images || []
      }

      if (!this.reviews[storeId]) {
        this.reviews[storeId] = []
      }

      this.reviews[storeId].push(newReview)
      
      // Update store rating
      const storeIndex = this.stores.findIndex(s => s.id === storeId)
      if (storeIndex !== -1) {
        const reviewStats = this.calculateReviewStats(this.reviews[storeId])
        this.stores[storeIndex].rating = reviewStats.average
        this.stores[storeIndex].reviewCount = reviewStats.total
      }

      this.saveReviews()
      this.saveStores()

      return {
        success: true,
        data: newReview
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Toggle bookmark
  async toggleBookmark(storeId, userId) {
    try {
      const store = this.stores.find(s => s.id === storeId)
      if (!store) {
        return {
          success: false,
          error: 'Store not found'
        }
      }

      if (!this.bookmarks[userId]) {
        this.bookmarks[userId] = []
      }

      const isBookmarked = this.bookmarks[userId].includes(storeId)
      
      if (isBookmarked) {
        this.bookmarks[userId] = this.bookmarks[userId].filter(id => id !== storeId)
      } else {
        this.bookmarks[userId].push(storeId)
      }

      this.saveBookmarks()

      return {
        success: true,
        data: { 
          isBookmarked: !isBookmarked,
          message: isBookmarked ? 'Store removed from bookmarks' : 'Store bookmarked'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get user bookmarks
  async getUserBookmarks(userId) {
    try {
      const bookmarkedStoreIds = this.bookmarks[userId] || []
      const bookmarkedStores = this.stores.filter(store => 
        bookmarkedStoreIds.includes(store.id)
      )

      return {
        success: true,
        data: bookmarkedStores
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Submit new store
  async submitStore(storeData, userId) {
    try {
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

      const newSubmission = {
        id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...storeData,
        submittedBy: {
          id: userId,
          name: user.personalInfo.name,
          email: user.personalInfo.email
        },
        status: 'pending',
        submittedAt: new Date().toISOString(),
        reviewedAt: null,
        reviewedBy: null
      }

      this.submissions.push(newSubmission)
      this.saveSubmissions()

      return {
        success: true,
        data: newSubmission,
        message: 'Store submitted for review'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get store submissions (for admin)
  async getStoreSubmissions() {
    try {
      return {
        success: true,
        data: this.submissions
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Approve store submission (for admin)
  async approveStoreSubmission(submissionId, adminId) {
    try {
      const submissionIndex = this.submissions.findIndex(s => s.id === submissionId)
      if (submissionIndex === -1) {
        return {
          success: false,
          error: 'Submission not found'
        }
      }

      const submission = this.submissions[submissionIndex]
      
      // Create new store from submission
      const newStore = {
        id: `store-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...submission,
        rating: 0,
        reviewCount: 0,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active'
      }

      // Remove submission fields
      delete newStore.submittedBy
      delete newStore.submittedAt
      delete newStore.reviewedAt
      delete newStore.reviewedBy

      this.stores.push(newStore)
      
      // Update submission status
      this.submissions[submissionIndex].status = 'approved'
      this.submissions[submissionIndex].reviewedAt = new Date().toISOString()
      this.submissions[submissionIndex].reviewedBy = adminId

      this.saveStores()
      this.saveSubmissions()

      return {
        success: true,
        data: newStore,
        message: 'Store submission approved'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Reject store submission (for admin)
  async rejectStoreSubmission(submissionId, adminId, reason) {
    try {
      const submissionIndex = this.submissions.findIndex(s => s.id === submissionId)
      if (submissionIndex === -1) {
        return {
          success: false,
          error: 'Submission not found'
        }
      }

      // Update submission status
      this.submissions[submissionIndex].status = 'rejected'
      this.submissions[submissionIndex].reviewedAt = new Date().toISOString()
      this.submissions[submissionIndex].reviewedBy = adminId
      this.submissions[submissionIndex].rejectionReason = reason

      this.saveSubmissions()

      return {
        success: true,
        message: 'Store submission rejected'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Search stores
  async searchStores(query, filters = {}) {
    try {
      const searchTerm = query.toLowerCase()
      let results = this.stores.filter(store =>
        store.name.toLowerCase().includes(searchTerm) ||
        store.description.toLowerCase().includes(searchTerm) ||
        store.location.area.toLowerCase().includes(searchTerm) ||
        store.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        store.subCategories.some(cat => cat.toLowerCase().includes(searchTerm))
      )

      // Apply additional filters
      if (filters.category && filters.category !== 'all') {
        results = results.filter(store => store.category === filters.category)
      }

      if (filters.priceRange) {
        results = results.filter(store => store.priceRange === filters.priceRange)
      }

      if (filters.verified !== undefined) {
        results = results.filter(store => store.verified === filters.verified)
      }

      // Sort by relevance (rating + review count)
      results.sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1)
        const scoreB = b.rating * Math.log(b.reviewCount + 1)
        return scoreB - scoreA
      })

      return {
        success: true,
        data: results,
        total: results.length,
        query: query
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get stores by category
  async getStoresByCategory(category) {
    try {
      const stores = this.stores.filter(store => store.category === category)
      
      // Sort by rating
      stores.sort((a, b) => b.rating - a.rating)

      return {
        success: true,
        data: stores,
        total: stores.length,
        category: category
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Check if store is bookmarked
  isStoreBookmarked(storeId, userId) {
    const userBookmarks = this.bookmarks[userId] || []
    return userBookmarks.includes(storeId)
  }
}

// Export singleton instance
const enhancedStoreAPI = new EnhancedStoreAPI()
export default enhancedStoreAPI
