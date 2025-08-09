import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Card,
  CardBody,
  Stack,
  Badge,
  Icon,
  useColorModeValue,
  Flex,
  Avatar,
  CardHeader,
  IconButton
} from '@chakra-ui/react'
import { FiUsers, FiMapPin, FiShoppingBag, FiStar, FiArrowRight, FiHeart } from 'react-icons/fi'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Dummy data for featured stores
const featuredStores = [
  {
    id: '1',
    name: 'Brookefields Mall',
    category: 'Shopping Mall',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 3240,
    location: 'R.S. Puram, Coimbatore',
    priceRange: 'Mid-range'
  },
  {
    id: '2',
    name: 'Reliance Digital Sarvanampatti',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    rating: 4.1,
    reviews: 890,
    location: 'Sarvanampatti, Coimbatore',
    priceRange: 'Mid-range'
  },
  {
    id: '5',
    name: 'Kumaran Stores',
    category: 'Traditional Items',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 234,
    location: 'Sarvanampatti Village Road',
    priceRange: 'Budget'
  }
]

// Dummy data for active trips
const activeTrips = [
  {
    id: '1',
    title: 'Electronics Shopping at Sarvanampatti',
    organizer: 'Priya Krishnan',
    participants: 1,
    maxParticipants: 4,
    date: 'Tomorrow',
    category: 'Electronics'
  },
  {
    id: '2',
    title: 'Weekend Family Shopping',
    organizer: 'Lakshmi Subramanian',
    participants: 1,
    maxParticipants: 6,
    date: 'This Weekend',
    category: 'Grocery'
  },
  {
    id: '3',
    title: 'Traditional Shopping for Pongal',
    organizer: 'Lakshmi Subramanian',
    participants: 0,
    maxParticipants: 5,
    date: 'Next Week',
    category: 'Traditional'
  }
]

const StoreCard = ({ store }) => {
  const navigate = useNavigate()
  
  return (
    <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s" cursor="pointer"
          onClick={() => navigate(`/stores/${store.id}`)}>
      <Box position="relative">
        <Image
          src={store.image}
          alt={store.name}
          h="200px"
          w="100%"
          objectFit="cover"
        />
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="blue"
          variant="solid"
        >
          {store.category}
        </Badge>
      </Box>
      <CardBody>
        <VStack align="start" spacing={2}>
          <Heading size="md">{store.name}</Heading>
          <HStack>
            <Icon as={FiStar} color="yellow.400" />
            <Text fontWeight="semibold">{store.rating}</Text>
            <Text color="gray.500">({store.reviews} reviews)</Text>
          </HStack>
          <HStack>
            <Icon as={FiMapPin} color="gray.400" />
            <Text fontSize="sm" color="gray.600">{store.location}</Text>
          </HStack>
          <Badge colorScheme="green" variant="subtle">
            {store.priceRange}
          </Badge>
        </VStack>
      </CardBody>
    </Card>
  )
}

const TripCard = ({ trip }) => {
  const navigate = useNavigate()
  
  return (
    <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s" cursor="pointer"
          onClick={() => navigate(`/shopping-trips/${trip.id}`)}>
      <CardBody>
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" w="100%">
            <Badge colorScheme="purple" variant="subtle">
              {trip.category}
            </Badge>
            <Text fontSize="sm" color="gray.500">{trip.date}</Text>
          </HStack>
          <Heading size="sm">{trip.title}</Heading>
          <Text fontSize="sm" color="gray.600">Organized by {trip.organizer}</Text>
          <HStack>
            <Icon as={FiUsers} color="blue.400" />
            <Text fontSize="sm">
              {trip.participants}/{trip.maxParticipants} participants
            </Text>
          </HStack>
          <Button size="sm" colorScheme="blue" variant="outline" w="100%">
            View Details
          </Button>
        </VStack>
      </CardBody>
    </Card>
  )
}

const FeatureCard = ({ icon, title, description, color }) => (
  <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
    <CardBody>
      <VStack spacing={4} align="center" textAlign="center">
        <Box p={3} bg={`${color}.100`} rounded="full">
          <Icon as={icon} boxSize={6} color={`${color}.500`} />
        </Box>
        <Heading size="md">{title}</Heading>
        <Text color="gray.600">{description}</Text>
      </VStack>
    </CardBody>
  </Card>
)

const StatCard = ({ number, label }) => (
  <VStack>
    <Text fontSize="3xl" fontWeight="bold" color="brand.500">
      {number}
    </Text>
    <Text color="gray.600">{label}</Text>
  </VStack>
)

const Home = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.400, brand.600)',
    'linear(to-r, brand.200, brand.400)'
  )

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={bgGradient}
        color="white"
        py={20}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
            <VStack spacing={6} align="start">
              <Badge colorScheme="yellow" px={3} py={1} rounded="full">
                AI-Powered Shopping Companion
              </Badge>
              <Heading size="2xl" lineHeight="shorter">
                Find Shopping Buddies in Your Area
              </Heading>
              <Text fontSize="xl" opacity={0.9}>
                Connect with like-minded shoppers, discover the best stores, and make 
                shopping a social experience. Join the largest shopping community in India.
              </Text>
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/register"
                  size="lg"
                  bg="white"
                  color="brand.500"
                  _hover={{ bg: 'gray.100' }}
                  rightIcon={<FiArrowRight />}
                >
                  Get Started
                </Button>
                <Button
                  as={RouterLink}
                  to="/stores"
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  Explore Stores
                </Button>
              </HStack>
            </VStack>
            
            <Box>
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="Shopping together"
                rounded="xl"
                shadow="2xl"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box id="stats-section" py={16} bg="gray.50">
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} textAlign="center">
            <StatCard number="5,000+" label="Active Users" />
            <StatCard number="1,200+" label="Stores Listed" />
            <StatCard number="800+" label="Completed Trips" />
            <StatCard number="4.8" label="Average Rating" />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Featured Stores Section */}
      <Box id="stores-section" py={16}>
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Featured Stores in Coimbatore</Heading>
              <Text color="gray.600" fontSize="lg">
                Discover the best shopping destinations in Sarvanampatti area
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
              {featuredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </SimpleGrid>
            
            <Button as={RouterLink} to="/stores" colorScheme="blue" size="lg">
              View All Stores
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Active Trips Section */}
      <Box id="trips-section" py={16} bg="gray.50">
        <Container maxW="7xl">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Join Active Shopping Trips</Heading>
              <Text color="gray.600" fontSize="lg">
                Connect with fellow shoppers and explore Coimbatore together
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
              {activeTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </SimpleGrid>
            
            <Button as={RouterLink} to="/shopping-trips" colorScheme="purple" size="lg">
              View All Trips
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features-section" py={20}>
        <Container maxW="7xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Why Choose Shopping Companion?</Heading>
              <Text color="gray.600" fontSize="lg" maxW="2xl">
                Experience the future of social shopping with our AI-powered platform 
                designed specifically for the Indian market
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              <FeatureCard
                icon={FiMapPin}
                title="Find Nearby"
                description="Discover stores and shopping companions in your area using location-based search"
                color="blue"
              />
              <FeatureCard
                icon={FiUsers}
                title="Join Groups"
                description="Connect with shopping buddies and join group shopping trips for better deals"
                color="green"
              />
              <FeatureCard
                icon={FiShoppingBag}
                title="Share Reviews"
                description="Read and write reviews about stores and shopping experiences"
                color="purple"
              />
              <FeatureCard
                icon={FiStar}
                title="Build Reputation"
                description="Gain trust and credibility through verified reviews and successful trips"
                color="orange"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box id="cta-section" py={20} bg="brand.500" color="white">
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl">Ready to Start Shopping Together?</Heading>
            <Text fontSize="lg" maxW="2xl">
              Join thousands of shoppers who have already discovered the joy of 
              shopping with companions. Create your account and find your shopping tribe today.
            </Text>
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/register"
                size="lg"
                bg="white"
                color="brand.500"
                _hover={{ bg: 'gray.100' }}
              >
                Sign Up Free
              </Button>
              <Button
                as={RouterLink}
                to="/shopping-trips"
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                Browse Trips
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
