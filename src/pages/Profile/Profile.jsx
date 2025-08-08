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
  CardHeader,
  Avatar,
  Badge,
  Button,
  Icon,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  useColorModeValue,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  IconButton,
  useToast,
  Divider,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Switch,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { 
  FiStar, 
  FiMapPin, 
  FiPhone, 
  FiMail,
  FiEdit,
  FiSave,
  FiX,
  FiShield,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiShoppingBag,
  FiSettings,
  FiCamera,
  FiPlus,
  FiBarChart
} from 'react-icons/fi'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'

const Profile = () => {
  const { user, isAdmin, updateUser } = useAuthStore()
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const isUserAdmin = isAdmin()
  
  // Mock user data with more details
  const [profileData, setProfileData] = useState({
    id: user?.id || '1',
    name: user?.name || 'Admin VibeCoding',
    email: user?.email || 'admin-vibeCoding@cognizant.com',
    phone: '+91-9876543210',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    location: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      area: 'Sarvanampatti',
      coordinates: { latitude: 11.0696, longitude: 77.0428 }
    },
    preferences: {
      shoppingCategories: ['electronics', 'clothing', 'books'],
      budget: 'mid-range',
      communicationStyle: 'friendly',
      languages: ['Tamil', 'English']
    },
    isVerified: true,
    isShoppingBuddy: true,
    buddyRating: 4.8,
    totalTrips: 15,
    completedTrips: 12,
    bio: 'Love exploring new stores and finding great deals! Native Tamil speaker, happy to help newcomers.',
    joinDate: new Date('2024-01-01'),
    role: user?.role || 'user',
    adminPermissions: user?.adminPermissions || []
  })

  const [tempData, setTempData] = useState(profileData)
  const [newCategory, setNewCategory] = useState('')

  const bgColor = useColorModeValue('white', 'gray.800')

  const handleEdit = () => {
    setIsEditing(true)
    setTempData(profileData)
  }

  const handleSave = () => {
    setProfileData(tempData)
    updateUser(tempData)
    setIsEditing(false)
    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleCancel = () => {
    setTempData(profileData)
    setIsEditing(false)
  }

  const handleAddCategory = () => {
    if (newCategory && !tempData.preferences.shoppingCategories.includes(newCategory)) {
      setTempData({
        ...tempData,
        preferences: {
          ...tempData.preferences,
          shoppingCategories: [...tempData.preferences.shoppingCategories, newCategory]
        }
      })
      setNewCategory('')
    }
  }

  const handleRemoveCategory = (category) => {
    setTempData({
      ...tempData,
      preferences: {
        ...tempData.preferences,
        shoppingCategories: tempData.preferences.shoppingCategories.filter(c => c !== category)
      }
    })
  }

  const handlePhotoUpload = () => {
    toast({
      title: 'Photo upload',
      description: 'Photo upload feature coming soon!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  // Mock activity data
  const recentActivity = [
    { type: 'trip', title: 'Joined Electronics Shopping', date: '2 days ago', status: 'active' },
    { type: 'review', title: 'Reviewed Reliance Digital', date: '1 week ago', status: 'completed' },
    { type: 'buddy', title: 'Connected with Arjun', date: '2 weeks ago', status: 'completed' },
    { type: 'trip', title: 'Created Mall Shopping Trip', date: '3 weeks ago', status: 'completed' }
  ]

  const achievements = [
    { icon: FiStar, title: 'Top Reviewer', description: 'Posted 10+ helpful reviews', color: 'yellow' },
    { icon: FiUsers, title: 'Social Butterfly', description: 'Connected with 15+ buddies', color: 'blue' },
    { icon: FiCalendar, title: 'Trip Master', description: 'Organized 5+ successful trips', color: 'green' },
    { icon: FiShield, title: 'Verified Member', description: 'Profile verified', color: 'purple' }
  ]

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1}>
            <Heading size="lg">
              My Profile
              {isUserAdmin && <Badge ml={2} colorScheme="red" fontSize="xs"><Icon as={FiShield} mr={1} />Admin</Badge>}
            </Heading>
            <Text color="gray.600">
              Manage your profile and preferences
            </Text>
          </VStack>
          {!isEditing ? (
            <Button
              leftIcon={<Icon as={FiEdit} />}
              colorScheme="brand"
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          ) : (
            <HStack spacing={2}>
              <Button
                leftIcon={<Icon as={FiSave} />}
                colorScheme="green"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                leftIcon={<Icon as={FiX} />}
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </HStack>
          )}
        </HStack>

        {isUserAdmin && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle fontSize="sm">Administrator Account</AlertTitle>
              <AlertDescription fontSize="xs">
                You have administrative privileges to manage platform users, stores, and settings.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        <Tabs index={selectedTab} onChange={setSelectedTab} variant="enclosed">
          <TabList>
            <Tab>Profile Info</Tab>
            <Tab>Activity & Stats</Tab>
            <Tab>Preferences</Tab>
            {isUserAdmin && <Tab>Admin Settings</Tab>}
          </TabList>

          <TabPanels>
            {/* Profile Info Tab */}
            <TabPanel p={0} pt={6}>
              <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
                {/* Profile Card */}
                <Card bg={bgColor}>
                  <CardBody>
                    <VStack spacing={4}>
                      <Box position="relative">
                        <Avatar
                          src={isEditing ? tempData.avatar : profileData.avatar}
                          name={isEditing ? tempData.name : profileData.name}
                          size="2xl"
                        />
                        {isEditing && (
                          <IconButton
                            icon={<Icon as={FiCamera} />}
                            position="absolute"
                            bottom={0}
                            right={0}
                            size="sm"
                            colorScheme="brand"
                            borderRadius="full"
                            onClick={handlePhotoUpload}
                            aria-label="Upload photo"
                          />
                        )}
                      </Box>

                      <VStack spacing={1} textAlign="center">
                        {isEditing ? (
                          <Input
                            value={tempData.name}
                            onChange={(e) => setTempData({...tempData, name: e.target.value})}
                            size="sm"
                            textAlign="center"
                            fontWeight="bold"
                          />
                        ) : (
                          <Heading size="md">{profileData.name}</Heading>
                        )}
                        
                        <HStack>
                          <Icon as={FiMapPin} color="gray.500" boxSize={4} />
                          <Text fontSize="sm" color="gray.600">
                            {profileData.location.area}, {profileData.location.city}
                          </Text>
                        </HStack>

                        <HStack spacing={2} flexWrap="wrap" justify="center">
                          {profileData.isVerified && (
                            <Badge colorScheme="green" fontSize="xs">
                              <Icon as={FiShield} mr={1} />
                              Verified
                            </Badge>
                          )}
                          {profileData.role === 'admin' && (
                            <Badge colorScheme="red" fontSize="xs">
                              <Icon as={FiShield} mr={1} />
                              Admin
                            </Badge>
                          )}
                          {profileData.isShoppingBuddy && (
                            <Badge colorScheme="blue" fontSize="xs">
                              <Icon as={FiUsers} mr={1} />
                              Buddy
                            </Badge>
                          )}
                        </HStack>
                      </VStack>

                      <StatGroup size="sm" w="full" textAlign="center">
                        <Stat>
                          <StatLabel>Rating</StatLabel>
                          <StatNumber fontSize="lg">{profileData.buddyRating}</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            +0.2
                          </StatHelpText>
                        </Stat>
                        <Stat>
                          <StatLabel>Trips</StatLabel>
                          <StatNumber fontSize="lg">{profileData.totalTrips}</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            +3 this month
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Contact Info */}
                <Card bg={bgColor}>
                  <CardHeader>
                    <Heading size="sm">Contact Information</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel fontSize="sm">Email</FormLabel>
                        {isEditing ? (
                          <Input
                            value={tempData.email}
                            onChange={(e) => setTempData({...tempData, email: e.target.value})}
                            type="email"
                            size="sm"
                          />
                        ) : (
                          <HStack>
                            <Icon as={FiMail} color="gray.500" />
                            <Text fontSize="sm">{profileData.email}</Text>
                          </HStack>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Phone</FormLabel>
                        {isEditing ? (
                          <Input
                            value={tempData.phone}
                            onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                            type="tel"
                            size="sm"
                          />
                        ) : (
                          <HStack>
                            <Icon as={FiPhone} color="gray.500" />
                            <Text fontSize="sm">{profileData.phone}</Text>
                          </HStack>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Location</FormLabel>
                        {isEditing ? (
                          <VStack spacing={2}>
                            <Input
                              placeholder="Area"
                              value={tempData.location.area}
                              onChange={(e) => setTempData({
                                ...tempData,
                                location: {...tempData.location, area: e.target.value}
                              })}
                              size="sm"
                            />
                            <Input
                              placeholder="City"
                              value={tempData.location.city}
                              onChange={(e) => setTempData({
                                ...tempData,
                                location: {...tempData.location, city: e.target.value}
                              })}
                              size="sm"
                            />
                          </VStack>
                        ) : (
                          <Text fontSize="sm">
                            {profileData.location.area}, {profileData.location.city}, {profileData.location.state}
                          </Text>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Bio</FormLabel>
                        {isEditing ? (
                          <Textarea
                            value={tempData.bio}
                            onChange={(e) => setTempData({...tempData, bio: e.target.value})}
                            size="sm"
                            rows={3}
                          />
                        ) : (
                          <Text fontSize="sm">{profileData.bio}</Text>
                        )}
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Achievements */}
                <Card bg={bgColor}>
                  <CardHeader>
                    <Heading size="sm">Achievements</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {achievements.map((achievement, index) => (
                        <HStack key={index} p={2} borderRadius="md" bg="gray.50">
                          <Icon as={achievement.icon} color={`${achievement.color}.500`} boxSize={5} />
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontSize="sm" fontWeight="semibold">{achievement.title}</Text>
                            <Text fontSize="xs" color="gray.600">{achievement.description}</Text>
                          </VStack>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </TabPanel>

            {/* Activity & Stats Tab */}
            <TabPanel p={0} pt={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Card bg={bgColor}>
                  <CardHeader>
                    <Heading size="sm">Recent Activity</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {recentActivity.map((activity, index) => (
                        <HStack key={index} justify="space-between" p={2} borderRadius="md" bg="gray.50">
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontSize="sm" fontWeight="semibold">{activity.title}</Text>
                            <Text fontSize="xs" color="gray.600">{activity.date}</Text>
                          </VStack>
                          <Badge colorScheme={activity.status === 'active' ? 'blue' : 'green'} size="sm">
                            {activity.status}
                          </Badge>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>

                <Card bg={bgColor}>
                  <CardHeader>
                    <Heading size="sm">Statistics</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4}>
                      <Box w="full">
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm">Trip Completion Rate</Text>
                          <Text fontSize="sm" fontWeight="semibold">
                            {Math.round((profileData.completedTrips / profileData.totalTrips) * 100)}%
                          </Text>
                        </HStack>
                        <Progress 
                          value={(profileData.completedTrips / profileData.totalTrips) * 100} 
                          colorScheme="green" 
                          size="sm" 
                        />
                      </Box>

                      <StatGroup size="sm" w="full">
                        <Stat textAlign="center">
                          <StatLabel>Total Trips</StatLabel>
                          <StatNumber>{profileData.totalTrips}</StatNumber>
                        </Stat>
                        <Stat textAlign="center">
                          <StatLabel>Completed</StatLabel>
                          <StatNumber>{profileData.completedTrips}</StatNumber>
                        </Stat>
                      </StatGroup>

                      <Divider />

                      <VStack spacing={2} w="full">
                        <Text fontSize="sm" fontWeight="semibold">Member Since</Text>
                        <Text fontSize="sm" color="gray.600">
                          {profileData.joinDate.toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </TabPanel>

            {/* Preferences Tab */}
            <TabPanel p={0} pt={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Card bg={bgColor}>
                  <CardHeader>
                    <Heading size="sm">Shopping Preferences</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel fontSize="sm">Shopping Categories</FormLabel>
                        <Wrap>
                          {(isEditing ? tempData : profileData).preferences.shoppingCategories.map((category, index) => (
                            <WrapItem key={index}>
                              <Tag size="md" colorScheme="brand" variant="subtle">
                                <TagLabel>{category}</TagLabel>
                                {isEditing && (
                                  <TagCloseButton onClick={() => handleRemoveCategory(category)} />
                                )}
                              </Tag>
                            </WrapItem>
                          ))}
                        </Wrap>
                        {isEditing && (
                          <HStack mt={2}>
                            <Input
                              placeholder="Add category"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              size="sm"
                            />
                            <IconButton
                              icon={<Icon as={FiPlus} />}
                              size="sm"
                              onClick={handleAddCategory}
                              aria-label="Add category"
                            />
                          </HStack>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Budget Range</FormLabel>
                        {isEditing ? (
                          <Select
                            value={tempData.preferences.budget}
                            onChange={(e) => setTempData({
                              ...tempData,
                              preferences: {...tempData.preferences, budget: e.target.value}
                            })}
                            size="sm"
                          >
                            <option value="budget">Budget (₹0 - ₹5,000)</option>
                            <option value="mid-range">Mid-range (₹5,000 - ₹25,000)</option>
                            <option value="premium">Premium (₹25,000 - ₹75,000)</option>
                            <option value="luxury">Luxury (₹75,000+)</option>
                          </Select>
                        ) : (
                          <Badge colorScheme="purple" fontSize="sm">
                            {profileData.preferences.budget}
                          </Badge>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Communication Style</FormLabel>
                        {isEditing ? (
                          <Select
                            value={tempData.preferences.communicationStyle}
                            onChange={(e) => setTempData({
                              ...tempData,
                              preferences: {...tempData.preferences, communicationStyle: e.target.value}
                            })}
                            size="sm"
                          >
                            <option value="friendly">Friendly & Casual</option>
                            <option value="professional">Professional</option>
                            <option value="quiet">Quiet & Reserved</option>
                          </Select>
                        ) : (
                          <Text fontSize="sm">{profileData.preferences.communicationStyle}</Text>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="sm">Languages</FormLabel>
                        <Wrap>
                          {profileData.preferences.languages.map((language, index) => (
                            <WrapItem key={index}>
                              <Badge variant="outline">{language}</Badge>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>

                <Card bg={bgColor}>
                  <CardHeader>
                    <Heading size="sm">Privacy Settings</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="semibold">Profile Visibility</Text>
                          <Text fontSize="xs" color="gray.600">Show profile to other users</Text>
                        </VStack>
                        <Switch defaultChecked />
                      </HStack>

                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="semibold">Show Contact Info</Text>
                          <Text fontSize="xs" color="gray.600">Allow others to see contact details</Text>
                        </VStack>
                        <Switch defaultChecked />
                      </HStack>

                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="semibold">Trip Notifications</Text>
                          <Text fontSize="xs" color="gray.600">Receive notifications about trips</Text>
                        </VStack>
                        <Switch defaultChecked />
                      </HStack>

                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="semibold">Buddy Requests</Text>
                          <Text fontSize="xs" color="gray.600">Allow buddy connection requests</Text>
                        </VStack>
                        <Switch defaultChecked />
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </TabPanel>

            {/* Admin Settings Tab */}
            {isUserAdmin && (
              <TabPanel p={0} pt={6}>
                <VStack spacing={6} align="stretch">
                  <Alert status="warning" borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <AlertTitle fontSize="sm">Administrator Panel</AlertTitle>
                      <AlertDescription fontSize="xs">
                        These settings affect the entire platform. Use with caution.
                      </AlertDescription>
                    </Box>
                  </Alert>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Card bg={bgColor}>
                      <CardHeader>
                        <Heading size="sm">Admin Permissions</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          {profileData.adminPermissions?.map((permission, index) => (
                            <HStack key={index} justify="space-between">
                              <Text fontSize="sm">{permission.replace('_', ' ').toUpperCase()}</Text>
                              <Badge colorScheme="green">Active</Badge>
                            </HStack>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card bg={bgColor}>
                      <CardHeader>
                        <Heading size="sm">Quick Actions</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={3}>
                          <Button
                            leftIcon={<Icon as={FiUsers} />}
                            variant="outline"
                            size="sm"
                            w="full"
                          >
                            Manage Users
                          </Button>
                          <Button
                            leftIcon={<Icon as={FiShoppingBag} />}
                            variant="outline"
                            size="sm"
                            w="full"
                          >
                            Manage Stores
                          </Button>
                          <Button
                            leftIcon={<Icon as={FiBarChart} />}
                            variant="outline"
                            size="sm"
                            w="full"
                          >
                            View Analytics
                          </Button>
                          <Button
                            leftIcon={<Icon as={FiSettings} />}
                            variant="outline"
                            size="sm"
                            w="full"
                          >
                            Platform Settings
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </VStack>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default Profile
