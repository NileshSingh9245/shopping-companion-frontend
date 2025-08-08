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
  Image,
  Badge,
  Button,
  Icon,
  Divider,
  useColorModeValue,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  Avatar,
  Progress,
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
  Select
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { 
  FiMapPin, 
  FiStar, 
  FiClock, 
  FiPhone, 
  FiExternalLink,
  FiHeart,
  FiShare2,
  FiEdit,
  FiFlag,
  FiNavigation,
  FiCamera,
  FiCalendar
} from 'react-icons/fi'
import { useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const StoreDetails = () => {
  const { storeId } = useParams()
  const { user, isAdmin } = useAuthStore()
  const toast = useToast()
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  
  const isUserAdmin = isAdmin()
  const bgColor = useColorModeValue('white', 'gray.800')

  // Mock store data based on storeId
  const storeData = {
    id: storeId,
    name: 'Phoenix Mall Coimbatore',
    location: {
      area: 'Brookefields',
      city: 'Coimbatore',
      address: '154, Avinashi Road, Brookefields, Coimbatore, Tamil Nadu 641014',
      coordinates: { latitude: 11.0168, longitude: 77.0061 }
    },
    categories: ['Mall', 'Fashion', 'Electronics', 'Food Court', 'Entertainment'],
    rating: 4.6,
    reviewCount: 324,
    timing: {
      weekdays: '10:00 AM - 10:00 PM',
      weekends: '10:00 AM - 11:00 PM'
    },
    isOpen: true,
    phone: '+91-422-6677888',
    website: 'https://phoenixmallcoimbatore.com',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1580745332705-c6ec3d9db0ad?w=800&h=400&fit=crop'
    ],
    description: 'Phoenix Mall Coimbatore is a premier shopping destination offering a wide range of retail stores, dining options, and entertainment facilities. Located in the heart of Brookefields, it features both international and local brands.',
    amenities: ['Parking', 'Food Court', 'Cinema', 'Kids Play Area', 'ATM', 'Restrooms', 'Wi-Fi'],
    popularBrands: ['Reliance Digital', 'Lifestyle', 'Max Fashion', 'Pizza Hut', 'KFC', 'Starbucks'],
    verificationStatus: 'verified'
  }

  const reviews = [
    {
      id: '1',
      user: { name: 'Priya Krishnan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face' },
      rating: 5,
      comment: 'Excellent shopping mall with great variety of stores. Clean and well-maintained.',
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: '2',
      user: { name: 'Arjun Venkatesh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
      rating: 4,
      comment: 'Good collection of brands and restaurants. Parking can be challenging during weekends.',
      date: '2024-01-10',
      helpful: 8
    },
    {
      id: '3',
      user: { name: 'Sneha Raj', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
      rating: 5,
      comment: 'Love the ambiance and the food court has amazing options. Perfect for family outings.',
      date: '2024-01-08',
      helpful: 15
    }
  ]

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? 'Removed from favorites' : 'Added to favorites',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
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
    const { latitude, longitude } = storeData.location.coordinates
    window.open(`https://maps.google.com?q=${latitude},${longitude}`, '_blank')
  }

  const handleSubmitReview = () => {
    if (newReview.comment.trim()) {
      toast({
        title: 'Review submitted',
        description: 'Thank you for your review!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setNewReview({ rating: 5, comment: '' })
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        as={FiStar}
        color={i < rating ? 'yellow.400' : 'gray.300'}
        fill={i < rating ? 'currentColor' : 'none'}
      />
    ))
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/stores">Stores</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{storeData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Main Store Info */}
        <Card bg={bgColor}>
          <CardBody>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Images */}
              <Box>
                <Image
                  src={storeData.images[0]}
                  alt={storeData.name}
                  borderRadius="lg"
                  w="full"
                  h="300px"
                  objectFit="cover"
                />
                <HStack mt={2} spacing={2}>
                  {storeData.images.slice(1, 3).map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${storeData.name} ${index + 2}`}
                      borderRadius="md"
                      w="100px"
                      h="80px"
                      objectFit="cover"
                      cursor="pointer"
                    />
                  ))}
                  <Box
                    w="100px"
                    h="80px"
                    bg="gray.100"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                  >
                    <VStack spacing={1}>
                      <Icon as={FiCamera} color="gray.500" />
                      <Text fontSize="xs" color="gray.500">+{storeData.images.length - 3} more</Text>
                    </VStack>
                  </Box>
                </HStack>
              </Box>

              {/* Store Info */}
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={1}>
                    <Heading size="lg">{storeData.name}</Heading>
                    <HStack>
                      <Icon as={FiMapPin} color="gray.500" />
                      <Text color="gray.600">{storeData.location.area}, {storeData.location.city}</Text>
                    </HStack>
                  </VStack>
                  <HStack>
                    <Button
                      leftIcon={<Icon as={FiHeart} color={isFavorited ? 'red.500' : 'gray.400'} />}
                      variant="outline"
                      size="sm"
                      onClick={handleFavorite}
                    >
                      {isFavorited ? 'Favorited' : 'Favorite'}
                    </Button>
                    <Button
                      leftIcon={<Icon as={FiShare2} />}
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                    >
                      Share
                    </Button>
                  </HStack>
                </HStack>

                <HStack>
                  <HStack>
                    {renderStars(Math.floor(storeData.rating))}
                    <Text fontWeight="semibold">{storeData.rating}</Text>
                    <Text color="gray.500">({storeData.reviewCount} reviews)</Text>
                  </HStack>
                  {storeData.verificationStatus === 'verified' && (
                    <Badge colorScheme="green">Verified</Badge>
                  )}
                </HStack>

                <Wrap>
                  {storeData.categories.map((category, index) => (
                    <WrapItem key={index}>
                      <Tag size="md" colorScheme="brand" variant="subtle">
                        <TagLabel>{category}</TagLabel>
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>

                <VStack align="stretch" spacing={2}>
                  <HStack>
                    <Icon as={FiClock} color={storeData.isOpen ? 'green.500' : 'red.500'} />
                    <Text fontWeight="semibold" color={storeData.isOpen ? 'green.600' : 'red.600'}>
                      {storeData.isOpen ? 'Open Now' : 'Closed'}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    Weekdays: {storeData.timing.weekdays}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Weekends: {storeData.timing.weekends}
                  </Text>
                </VStack>

                <HStack spacing={3}>
                  <Button
                    leftIcon={<Icon as={FiNavigation} />}
                    colorScheme="brand"
                    onClick={handleGetDirections}
                  >
                    Get Directions
                  </Button>
                  <Button
                    leftIcon={<Icon as={FiPhone} />}
                    variant="outline"
                    onClick={() => window.open(`tel:${storeData.phone}`)}
                  >
                    Call
                  </Button>
                  <Button
                    leftIcon={<Icon as={FiExternalLink} />}
                    variant="outline"
                    onClick={() => window.open(storeData.website, '_blank')}
                  >
                    Website
                  </Button>
                </HStack>

                {isUserAdmin && (
                  <Alert status="info" size="sm">
                    <AlertIcon />
                    <Text fontSize="sm">Admin: Store management options available</Text>
                  </Alert>
                )}
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Detailed Information Tabs */}
        <Card bg={bgColor}>
          <CardBody>
            <Tabs index={selectedTab} onChange={setSelectedTab}>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Reviews ({storeData.reviewCount})</Tab>
                <Tab>Amenities</Tab>
                <Tab>Popular Brands</Tab>
              </TabList>

              <TabPanels>
                {/* Overview Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={4}>
                    <Box>
                      <Heading size="md" mb={2}>About</Heading>
                      <Text color="gray.600">{storeData.description}</Text>
                    </Box>

                    <Divider />

                    <Box>
                      <Heading size="md" mb={2}>Location</Heading>
                      <Text color="gray.600">{storeData.location.address}</Text>
                      <HStack mt={2}>
                        <Icon as={FiPhone} color="gray.500" />
                        <Text>{storeData.phone}</Text>
                      </HStack>
                    </Box>

                    <Divider />

                    <Box>
                      <Heading size="md" mb={2}>Create Shopping Trip</Heading>
                      <Text color="gray.600" mb={3}>
                        Plan a shopping trip to this store with friends
                      </Text>
                      <Button
                        leftIcon={<Icon as={FiCalendar} />}
                        colorScheme="brand"
                        as={RouterLink}
                        to={`/trips/create?store=${storeId}`}
                      >
                        Create Trip to {storeData.name}
                      </Button>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Reviews Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={6}>
                    {/* Write Review */}
                    <Card variant="outline">
                      <CardBody>
                        <Heading size="sm" mb={4}>Write a Review</Heading>
                        <VStack align="stretch" spacing={3}>
                          <FormControl>
                            <FormLabel fontSize="sm">Rating</FormLabel>
                            <Select
                              value={newReview.rating}
                              onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                            >
                              <option value={5}>5 Stars - Excellent</option>
                              <option value={4}>4 Stars - Good</option>
                              <option value={3}>3 Stars - Average</option>
                              <option value={2}>2 Stars - Poor</option>
                              <option value={1}>1 Star - Terrible</option>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="sm">Your Review</FormLabel>
                            <Textarea
                              placeholder="Share your experience..."
                              value={newReview.comment}
                              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                              rows={3}
                            />
                          </FormControl>
                          <Button
                            colorScheme="brand"
                            size="sm"
                            onClick={handleSubmitReview}
                            alignSelf="flex-start"
                          >
                            Submit Review
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Reviews List */}
                    <VStack align="stretch" spacing={4}>
                      {reviews.map(review => (
                        <Card key={review.id} variant="outline">
                          <CardBody>
                            <HStack align="start" spacing={3}>
                              <Avatar src={review.user.avatar} name={review.user.name} size="sm" />
                              <VStack align="stretch" flex={1} spacing={2}>
                                <HStack justify="space-between">
                                  <VStack align="start" spacing={0}>
                                    <Text fontWeight="semibold" fontSize="sm">{review.user.name}</Text>
                                    <Text fontSize="xs" color="gray.500">{review.date}</Text>
                                  </VStack>
                                  <HStack>
                                    {renderStars(review.rating)}
                                  </HStack>
                                </HStack>
                                <Text fontSize="sm">{review.comment}</Text>
                                <HStack>
                                  <Button size="xs" variant="ghost">
                                    👍 Helpful ({review.helpful})
                                  </Button>
                                  <Button size="xs" variant="ghost" leftIcon={<Icon as={FiFlag} />}>
                                    Report
                                  </Button>
                                </HStack>
                              </VStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </VStack>
                </TabPanel>

                {/* Amenities Tab */}
                <TabPanel px={0}>
                  <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                    {storeData.amenities.map((amenity, index) => (
                      <HStack key={index} p={3} bg="gray.50" borderRadius="md">
                        <Icon as={FiStar} color="green.500" />
                        <Text fontSize="sm">{amenity}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </TabPanel>

                {/* Popular Brands Tab */}
                <TabPanel px={0}>
                  <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                    {storeData.popularBrands.map((brand, index) => (
                      <Card key={index} variant="outline">
                        <CardBody p={3} textAlign="center">
                          <Text fontWeight="semibold" fontSize="sm">{brand}</Text>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default StoreDetails
