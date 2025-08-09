import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Avatar,
  Badge,
  Icon,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
  Container,
  SimpleGrid,
  Progress,
  Divider,
  Image
} from '@chakra-ui/react'
import { FiStar, FiPlus, FiThumbsUp, FiFlag } from 'react-icons/fi'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    type: 'store',
    targetName: 'Brookefields Mall',
    targetImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    rating: 4.5,
    title: 'Great shopping experience',
    content: 'Amazing variety of stores and excellent customer service. The food court is also fantastic!',
    author: 'Priya Krishnan',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b89a4fa4?w=150&h=150&fit=crop&crop=face',
    date: '2024-08-05',
    likes: 12,
    verified: true
  },
  {
    id: '2',
    type: 'trip',
    targetName: 'Electronics Shopping Trip',
    rating: 5.0,
    title: 'Best shopping buddy experience!',
    content: 'Lakshmi was an amazing shopping companion. Very knowledgeable about electronics and helped me get great deals.',
    author: 'Rajesh Kumar',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    date: '2024-08-03',
    likes: 8,
    verified: false
  }
]

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          as={FiStar}
          boxSize={5}
          color={star <= (hoverRating || rating) ? 'yellow.400' : 'gray.300'}
          fill={star <= (hoverRating || rating) ? 'yellow.400' : 'transparent'}
          cursor={readonly ? 'default' : 'pointer'}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
        />
      ))}
      {readonly && (
        <Text ml={2} fontSize="sm" color="gray.600">
          {rating.toFixed(1)}
        </Text>
      )}
    </HStack>
  )
}

const ReviewCard = ({ review }) => {
  const toast = useToast()

  const handleLike = () => {
    toast({
      title: 'Review Liked',
      status: 'success',
      duration: 2000,
    })
  }

  const handleReport = () => {
    toast({
      title: 'Review Reported',
      description: 'Thank you for reporting. We will review this content.',
      status: 'info',
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          {/* Review Header */}
          <HStack justify="space-between">
            <HStack>
              <Avatar size="sm" src={review.authorAvatar} name={review.author} />
              <VStack align="start" spacing={0}>
                <HStack>
                  <Text fontWeight="semibold" fontSize="sm">
                    {review.author}
                  </Text>
                  {review.verified && (
                    <Badge colorScheme="green" size="sm">
                      Verified
                    </Badge>
                  )}
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  {review.date}
                </Text>
              </VStack>
            </HStack>
            <StarRating rating={review.rating} readonly />
          </HStack>

          {/* Target Info */}
          <HStack>
            {review.targetImage && (
              <Image
                src={review.targetImage}
                alt={review.targetName}
                boxSize="40px"
                objectFit="cover"
                rounded="md"
              />
            )}
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" fontWeight="medium">
                {review.targetName}
              </Text>
              <Badge colorScheme={review.type === 'store' ? 'blue' : 'purple'} size="sm">
                {review.type === 'store' ? 'Store' : 'Trip'}
              </Badge>
            </VStack>
          </HStack>

          {/* Review Content */}
          <VStack align="stretch" spacing={2}>
            <Text fontWeight="semibold">{review.title}</Text>
            <Text fontSize="sm" color="gray.700">
              {review.content}
            </Text>
          </VStack>

          {/* Actions */}
          <HStack justify="space-between">
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FiThumbsUp />}
              onClick={handleLike}
            >
              {review.likes}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FiFlag />}
              onClick={handleReport}
              color="gray.500"
            >
              Report
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

const AddReviewModal = ({ isOpen, onClose, type, targetName }) => {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const toast = useToast()

  const handleSubmit = () => {
    if (rating === 0 || !title || !content) {
      toast({
        title: 'Please fill all fields',
        status: 'error',
        duration: 3000,
      })
      return
    }

    toast({
      title: 'Review Submitted',
      description: 'Thank you for your review!',
      status: 'success',
      duration: 3000,
    })

    // Reset form
    setRating(0)
    setTitle('')
    setContent('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Review - {targetName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <StarRating rating={rating} onRatingChange={setRating} />
            </FormControl>

            <FormControl>
              <FormLabel>Review Title</FormLabel>
              <Textarea
                placeholder="Brief title for your review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={1}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Your Review</FormLabel>
              <Textarea
                placeholder="Share your experience..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit Review
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const Reviews = () => {
  const { user } = useAuthStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedType, setSelectedType] = useState('all')
  const [reviewTarget, setReviewTarget] = useState('')

  const filteredReviews = selectedType === 'all' 
    ? mockReviews 
    : mockReviews.filter(review => review.type === selectedType)

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length
  const ratingDistribution = {
    5: mockReviews.filter(r => r.rating >= 4.5).length,
    4: mockReviews.filter(r => r.rating >= 3.5 && r.rating < 4.5).length,
    3: mockReviews.filter(r => r.rating >= 2.5 && r.rating < 3.5).length,
    2: mockReviews.filter(r => r.rating >= 1.5 && r.rating < 2.5).length,
    1: mockReviews.filter(r => r.rating < 1.5).length,
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Reviews & Ratings</Heading>
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={() => {
              setReviewTarget('Demo Store/Trip')
              onOpen()
            }}
          >
            Add Review
          </Button>
        </HStack>

        {/* Statistics */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card>
            <CardBody textAlign="center">
              <VStack spacing={2}>
                <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                  {averageRating.toFixed(1)}
                </Text>
                <StarRating rating={averageRating} readonly />
                <Text color="gray.600">Average Rating</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack spacing={3} align="stretch">
                <Text fontWeight="semibold">Rating Distribution</Text>
                {[5, 4, 3, 2, 1].map((star) => (
                  <HStack key={star}>
                    <Text fontSize="sm" w="10px">{star}</Text>
                    <Icon as={FiStar} color="yellow.400" boxSize={3} />
                    <Progress
                      value={(ratingDistribution[star] / mockReviews.length) * 100}
                      colorScheme="yellow"
                      flex={1}
                      size="sm"
                    />
                    <Text fontSize="sm" color="gray.600" w="20px">
                      {ratingDistribution[star]}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <VStack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  {mockReviews.length}
                </Text>
                <Text color="gray.600">Total Reviews</Text>
                <Text fontSize="sm" color="gray.500">
                  {mockReviews.filter(r => r.verified).length} verified
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Filter */}
        <HStack>
          <Text fontWeight="medium">Filter by type:</Text>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            w="200px"
          >
            <option value="all">All Reviews</option>
            <option value="store">Store Reviews</option>
            <option value="trip">Trip Reviews</option>
          </Select>
        </HStack>

        {/* Reviews List */}
        <VStack spacing={4} align="stretch">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </VStack>

        {/* Add Review Modal */}
        <AddReviewModal
          isOpen={isOpen}
          onClose={onClose}
          type="store"
          targetName={reviewTarget}
        />
      </VStack>
    </Container>
  )
}

export default Reviews
