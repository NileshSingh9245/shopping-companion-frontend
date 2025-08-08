import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  Select,
  Textarea,
  Checkbox,
  useToast,
  SimpleGrid
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    preferences: {
      categories: [],
      budgetRange: '',
      preferredTime: '',
      groupSize: 4
    },
    isShoppingBuddy: false,
    agreeToTerms: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [locationError, setLocationError] = useState('')
  
  const { register, isLoading, error } = useAuthStore()
  const navigate = useNavigate()
  const toast = useToast()

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }))
        },
        (error) => {
          // Error getting location - using default coordinates
          setLocationError('Unable to get your location. Please enable location services.')
          // Set default coordinates for Coimbatore
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: 11.0696,
              longitude: 77.0428
            }
          }))
        }
      )
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Basic validation
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    // Address validation
    if (!formData.address.street) {
      newErrors['address.street'] = 'Street address is required'
    }
    
    if (!formData.address.city) {
      newErrors['address.city'] = 'City is required'
    }
    
    if (!formData.address.state) {
      newErrors['address.state'] = 'State is required'
    }
    
    if (!formData.address.pincode) {
      newErrors['address.pincode'] = 'Pincode is required'
    } else if (!/^[1-9][0-9]{5}$/.test(formData.address.pincode)) {
      newErrors['address.pincode'] = 'Please enter a valid Indian pincode'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, agreeToTerms, ...registrationData } = formData
    
    const result = await register(registrationData)
    
    if (result.success) {
      toast({
        title: 'Registration successful',
        description: `Welcome to Shopping Companion, ${result.user.name}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/dashboard')
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="2xl">
        <VStack spacing={8} bg="white" p={8} rounded="xl" shadow="lg">
          <VStack spacing={2} textAlign="center">
            <Heading size="lg" color="brand.500">
              Join Shopping Companion
            </Heading>
            <Text color="gray.600">
              Create your account to start finding shopping buddies
            </Text>
          </VStack>

          {error && (
            <Alert status="error" rounded="lg">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {locationError && (
            <Alert status="warning" rounded="lg">
              <AlertIcon />
              {locationError}
            </Alert>
          )}

          <Box as="form" onSubmit={handleSubmit} w="full">
            <VStack spacing={6}>
              {/* Personal Information */}
              <Box w="full">
                <Heading size="md" mb={4}>Personal Information</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.phone}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      name="phone"
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Toggle password visibility"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label="Toggle password visibility"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </Box>

              {/* Address Information */}
              <Box w="full">
                <Heading size="md" mb={4}>Address Information</Heading>
                <VStack spacing={4}>
                  <FormControl isInvalid={errors['address.street']}>
                    <FormLabel>Street Address</FormLabel>
                    <Textarea
                      name="address.street"
                      placeholder="Enter your complete address"
                      value={formData.address.street}
                      onChange={handleChange}
                      rows={2}
                    />
                    <FormErrorMessage>{errors['address.street']}</FormErrorMessage>
                  </FormControl>

                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
                    <FormControl isInvalid={errors['address.city']}>
                      <FormLabel>City</FormLabel>
                      <Input
                        name="address.city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors['address.city']}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors['address.state']}>
                      <FormLabel>State</FormLabel>
                      <Select
                        name="address.state"
                        placeholder="Select state"
                        value={formData.address.state}
                        onChange={handleChange}
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        {/* Add more states as needed */}
                      </Select>
                      <FormErrorMessage>{errors['address.state']}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors['address.pincode']}>
                      <FormLabel>Pincode</FormLabel>
                      <Input
                        name="address.pincode"
                        placeholder="Pincode"
                        value={formData.address.pincode}
                        onChange={handleChange}
                      />
                      <FormErrorMessage>{errors['address.pincode']}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                </VStack>
              </Box>

              {/* Shopping Preferences */}
              <Box w="full">
                <Heading size="md" mb={4}>Shopping Preferences (Optional)</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>Budget Range</FormLabel>
                    <Select
                      name="preferences.budgetRange"
                      placeholder="Select budget range"
                      value={formData.preferences.budgetRange}
                      onChange={handleChange}
                    >
                      <option value="budget">Budget (Under ₹1,000)</option>
                      <option value="mid-range">Mid-range (₹1,000 - ₹5,000)</option>
                      <option value="premium">Premium (Above ₹5,000)</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Preferred Shopping Time</FormLabel>
                    <Select
                      name="preferences.preferredTime"
                      placeholder="Select preferred time"
                      value={formData.preferences.preferredTime}
                      onChange={handleChange}
                    >
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening">Evening (5 PM - 9 PM)</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <FormControl mt={4}>
                  <Checkbox
                    name="isShoppingBuddy"
                    isChecked={formData.isShoppingBuddy}
                    onChange={handleChange}
                  >
                    I want to be a shopping buddy and help others
                  </Checkbox>
                </FormControl>
              </Box>

              {/* Terms and Conditions */}
              <FormControl isInvalid={errors.agreeToTerms}>
                <Checkbox
                  name="agreeToTerms"
                  isChecked={formData.agreeToTerms}
                  onChange={handleChange}
                >
                  I agree to the{' '}
                  <Link color="brand.500" href="#terms">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link color="brand.500" href="#privacy">
                    Privacy Policy
                  </Link>
                </Checkbox>
                <FormErrorMessage>{errors.agreeToTerms}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                w="full"
                isLoading={isLoading}
                loadingText="Creating account..."
              >
                Create Account
              </Button>
            </VStack>
          </Box>

          <VStack spacing={4} w="full">
            <Divider />
            
            <Text fontSize="sm" color="gray.600">
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="brand.500" fontWeight="semibold">
                Sign in here
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Register
