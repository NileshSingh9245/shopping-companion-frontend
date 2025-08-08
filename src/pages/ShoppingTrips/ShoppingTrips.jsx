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
  Divider
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
import tripsAPI from '../../services/tripsAPI'
import { useAuthStore } from '../../store/authStore'

// Mock data for demo - Coimbatore based
const mockTrips = [
  {
    id: '1',
    title: 'Weekend Electronics Shopping',
    description: 'Looking for companions to visit electronics stores in Brookefields for laptop and mobile shopping',
    organizer: {
      id: '1',
      name: 'Priya Krishnan',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    participants: [
      { id: '2', name: 'Arjun Venkatesh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      { id: '3', name: 'Sneha Raj', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
    ],
    maxParticipants: 4,
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    meetingPoint: 'Phoenix Mall Main Entrance, Coimbatore',
    status: 'open',
    category: 'electronics',
    budget: { min: 10000, max: 50000, currency: 'INR' },
    area: 'Brookefields'
  },
  {
    id: '2',
    title: 'Clothing Shopping at Brookefields',
    description: 'Planning a fun shopping day at Brookefields Mall. Join for clothes, accessories, and food!',
    organizer: {
      id: '2',
      name: 'Rahul Kumar',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    participants: [
      { id: '1', name: 'Priya Krishnan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face' }
    ],
    maxParticipants: 6,
    scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    meetingPoint: 'Brookefields Mall Food Court',
    status: 'open',
    category: 'clothing',
    budget: { min: 5000, max: 20000, currency: 'INR' },
    area: 'Brookefields'
  },
  {
    id: '3',
    title: 'Grocery Shopping in Sarvanampatti',
    description: 'Weekly grocery shopping at local markets and supermarkets in Sarvanampatti area',
    organizer: {
      id: '4',
      name: 'Meera Iyer',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    participants: [
      { id: '5', name: 'Admin VibeCoding', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
    ],
    maxParticipants: 3,
    scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    meetingPoint: 'Reliance Fresh Sarvanampatti',
    status: 'open',
    category: 'grocery',
    budget: { min: 2000, max: 8000, currency: 'INR' },
    area: 'Sarvanampatti'
  },
  {
    id: '4',
    title: 'Home Decor Shopping',
    description: 'Looking for home decor items and furniture at various stores in Gandhipuram',
    organizer: {
      id: '3',
      name: 'Vishnu Raj',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    participants: [],
    maxParticipants: 5,
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    meetingPoint: 'Big Bazaar Gandhipuram',
    status: 'planning',
    category: 'home-decor',
    budget: { min: 15000, max: 75000, currency: 'INR' },
    area: 'Gandhipuram'
  }
]

const TripCard = ({ trip, onEdit, onDelete, onReport, isAdmin, currentUserId }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [isJoined, setIsJoined] = useState(
    trip.participants.some(p => p.id === currentUserId)
  )

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

  const handleJoinTrip = () => {
    if (isJoined) {
      setIsJoined(false)
      toast({
        title: 'Left trip successfully!',
        description: `You have left "${trip.title}"`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    } else {
      setIsJoined(true)
      toast({
        title: 'Trip joined successfully!',
        description: `You have joined "${trip.title}"`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
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

  const fillPercentage = (trip.participants.length / trip.maxParticipants) * 100
  const isOwner = trip.organizer.id === currentUserId
  const canJoin = trip.status === 'open' && trip.participants.length < trip.maxParticipants && !isOwner

  return (
    <>
      <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1} flex={1}>
                <HStack>
                  <Badge colorScheme={getCategoryColor(trip.category)} variant="subtle">
                    {trip.category}
                  </Badge>
                  <Badge colorScheme={getStatusColor(trip.status)}>
                    {trip.status}
                  </Badge>
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
                <Icon as={FiMapPin} color="gray.500" />
                <Text fontSize="sm" color="gray.600" noOfLines={1}>
                  {trip.meetingPoint}
                </Text>
              </HStack>

              <HStack>
                <Icon as={FiCalendar} color="gray.500" />
                <Text fontSize="sm" color="gray.600">
                  {formatDate(trip.scheduledDate)}
                </Text>
              </HStack>

              <VStack align="stretch" spacing={1}>
                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiUsers} color="gray.500" />
                    <Text fontSize="sm" color="gray.600">
                      {trip.participants.length}/{trip.maxParticipants} members
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
                {trip.participants.length > 0 && (
                  <AvatarGroup size="sm" max={3}>
                    {trip.participants.map(participant => (
                      <Avatar
                        key={participant.id}
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
                    colorScheme={isJoined ? "red" : "brand"}
                    variant={isJoined ? "outline" : "solid"}
                    onClick={handleJoinTrip}
                    flex={1}
                  >
                    {isJoined ? 'Leave' : 'Join Trip'}
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
  const [trips, setTrips] = useState(mockTrips)

  const isUserAdmin = isAdmin()
  const currentUserId = user?.id

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
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.meetingPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.organizer.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !categoryFilter || trip.category === categoryFilter
    const matchesArea = !areaFilter || trip.area === areaFilter
    const matchesStatus = !statusFilter || trip.status === statusFilter

    return matchesSearch && matchesCategory && matchesArea && matchesStatus
  })

  const categories = [...new Set(trips.map(trip => trip.category))]
  const areas = [...new Set(trips.map(trip => trip.area))]
  const statuses = [...new Set(trips.map(trip => trip.status))]

  const handleEdit = (trip) => {
    // Navigate to edit page or open edit modal
  }

  const handleDelete = (tripId) => {
    setTrips(trips.filter(trip => trip.id !== tripId))
  }

  const handleReport = (tripId) => {
    // Handle trip reporting logic
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Shopping Trips in Coimbatore</Heading>
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

        {/* Filters */}
        <Card>
          <CardBody>
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search trips, organizers, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
              
              <Flex wrap="wrap" gap={4} w="full">
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
                
                <Button
                  leftIcon={<Icon as={FiFilter} />}
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setCategoryFilter('')
                    setAreaFilter('')
                    setStatusFilter('')
                  }}
                >
                  Clear
                </Button>
              </Flex>
            </VStack>
          </CardBody>
        </Card>

        {/* Results count */}
        <HStack justify="space-between" align="center">
          <Text color="gray.600">
            Showing {filteredTrips.length} of {trips.length} trips
          </Text>
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.500">Sort by:</Text>
            <Select size="sm" w="auto">
              <option value="date">Date</option>
              <option value="participants">Participants</option>
              <option value="status">Status</option>
            </Select>
          </HStack>
        </HStack>

        {/* Trips Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredTrips.map((trip) => (
            <TripCard 
              key={trip.id} 
              trip={trip}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReport={handleReport}
              isAdmin={isUserAdmin}
              currentUserId={currentUserId}
            />
          ))}
        </SimpleGrid>

        {/* Empty state */}
        {filteredTrips.length === 0 && (
          <Card py={12}>
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Icon as={FiCalendar} boxSize={12} color="gray.400" />
                <Heading size="md" color="gray.500">No trips found</Heading>
                <Text color="gray.500">
                  Try adjusting your search criteria or create a new trip
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
      </VStack>
    </Container>
  )
}

export default ShoppingTrips
