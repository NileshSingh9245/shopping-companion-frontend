import {
  Box,
  Container,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Icon,
  useColorModeValue,
  Avatar,
  AvatarGroup,
  Progress,
  useToast
} from '@chakra-ui/react'
import { 
  FiUsers, 
  FiMapPin, 
  FiShoppingBag, 
  FiCalendar, 
  FiTrendingUp, 
  FiStar, 
  FiShield, 
  FiSettings, 
  FiBarChart,
  FiHeart,
  FiActivity,
  FiMessageCircle,
  FiBookmark
} from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useState, useEffect } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import StatCard from '../../components/Dashboard/StatCard'
import QuickActions from '../../components/Dashboard/QuickActions'
import RecentActivities from '../../components/Dashboard/RecentActivities'
import realEnhancedTripsAPI from '../../services/realEnhancedTripsAPI'
import buddySystemAPI from '../../services/buddySystemAPI'
import enhancedStoreAPI from '../../services/enhancedStoreAPI'

const Dashboard = () => {
  const { user, isAdmin } = useAuthStore()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const isUserAdmin = isAdmin()

  useEffect(() => {
    loadDashboardData()
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      if (isUserAdmin) {
        // Load admin dashboard data
        const tripsResult = await realEnhancedTripsAPI.getAllTrips()
        const storesResult = await enhancedStoreAPI.getAllStores()
        const buddiesResult = await buddySystemAPI.getAllBuddies(user.id)

        setDashboardData({
          totalTrips: tripsResult.data?.length || 0,
          totalStores: storesResult.data?.length || 0,
          totalBuddies: buddiesResult.data?.length || 0,
          recentTrips: tripsResult.data?.slice(0, 3) || [],
          recentActivity: []
        })
      } else {
        // Load user dashboard data
        const [userTripsResult, connectionsResult, bookmarksResult, buddyRequestsResult] = await Promise.all([
          realEnhancedTripsAPI.getUserTrips(user.id),
          buddySystemAPI.getUserConnections(user.id),
          enhancedStoreAPI.getUserBookmarks(user.id),
          buddySystemAPI.getBuddyRequests(user.id)
        ])

        setDashboardData({
          userTrips: userTripsResult.data || [],
          connections: connectionsResult.data || [],
          bookmarks: bookmarksResult.data || [],
          pendingRequests: buddyRequestsResult.data || [],
          upcomingTrips: userTripsResult.data?.filter(trip => 
            new Date(trip.scheduledDate) > new Date()
          ).slice(0, 3) || []
        })
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast({
        title: 'Error loading dashboard',
        description: 'Some data might be outdated. Please refresh the page.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  // Admin stats
  const adminStats = dashboardData ? [
    { 
      icon: FiUsers, 
      label: 'Total Users', 
      value: '1,247', 
      change: '+12%', 
      changeType: 'increase', 
      color: 'blue' 
    },
    { 
      icon: FiShoppingBag, 
      label: 'Total Stores', 
      value: dashboardData.totalStores?.toString() || '0', 
      change: '+3', 
      changeType: 'increase', 
      color: 'purple' 
    },
    { 
      icon: FiCalendar, 
      label: 'Active Trips', 
      value: dashboardData.totalTrips?.toString() || '0', 
      change: '+8', 
      changeType: 'increase', 
      color: 'green' 
    },
    { 
      icon: FiBarChart, 
      label: 'Platform Rating', 
      value: '4.7', 
      change: '+0.1', 
      changeType: 'increase', 
      color: 'orange' 
    }
  ] : []

  // User stats
  const userStats = dashboardData ? [
    { 
      icon: FiCalendar, 
      label: 'My Trips', 
      value: dashboardData.userTrips?.length?.toString() || '0', 
      change: '+2', 
      changeType: 'increase', 
      color: 'blue' 
    },
    { 
      icon: FiUsers, 
      label: 'Shopping Buddies', 
      value: dashboardData.connections?.length?.toString() || '0', 
      change: '+4', 
      changeType: 'increase', 
      color: 'purple' 
    },
    { 
      icon: FiBookmark, 
      label: 'Bookmarked Stores', 
      value: dashboardData.bookmarks?.length?.toString() || '0', 
      change: '+6', 
      changeType: 'increase', 
      color: 'green' 
    },
    { 
      icon: FiStar, 
      label: 'Buddy Rating', 
      value: '4.8', 
      change: '+0.2', 
      changeType: 'increase', 
      color: 'yellow' 
    }
  ] : []

  const stats = isUserAdmin ? adminStats : userStats

  const recentActivities = isUserAdmin ? [
    {
      title: 'New Trip Created',
      description: 'Electronics Shopping trip added to Phoenix Mall',
      time: '1 hour ago',
      type: 'admin'
    },
    {
      title: 'Store Submission',
      description: 'New grocery store submitted for review',
      time: '3 hours ago',
      type: 'admin'
    },
    {
      title: 'User Verification',
      description: 'Karthik Reddy profile verified successfully',
      time: '6 hours ago',
      type: 'admin'
    },
    {
      title: 'Platform Analytics Updated',
      description: 'Weekly analytics report has been generated',
      time: '1 day ago',
      type: 'admin'
    }
  ] : [
    {
      title: dashboardData?.pendingRequests?.length > 0 ? 'New buddy request' : 'Joined "Weekend Mall Shopping"',
      description: dashboardData?.pendingRequests?.length > 0 
        ? `${dashboardData.pendingRequests[0]?.fromUserName} wants to be your shopping buddy`
        : 'You joined a shopping trip to Phoenix Mall',
      time: '2 hours ago',
      type: 'buddy'
    },
    {
      title: 'Store bookmarked',
      description: 'You bookmarked Saravana Stores for future visits',
      time: '5 hours ago',
      type: 'bookmark'
    },
    {
      title: 'Trip completed',
      description: 'Electronics Shopping trip completed successfully',
      time: '1 day ago',
      type: 'trip'
    },
    {
      title: 'Review posted',
      description: 'You reviewed Phoenix Mall - great experience!',
      time: '3 days ago',
      type: 'review'
    }
  ]

  const quickActions = isUserAdmin ? [
    { 
      title: 'Manage Users', 
      description: 'View and manage user accounts and permissions',
      path: '/admin/users', 
      icon: FiUsers, 
      color: 'red' 
    },
    { 
      title: 'Manage Stores', 
      description: 'Add, edit, and verify store listings',
      path: '/admin/stores', 
      icon: FiShoppingBag, 
      color: 'blue' 
    },
    { 
      title: 'Platform Analytics', 
      description: 'View platform metrics and insights',
      path: '/admin/analytics', 
      icon: FiBarChart, 
      color: 'green' 
    },
    { 
      title: 'Admin Settings', 
      description: 'Configure platform settings and preferences',
      path: '/admin/settings', 
      icon: FiSettings, 
      color: 'purple' 
    }
  ] : [
    { 
      title: 'Create Trip', 
      description: 'Plan a new shopping trip with friends',
      path: '/trips/create', 
      icon: FiCalendar, 
      color: 'blue' 
    },
    { 
      title: 'Find Buddies', 
      description: 'Connect with local shopping companions',
      path: '/buddies', 
      icon: FiUsers, 
      color: 'green' 
    },
    { 
      title: 'Explore Stores', 
      description: 'Discover new stores and deals nearby',
      path: '/stores', 
      icon: FiShoppingBag, 
      color: 'purple' 
    },
    { 
      title: 'My Profile', 
      description: 'Update your preferences and settings',
      path: '/profile', 
      icon: FiStar, 
      color: 'orange' 
    }
  ]

  if (loading) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Text>Loading dashboard...</Text>
          </Box>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <DashboardHeader user={user} isAdmin={isUserAdmin} />

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </SimpleGrid>

        {/* Quick Actions */}
        <QuickActions 
          actions={quickActions}
          title={isUserAdmin ? 'Admin Quick Actions' : 'Quick Actions'}
          isAdmin={isUserAdmin}
        />

        {/* Recent Activities and Upcoming Trips */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <RecentActivities
            activities={recentActivities}
            title={isUserAdmin ? 'Platform Activities' : 'Recent Activities'}
            isAdmin={isUserAdmin}
            viewAllLink={isUserAdmin ? '/admin/activities' : '/activities'}
          />

          {/* Upcoming Trips or Admin Stats */}
          <Card bg={bgColor}>
            <CardBody>
              <HStack justify="space-between" mb={4}>
                <Heading size="md">
                  {isUserAdmin ? 'System Status' : 'Upcoming Trips'}
                </Heading>
                <Button 
                  as={RouterLink}
                  to={isUserAdmin ? "/admin/analytics" : "/trips"}
                  size="sm" 
                  variant="ghost" 
                  color="brand.500"
                >
                  View All
                </Button>
              </HStack>
              <VStack spacing={3} align="stretch">
                {isUserAdmin ? (
                  <>
                    <Card variant="outline" borderLeft="4px" borderLeftColor="green.500">
                      <CardBody py={3}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">System Health</Text>
                          <Text fontSize="sm" color="gray.600">
                            All services operational • 99.9% uptime
                          </Text>
                          <HStack>
                            <Badge colorScheme="green">Healthy</Badge>
                            <Badge colorScheme="blue">24/7 Monitoring</Badge>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card variant="outline" borderLeft="4px" borderLeftColor="blue.500">
                      <CardBody py={3}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">Database Status</Text>
                          <Text fontSize="sm" color="gray.600">
                            1,247 users • {dashboardData?.totalStores || 0} stores • {dashboardData?.totalTrips || 0} active trips
                          </Text>
                          <HStack>
                            <Badge colorScheme="blue">Connected</Badge>
                            <Badge colorScheme="purple">Optimized</Badge>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card variant="outline" borderLeft="4px" borderLeftColor="yellow.500">
                      <CardBody py={3}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">Pending Reviews</Text>
                          <Text fontSize="sm" color="gray.600">
                            3 store applications • 2 user reports
                          </Text>
                          <HStack>
                            <Badge colorScheme="yellow">Action Required</Badge>
                            <Badge colorScheme="gray">Priority: Medium</Badge>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </>
                ) : (
                  <>
                    {dashboardData?.upcomingTrips?.length > 0 ? (
                      dashboardData.upcomingTrips.map((trip, index) => (
                        <Card key={trip.id} variant="outline" borderLeft="4px" borderLeftColor="blue.500">
                          <CardBody py={3}>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="semibold" noOfLines={1}>{trip.title}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {trip.location?.area} • {new Date(trip.scheduledDate).toLocaleDateString()}
                              </Text>
                              <HStack>
                                <Badge colorScheme="blue">{trip.currentParticipants}/{trip.maxParticipants} members</Badge>
                                <Badge colorScheme={trip.status === 'open' ? 'green' : 'yellow'}>
                                  {trip.status}
                                </Badge>
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))
                    ) : (
                      <Card variant="outline" borderLeft="4px" borderLeftColor="gray.300">
                        <CardBody py={3}>
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="semibold">No Upcoming Trips</Text>
                            <Text fontSize="sm" color="gray.600">
                              Create or join a shopping trip to get started
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    )}

                    {dashboardData?.pendingRequests?.length > 0 && (
                      <Card variant="outline" borderLeft="4px" borderLeftColor="purple.500">
                        <CardBody py={3}>
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="semibold">Buddy Requests</Text>
                            <Text fontSize="sm" color="gray.600">
                              {dashboardData.pendingRequests.length} pending request(s)
                            </Text>
                            <Button
                              as={RouterLink}
                              to="/buddies"
                              size="sm"
                              colorScheme="purple"
                              variant="outline"
                            >
                              View Requests
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    )}

                    <Button
                      as={RouterLink}
                      to="/trips/create"
                      colorScheme="brand"
                      variant="outline"
                      size="sm"
                      leftIcon={<Icon as={FiCalendar} />}
                    >
                      Create New Trip
                    </Button>
                  </>
                )}
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Dashboard
