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
  Icon,
  HStack,
  useToast
} from '@chakra-ui/react'
import { 
  FiStar, 
  FiThumbsUp, 
  FiThumbsDown, 
  FiMapPin,
  FiCalendar,
  FiUser,
  FiShoppingBag
} from 'react-icons/fi'
import { useState } from 'react'

const ReviewCard = ({ review }) => (
  <Card variant="outline">
    <CardBody>
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{review.storeName}</Text>
            <HStack>
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  as={FiStar}
                  color={i < review.rating ? 'yellow.400' : 'gray.300'}
                  boxSize={4}
                />
              ))}
              <Text fontSize="sm" color="gray.600">
                {review.rating}/5
              </Text>
            </HStack>
          </VStack>
          <Badge colorScheme={review.recommended ? 'green' : 'red'}>
            {review.recommended ? 'Recommended' : 'Not Recommended'}
          </Badge>
        </HStack>
        
        <Text color="gray.700">{review.comment}</Text>
        
        <HStack justify="space-between" fontSize="sm" color="gray.500">
          <HStack>
            <Icon as={FiUser} />
            <Text>{review.reviewerName}</Text>
          </HStack>
          <HStack>
            <Icon as={FiCalendar} />
            <Text>{review.date}</Text>
          </HStack>
        </HStack>
        
        <HStack spacing={4}>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Icon as={FiThumbsUp} />}
            colorScheme="green"
          >
            {review.helpful}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Icon as={FiThumbsDown} />}
            colorScheme="red"
          >
            {review.notHelpful}
          </Button>
        </HStack>
      </VStack>
    </CardBody>
  </Card>
)

const Reviews = () => {
  const toast = useToast()
  const [reviews] = useState([
    {
      id: 1,
      storeName: 'Brookefields Mall',
      rating: 4,
      comment: 'Great shopping experience! Wide variety of stores and excellent food court. The group discount was a nice bonus.',
      reviewerName: 'Priya K.',
      date: '2 days ago',
      recommended: true,
      helpful: 12,
      notHelpful: 1
    },
    {
      id: 2,
      storeName: 'Fun Republic Mall',
      rating: 5,
      comment: 'Amazing place for family shopping trips. The kids loved the gaming zone while we shopped. Clean and well-maintained.',
      reviewerName: 'Rajesh M.',
      date: '1 week ago',
      recommended: true,
      helpful: 8,
      notHelpful: 0
    },
    {
      id: 3,
      storeName: 'Big Bazaar',
      rating: 3,
      comment: 'Good for bulk shopping and groceries. Can get crowded during weekends. Prices are reasonable.',
      reviewerName: 'Anitha S.',
      date: '2 weeks ago',
      recommended: true,
      helpful: 5,
      notHelpful: 2
    }
  ])

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            Store Reviews
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Read honest reviews from our community members about their shopping experiences
          </Text>
        </Box>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          <Card textAlign="center">
            <CardBody>
              <VStack>
                <Heading size="lg" color="brand.500">2,459</Heading>
                <Text color="gray.600">Total Reviews</Text>
              </VStack>
            </CardBody>
          </Card>
          <Card textAlign="center">
            <CardBody>
              <VStack>
                <Heading size="lg" color="green.500">4.3</Heading>
                <Text color="gray.600">Average Rating</Text>
              </VStack>
            </CardBody>
          </Card>
          <Card textAlign="center">
            <CardBody>
              <VStack>
                <Heading size="lg" color="blue.500">156</Heading>
                <Text color="gray.600">Stores Reviewed</Text>
              </VStack>
            </CardBody>
          </Card>
          <Card textAlign="center">
            <CardBody>
              <VStack>
                <Heading size="lg" color="purple.500">89%</Heading>
                <Text color="gray.600">Recommended</Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Reviews Grid */}
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Recent Reviews</Heading>
            <Button colorScheme="brand" leftIcon={<Icon as={FiShoppingBag} />}>
              Write a Review
            </Button>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </SimpleGrid>
        </VStack>

        {/* CTA */}
        <Card bg="brand.50" textAlign="center">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md">Share Your Shopping Experience</Heading>
              <Text color="gray.600">
                Help other shoppers by sharing your honest reviews and recommendations
              </Text>
              <Button
                colorScheme="brand"
                size="lg"
                onClick={() => {
                  toast({
                    title: 'Feature Coming Soon',
                    description: 'Review submission will be available soon!',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                  })
                }}
              >
                Start Writing Reviews
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default Reviews
