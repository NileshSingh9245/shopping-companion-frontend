import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Alert,
  AlertIcon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { FiShoppingBag, FiMoreVertical, FiSearch, FiPlus, FiStar, FiMapPin } from 'react-icons/fi'
import { useState, useRef } from 'react'
import React from 'react'

const ManageStores = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedStore, setSelectedStore] = useState(null)
  const [editingStore, setEditingStore] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [stores, setStores] = useState([])
  
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const cancelRef = useRef()

  // Initialize store data
  React.useEffect(() => {
    const initialStores = [
      {
        id: '1',
        name: 'Brookefields Mall',
        category: 'Shopping Mall',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        rating: 4.4,
        reviews: 3240,
        location: 'R.S. Puram, Coimbatore',
        status: 'active',
        priceRange: 'Mid-range',
        addedDate: '2024-01-15',
        lastUpdated: '2024-08-01'
      },
      {
        id: '2',
        name: 'Reliance Digital Sarvanampatti',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        rating: 4.1,
        reviews: 890,
        location: 'Sarvanampatti, Coimbatore',
        status: 'active',
        priceRange: 'Mid-range',
        addedDate: '2024-02-10',
        lastUpdated: '2024-07-28'
      },
      {
        id: '3',
        name: 'Fashion Paradise',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
        rating: 3.8,
        reviews: 456,
        location: 'Race Course, Coimbatore',
        status: 'pending',
        priceRange: 'Budget',
        addedDate: '2024-08-05',
        lastUpdated: '2024-08-05'
      },
      {
        id: '4',
        name: 'Tech World',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop',
        rating: 4.2,
        reviews: 234,
        location: 'Sarvanampatti, Coimbatore',
        status: 'inactive',
        priceRange: 'Premium',
        addedDate: '2024-03-20',
        lastUpdated: '2024-06-15'
      }
    ]
    setStores(initialStores)
  }, [])

  const handleEditStore = (store) => {
    setEditingStore(store)
    setEditFormData({
      name: store.name,
      category: store.category,
      location: store.location,
      priceRange: store.priceRange,
      status: store.status
    })
    onEditOpen()
  }

  const handleSaveStore = () => {
    try {
      const updatedStore = {
        ...editingStore,
        ...editFormData,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      
      setStores(stores.map(store => 
        store.id === editingStore.id ? updatedStore : store
      ))
      
      toast({
        title: 'Store updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      onEditClose()
    } catch (error) {
      toast({
        title: 'Error updating store',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const handleDeleteStore = () => {
    try {
      setStores(stores.filter(store => store.id !== selectedStore.id))
      
      toast({
        title: 'Store deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      onDeleteClose()
    } catch (error) {
      toast({
        title: 'Error deleting store',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const handleApproveStore = (store) => {
    const updatedStore = {
      ...store,
      status: 'active',
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    setStores(stores.map(s => 
      s.id === store.id ? updatedStore : s
    ))
    
    toast({
      title: 'Store approved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleRejectStore = (store) => {
    setStores(stores.filter(s => s.id !== store.id))
    
    toast({
      title: 'Store rejected and removed',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleToggleStatus = (store) => {
    const newStatus = store.status === 'active' ? 'inactive' : 'active'
    const updatedStore = {
      ...store,
      status: newStatus,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    setStores(stores.map(s => 
      s.id === store.id ? updatedStore : s
    ))
    
    toast({
      title: `Store ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green'
      case 'pending': return 'yellow'
      case 'inactive': return 'red'
      default: return 'gray'
    }
  }

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || store.category === filterCategory
    const matchesStatus = filterStatus === 'all' || store.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <HStack mb={4}>
            <FiShoppingBag size={24} />
            <Heading size="lg">Manage Stores</Heading>
            <Badge colorScheme="red" ml={2}>Admin Only</Badge>
          </HStack>
          <Text color="gray.600">
            Review, approve, and manage all stores on the Shopping Companion platform.
          </Text>
        </Box>

        <Alert status="info">
          <AlertIcon />
          New store submissions require admin approval before going live on the platform.
        </Alert>

        {/* Controls */}
        <Card>
          <CardBody>
            <HStack spacing={4} wrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement>
                  <FiSearch />
                </InputLeftElement>
                <Input
                  placeholder="Search stores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              
              <Select maxW="200px" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="Shopping Mall">Shopping Mall</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Grocery">Grocery</option>
                <option value="Books">Books</option>
              </Select>
              
              <Select maxW="200px" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </Select>
              
              <Button leftIcon={<FiPlus />} colorScheme="brand" ml="auto" onClick={onOpen}>
                Add Store
              </Button>
            </HStack>
          </CardBody>
        </Card>

        {/* Stores Table */}
        <Card>
          <CardBody>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Store</Th>
                    <Th>Category</Th>
                    <Th>Rating</Th>
                    <Th>Location</Th>
                    <Th>Status</Th>
                    <Th>Added Date</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredStores.map((store) => (
                    <Tr key={store.id}>
                      <Td>
                        <HStack spacing={3}>
                          <Image
                            src={store.image}
                            alt={store.name}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <VStack spacing={0} align="start">
                            <Text fontWeight="medium">{store.name}</Text>
                            <Text fontSize="sm" color="gray.500">{store.priceRange}</Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td>
                        <Badge colorScheme="blue" variant="subtle">
                          {store.category}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          <FiStar fill="currentColor" color="gold" />
                          <Text fontWeight="medium">{store.rating}</Text>
                          <Text fontSize="sm" color="gray.500">({store.reviews})</Text>
                        </HStack>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          <FiMapPin size={14} />
                          <Text fontSize="sm">{store.location}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(store.status)} variant="subtle">
                          {store.status}
                        </Badge>
                      </Td>
                      <Td>{store.addedDate}</Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem onClick={() => handleEditStore(store)}>Edit Store</MenuItem>
                            {store.status === 'pending' && (
                              <>
                                <MenuItem color="green.500" onClick={() => handleApproveStore(store)}>Approve Store</MenuItem>
                                <MenuItem color="red.500" onClick={() => handleRejectStore(store)}>Reject Store</MenuItem>
                              </>
                            )}
                            {store.status === 'active' && (
                              <MenuItem color="orange.500" onClick={() => handleToggleStatus(store)}>Deactivate Store</MenuItem>
                            )}
                            {store.status === 'inactive' && (
                              <MenuItem color="green.500" onClick={() => handleToggleStatus(store)}>Activate Store</MenuItem>
                            )}
                            <MenuItem color="red.500" onClick={() => {
                              setSelectedStore(store)
                              onDeleteOpen()
                            }}>Delete Store</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {filteredStores.length === 0 && (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">No stores found matching your criteria.</Text>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Summary Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {stores.filter(s => s.status === 'active').length}
              </Text>
              <Text fontSize="sm" color="gray.500">Active Stores</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
                {stores.filter(s => s.status === 'pending').length}
              </Text>
              <Text fontSize="sm" color="gray.500">Pending Approval</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="red.500">
                {stores.filter(s => s.status === 'inactive').length}
              </Text>
              <Text fontSize="sm" color="gray.500">Inactive Stores</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {stores.length}
              </Text>
              <Text fontSize="sm" color="gray.500">Total Stores</Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>

      {/* Add Store Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Store</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Store Name</FormLabel>
                <Input placeholder="Enter store name" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select placeholder="Select category">
                  <option value="Shopping Mall">Shopping Mall</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Books">Books</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input placeholder="Enter store location" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Enter store description" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input placeholder="Enter image URL" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={onClose}>
              Add Store
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Store Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Store</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Store Name</FormLabel>
                <Input
                  value={editFormData.name || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={editFormData.category || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                >
                  <option value="Shopping Mall">Shopping Mall</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Food & Dining">Food & Dining</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  value={editFormData.location || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Price Range</FormLabel>
                <Select
                  value={editFormData.priceRange || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, priceRange: e.target.value })}
                >
                  <option value="Budget">Budget</option>
                  <option value="Mid-range">Mid-range</option>
                  <option value="Premium">Premium</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={editFormData.status || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveStore}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Store Confirmation */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Store
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {selectedStore?.name}? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteStore} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  )
}

export default ManageStores
