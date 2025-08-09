// Seed/Demo data for populating the UI when there's insufficient real data
// This ensures the app never looks empty and users can see examples

export const seedTrips = [
  {
    id: 'demo-1',
    title: '🏮 Festival Shopping at Gandhipuram',
    description: 'Join me for traditional shopping ahead of Diwali! We\'ll explore local markets for authentic decorations, sweets, and gifts. Perfect for experiencing authentic Coimbatore shopping culture.',
    organizer: {
      id: 'demo-organizer-1',
      name: 'Meera Lakshmi',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      completedTrips: 12
    },
    participants: [
      { 
        id: 'demo-participant-1', 
        name: 'Ravi Kumar', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' 
      },
      { 
        id: 'demo-participant-2', 
        name: 'Ananya Singh', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' 
      }
    ],
    maxParticipants: 6,
    stores: ['Gandhipuram Market', 'RS Puram Shops', 'Town Hall Market'],
    scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    estimatedDuration: 3,
    meetingPoint: 'Gandhipuram Bus Stand - Platform 1',
    coordinates: { latitude: 11.0168, longitude: 76.9558 },
    status: 'open',
    category: 'traditional',
    budget: { min: 2000, max: 15000, currency: 'INR' },
    languages: ['Tamil', 'English'],
    notes: 'Traditional markets with authentic local products. Great for gifts and home decoration. We\'ll bargain together for better prices!',
    features: ['Local Culture', 'Bargaining Tips', 'Authentic Products', 'Group Discounts'],
    difficulty: 'Beginner Friendly',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isDemoData: true
  },
  {
    id: 'demo-2',
    title: '💻 Tech Gadgets Hunt - Best Deals',
    description: 'Technology shopping expedition across Coimbatore\'s best electronics stores. Compare prices, test products, and get expert advice on latest smartphones, laptops, and accessories.',
    organizer: {
      id: 'demo-organizer-2',
      name: 'Karthik Subramanian',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      completedTrips: 18
    },
    participants: [
      { 
        id: 'demo-participant-3', 
        name: 'Priya Nair', 
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' 
      }
    ],
    maxParticipants: 4,
    stores: ['Reliance Digital', 'Croma', 'Vijay Sales'],
    scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    estimatedDuration: 4,
    meetingPoint: 'Brookefields Mall - Main Entrance',
    coordinates: { latitude: 11.0696, longitude: 77.0428 },
    status: 'open',
    category: 'electronics',
    budget: { min: 15000, max: 80000, currency: 'INR' },
    languages: ['Tamil', 'English', 'Hindi'],
    notes: 'Will visit 3 major electronics stores. Can negotiate group discounts. Perfect for students and professionals looking for tech upgrades.',
    features: ['Price Comparison', 'Expert Guidance', 'Group Discounts', 'Product Testing'],
    difficulty: 'Intermediate',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isDemoData: true
  },
  {
    id: 'demo-3',
    title: '👗 Fashion & Style Discovery',
    description: 'Explore the best fashion outlets and boutiques in Coimbatore. From traditional wear to modern fashion, we\'ll discover great styles and deals together.',
    organizer: {
      id: 'demo-organizer-3',
      name: 'Kavya Ramesh',
      profilePicture: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      completedTrips: 14
    },
    participants: [
      { 
        id: 'demo-participant-4', 
        name: 'Aishwarya Pillai', 
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' 
      },
      { 
        id: 'demo-participant-5', 
        name: 'Sneha Krishnan', 
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' 
      },
      { 
        id: 'demo-participant-6', 
        name: 'Deepika Rao', 
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face' 
      }
    ],
    maxParticipants: 5,
    stores: ['Pothys', 'RMKV', 'Saravana Stores'],
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    estimatedDuration: 5,
    meetingPoint: 'RS Puram Junction - Near Pothys',
    coordinates: { latitude: 11.0049, longitude: 76.9581 },
    status: 'open',
    category: 'clothing',
    budget: { min: 3000, max: 25000, currency: 'INR' },
    languages: ['Tamil', 'English'],
    notes: 'Perfect for traditional and modern clothing shopping. We\'ll explore both premium stores and local boutiques for the best variety.',
    features: ['Traditional Wear', 'Modern Fashion', 'Personal Styling', 'Best Deals'],
    difficulty: 'Beginner Friendly',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isDemoData: true
  },
  {
    id: 'demo-4',
    title: '🏠 Home Decor & Furniture Hunt',
    description: 'Transform your home with the best furniture and decor finds in Coimbatore. From budget-friendly options to premium pieces, we\'ll explore it all.',
    organizer: {
      id: 'demo-organizer-4',
      name: 'Raj Mohan',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      completedTrips: 9
    },
    participants: [],
    maxParticipants: 3,
    stores: ['Home Centre', 'Lifestyle', 'Local Furniture Markets'],
    scheduledDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    estimatedDuration: 6,
    meetingPoint: 'Fun Republic Mall - Entrance',
    coordinates: { latitude: 11.0510, longitude: 76.9934 },
    status: 'open',
    category: 'home-decor',
    budget: { min: 5000, max: 50000, currency: 'INR' },
    languages: ['Tamil', 'English'],
    notes: 'Great for new home setups or renovation projects. We\'ll check both branded stores and local markets for best prices.',
    features: ['Quality Check', 'Price Negotiation', 'Design Ideas', 'Transport Help'],
    difficulty: 'Intermediate',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isDemoData: true
  },
  {
    id: 'demo-5',
    title: '🛍️ Weekend Mall Marathon',
    description: 'Complete shopping experience across Coimbatore\'s top malls. Food, shopping, entertainment - everything in one trip. Perfect for families and groups.',
    organizer: {
      id: 'demo-organizer-5',
      name: 'Santhosh Kumar',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 4.5,
      completedTrips: 7
    },
    participants: [
      { 
        id: 'demo-participant-7', 
        name: 'Lakshmi Devi', 
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face' 
      },
      { 
        id: 'demo-participant-8', 
        name: 'Vinod Krishnan', 
        avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' 
      }
    ],
    maxParticipants: 8,
    stores: ['Brookefields Mall', 'Fun Republic', 'Phoenix MarketCity'],
    scheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    estimatedDuration: 8,
    meetingPoint: 'Brookefields Mall - Central Court',
    coordinates: { latitude: 11.0696, longitude: 77.0428 },
    status: 'open',
    category: 'malls',
    budget: { min: 3000, max: 20000, currency: 'INR' },
    languages: ['Tamil', 'English', 'Hindi'],
    notes: 'Full day mall experience with shopping, food, and entertainment. Great for families and large groups. Lunch and movie plans included.',
    features: ['Multiple Stores', 'Food Courts', 'Entertainment', 'Family Friendly'],
    difficulty: 'Beginner Friendly',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    isDemoData: true
  }
]

// Function to get seed trips based on category and status filters
export const getSeedTrips = (filters = {}) => {
  let filteredTrips = [...seedTrips]
  
  if (filters.category && filters.category !== 'all') {
    filteredTrips = filteredTrips.filter(trip => trip.category === filters.category)
  }
  
  if (filters.status && filters.status !== 'all') {
    // For demo data, we'll show all as 'open' trips
    if (filters.status === 'completed' || filters.status === 'past') {
      return [] // No completed demo trips
    }
  }
  
  return filteredTrips
}

// Function to get user-specific seed trips (empty for demo purposes)
export const getUserSeedTrips = () => {
  return [] // Users don't have demo trips in their personal list
}

// Function to get live seed trips
export const getLiveSeedTrips = () => {
  return [] // No live demo trips to avoid confusion
}

// Function to get past seed trips
export const getPastSeedTrips = () => {
  return [] // No past demo trips
}

export default {
  getSeedTrips,
  getUserSeedTrips,
  getLiveSeedTrips,
  getPastSeedTrips,
  seedTrips
}
