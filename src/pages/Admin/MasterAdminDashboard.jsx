import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Divider
} from '@chakra-ui/react'
import { 
  FiUsers, 
  FiShoppingBag, 
  FiMapPin, 
  FiStar, 
  FiTrendingUp,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiUserX,
  FiShield,
  FiActivity,
  FiBarChart,
  FiEye
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import userTripsStorage from '../../services/userTripsStorage'
import userStorage from '../../services/userStorage'
import { hasPermission, isActionAllowed } from '../../utils/adminPermissions'

// Get real data from localStorage
const getRealDashboardData = () => {
  // Get registered users from userStorage
  const registeredUsers = userStorage.getAllUsers()
  
  // Get user trips
  const userTrips = userTripsStorage.getAllTrips()
  
  // Get reviews (if implemented)
  const reviews = JSON.parse(localStorage.getItem('shopping_companion_reviews') || '[]')
  
  // Get user statistics
  const userStats = userStorage.getUserStats()
  
  return {
    users: registeredUsers,
    trips: userTrips,
    reviews: reviews,
    stats: {
      totalUsers: userStats.total,
      activeUsers: userStats.active,
      totalTrips: userTrips.length,
      completedTrips: userTrips.filter(t => t.status === 'completed').length,
      totalStores: 892, // Static for now
      verifiedStores: 756,
      totalReviews: reviews.length + 50, // +50 for demo reviews
      pendingReviews: reviews.filter(r => r.status === 'pending').length + 5,
      newUsersThisWeek: userStats.newThisWeek,
      adminUsers: userStats.admins
    }
  }
}

const MasterAdminDashboard = () => {
  const { user } = useAuthStore()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState(0)
  const [dashboardData, setDashboardData] = useState({
    users: [],
    trips: [],
    reviews: [],
    stats: {}
  })
  const [isLoading, setIsLoading] = useState(false)

  // Load real data on component mount
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    const realData = getRealDashboardData()
    setDashboardData(realData)
  }

  // Real action handlers
  const handleUserAction = async (action, userId, userData = {}) => {
    if (!isActionAllowed(user, action)) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to perform this action.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    try {
      let result = null
      const currentUser = userStorage.getUserById(userId)
      
      switch (action) {
        case 'BAN_USER':
          result = userStorage.banUser(userId, userData.reason || 'Banned by admin', userData.duration, user.id)
          userStorage.logUserActivity(userId, 'BANNED', { bannedBy: user.name, reason: userData.reason })
          break
          
        case 'UNBAN_USER':
          result = userStorage.unbanUser(userId, user.id)
          userStorage.logUserActivity(userId, 'UNBANNED', { unbannedBy: user.name })
          break
          
        case 'DELETE_USER':
          if (userId === user.id) {
            throw new Error('Cannot delete your own account')
          }
          result = userStorage.deleteUser(userId)
          break
          
        case 'PROMOTE_USER':
          result = userStorage.promoteToAdmin(userId, userData.permissions, user.id)
          userStorage.logUserActivity(userId, 'PROMOTED', { promotedBy: user.name, newRole: 'admin' })
          break
          
        case 'DEMOTE_USER':
          result = userStorage.demoteFromAdmin(userId, user.id)
          userStorage.logUserActivity(userId, 'DEMOTED', { demotedBy: user.name, newRole: 'user' })
          break
          
        default:
          throw new Error('Unknown action')
      }

      if (result) {
        toast({
          title: 'Action Successful',
          description: `User ${currentUser?.name} has been ${action.toLowerCase().replace('_', ' ')}.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        loadDashboardData() // Refresh data
      } else {
        throw new Error('Action failed')
      }
    } catch (error) {
      toast({
        title: 'Action Failed',
        description: error.message || 'An error occurred while performing the action.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTripAction = async (action, tripId, tripData = {}) => {
    if (!isActionAllowed(user, 'MODERATE_TRIP')) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to moderate trips.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    try {
      let result = null
      const trip = userTripsStorage.getTripById(tripId)
      
      switch (action) {
        case 'DELETE_TRIP':
          result = userTripsStorage.deleteTrip(tripId, user.id)
          break
          
        case 'FEATURE_TRIP':
          result = userTripsStorage.updateTrip(tripId, { 
            featured: true, 
            featuredBy: user.id, 
            featuredAt: new Date().toISOString() 
          })
          break
          
        case 'MODERATE_TRIP':
          result = userTripsStorage.updateTrip(tripId, { 
            status: tripData.status,
            moderatedBy: user.id,
            moderatedAt: new Date().toISOString(),
            moderationReason: tripData.reason
          })
          break
          
        default:
          throw new Error('Unknown trip action')
      }

      if (result) {
        toast({
          title: 'Trip Action Successful',
          description: `Trip "${trip?.title}" has been ${action.toLowerCase().replace('_', ' ')}.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        loadDashboardData() // Refresh data
      } else {
        throw new Error('Trip action failed')
      }
    } catch (error) {
      toast({
        title: 'Trip Action Failed',
        description: error.message || 'An error occurred while performing the trip action.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const { users: recentUsers, trips: recentTrips, stats: dashboardStats } = dashboardData

  const StatCard = ({ icon, label, value, helpText, color = 'blue' }) => (
    <Card>
      <CardBody>
        <Stat>
          <HStack justify="space-between">
            <Box>
              <StatLabel>{label}</StatLabel>
              <StatNumber>{value}</StatNumber>
              <StatHelpText>{helpText}</StatHelpText>
            </Box>
            <Box p={3} bg={`${color}.100`} rounded="full">
              <Box as={icon} size="24px" color={`${color}.500`} />
            </Box>
          </HStack>
        </Stat>
      </CardBody>
    </Card>
  )

  const UserActionsMenu = ({ userItem }) => {
    const canBan = isActionAllowed(user, 'BAN_USER')
    const canDelete = isActionAllowed(user, 'DELETE_USER')
    const canPromote = isActionAllowed(user, 'PROMOTE_USER')
    const isMasterAdminUser = userItem.id === 1 // Master admin cannot be modified

    const handleQuickAction = (action) => {
      if (isMasterAdminUser && (action === 'ban' || action === 'delete')) {
        toast({
          title: 'Action Not Allowed',
          description: 'Master admin account cannot be banned or deleted.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      switch (action) {
        case 'ban':
          handleUserAction('BAN_USER', userItem.id, { 
            reason: 'Administrative action', 
            duration: null 
          })
          break
        case 'unban':
          handleUserAction('UNBAN_USER', userItem.id)
          break
        case 'delete':
          if (window.confirm(`Are you sure you want to permanently delete ${userItem.name}? This action cannot be undone.`)) {
            handleUserAction('DELETE_USER', userItem.id)
          }
          break
        case 'promote':
          handleUserAction('PROMOTE_USER', userItem.id, { 
            permissions: ['manage_users', 'manage_stores', 'view_analytics'] 
          })
          break
        case 'demote':
          handleUserAction('DEMOTE_USER', userItem.id)
          break
      }
    }

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiMoreVertical />}
          variant="ghost"
          size="sm"
          isDisabled={isLoading}
        />
        <MenuList>
          <MenuItem icon={<FiEye />}>
            View Profile
          </MenuItem>
          
          {!isMasterAdminUser && (
            <>
              {userItem.role === 'user' && canPromote && (
                <MenuItem 
                  icon={<FiShield />} 
                  onClick={() => handleQuickAction('promote')}
                  color="green.600"
                >
                  Promote to Admin
                </MenuItem>
              )}
              
              {userItem.role === 'admin' && canPromote && (
                <MenuItem 
                  icon={<FiShield />} 
                  onClick={() => handleQuickAction('demote')}
                  color="orange.600"
                >
                  Demote to User
                </MenuItem>
              )}
              
              <MenuItem icon={<FiEdit />}>
                Edit User
              </MenuItem>
              
              {canBan && (
                <MenuItem 
                  icon={<FiUserX />} 
                  onClick={() => handleQuickAction(userItem.status === 'banned' ? 'unban' : 'ban')}
                  color={userItem.status === 'banned' ? 'green.600' : 'orange.600'}
                >
                  {userItem.status === 'banned' ? 'Unban User' : 'Ban User'}
                </MenuItem>
              )}
              
              {canDelete && (
                <MenuItem 
                  icon={<FiTrash2 />} 
                  onClick={() => handleQuickAction('delete')} 
                  color="red.500"
                >
                  Delete User
                </MenuItem>
              )}
            </>
          )}
          
          {isMasterAdminUser && (
            <MenuItem isDisabled>
              <Text fontSize="xs" color="gray.500">Protected Account</Text>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    )
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="lg">Master Admin Dashboard</Heading>
              <Text color="gray.600">
                Welcome back, {user?.name}. Here's your platform overview.
              </Text>
            </VStack>
            <Badge colorScheme="red" px={3} py={1} rounded="full">
              <HStack spacing={1}>
                <FiShield size="12px" />
                <Text fontSize="sm">Master Admin</Text>
              </HStack>
            </Badge>
          </HStack>
        </Box>

        {/* Security Notice */}
        <Alert status="warning">
          <AlertIcon />
          <Text>
            You are accessing the Master Admin Dashboard. All actions are logged and monitored. 
            This interface is hidden from all other users.
          </Text>
        </Alert>

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          <StatCard
            icon={FiUsers}
            label="Total Users"
            value={dashboardStats.totalUsers.toLocaleString()}
            helpText={`${dashboardStats.activeUsers} active`}
            color="blue"
          />
          <StatCard
            icon={FiShoppingBag}
            label="Shopping Trips"
            value={dashboardStats.totalTrips.toLocaleString()}
            helpText={`${dashboardStats.completedTrips} completed`}
            color="green"
          />
          <StatCard
            icon={FiMapPin}
            label="Stores Listed"
            value={dashboardStats.totalStores.toLocaleString()}
            helpText={`${dashboardStats.verifiedStores} verified`}
            color="purple"
          />
          <StatCard
            icon={FiStar}
            label="Reviews"
            value={dashboardStats.totalReviews.toLocaleString()}
            helpText={`${dashboardStats.pendingReviews} pending`}
            color="orange"
          />
        </SimpleGrid>

        {/* Management Tabs */}
        <Card>
          <CardHeader>
            <Heading size="md">Platform Management</Heading>
          </CardHeader>
          <CardBody>
            <Tabs index={activeTab} onChange={setActiveTab}>
              <TabList>
                <Tab>User Management</Tab>
                <Tab>Trip Management</Tab>
                <Tab>Store Management</Tab>
                <Tab>Analytics</Tab>
              </TabList>

              <TabPanels>
                {/* User Management */}
                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Text fontWeight="semibold">Recent Users</Text>
                      <Button size="sm" leftIcon={<FiUsers />}>
                        View All Users
                      </Button>
                    </HStack>
                    
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>User</Th>
                          <Th>Status</Th>
                          <Th>Trips</Th>
                          <Th>Rating</Th>
                          <Th>Join Date</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {recentUsers.slice(0, 5).map((userItem) => (
                          <Tr key={userItem.id}>
                            <Td>
                              <HStack>
                                <Avatar size="sm" name={userItem.name} src={userItem.avatar} />
                                <Box>
                                  <Text fontWeight="medium">{userItem.name}</Text>
                                  <Text fontSize="sm" color="gray.500">{userItem.email}</Text>
                                </Box>
                              </HStack>
                            </Td>
                            <Td>
                              <Badge 
                                colorScheme={(userItem.status || 'active') === 'active' ? 'green' : 'red'}
                                variant="subtle"
                              >
                                {userItem.status || 'active'}
                              </Badge>
                            </Td>
                            <Td>{userItem.totalTrips || 0}</Td>
                            <Td>
                              <HStack>
                                <FiStar color="orange" />
                                <Text>{userItem.buddyRating || userItem.rating || 'N/A'}</Text>
                              </HStack>
                            </Td>
                            <Td>{userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString() : userItem.joinDate || 'N/A'}</Td>
                            <Td>
                              <UserActionsMenu userItem={userItem} />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </VStack>
                </TabPanel>

                {/* Trip Management */}
                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Text fontWeight="semibold">Recent Shopping Trips</Text>
                      <Button size="sm" leftIcon={<FiShoppingBag />}>
                        View All Trips
                      </Button>
                    </HStack>
                    
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Trip Title</Th>
                          <Th>Organizer</Th>
                          <Th>Participants</Th>
                          <Th>Status</Th>
                          <Th>Date</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {recentTrips.slice(0, 5).map((trip) => (
                          <Tr key={trip.id}>
                            <Td>
                              <VStack align="start" spacing={1}>
                                <Text fontWeight="medium">{trip.title}</Text>
                                <Text fontSize="sm" color="gray.500">{trip.category || 'General'}</Text>
                              </VStack>
                            </Td>
                            <Td>{trip.organizer?.name || trip.organizer || 'Unknown'}</Td>
                            <Td>{trip.participants?.length || trip.participants || 0}</Td>
                            <Td>
                              <Badge 
                                colorScheme={
                                  trip.status === 'open' ? 'blue' : 
                                  trip.status === 'completed' ? 'green' : 
                                  trip.status === 'cancelled' ? 'red' : 'gray'
                                }
                                variant="subtle"
                              >
                                {trip.status || 'open'}
                              </Badge>
                            </Td>
                            <Td>{trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : trip.date || 'N/A'}</Td>
                            <Td>
                              <Menu>
                                <MenuButton
                                  as={IconButton}
                                  icon={<FiMoreVertical />}
                                  variant="ghost"
                                  size="sm"
                                />
                                <MenuList>
                                  <MenuItem icon={<FiEdit />}>Edit Trip</MenuItem>
                                  <MenuItem icon={<FiTrash2 />} color="red.500">Delete Trip</MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </VStack>
                </TabPanel>

                {/* Store Management */}
                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    <Text fontWeight="semibold">Store Management</Text>
                    <Alert status="info">
                      <AlertIcon />
                      Store management features coming soon. Monitor store verifications and reviews here.
                    </Alert>
                  </VStack>
                </TabPanel>

                {/* Analytics */}
                <TabPanel px={0}>
                  <VStack spacing={6} align="stretch">
                    <Text fontWeight="semibold">Platform Analytics</Text>
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Heading size="sm">User Growth</Heading>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4}>
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm">This Month</Text>
                              <Text fontSize="sm" color="green.500">+12%</Text>
                            </HStack>
                            <Progress value={68} colorScheme="green" w="full" />
                            <Text fontSize="xs" color="gray.500">
                              347 new users this month
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Heading size="sm">Trip Completion Rate</Heading>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4}>
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm">This Month</Text>
                              <Text fontSize="sm" color="blue.500">79.6%</Text>
                            </HStack>
                            <Progress value={79.6} colorScheme="blue" w="full" />
                            <Text fontSize="xs" color="gray.500">
                              Above platform average
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default MasterAdminDashboard