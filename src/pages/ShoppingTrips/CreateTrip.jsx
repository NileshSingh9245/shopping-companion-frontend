import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Badge,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Checkbox,
  CheckboxGroup,
  Stack,
  Alert,
  AlertIcon,
  useToast,
  Divider
} from '@chakra-ui/react'
import { 
  FiMapPin, 
  FiCalendar, 
  FiUsers, 
  FiShoppingBag, 
  FiClock,
  FiDollarSign,
  FiTag,
  FiInfo
} from 'react-icons/fi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import tripsAPI from '../../services/enhancedTripsAPI'

const CreateTrip = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuthStore()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    date: '',
    time: '',
    maxMembers: 4,
    budget: null,
    budgetRange: '',
    categories: [],
    isPublic: true,
    allowJoinRequests: true,
    requirements: '',
    meetingPoint: '',
    duration: '2-3 hours',
    experienceLevel: 'all'
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const destinations = [
    'Phoenix Mall Coimbatore',
    'Brookefields Mall',
    'Fun Republic Mall',
    'Gandhipuram Market',
    'Cross Cut Road Shopping',
    'Reliance Digital - Sarvanampatti',
    'Croma Electronics',
    'Brand Factory',
    'Sarvanampatti Market',
    'Other (specify in description)'
  ]

  const categories = [
    'Electronics',
    'Clothing & Fashion',
    'Home & Garden',
    'Books & Media',
    'Sports & Fitness',
    'Beauty & Personal Care',
    'Groceries & Food',
    'Gifts & Accessories',
    'Kids & Baby',
    'Automotive'
  ]

  const budgetOptions = [
    { 
      value: 'budget', 
      label: 'Budget (₹500 - ₹2,000)', 
      color: 'green',
      min: 500,
      max: 2000
    },
    { 
      value: 'mid-range', 
      label: 'Mid-range (₹2,000 - ₹10,000)', 
      color: 'blue',
      min: 2000,
      max: 10000
    },
    { 
      value: 'premium', 
      label: 'Premium (₹10,000+)', 
      color: 'purple',
      min: 10000,
      max: 50000
    }
  ]

  const handleBudgetSelect = (option) => {
    setFormData(prev => ({
      ...prev,
      budgetRange: option.value,
      budget: {
        min: option.min,
        max: option.max
      }
    }))
    
    // Clear budget error if exists
    if (errors.budget) {
      setErrors(prev => ({
        ...prev,
        budget: ''
      }))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleNumberChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSwitchChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategoriesChange = (categories) => {
    setFormData(prev => ({
      ...prev,
      categories
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Trip title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Trip description is required'
    }

    if (!formData.destination) {
      newErrors.destination = 'Destination is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past'
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required'
    }

    if (!formData.meetingPoint.trim()) {
      newErrors.meetingPoint = 'Meeting point is required'
    }

    if (formData.maxMembers < 2) {
      newErrors.maxMembers = 'At least 2 members required'
    } else if (formData.maxMembers > 10) {
      newErrors.maxMembers = 'Maximum 10 members allowed'
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'Select at least one shopping category'
    }

    if (!formData.budgetRange) {
      newErrors.budget = 'Please select a budget range'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)

    try {
      // Prepare trip data
      const tripData = {
        ...formData,
        scheduledDate: formData.date,
        meetingPoint: formData.meetingPoint,
        maxParticipants: formData.maxParticipants,
        estimatedDuration: formData.duration,
        budget: {
          min: formData.budget?.min || 0,
          max: formData.budget?.max || 0,
          currency: 'INR'
        },
        coordinates: {
          latitude: 11.0168, // Default to Coimbatore
          longitude: 76.9558
        },
        status: 'open',
        visibility: formData.isPrivate ? 'private' : 'public',
        participants: [],
        features: formData.features || [],
        languages: formData.languages || ['English']
      }

      // Create trip using enhanced API
      const result = await tripsAPI.createTrip(tripData, user.id, user)

      toast({
        title: 'Trip Created Successfully!',
        description: `Your shopping trip "${formData.title}" has been created.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })

      // Navigate to trips list
      navigate('/trips')
      
    } catch (error) {
      console.error('Error creating trip:', error)
      toast({
        title: 'Error Creating Trip',
        description: error.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            Create Shopping Trip
          </Heading>
          <Text color="gray.600">
            Plan and organize a shopping trip with friends in Coimbatore
          </Text>
        </Box>

        {/* Form */}
        <Card>
          <CardBody>
            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                
                {/* Basic Information */}
                <Box>
                  <Heading size="md" mb={4} color="brand.500">
                    <Icon as={FiInfo} mr={2} />
                    Basic Information
                  </Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isInvalid={errors.title}>
                      <FormLabel>Trip Title</FormLabel>
                      <Input
                        name="title"
                        placeholder="e.g., Weekend Electronics Shopping"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.destination}>
                      <FormLabel>Destination</FormLabel>
                      <Select
                        name="destination"
                        placeholder="Select destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                      >
                        {destinations.map(destination => (
                          <option key={destination} value={destination}>
                            {destination}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{errors.destination}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>

                  <FormControl isInvalid={errors.description} mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      placeholder="Describe what you plan to shop for, any specific goals, or other details..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Divider />

                {/* Date & Time */}
                <Box>
                  <Heading size="md" mb={4} color="brand.500">
                    <Icon as={FiCalendar} mr={2} />
                    Date & Time
                  </Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <FormControl isInvalid={errors.date}>
                      <FormLabel>Date</FormLabel>
                      <Input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <FormErrorMessage>{errors.date}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.time}>
                      <FormLabel>Time</FormLabel>
                      <Input
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                      />
                      <FormErrorMessage>{errors.time}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Estimated Duration</FormLabel>
                      <Select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                      >
                        <option value="1-2 hours">1-2 hours</option>
                        <option value="2-3 hours">2-3 hours</option>
                        <option value="3-4 hours">3-4 hours</option>
                        <option value="4+ hours">4+ hours</option>
                        <option value="full-day">Full day</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>

                  <FormControl isInvalid={errors.meetingPoint} mt={4}>
                    <FormLabel>Meeting Point</FormLabel>
                    <Input
                      name="meetingPoint"
                      placeholder="e.g., Main entrance of Phoenix Mall"
                      value={formData.meetingPoint}
                      onChange={handleInputChange}
                    />
                    <FormErrorMessage>{errors.meetingPoint}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Divider />

                {/* Group Settings */}
                <Box>
                  <Heading size="md" mb={4} color="brand.500">
                    <Icon as={FiUsers} mr={2} />
                    Group Settings
                  </Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isInvalid={errors.maxMembers}>
                      <FormLabel>Maximum Members</FormLabel>
                      <NumberInput
                        min={2}
                        max={10}
                        value={formData.maxMembers}
                        onChange={(value) => handleNumberChange('maxMembers', parseInt(value) || 2)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{errors.maxMembers}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Experience Level</FormLabel>
                      <Select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleInputChange}
                      >
                        <option value="all">All levels welcome</option>
                        <option value="beginner">Beginner friendly</option>
                        <option value="experienced">Experienced shoppers</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>

                  <VStack align="stretch" spacing={3} mt={4}>
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">Public Trip</Text>
                        <Text fontSize="sm" color="gray.600">
                          Allow anyone to discover and join this trip
                        </Text>
                      </VStack>
                      <Switch
                        isChecked={formData.isPublic}
                        onChange={(e) => handleSwitchChange('isPublic', e.target.checked)}
                        colorScheme="brand"
                      />
                    </HStack>

                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">Allow Join Requests</Text>
                        <Text fontSize="sm" color="gray.600">
                          Let others request to join your trip
                        </Text>
                      </VStack>
                      <Switch
                        isChecked={formData.allowJoinRequests}
                        onChange={(e) => handleSwitchChange('allowJoinRequests', e.target.checked)}
                        colorScheme="brand"
                      />
                    </HStack>
                  </VStack>
                </Box>

                <Divider />

                {/* Shopping Details */}
                <Box>
                  <Heading size="md" mb={4} color="brand.500">
                    <Icon as={FiShoppingBag} mr={2} />
                    Shopping Details
                  </Heading>
                  
                  <FormControl mb={4}>
                    <FormLabel>Budget Range</FormLabel>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                      {budgetOptions.map(option => (
                        <Card
                          key={option.value}
                          variant={formData.budgetRange === option.value ? 'filled' : 'outline'}
                          bg={formData.budgetRange === option.value ? `${option.color}.50` : 'white'}
                          borderColor={formData.budgetRange === option.value ? `${option.color}.500` : 'gray.200'}
                          borderWidth={formData.budgetRange === option.value ? '2px' : '1px'}
                          cursor="pointer"
                          onClick={() => handleBudgetSelect(option)}
                          _hover={{ shadow: 'md', transform: 'translateY(-1px)' }}
                          transition="all 0.2s"
                        >
                          <CardBody py={3} textAlign="center">
                            <VStack spacing={1}>
                              <Icon as={FiDollarSign} color={`${option.color}.500`} />
                              <Text fontSize="sm" fontWeight="medium">
                                {option.label.split(' (')[0]}
                              </Text>
                              <Text fontSize="xs" color="gray.600">
                                {option.label.split(' (')[1]?.replace(')', '')}
                              </Text>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                    {errors.budget && <Text color="red.500" fontSize="sm">{errors.budget}</Text>}
                  </FormControl>

                  <FormControl isInvalid={errors.categories}>
                    <FormLabel>Shopping Categories</FormLabel>
                    <CheckboxGroup
                      value={formData.categories}
                      onChange={handleCategoriesChange}
                    >
                      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                        {categories.map(category => (
                          <Checkbox key={category} value={category} colorScheme="brand">
                            <Text fontSize="sm">{category}</Text>
                          </Checkbox>
                        ))}
                      </SimpleGrid>
                    </CheckboxGroup>
                    <FormErrorMessage>{errors.categories}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Special Requirements</FormLabel>
                    <Textarea
                      name="requirements"
                      placeholder="Any special requirements, preferences, or notes for participants..."
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </FormControl>
                </Box>

                {/* Submit Button */}
                <Box pt={4}>
                  <HStack spacing={4}>
                    <Button
                      type="submit"
                      colorScheme="brand"
                      size="lg"
                      isLoading={isLoading}
                      loadingText="Creating Trip..."
                      leftIcon={<Icon as={FiCalendar} />}
                    >
                      Create Shopping Trip
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate('/trips')}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </Box>

                {/* Info Alert */}
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <Text fontSize="sm">
                      <strong>Note:</strong> You can edit trip details and manage participants after creation. 
                      Participants will be notified of any changes.
                    </Text>
                  </Box>
                </Alert>

              </VStack>
            </Box>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default CreateTrip
