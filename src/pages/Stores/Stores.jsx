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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  Avatar,
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
  useDisclosure
} from '@chakra-ui/react'
import { 
  FiSearch, 
  FiMapPin, 
  FiStar, 
  FiClock, 
  FiPhone, 
  FiExternalLink,
  FiPlus,
  FiFilter,
  FiHeart,
  FiShare2,
  FiEdit,
  FiTrash2
} from 'react-icons/fi'
import { useState, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const StoreCard = ({ store, onEdit, onDelete, isAdmin }) => {
  const toast = useToast()
  const [isFavorited, setIsFavorited] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

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
    navigator.clipboard.writeText(`Check out ${store.name} on Shopping Companion!`)
    toast({
      title: 'Link copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleDelete = () => {
    onDelete(store.id)
    onClose()
    toast({
      title: 'Store deleted successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <Card overflow="hidden" shadow="md" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s">
        <Image
          src={store.images?.[0] || 'https://via.placeholder.com/300x200?text=Store+Image'}
          alt={store.name}
          h="200px"
          w="100%"
          objectFit="cover"
        />
        <CardBody>
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Heading size="md" noOfLines={1}>{store.name}</Heading>
                <HStack>
                  <Icon as={FiMapPin} color="gray.500" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" noOfLines={1}>{store.location.area}</Text>
                </HStack>
              </VStack>
              <VStack spacing={1}>
                <IconButton
                  icon={<Icon as={FiHeart} color={isFavorited ? 'red.500' : 'gray.400'} />}
                  variant="ghost"
                  size="sm"
                  onClick={handleFavorite}
                  aria-label="Add to favorites"
                />
                <IconButton
                  icon={<Icon as={FiShare2} />}
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  aria-label="Share store"
                />
              </VStack>
            </HStack>

            <HStack>
              <Icon as={FiStar} color="yellow.400" />
              <Text fontWeight="semibold">{store.rating}</Text>
              <Text fontSize="sm" color="gray.500">({store.reviewCount} reviews)</Text>
            </HStack>

            <Wrap>
              {store.categories.slice(0, 3).map((category, index) => (
                <WrapItem key={index}>
                  <Tag size="sm" colorScheme="brand" variant="subtle">
                    <TagLabel>{category}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
              {store.categories.length > 3 && (
                <WrapItem>
                  <Tag size="sm" variant="outline">
                    <TagLabel>+{store.categories.length - 3} more</TagLabel>
                  </Tag>
                </WrapItem>
              )}
            </Wrap>

            <VStack spacing={2} align="stretch">
              <HStack>
                <Icon as={FiClock} color="green.500" boxSize={4} />
                <Text fontSize="sm" color="green.600" fontWeight="semibold">
                  {store.isOpen ? 'Open Now' : 'Closed'}
                </Text>
                <Text fontSize="sm" color="gray.500">• {store.timing}</Text>
              </HStack>

              <HStack spacing={2}>
                <Button
                  as={RouterLink}
                  to={`/stores/${store.id}`}
                  colorScheme="brand"
                  size="sm"
                  flex={1}
                  leftIcon={<Icon as={FiExternalLink} />}
                >
                  View Details
                </Button>
                {isAdmin && (
                  <>
                    <IconButton
                      icon={<Icon as={FiEdit} />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(store)}
                      aria-label="Edit store"
                    />
                    <IconButton
                      icon={<Icon as={FiTrash2} />}
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={onOpen}
                      aria-label="Delete store"
                    />
                  </>
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
              Delete Store
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete "{store.name}"? This action cannot be undone.
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

const Stores = () => {
  const { user, isAdmin } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [areaFilter, setAreaFilter] = useState('')
  const [stores, setStores] = useState([
    {
      id: '1',
      name: 'Phoenix Mall Coimbatore',
      location: {
        area: 'Brookefields',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0168, longitude: 77.0061 }
      },
      categories: ['Mall', 'Fashion', 'Electronics', 'Food Court'],
      rating: 4.6,
      reviewCount: 324,
      timing: '10:00 AM - 10:00 PM',
      isOpen: true,
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop']
    },
    {
      id: '2',
      name: 'Reliance Digital Sarvanampatti',
      location: {
        area: 'Sarvanampatti',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0712, longitude: 77.0445 }
      },
      categories: ['Electronics', 'Gadgets', 'Appliances'],
      rating: 4.3,
      reviewCount: 156,
      timing: '10:30 AM - 9:30 PM',
      isOpen: true,
      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop']
    },
    {
      id: '3',
      name: 'Brookefields Mall',
      location: {
        area: 'Brookefields',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0165, longitude: 77.0088 }
      },
      categories: ['Mall', 'Shopping', 'Entertainment', 'Dining'],
      rating: 4.7,
      reviewCount: 289,
      timing: '10:00 AM - 10:00 PM',
      isOpen: true,
      images: ['https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400&h=250&fit=crop']
    },
    {
      id: '4',
      name: 'Lifestyle Stores Gandhipuram',
      location: {
        area: 'Gandhipuram',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0168, longitude: 76.9558 }
      },
      categories: ['Fashion', 'Clothing', 'Accessories'],
      rating: 4.2,
      reviewCount: 98,
      timing: '10:00 AM - 9:00 PM',
      isOpen: false,
      images: ['https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=250&fit=crop']
    },
    {
      id: '5',
      name: 'Fun Mall Peelamedu',
      location: {
        area: 'Peelamedu',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0315, longitude: 77.0288 }
      },
      categories: ['Mall', 'Shopping', 'Entertainment'],
      rating: 4.4,
      reviewCount: 201,
      timing: '10:00 AM - 10:00 PM',
      isOpen: true,
      images: ['https://images.unsplash.com/photo-1580745332705-c6ec3d9db0ad?w=400&h=250&fit=crop']
    },
    {
      id: '6',
      name: 'Croma Electronics RS Puram',
      location: {
        area: 'RS Puram',
        city: 'Coimbatore',
        coordinates: { latitude: 11.0037, longitude: 76.9663 }
      },
      categories: ['Electronics', 'Appliances', 'Gadgets'],
      rating: 4.1,
      reviewCount: 87,
      timing: '10:30 AM - 9:30 PM',
      isOpen: true,
      images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop']
    }
  ])

  const isUserAdmin = isAdmin()

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = !categoryFilter || store.categories.includes(categoryFilter)
    const matchesArea = !areaFilter || store.location.area === areaFilter

    return matchesSearch && matchesCategory && matchesArea
  })

  const categories = [...new Set(stores.flatMap(store => store.categories))]
  const areas = [...new Set(stores.map(store => store.location.area))]

  const handleEdit = (store) => {
    // Navigate to edit page or open edit modal
  }

  const handleDelete = (storeId) => {
    setStores(stores.filter(store => store.id !== storeId))
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Stores in Coimbatore</Heading>
            <Text color="gray.600">
              Discover shopping destinations in your area
            </Text>
          </VStack>
          {isUserAdmin && (
            <Button
              as={RouterLink}
              to="/stores/add"
              colorScheme="brand"
              leftIcon={<Icon as={FiPlus} />}
            >
              Add Store
            </Button>
          )}
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
                  placeholder="Search stores, areas, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
              
              <HStack spacing={4} w="full">
                <Select
                  placeholder="All Categories"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  flex={1}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Select>
                
                <Select
                  placeholder="All Areas"
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  flex={1}
                >
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </Select>
                
                <Button
                  leftIcon={<Icon as={FiFilter} />}
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setCategoryFilter('')
                    setAreaFilter('')
                  }}
                >
                  Clear
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Results count */}
        <HStack justify="space-between" align="center">
          <Text color="gray.600">
            Showing {filteredStores.length} of {stores.length} stores
          </Text>
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.500">Sort by:</Text>
            <Select size="sm" w="auto">
              <option value="rating">Rating</option>
              <option value="name">Name</option>
              <option value="distance">Distance</option>
            </Select>
          </HStack>
        </HStack>

        {/* Stores Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredStores.map(store => (
            <StoreCard
              key={store.id}
              store={store}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdmin={isUserAdmin}
            />
          ))}
        </SimpleGrid>

        {/* Empty state */}
        {filteredStores.length === 0 && (
          <Card py={12}>
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Icon as={FiSearch} boxSize={12} color="gray.400" />
                <Heading size="md" color="gray.500">No stores found</Heading>
                <Text color="gray.500">
                  Try adjusting your search criteria or clear the filters
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Container>
  )
}

export default Stores
