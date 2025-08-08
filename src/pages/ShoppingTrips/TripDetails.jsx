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
  Badge,
  Button,
  Icon,
  Avatar,
  AvatarGroup,
  Progress,
  Divider,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { 
  FiMapPin, 
  FiCalendar, 
  FiUsers, 
  FiDollarSign,
  FiMessageCircle,
  FiShare2,
  FiEdit,
  FiFlag,
  FiNavigation,
  FiClock,
  FiUserPlus,
  FiUserMinus,
  FiSend
} from 'react-icons/fi'
import { useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const TripDetails = () => {
  const { tripId } = useParams()
  const { user, isAdmin } = useAuthStore()
  const toast = useToast()
  const [selectedTab, setSelectedTab] = useState(0)
  const [isJoined, setIsJoined] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const isUserAdmin = isAdmin()
  const bgColor = useColorModeValue('white', 'gray.800')
  const currentUserId = user?.id

  // Mock trip data based on tripId
  const tripData = {
    id: tripId,
    title: 'Weekend Electronics Shopping',
    description: 'Looking for companions to visit electronics stores in Brookefields for laptop and mobile shopping. We\'ll visit multiple stores to compare prices and find the best deals.',
    organizer: {
      id: '1',
      name: 'Priya Krishnan',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      totalTrips: 15
    },
    participants: [
      { 
        id: '2', 
        name: 'Arjun Venkatesh', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        joinedAt: '2024-01-10'
      },
      { 
        id: '3', 
        name: 'Sneha Raj', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        joinedAt: '2024-01-11'
      }
    ],
    maxParticipants: 4,
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    meetingPoint: 'Phoenix Mall Main Entrance, Coimbatore',
    status: 'open',
    category: 'electronics',
    budget: { min: 10000, max: 50000, currency: 'INR' },
    area: 'Brookefields',
    storesPlanned: [
      'Reliance Digital',
      'Croma Electronics',
      'Vijay Sales',
      'Samsung Store'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Meet at Phoenix Mall Main Entrance' },
      { time: '10:15 AM', activity: 'Visit Reliance Digital - Compare laptop prices' },
      { time: '11:30 AM', activity: 'Check Croma Electronics - Mobile phones' },
      { time: '12:30 PM', activity: 'Lunch break at food court' },
      { time: '1:30 PM', activity: 'Visit Vijay Sales - Final price comparison' },
      { time: '2:30 PM', activity: 'Samsung Store - Check latest models' },
      { time: '3:30 PM', activity: 'Final purchases and wrap up' }
    ],
    requirements: [
      'Bring ID proof for warranty registration',
      'Cash/cards for purchases',
      'List of desired specifications',
      'Comfortable walking shoes'
    ],
    rules: [
      'Be punctual at meeting point',
      'Respect others\' budget and choices',
      'Stay with the group',
      'No pressure to purchase'
    ]
  }

  const messages = [
    {
      id: '1',
      user: { name: 'Priya Krishnan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face' },
      message: 'Looking forward to finding great deals tomorrow! I\'ve prepared a list of stores to visit.',
      timestamp: '2 hours ago',
      isOrganizer: true
    },
    {
      id: '2',
      user: { name: 'Arjun Venkatesh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
      message: 'I need to buy a gaming laptop. Any specific models you\'d recommend?',
      timestamp: '1 hour ago',
      isOrganizer: false
    },
    {
      id: '3',
      user: { name: 'Sneha Raj', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
      message: 'Should we create a WhatsApp group for easier communication?',
      timestamp: '30 minutes ago',
      isOrganizer: false
    }
  ]

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
        description: `You have left "${tripData.title}"`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    } else {
      setIsJoined(true)
      toast({
        title: 'Trip joined successfully!',
        description: `You have joined "${tripData.title}"`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: 'Message sent',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      setNewMessage('')
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: 'Link copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleGetDirections = () => {
    window.open(`https://maps.google.com?q=${encodeURIComponent(tripData.meetingPoint)}`, '_blank')
  }

  const fillPercentage = (tripData.participants.length / tripData.maxParticipants) * 100
  const isOwner = tripData.organizer.id === currentUserId
  const canJoin = tripData.status === 'open' && tripData.participants.length < tripData.maxParticipants && !isOwner

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/trips">Shopping Trips</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{tripData.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Trip Header */}
        <Card bg={bgColor}>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between" align="start">
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Badge colorScheme={getCategoryColor(tripData.category)} variant="subtle">
                      {tripData.category}
                    </Badge>
                    <Badge colorScheme={getStatusColor(tripData.status)}>
                      {tripData.status}
                    </Badge>
                  </HStack>
                  <Heading size="lg">{tripData.title}</Heading>
                  <Text color="gray.600">{tripData.description}</Text>
                </VStack>
                <HStack>
                  <Button
                    leftIcon={<Icon as={FiShare2} />}
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                  {(isUserAdmin || isOwner) && (
                    <Button
                      leftIcon={<Icon as={FiEdit} />}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  )}
                </HStack>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Icon as={FiCalendar} color="gray.500" />
                    <Text fontSize="sm" fontWeight="semibold">Date & Time</Text>
                  </HStack>
                  <Text fontSize="sm">{formatDate(tripData.scheduledDate)}</Text>
                </VStack>

                <VStack align="start" spacing={1}>
                  <HStack>
                    <Icon as={FiMapPin} color="gray.500" />
                    <Text fontSize="sm" fontWeight="semibold">Meeting Point</Text>
                  </HStack>
                  <Text fontSize="sm">{tripData.meetingPoint}</Text>
                </VStack>

                <VStack align="start" spacing={1}>
                  <HStack>
                    <Icon as={FiUsers} color="gray.500" />
                    <Text fontSize="sm" fontWeight="semibold">Participants</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm">{tripData.participants.length}/{tripData.maxParticipants}</Text>
                    <Progress value={fillPercentage} size="sm" w="60px" colorScheme="brand" />
                  </HStack>
                </VStack>

                <VStack align="start" spacing={1}>
                  <HStack>
                    <Icon as={FiDollarSign} color="gray.500" />
                    <Text fontSize="sm" fontWeight="semibold">Budget Range</Text>
                  </HStack>
                  <Text fontSize="sm">
                    ₹{tripData.budget.min.toLocaleString()} - ₹{tripData.budget.max.toLocaleString()}
                  </Text>
                </VStack>
              </SimpleGrid>

              <Divider />

              {/* Organizer Info */}
              <HStack justify="space-between">
                <HStack>
                  <Avatar
                    src={tripData.organizer.profilePicture}
                    name={tripData.organizer.name}
                    size="md"
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold">{tripData.organizer.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Trip Organizer • {tripData.organizer.rating}⭐ • {tripData.organizer.totalTrips} trips
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={2}>
                  <Button
                    leftIcon={<Icon as={FiNavigation} />}
                    variant="outline"
                    size="sm"
                    onClick={handleGetDirections}
                  >
                    Directions
                  </Button>
                  {canJoin && (
                    <Button
                      leftIcon={<Icon as={isJoined ? FiUserMinus : FiUserPlus} />}
                      colorScheme={isJoined ? "red" : "brand"}
                      variant={isJoined ? "outline" : "solid"}
                      onClick={handleJoinTrip}
                    >
                      {isJoined ? 'Leave Trip' : 'Join Trip'}
                    </Button>
                  )}
                  {isOwner && (
                    <Button
                      colorScheme="blue"
                      variant="outline"
                    >
                      Manage Trip
                    </Button>
                  )}
                </HStack>
              </HStack>

              {/* Participants */}
              {tripData.participants.length > 0 && (
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" fontSize="sm">Participants</Text>
                  <HStack>
                    <AvatarGroup size="sm" max={6}>
                      {tripData.participants.map(participant => (
                        <Avatar
                          key={participant.id}
                          src={participant.avatar}
                          name={participant.name}
                        />
                      ))}
                    </AvatarGroup>
                    <Text fontSize="sm" color="gray.500">
                      {tripData.participants.map(p => p.name).join(', ')}
                    </Text>
                  </HStack>
                </VStack>
              )}

              {isUserAdmin && (
                <Alert status="info" size="sm">
                  <AlertIcon />
                  <Text fontSize="sm">Admin: Trip management options available</Text>
                </Alert>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Detailed Information Tabs */}
        <Card bg={bgColor}>
          <CardBody>
            <Tabs index={selectedTab} onChange={setSelectedTab}>
              <TabList>
                <Tab>Itinerary</Tab>
                <Tab>Requirements</Tab>
                <Tab>Discussion ({messages.length})</Tab>
                <Tab>Participants</Tab>
              </TabList>

              <TabPanels>
                {/* Itinerary Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={4}>
                    <Box>
                      <Heading size="md" mb={3}>Planned Stores</Heading>
                      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
                        {tripData.storesPlanned.map((store, index) => (
                          <Card key={index} variant="outline" size="sm">
                            <CardBody p={3} textAlign="center">
                              <Text fontSize="sm" fontWeight="semibold">{store}</Text>
                            </CardBody>
                          </Card>
                        ))}
                      </SimpleGrid>
                    </Box>

                    <Divider />

                    <Box>
                      <Heading size="md" mb={3}>Schedule</Heading>
                      <VStack align="stretch" spacing={3}>
                        {tripData.itinerary.map((item, index) => (
                          <HStack key={index} p={3} bg="gray.50" borderRadius="md" align="start">
                            <Badge colorScheme="blue" minW="70px">{item.time}</Badge>
                            <Text fontSize="sm">{item.activity}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Requirements Tab */}
                <TabPanel px={0}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Box>
                      <Heading size="md" mb={3}>What to Bring</Heading>
                      <VStack align="stretch" spacing={2}>
                        {tripData.requirements.map((req, index) => (
                          <HStack key={index}>
                            <Icon as={FiClock} color="green.500" />
                            <Text fontSize="sm">{req}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>

                    <Box>
                      <Heading size="md" mb={3}>Trip Rules</Heading>
                      <VStack align="stretch" spacing={2}>
                        {tripData.rules.map((rule, index) => (
                          <HStack key={index}>
                            <Icon as={FiFlag} color="red.500" />
                            <Text fontSize="sm">{rule}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </TabPanel>

                {/* Discussion Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={4}>
                    {/* Send Message */}
                    <Card variant="outline">
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <Text fontWeight="semibold" fontSize="sm">Send a Message</Text>
                          <HStack>
                            <Textarea
                              placeholder="Type your message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              resize="none"
                              rows={2}
                            />
                            <Button
                              leftIcon={<Icon as={FiSend} />}
                              colorScheme="brand"
                              onClick={handleSendMessage}
                            >
                              Send
                            </Button>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Messages */}
                    <VStack align="stretch" spacing={3}>
                      {messages.map(message => (
                        <Card key={message.id} variant="outline">
                          <CardBody>
                            <HStack align="start" spacing={3}>
                              <Avatar src={message.user.avatar} name={message.user.name} size="sm" />
                              <VStack align="stretch" flex={1} spacing={1}>
                                <HStack justify="space-between">
                                  <HStack>
                                    <Text fontWeight="semibold" fontSize="sm">{message.user.name}</Text>
                                    {message.isOrganizer && (
                                      <Badge colorScheme="blue" fontSize="xs">Organizer</Badge>
                                    )}
                                  </HStack>
                                  <Text fontSize="xs" color="gray.500">{message.timestamp}</Text>
                                </HStack>
                                <Text fontSize="sm">{message.message}</Text>
                              </VStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </VStack>
                </TabPanel>

                {/* Participants Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <Heading size="md">Trip Members</Heading>
                      <Text fontSize="sm" color="gray.500">
                        {tripData.participants.length + 1}/{tripData.maxParticipants} members
                      </Text>
                    </HStack>

                    {/* Organizer */}
                    <Card variant="outline">
                      <CardBody>
                        <HStack justify="space-between">
                          <HStack>
                            <Avatar
                              src={tripData.organizer.profilePicture}
                              name={tripData.organizer.name}
                              size="md"
                            />
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold">{tripData.organizer.name}</Text>
                              <HStack>
                                <Badge colorScheme="blue">Organizer</Badge>
                                <Text fontSize="xs" color="gray.500">
                                  {tripData.organizer.rating}⭐ • {tripData.organizer.totalTrips} trips
                                </Text>
                              </HStack>
                            </VStack>
                          </HStack>
                          <Button size="sm" leftIcon={<Icon as={FiMessageCircle} />}>
                            Message
                          </Button>
                        </HStack>
                      </CardBody>
                    </Card>

                    {/* Participants */}
                    {tripData.participants.map(participant => (
                      <Card key={participant.id} variant="outline">
                        <CardBody>
                          <HStack justify="space-between">
                            <HStack>
                              <Avatar
                                src={participant.avatar}
                                name={participant.name}
                                size="md"
                              />
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="semibold">{participant.name}</Text>
                                <Text fontSize="xs" color="gray.500">
                                  Joined {participant.joinedAt}
                                </Text>
                              </VStack>
                            </HStack>
                            <Button size="sm" leftIcon={<Icon as={FiMessageCircle} />}>
                              Message
                            </Button>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}

                    {/* Available Spots */}
                    {tripData.participants.length < tripData.maxParticipants - 1 && (
                      <Card variant="outline" borderStyle="dashed">
                        <CardBody>
                          <VStack spacing={2}>
                            <Text fontSize="sm" color="gray.500" textAlign="center">
                              {tripData.maxParticipants - tripData.participants.length - 1} more spots available
                            </Text>
                            <Button size="sm" variant="outline" disabled>
                              Waiting for more members...
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    )}
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

export default TripDetails
