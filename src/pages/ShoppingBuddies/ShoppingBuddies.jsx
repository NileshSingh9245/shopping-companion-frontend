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
  Avatar,
  Badge,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  useColorModeValue,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Divider,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react'
import { 
  FiSearch, 
  FiMapPin, 
  FiStar, 
  FiHeart,
  FiMessageCircle,
  FiUserPlus,
  FiFilter,
  FiShield,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiFlag
} from 'react-icons/fi'
import { useState, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const BuddyCard = ({ buddy, onConnect, onReport, isAdmin, currentUserId }) => {
  const toast = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const handleConnect = () => {
    if (isConnected) {
      setIsConnected(false)
      toast({
        title: 'Connection removed',
        description: `You have disconnected from ${buddy.name}`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    } else {
      setIsConnected(true)
      toast({
        title: 'Connection sent!',
        description: `Request sent to ${buddy.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleMessage = () => {
    toast({
      title: 'Message feature',
      description: 'Messaging feature coming soon!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleReport = () => {
    onReport(buddy.id)
    onClose()
    toast({
      title: 'User reported',
      description: 'Thank you for reporting. We will review this user.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const isOwnProfile = buddy.id === currentUserId

  return (
    <>
      <Card overflow="hidden" shadow="md" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s">
        <CardBody>
          <VStack spacing={4}>
            <HStack w="full" justify="space-between" align="start">
              <VStack spacing={2}>
                <Avatar
                  src={buddy.avatar}
                  name={buddy.name}
                  size="lg"
                />
                <VStack spacing={0} textAlign="center">
                  <Heading size="sm" noOfLines={1}>{buddy.name}</Heading>
                  <Text fontSize="xs" color="gray.500">
                    {buddy.location.area}, {buddy.location.city}
                  </Text>
                </VStack>
              </VStack>
              <VStack spacing={1} align="end">
                {buddy.isVerified && (
                  <Badge colorScheme="green" fontSize="xs">
                    <Icon as={FiShield} mr={1} />
                    Verified
                  </Badge>
                )}
                {buddy.role === 'admin' && (
                  <Badge colorScheme="red" fontSize="xs">
                    <Icon as={FiShield} mr={1} />
                    Admin
                  </Badge>
                )}
                {!isOwnProfile && (
                  <IconButton
                    icon={<Icon as={FiFlag} />}
                    variant="ghost"
                    size="xs"
                    colorScheme="red"
                    onClick={onOpen}
                    aria-label="Report user"
                  />
                )}
              </VStack>
            </HStack>

            <VStack spacing={2} w="full">
              <HStack justify="center">
                <Icon as={FiStar} color="yellow.400" />
                <Text fontWeight="semibold">{buddy.buddyRating}</Text>
                <Text fontSize="sm" color="gray.500">({buddy.totalTrips} trips)</Text>
              </HStack>

              <StatGroup size="sm" w="full" textAlign="center">
                <Stat>
                  <StatLabel fontSize="xs">Rating</StatLabel>
                  <StatNumber fontSize="sm">{buddy.buddyRating}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel fontSize="xs">Trips</StatLabel>
                  <StatNumber fontSize="sm">{buddy.totalTrips}</StatNumber>
                </Stat>
              </StatGroup>
            </VStack>

            <Text fontSize="sm" color="gray.600" noOfLines={2} textAlign="center">
              {buddy.bio}
            </Text>

            <VStack spacing={2} w="full">
              <Text fontSize="xs" color="gray.500" fontWeight="semibold">Shopping Interests</Text>
              <Wrap justify="center">
                {buddy.preferences.shoppingCategories.slice(0, 3).map((category, index) => (
                  <WrapItem key={index}>
                    <Tag size="sm" colorScheme="brand" variant="subtle">
                      <TagLabel>{category}</TagLabel>
                    </Tag>
                  </WrapItem>
                ))}
                {buddy.preferences.shoppingCategories.length > 3 && (
                  <WrapItem>
                    <Tag size="sm" variant="outline">
                      <TagLabel>+{buddy.preferences.shoppingCategories.length - 3}</TagLabel>
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            </VStack>

            <VStack spacing={1} w="full">
              <Text fontSize="xs" color="gray.500">Budget Range</Text>
              <Badge colorScheme="purple" variant="subtle">
                {buddy.preferences.budget}
              </Badge>
            </VStack>

            <VStack spacing={1} w="full">
              <Text fontSize="xs" color="gray.500">Languages</Text>
              <Wrap justify="center">
                {buddy.preferences.languages.map((lang, index) => (
                  <WrapItem key={index}>
                    <Badge size="sm" variant="outline">
                      {lang}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>

            <Divider />

            {!isOwnProfile && (
              <HStack spacing={2} w="full">
                <Button
                  size="sm"
                  colorScheme={isConnected ? "red" : "brand"}
                  variant={isConnected ? "outline" : "solid"}
                  leftIcon={<Icon as={FiUserPlus} />}
                  onClick={handleConnect}
                  flex={1}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </Button>
                <IconButton
                  icon={<Icon as={FiMessageCircle} />}
                  size="sm"
                  variant="outline"
                  onClick={handleMessage}
                  aria-label="Send message"
                />
              </HStack>
            )}

            {isOwnProfile && (
              <Button
                as={RouterLink}
                to="/profile"
                size="sm"
                colorScheme="blue"
                variant="outline"
                w="full"
              >
                Edit Profile
              </Button>
            )}
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
              Report User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to report {buddy.name}? Please only report users who violate community guidelines.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleReport} ml={3}>
                Report
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

const ShoppingBuddies = () => {
  const { user, isAdmin } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [areaFilter, setAreaFilter] = useState('')
  const [budgetFilter, setBudgetFilter] = useState('')
  
  const isUserAdmin = isAdmin()
  const currentUserId = user?.id

  // Mock data for demo - Coimbatore based
  const [buddies] = useState([
    {
      id: '1',
      name: 'Priya Krishnan',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      location: {
        area: 'Sarvanampatti',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0696, longitude: 77.0428 }
      },
      preferences: {
        shoppingCategories: ['electronics', 'clothing', 'books'],
        budget: 'mid-range',
        languages: ['Tamil', 'English']
      },
      isVerified: true,
      buddyRating: 4.8,
      totalTrips: 15,
      bio: 'Love exploring new stores and finding great deals! Native Tamil speaker, happy to help newcomers.'
    },
    {
      id: '2',
      name: 'Arjun Venkatesh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: {
        area: 'Sarvanampatti',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0712, longitude: 77.0445 }
      },
      preferences: {
        shoppingCategories: ['electronics', 'sports', 'gadgets'],
        budget: 'premium',
        languages: ['Tamil', 'English', 'Hindi']
      },
      isVerified: true,
      buddyRating: 4.6,
      totalTrips: 22,
      bio: 'Tech enthusiast and gadget lover. Always looking for the latest electronics and best deals.'
    },
    {
      id: '3',
      name: 'Sneha Raj',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: {
        area: 'Brookefields',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0165, longitude: 77.0088 }
      },
      preferences: {
        shoppingCategories: ['clothing', 'accessories', 'cosmetics'],
        budget: 'luxury',
        languages: ['Tamil', 'English']
      },
      isVerified: true,
      buddyRating: 4.9,
      totalTrips: 18,
      bio: 'Fashion enthusiast and style blogger. Love helping others find their perfect style!'
    },
    {
      id: '4',
      name: 'Meera Iyer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: {
        area: 'Gandhipuram',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0168, longitude: 76.9558 }
      },
      preferences: {
        shoppingCategories: ['grocery', 'home-decor', 'organic'],
        budget: 'budget',
        languages: ['Tamil', 'English', 'Malayalam']
      },
      isVerified: true,
      buddyRating: 4.7,
      totalTrips: 12,
      bio: 'Sustainable living advocate. Expert in finding eco-friendly and budget shopping options.'
    },
    {
      id: '5',
      name: 'Admin VibeCoding',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      location: {
        area: 'Sarvanampatti',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0696, longitude: 77.0428 }
      },
      preferences: {
        shoppingCategories: ['all'],
        budget: 'all',
        languages: ['Tamil', 'English', 'Hindi']
      },
      isVerified: true,
      role: 'admin',
      buddyRating: 5.0,
      totalTrips: 50,
      bio: 'Platform administrator and VibeCoding expert. Ensuring great shopping experiences for everyone!'
    },
    {
      id: '6',
      name: 'Vishnu Raj',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      location: {
        area: 'Peelamedu',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0315, longitude: 77.0288 }
      },
      preferences: {
        shoppingCategories: ['furniture', 'home-decor', 'appliances'],
        budget: 'premium',
        languages: ['Tamil', 'English']
      },
      isVerified: false,
      buddyRating: 4.3,
      totalTrips: 8,
      bio: 'Interior design enthusiast. Love finding unique pieces for home decoration.'
    }
  ])

  const filteredBuddies = buddies.filter(buddy => {
    const matchesSearch = buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buddy.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buddy.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buddy.preferences.shoppingCategories.some(cat => 
                           cat.toLowerCase().includes(searchQuery.toLowerCase())
                         )
    
    const matchesCategory = !categoryFilter || 
                           buddy.preferences.shoppingCategories.includes(categoryFilter)
    const matchesArea = !areaFilter || buddy.location.area === areaFilter
    const matchesBudget = !budgetFilter || buddy.preferences.budget === budgetFilter

    return matchesSearch && matchesCategory && matchesArea && matchesBudget
  })

  const categories = [...new Set(buddies.flatMap(buddy => buddy.preferences.shoppingCategories))]
  const areas = [...new Set(buddies.map(buddy => buddy.location.area))]
  const budgets = [...new Set(buddies.map(buddy => buddy.preferences.budget))]

  const handleConnect = (buddyId) => {
    // Handle buddy connection logic
  }

  const handleReport = (buddyId) => {
    // Handle buddy reporting logic
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={1}>
          <Heading size="lg">Shopping Buddies in Coimbatore</Heading>
          <Text color="gray.600">
            Connect with fellow shopping enthusiasts in your area
          </Text>
        </VStack>

        {/* Filters */}
        <Card>
          <CardBody>
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search buddies by name, interests, or location..."
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
                  placeholder="All Budgets"
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  maxW="200px"
                >
                  {budgets.map(budget => (
                    <option key={budget} value={budget}>
                      {budget.charAt(0).toUpperCase() + budget.slice(1)}
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
                    setBudgetFilter('')
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
            Showing {filteredBuddies.length} of {buddies.length} shopping buddies
          </Text>
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.500">Sort by:</Text>
            <Select size="sm" w="auto">
              <option value="rating">Rating</option>
              <option value="trips">Total Trips</option>
              <option value="name">Name</option>
            </Select>
          </HStack>
        </HStack>

        {/* Buddies Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {filteredBuddies.map(buddy => (
            <BuddyCard
              key={buddy.id}
              buddy={buddy}
              onConnect={handleConnect}
              onReport={handleReport}
              isAdmin={isUserAdmin}
              currentUserId={currentUserId}
            />
          ))}
        </SimpleGrid>

        {/* Empty state */}
        {filteredBuddies.length === 0 && (
          <Card py={12}>
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Icon as={FiUsers} boxSize={12} color="gray.400" />
                <Heading size="md" color="gray.500">No shopping buddies found</Heading>
                <Text color="gray.500">
                  Try adjusting your search criteria or explore different areas
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Container>
  )
}

export default ShoppingBuddies
