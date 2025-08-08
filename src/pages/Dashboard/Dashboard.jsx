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
  useColorModeValue
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
  FiActivity
} from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import StatCard from '../../components/Dashboard/StatCard'
import QuickActions from '../../components/Dashboard/QuickActions'
import RecentActivities from '../../components/Dashboard/RecentActivities'

const Dashboard = () => {
  const { user, isAdmin } = useAuthStore()
  const bgColor = useColorModeValue('white', 'gray.800')
  const isUserAdmin = isAdmin()

  // Mock data for demo - different stats for admin vs regular users
  const stats = isUserAdmin ? [
    { icon: FiUsers, label: 'Total Users', value: '1,245', change: '+12%', changeType: 'increase', color: 'blue' },
    { icon: FiShoppingBag, label: 'Total Stores', value: '89', change: '+3', changeType: 'increase', color: 'purple' },
    { icon: FiCalendar, label: 'Active Trips', value: '156', change: '+18', changeType: 'increase', color: 'green' },
    { icon: FiBarChart, label: 'Platform Rating', value: '4.7', change: '+0.1', changeType: 'increase', color: 'orange' }
  ] : [
    { icon: FiCalendar, label: 'Upcoming Trips', value: '3', change: '+2', changeType: 'increase', color: 'blue' },
    { icon: FiUsers, label: 'Shopping Buddies', value: '12', change: '+4', changeType: 'increase', color: 'purple' },
    { icon: FiShoppingBag, label: 'Stores Visited', value: '28', change: '+6', changeType: 'increase', color: 'green' },
    { icon: FiStar, label: 'Buddy Rating', value: '4.8', change: '+0.2', changeType: 'increase', color: 'yellow' }
  ]

  const recentActivities = isUserAdmin ? [
    {
      title: 'New Store Added',
      description: 'Reliance Digital - Gandhipuram was added to the platform',
      time: '1 hour ago',
      type: 'admin'
    },
    {
      title: 'User Report Resolved',
      description: 'Spam complaint about inappropriate review was resolved',
      time: '3 hours ago',
      type: 'admin'
    },
    {
      title: 'Platform Analytics Updated',
      description: 'Weekly analytics report has been generated',
      time: '6 hours ago',
      type: 'admin'
    },
    {
      title: 'Store Verification',
      description: 'Phoenix Mall - Coimbatore verification completed',
      time: '1 day ago',
      type: 'admin'
    }
  ] : [
    {
      title: 'Joined "Weekend Mall Shopping"',
      description: 'You joined a shopping trip to Phoenix Mall',
      time: '2 hours ago',
      type: 'trip'
    },
    {
      title: 'New shopping buddy request',
      description: 'Rahul Kumar wants to be your shopping buddy',
      time: '5 hours ago',
      type: 'buddy'
    },
    {
      title: 'Review posted',
      description: 'You reviewed Reliance Digital - Sarvanampatti',
      time: '1 day ago',
      type: 'review'
    },
    {
      title: 'Trip completed',
      description: 'Electronics Shopping completed successfully',
      time: '3 days ago',
      type: 'trip'
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

        {/* Recent Activities */}
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
                            1,245 users • 89 stores • 156 active trips
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
                    <Card variant="outline" borderLeft="4px" borderLeftColor="blue.500">
                      <CardBody py={3}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">Weekend Mall Shopping</Text>
                          <Text fontSize="sm" color="gray.600">
                            Phoenix Mall Coimbatore • Tomorrow at 2:00 PM
                          </Text>
                          <HStack>
                            <Badge colorScheme="blue">4/6 members</Badge>
                            <Badge colorScheme="green">Confirmed</Badge>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card variant="outline" borderLeft="4px" borderLeftColor="green.500">
                      <CardBody py={3}>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">Electronics Shopping</Text>
                          <Text fontSize="sm" color="gray.600">
                            Brookefields Mall • Sunday at 11:00 AM
                          </Text>
                          <HStack>
                            <Badge colorScheme="green">2/4 members</Badge>
                            <Badge colorScheme="yellow">Pending</Badge>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>

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
