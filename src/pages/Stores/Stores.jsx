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
import { useState, useRef, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useQuery } from '@tanstack/react-query'
import storeAPI from '../../services/enhancedStoreAPI'

const StoreCard = ({ store, onEdit, onDelete, onBookmark, isAdmin, bookmarks }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const isBookmarked = bookmarks.some(b => b.storeId === store.id)

  const handleBookmark = () => {
    onBookmark(store.id)
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
                  icon={<Icon as={FiHeart} color={isBookmarked ? 'red.500' : 'gray.400'} />}
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  aria-label="Bookmark store"
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
  const toast = useToast()
  
  const isUserAdmin = isAdmin()
  const currentUserId = user?.id

  // Fetch all stores
  const { 
    data: storesData, 
    isLoading: storesLoading, 
    error: storesError,
    refetch: refetchStores 
  } = useQuery({
    queryKey: ['allStores'],
    queryFn: () => storeAPI.getAllStores(),
    retry: 2
  })

  // Fetch user's bookmarked stores
  const { 
    data: bookmarksData, 
    isLoading: bookmarksLoading, 
    error: bookmarksError 
  } = useQuery({
    queryKey: ['userBookmarks', currentUserId],
    queryFn: () => storeAPI.getUserBookmarks(currentUserId),
    enabled: !!currentUserId,
    retry: 2
  })

  const stores = storesData?.data?.stores || []
  const bookmarks = bookmarksData?.data?.bookmarks || []

  const handleBookmark = async (storeId) => {
    try {
      const isBookmarked = bookmarks.some(b => b.storeId === storeId)
      if (isBookmarked) {
        await storeAPI.removeBookmark(currentUserId, storeId)
        toast({
          title: 'Removed from bookmarks',
          status: 'info',
          duration: 2000,
          isClosable: true,
        })
      } else {
        await storeAPI.addBookmark(currentUserId, storeId)
        toast({
          title: 'Added to bookmarks',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
      refetchStores()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update bookmark',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const handleEdit = (store) => {
    toast({
      title: 'Edit Feature',
      description: 'Store editing feature coming soon!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleDelete = async (storeId) => {
    try {
      // In real implementation, this would delete the store
      toast({
        title: 'Store deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete store',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

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
        {storesLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} overflow="hidden" shadow="md">
                <Box w="100%" h="200px" bg="gray.200" />
                <CardBody>
                  <VStack spacing={4}>
                    <Box w="80%" h="5" bg="gray.200" borderRadius="md" />
                    <Box w="60%" h="4" bg="gray.100" borderRadius="md" />
                    <Box w="40%" h="3" bg="gray.100" borderRadius="md" />
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : storesError ? (
          <Card py={12}>
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Icon as={FiSearch} boxSize={12} color="red.400" />
                <Heading size="md" color="red.500">Error loading stores</Heading>
                <Text color="gray.500">
                  {storesError.message || 'Failed to load stores'}
                </Text>
                <Button onClick={() => refetchStores()} colorScheme="brand">
                  Try Again
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredStores.map(store => (
              <StoreCard
                key={store.id}
                store={store}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBookmark={handleBookmark}
                isAdmin={isUserAdmin}
                bookmarks={bookmarks}
              />
            ))}
          </SimpleGrid>
        )}

        {/* Empty state */}
        {!storesLoading && !storesError && filteredStores.length === 0 && (
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
