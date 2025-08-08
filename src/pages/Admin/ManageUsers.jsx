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
  Select
} from '@chakra-ui/react'
import { FiUsers, FiMoreVertical, FiSearch, FiUserPlus, FiShield } from 'react-icons/fi'
import { useState } from 'react'

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Dummy user data
  const users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin-vibeCoding@cognizant.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'active',
      role: 'admin',
      joinDate: '2024-01-15',
      lastActive: '2024-08-08',
      totalTrips: 0,
      location: 'Coimbatore'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      status: 'active',
      role: 'user',
      joinDate: '2024-02-20',
      lastActive: '2024-08-07',
      totalTrips: 5,
      location: 'Sarvanampatti'
    },
    {
      id: '3',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      status: 'inactive',
      role: 'user',
      joinDate: '2024-03-10',
      lastActive: '2024-07-25',
      totalTrips: 2,
      location: 'Coimbatore'
    },
    {
      id: '4',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      status: 'suspended',
      role: 'user',
      joinDate: '2024-01-30',
      lastActive: '2024-06-15',
      totalTrips: 1,
      location: 'Sarvanampatti'
    }
  ]

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
                      <Td>{user.location}</Td>
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
                            <MenuItem>View Profile</MenuItem>
                            <MenuItem>Edit User</MenuItem>
                            <MenuItem>Reset Password</MenuItem>
                            {user.status === 'active' ? (
                              <MenuItem color="orange.500">Suspend User</MenuItem>
                            ) : (
                              <MenuItem color="green.500">Activate User</MenuItem>
                            )}
                            <MenuItem color="red.500">Delete User</MenuItem>
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
    </Container>
  )
}

export default ManageUsers
