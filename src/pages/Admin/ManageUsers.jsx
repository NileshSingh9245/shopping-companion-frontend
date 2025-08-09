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
  Avatar,
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
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { FiUsers, FiMoreVertical, FiSearch, FiUserPlus, FiShield } from 'react-icons/fi'
import { useState, useRef } from 'react'
import React from 'react'
import userStorage from '../../services/userStorage'

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  
  const toast = useToast()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const cancelRef = useRef()

  // Load users from storage on component mount
  React.useEffect(() => {
    const allUsers = userStorage.getAllUsers()
    setUsers(allUsers)
  }, [])

  const handleEditUser = (user) => {
    setEditingUser(user)
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      status: user.status || 'active',
      location: user.location?.area || '',
      bio: user.bio || ''
    })
    onEditOpen()
  }

  const handleSaveUser = () => {
    try {
      const updatedUser = {
        ...editingUser,
        ...editFormData,
        location: {
          ...editingUser.location,
          area: editFormData.location
        },
        updatedAt: new Date().toISOString()
      }
      
      userStorage.updateUser(editingUser.id, updatedUser)
      
      // Update local state
      setUsers(users.map(user => 
        user.id === editingUser.id ? updatedUser : user
      ))
      
      toast({
        title: 'User updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      onEditClose()
    } catch (error) {
      toast({
        title: 'Error updating user',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const handleDeleteUser = () => {
    try {
      userStorage.deleteUser(selectedUser.id)
      
      // Update local state
      setUsers(users.filter(user => user.id !== selectedUser.id))
      
      toast({
        title: 'User deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      onDeleteClose()
    } catch (error) {
      toast({
        title: 'Error deleting user',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const handleSuspendUser = (user) => {
    try {
      const updatedUser = {
        ...user,
        status: user.status === 'active' ? 'suspended' : 'active',
        updatedAt: new Date().toISOString()
      }
      
      userStorage.updateUser(user.id, updatedUser)
      
      // Update local state
      setUsers(users.map(u => 
        u.id === user.id ? updatedUser : u
      ))
      
      toast({
        title: `User ${updatedUser.status === 'suspended' ? 'suspended' : 'activated'} successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error updating user status',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const handleResetPassword = (user) => {
    // In a real app, this would send a password reset email
    toast({
      title: 'Password reset email sent',
      description: `Password reset instructions sent to ${user.email}`,
      status: 'info',
      duration: 4000,
      isClosable: true,
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green'
      case 'inactive': return 'yellow'
      case 'suspended': return 'red'
      default: return 'gray'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <HStack mb={4}>
            <FiUsers size={24} />
            <Heading size="lg">Manage Users</Heading>
            <Badge colorScheme="red" ml={2}>Admin Only</Badge>
          </HStack>
          <Text color="gray.600">
            View and manage all platform users, their activities, and account status.
          </Text>
        </Box>

        <Alert status="warning">
          <AlertIcon />
          User management actions are permanent. Please review changes carefully before applying.
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              
              <Select maxW="200px" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </Select>
              
              <Button leftIcon={<FiUserPlus />} colorScheme="brand" ml="auto">
                Add User
              </Button>
            </HStack>
          </CardBody>
        </Card>

        {/* Users Table */}
        <Card>
          <CardBody>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>User</Th>
                    <Th>Status</Th>
                    <Th>Role</Th>
                    <Th>Location</Th>
                    <Th>Join Date</Th>
                    <Th>Last Active</Th>
                    <Th>Total Trips</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredUsers.map((user) => (
                    <Tr key={user.id}>
                      <Td>
                        <HStack spacing={3}>
                          <Avatar size="sm" src={user.avatar} name={user.name} />
                          <VStack spacing={0} align="start">
                            <Text fontWeight="medium">{user.name}</Text>
                            <Text fontSize="sm" color="gray.500">{user.email}</Text>
                          </VStack>
                        </HStack>
                      </Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(user.status)} variant="subtle">
                          {user.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack>
                          <Text textTransform="capitalize">{user.role}</Text>
                          {user.role === 'admin' && <FiShield color="red" />}
                        </HStack>
                      </Td>
                      <Td>{user.location?.area || user.location || 'N/A'}</Td>
                      <Td>{user.joinDate}</Td>
                      <Td>{user.lastActive}</Td>
                      <Td>{user.totalTrips}</Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem onClick={() => handleEditUser(user)}>Edit User</MenuItem>
                            <MenuItem onClick={() => handleResetPassword(user)}>Reset Password</MenuItem>
                            {user.status === 'active' ? (
                              <MenuItem color="orange.500" onClick={() => handleSuspendUser(user)}>Suspend User</MenuItem>
                            ) : (
                              <MenuItem color="green.500" onClick={() => handleSuspendUser(user)}>Activate User</MenuItem>
                            )}
                            <MenuItem color="red.500" onClick={() => {
                              setSelectedUser(user)
                              onDeleteOpen()
                            }}>Delete User</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {filteredUsers.length === 0 && (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">No users found matching your criteria.</Text>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Summary Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {users.filter(u => u.status === 'active').length}
              </Text>
              <Text fontSize="sm" color="gray.500">Active Users</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
                {users.filter(u => u.status === 'inactive').length}
              </Text>
              <Text fontSize="sm" color="gray.500">Inactive Users</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="red.500">
                {users.filter(u => u.status === 'suspended').length}
              </Text>
              <Text fontSize="sm" color="gray.500">Suspended Users</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {users.length}
              </Text>
              <Text fontSize="sm" color="gray.500">Total Users</Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>

      {/* Edit User Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={editFormData.name || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={editFormData.email || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={editFormData.phone || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select
                  value={editFormData.role || 'user'}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={editFormData.status || 'active'}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
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
                <FormLabel>Bio</FormLabel>
                <Input
                  value={editFormData.bio || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveUser}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete User Confirmation */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  )
}

export default ManageUsers
