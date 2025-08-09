import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Icon,
  Image,
  Badge,
  HStack
} from '@chakra-ui/react'
import { 
  FiCalendar, 
  FiMapPin, 
  FiUsers, 
  FiClock,
  FiExternalLink
} from 'react-icons/fi'

const EventCard = ({ event }) => (
  <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
    <Image
      src={event.image}
      alt={event.title}
      height="200px"
      objectFit="cover"
      borderTopRadius="md"
    />
    <CardBody>
      <VStack spacing={4} align="stretch">
        <VStack align="start" spacing={2}>
          <Badge colorScheme={event.type === 'workshop' ? 'blue' : event.type === 'sale' ? 'red' : 'green'}>
            {event.type}
          </Badge>
          <Heading size="md" noOfLines={2}>
            {event.title}
          </Heading>
          <Text color="gray.600" fontSize="sm" noOfLines={3}>
            {event.description}
          </Text>
        </VStack>
        
        <VStack spacing={2} align="stretch" fontSize="sm" color="gray.600">
          <HStack>
            <Icon as={FiCalendar} />
            <Text>{event.date}</Text>
          </HStack>
          <HStack>
            <Icon as={FiClock} />
            <Text>{event.time}</Text>
          </HStack>
          <HStack>
            <Icon as={FiMapPin} />
            <Text>{event.location}</Text>
          </HStack>
          <HStack>
            <Icon as={FiUsers} />
            <Text>{event.attendees} attending</Text>
          </HStack>
        </VStack>
        
        <Button
          colorScheme="brand"
          size="sm"
          rightIcon={<Icon as={FiExternalLink} />}
          onClick={() => window.open(event.link, '_blank')}
        >
          Learn More
        </Button>
      </VStack>
    </CardBody>
  </Card>
)

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Mega Shopping Festival 2025',
      description: 'Join the biggest shopping event of the year with up to 70% off on all major brands across Coimbatore.',
      type: 'sale',
      date: 'Jan 15-20, 2025',
      time: '10:00 AM - 10:00 PM',
      location: 'All Partner Malls',
      attendees: 1250,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      link: '#'
    },
    {
      id: 2,
      title: 'Smart Shopping Workshop',
      description: 'Learn budgeting tips, bargaining techniques, and how to find the best deals in Coimbatore markets.',
      type: 'workshop',
      date: 'Jan 25, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Community Center, RS Puram',
      attendees: 85,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      link: '#'
    },
    {
      id: 3,
      title: 'Local Artisan Market',
      description: 'Discover unique handmade products from local artisans and support the creative community.',
      type: 'market',
      date: 'Feb 2, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Tidel Park Grounds',
      attendees: 420,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
      link: '#'
    },
    {
      id: 4,
      title: 'Tech Gadgets Expo',
      description: 'Explore the latest technology trends, test new gadgets, and get exclusive launch offers.',
      type: 'expo',
      date: 'Feb 10, 2025',
      time: '11:00 AM - 8:00 PM',
      location: 'CODISSIA Trade Fair Complex',
      attendees: 650,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      link: '#'
    }
  ]

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            Shopping Events
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            Stay updated with the latest shopping events, sales, workshops, and community gatherings in Coimbatore
          </Text>
        </Box>

        {/* Upcoming Events */}
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Upcoming Events</Heading>
            <Button colorScheme="brand">
              Submit Event
            </Button>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>
        </VStack>

        {/* Event Categories */}
        <Card bg="gray.50">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md">Event Categories</Heading>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
                <VStack spacing={2} textAlign="center">
                  <Badge colorScheme="red" p={2} borderRadius="full">
                    SALES
                  </Badge>
                  <Text fontSize="sm">Mega Sales & Discounts</Text>
                </VStack>
                <VStack spacing={2} textAlign="center">
                  <Badge colorScheme="blue" p={2} borderRadius="full">
                    WORKSHOPS
                  </Badge>
                  <Text fontSize="sm">Learning & Skills</Text>
                </VStack>
                <VStack spacing={2} textAlign="center">
                  <Badge colorScheme="green" p={2} borderRadius="full">
                    MARKETS
                  </Badge>
                  <Text fontSize="sm">Local Markets</Text>
                </VStack>
                <VStack spacing={2} textAlign="center">
                  <Badge colorScheme="purple" p={2} borderRadius="full">
                    EXPOS
                  </Badge>
                  <Text fontSize="sm">Product Exhibitions</Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default Events
