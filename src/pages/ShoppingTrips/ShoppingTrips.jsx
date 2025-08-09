import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Button,
  HStack,
  Icon,
  Image,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Avatar,
  AvatarGroup,
  Progress,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { 
  FiMapPin, 
  FiCalendar, 
  FiUsers, 
  FiClock, 
  FiDollarSign, 
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiFlag
} from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import tripsAPI from '../../services/enhancedTripsAPI'
import { useAuthStore } from '../../store/authStore'

const TripCard = ({ trip, onEdit, onDelete, onReport, isAdmin, currentUserId, currentUser, onTripUpdate }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [isJoined, setIsJoined] = useState(
    (trip.participants || []).some(p => (p.id || p) === currentUserId)
  )
  const [isUpdating, setIsUpdating] = useState(false)
  const isDemoTrip = trip.isDemoData || trip.id?.startsWith('demo-')

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getCategoryColor = (category) => {
    const colors = {
      electronics: 'blue',
      clothing: 'purple',
      grocery: 'green',
      'home-decor': 'orange',
      malls: 'teal',
      other: 'gray'
    }
    return colors[category] || 'gray'
  }

  const getStatusColor = (status) => {
    const colors = {
      open: 'green',
      planning: 'yellow',
      full: 'red',
      completed: 'gray',
      cancelled: 'red'
    }
    return colors[status] || 'gray'
  }

  const handleJoinTrip = async () => {
    if (isDemoTrip) {
      toast({
        title: 'Demo Trip',
        description: 'This is a demo trip. Create a real account to join actual shopping trips!',
        status: 'info',
        duration: 4000,
        isClosable: true,
      })
      return
    }

    if (!currentUser) {
      toast({
        title: 'Please login',
        description: 'You need to be logged in to join trips',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsUpdating(true)
    
    try {
      if (isJoined) {
        // Leave trip
        await tripsAPI.leaveTrip(trip.id, currentUserId)
        setIsJoined(false)
        toast({
          title: 'Left trip successfully!',
          description: `You have left "${trip.title}"`,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      } else {
        // Join trip
        await tripsAPI.joinTrip(trip.id, currentUserId, currentUser)
        setIsJoined(true)
        toast({
          title: 'Trip joined successfully!',
          description: `You have joined "${trip.title}"`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      
      // Callback to refresh trip data
      if (onTripUpdate) {
        onTripUpdate()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update trip participation',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = () => {
    onDelete(trip.id)
    onClose()
    toast({
      title: 'Trip deleted successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleReport = () => {
    onReport(trip.id)
    toast({
      title: 'Trip reported',
      description: 'Thank you for reporting. We will review this trip.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  // Handle both mock data and API data formats
  const participants = trip.participants || []
  const maxParticipants = trip.maxParticipants || trip.maxCapacity || 4
  const fillPercentage = (participants.length / maxParticipants) * 100
  const isOwner = trip.organizer.id === currentUserId
  const canJoin = trip.status === 'open' && participants.length < maxParticipants && !isOwner

  return (
    <>
      <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1} flex={1}>
                <HStack flexWrap="wrap">
                  <Badge colorScheme={getCategoryColor(trip.category)} variant="subtle">
                    {trip.category}
                  </Badge>
                  <Badge colorScheme={getStatusColor(trip.status)}>
                    {trip.status}
                  </Badge>
                  {isDemoTrip && (
                    <Badge colorScheme="orange" variant="solid">
                      Demo
                    </Badge>
                  )}
                </HStack>
                <Heading size="md" noOfLines={2}>
                  {trip.title}
                </Heading>
              </VStack>
              <HStack>
                {!isOwner && (
                  <IconButton
                    icon={<Icon as={FiFlag} />}
                    variant="ghost"
                    size="sm"
                    colorScheme="red"
                    onClick={handleReport}
                    aria-label="Report trip"
                  />
                )}
                {(isAdmin || isOwner) && (
                  <>
                    <IconButton
                      icon={<Icon as={FiEdit} />}
                      variant="ghost"
                      size="sm"
                      colorScheme="blue"
                      onClick={() => onEdit(trip)}
                      aria-label="Edit trip"
                    />
                    <IconButton
                      icon={<Icon as={FiTrash2} />}
                      variant="ghost"
                      size="sm"
                      colorScheme="red"
                      onClick={onOpen}
                      aria-label="Delete trip"
                    />
                  </>
                )}
              </HStack>
            </HStack>

            <Text color="gray.600" noOfLines={2}>
              {trip.description}
            </Text>

            <VStack spacing={2} align="stretch">
              <HStack>
                <Icon as={FiCalendar} color="gray.500" />
                <Text fontSize="sm" color="gray.600">
                  {formatDate(trip.scheduledDate || trip.date)}
                </Text>
              </HStack>

              <HStack>
                <Icon as={FiMapPin} color="gray.500" />
                <Text fontSize="sm" color="gray.600" noOfLines={1}>
                  {trip.meetingPoint || trip.location?.meetingPoint}
                </Text>
              </HStack>

              <VStack align="stretch" spacing={1}>
                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiUsers} color="gray.500" />
                    <Text fontSize="sm" color="gray.600">
                      {participants.length}/{maxParticipants} members
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {Math.round(fillPercentage)}% full
                  </Text>
                </HStack>
                <Progress value={fillPercentage} size="sm" colorScheme="brand" />
              </VStack>

              {trip.budget && (
                <HStack>
                  <Icon as={FiDollarSign} color="gray.500" />
                  <Text fontSize="sm" color="gray.600">
                    ₹{trip.budget.min.toLocaleString()} - ₹{trip.budget.max.toLocaleString()}
                  </Text>
                </HStack>
              )}
            </VStack>

            <Divider />

            <VStack spacing={3}>
              <HStack justify="space-between" w="full">
                <HStack>
                  <Avatar
                    src={trip.organizer.profilePicture}
                    name={trip.organizer.name}
                    size="sm"
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="semibold">
                      {trip.organizer.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Organizer
                    </Text>
                  </VStack>
                </HStack>
                {participants.length > 0 && (
                  <AvatarGroup size="sm" max={3}>
                    {trip.participants.map((participant, index) => (
                      <Avatar
                        key={participant.id || participant.name || index}
                        src={participant.avatar}
                        name={participant.name}
                      />
                    ))}
                  </AvatarGroup>
                )}
              </HStack>

              <HStack spacing={2} w="full">
                <Button
                  as={RouterLink}
                  to={`/trips/${trip.id}`}
                  size="sm"
                  variant="outline"
                  flex={1}
                >
                  View Details
                </Button>
                {canJoin && (
                  <Button
                    size="sm"
                    colorScheme={isDemoTrip ? "orange" : (isJoined ? "red" : "brand")}
                    variant={isDemoTrip ? "outline" : (isJoined ? "outline" : "solid")}
                    onClick={handleJoinTrip}
                    isLoading={isUpdating}
                    loadingText={isJoined ? "Leaving..." : "Joining..."}
                    flex={1}
                  >
                    {isDemoTrip ? 'Demo Trip' : (isJoined ? 'Leave' : 'Join Trip')}
                  </Button>
                )}
                {isOwner && (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => onEdit(trip)}
                    flex={1}
                  >
                    Manage
                  </Button>
                )}
              </HStack>
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Trip
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete "{trip.title}"? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

const ShoppingTrips = () => {
  const { user, isAdmin } = useAuthStore()
  const [userLocation, setUserLocation] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [areaFilter, setAreaFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [activeTab, setActiveTab] = useState(0) // 0: All Trips, 1: My Trips, 2: Live, 3: Past
  const toast = useToast()

  const isUserAdmin = isAdmin()
  const currentUserId = user?.id

  // Debug current user
  useEffect(() => {
    console.log('Current user:', user)
    console.log('Current user ID:', currentUserId)
    console.log('Is admin:', isUserAdmin)
  }, [user, currentUserId, isUserAdmin])

  // Fetch all trips nearby
  const { 
    data: nearbyTripsData, 
    isLoading: nearbyLoading, 
    error: nearbyError,
    refetch: refetchNearby 
  } = useQuery({
    queryKey: ['nearbyTrips', userLocation],
    queryFn: () => tripsAPI.getNearbyTrips(
      userLocation || { latitude: 11.0168, longitude: 76.9558 }, // Default to Coimbatore
      { radius: 50 }
    ),
    enabled: !!userLocation,
    retry: 2
  })

  // Fetch user's trips
  const { 
    data: userTripsData, 
    isLoading: userTripsLoading, 
    error: userTripsError,
    refetch: refetchUserTrips 
  } = useQuery({
    queryKey: ['userTrips', currentUserId],
    queryFn: () => {
      console.log('Fetching user trips for userId:', currentUserId)
      return tripsAPI.getUserTrips(currentUserId)
    },
    enabled: !!user && !!currentUserId,
    retry: 2
  })

  // Debug user trips data
  useEffect(() => {
    if (userTripsData) {
      console.log('User trips data:', userTripsData)
      console.log('User trips count:', userTripsData?.data?.trips?.length || 0)
    }
  }, [userTripsData])

  // Fetch live trips
  const { 
    data: liveTripsData, 
    isLoading: liveLoading, 
    error: liveError,
    refetch: refetchLive 
  } = useQuery({
    queryKey: ['liveTrips'],
    queryFn: () => tripsAPI.getLiveTrips(),
    enabled: !!user,
    retry: 2
  })

  // Fetch past trips
  const { 
    data: pastTripsData, 
    isLoading: pastLoading, 
    error: pastError,
    refetch: refetchPast 
  } = useQuery({
    queryKey: ['pastTrips'],
    queryFn: () => tripsAPI.getPastTrips(),
    enabled: !!user,
    retry: 2
  })

  // Get current trips based on active tab
  const getCurrentTrips = () => {
    switch (activeTab) {
      case 0: // All Trips
        return nearbyTripsData?.data?.trips || []
      case 1: // My Trips
        return userTripsData?.data?.trips || []
      case 2: // Live Trips
        return liveTripsData?.data?.trips || []
      case 3: // Past Trips
        return pastTripsData?.data?.trips || []
      default:
        return []
    }
  }

  const getCurrentLoading = () => {
    switch (activeTab) {
      case 0: return nearbyLoading
      case 1: return userTripsLoading
      case 2: return liveLoading
      case 3: return pastLoading
      default: return false
    }
  }

  const getCurrentError = () => {
    switch (activeTab) {
      case 0: return nearbyError
      case 1: return userTripsError
      case 2: return liveError
      case 3: return pastError
      default: return null
    }
  }

  const refetchCurrentData = () => {
    switch (activeTab) {
      case 0: refetchNearby(); break
      case 1: refetchUserTrips(); break
      case 2: refetchLive(); break
      case 3: refetchPast(); break
    }
  }

  const trips = getCurrentTrips()
  const isLoading = getCurrentLoading()
  const error = getCurrentError()

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to Coimbatore coordinates
          setUserLocation({
            latitude: 11.0168,
            longitude: 76.9558
          })
        }
      )
    }
  }, [])

  const filteredTrips = trips.filter(trip => {
    if (!trip) return false
    
    const matchesSearch = trip.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.meetingPoint?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.organizer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !categoryFilter || trip.category === categoryFilter
    const matchesArea = !areaFilter || trip.area === areaFilter || trip.location?.area === areaFilter
    const matchesStatus = !statusFilter || trip.status === statusFilter

    return matchesSearch && matchesCategory && matchesArea && matchesStatus
  })

  const categories = [...new Set(trips.map(trip => trip.category).filter(Boolean))]
  const areas = [...new Set(trips.map(trip => trip.area || trip.location?.area).filter(Boolean))]
  const statuses = [...new Set(trips.map(trip => trip.status).filter(Boolean))]

  const handleEdit = (trip) => {
    // Navigate to edit page or open edit modal
    toast({
      title: 'Edit functionality',
      description: 'Edit trip functionality coming soon!',
      status: 'info',
      duration: 3000,
    })
  }

  const handleDelete = async (tripId) => {
    try {
      await tripsAPI.cancelTrip(tripId)
      toast({
        title: 'Trip deleted',
        description: 'Trip has been successfully deleted',
        status: 'success',
        duration: 3000,
      })
      refetchCurrentData()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete trip',
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleReport = (tripId) => {
    toast({
      title: 'Trip reported',
      description: 'Thank you for reporting. We will review this trip.',
      status: 'info',
      duration: 3000,
    })
  }

  const getTabCounts = () => {
    return {
      all: nearbyTripsData?.data?.trips?.length || 0,
      my: userTripsData?.data?.trips?.length || 0,
      live: liveTripsData?.data?.trips?.length || 0,
      past: pastTripsData?.data?.trips?.length || 0
    }
  }

  const tabCounts = getTabCounts()

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Shopping Trips</Heading>
            <Text color="gray.600">
              Discover and join shopping trips in your area
            </Text>
          </VStack>
          <Button
            as={RouterLink}
            to="/trips/create"
            colorScheme="brand"
            leftIcon={<Icon as={FiPlus} />}
          >
            Create Trip
          </Button>
        </HStack>

        {/* Tab Navigation */}
        <Tabs index={activeTab} onChange={setActiveTab} variant="enclosed">
          <TabList>
            <Tab>All Trips ({tabCounts.all})</Tab>
            <Tab>My Trips ({tabCounts.my})</Tab>
            <Tab>Live Trips ({tabCounts.live})</Tab>
            <Tab>Past Trips ({tabCounts.past})</Tab>
          </TabList>

          <TabPanels>
            {[0, 1, 2, 3].map((tabIndex) => (
              <TabPanel key={tabIndex} px={0}>
                {/* Error State */}
                {error && (
                  <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error.message || 'Failed to load trips. Please try again.'}
                    <Button 
                      ml="auto" 
                      size="sm" 
                      onClick={refetchCurrentData}
                    >
                      Retry
                    </Button>
                  </Alert>
                )}

                {/* Filters */}
                <Card mb={6}>
                  <CardBody>
                    <VStack spacing={4}>
                      <InputGroup maxW="400px">
                        <InputLeftElement pointerEvents="none">
                          <Icon as={FiSearch} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          placeholder="Search trips..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </InputGroup>

                      <Flex wrap="wrap" gap={4} justify="center">
                        <Select
                          placeholder="All Categories"
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          maxW="200px"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                        </Select>
                        
                        <Select
                          placeholder="All Areas"
                          value={areaFilter}
                          onChange={(e) => setAreaFilter(e.target.value)}
                          maxW="200px"
                        >
                          {areas.map(area => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </Select>
                        
                        <Select
                          placeholder="All Status"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          maxW="200px"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </Select>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Demo Data Notice */}
                {tabIndex === 0 && filteredTrips.some(trip => trip.isDemoData || trip.id?.startsWith('demo-')) && (
                  <Alert status="info" mb={4}>
                    <AlertIcon />
                    <VStack align="start" spacing={1} flex={1}>
                      <Text fontWeight="semibold">Demo Content</Text>
                      <Text fontSize="sm">
                        Some trips marked with "Demo" badge are sample trips to showcase the platform. 
                        Create a real account to join actual shopping trips in your area!
                      </Text>
                    </VStack>
                  </Alert>
                )}

                {/* Loading State */}
                {isLoading && (
                  <Flex justify="center" py={12}>
                    <VStack spacing={4}>
                      <Spinner size="xl" color="brand.500" />
                      <Text color="gray.500">Loading trips...</Text>
                    </VStack>
                  </Flex>
                )}

                {/* Trips Grid */}
                {!isLoading && (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filteredTrips.map((trip, index) => (
                      <TripCard
                        key={trip.id || `trip-${index}`}
                        trip={trip}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onReport={handleReport}
                        isAdmin={isUserAdmin}
                        currentUserId={currentUserId}
                        currentUser={user}
                        onTripUpdate={() => {
                          refetchNearby()
                          refetchUserTrips()
                          refetchLive()
                          refetchPast()
                        }}
                      />
                    ))}
                  </SimpleGrid>
                )}

                {/* Empty state */}
                {!isLoading && filteredTrips.length === 0 && (
                  <Card py={12}>
                    <CardBody textAlign="center">
                      <VStack spacing={4}>
                        <Icon as={FiCalendar} boxSize={12} color="gray.400" />
                        <Heading size="md" color="gray.500">
                          {trips.length === 0 ? 'No trips found' : 'No trips match your filters'}
                        </Heading>
                        <Text color="gray.500">
                          {activeTab === 1 
                            ? 'You haven\'t created or joined any trips yet. Create your first trip!'
                            : 'Try adjusting your search criteria or create a new trip'
                          }
                        </Text>
                        <Button
                          as={RouterLink}
                          to="/trips/create"
                          colorScheme="brand"
                          leftIcon={<Icon as={FiPlus} />}
                        >
                          Create Your First Trip
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default ShoppingTrips
