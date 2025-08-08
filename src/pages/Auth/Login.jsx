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
  useToast
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  
  const { login, isLoading, error } = useAuthStore()
  const navigate = useNavigate()
  const toast = useToast()

  const handleChange = (e) => {
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

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const result = await login(formData)
    
    if (result.success) {
      toast({
        title: 'Login successful',
        description: `Welcome back, ${result.user.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/dashboard')
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="md">
        <VStack spacing={8} bg="white" p={8} rounded="xl" shadow="lg">
          <VStack spacing={2} textAlign="center">
            <Heading size="lg" color="brand.500">
              Welcome Back
            </Heading>
            <Text color="gray.600">
              Sign in to your Shopping Companion account
            </Text>
            <Box mt={4} p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
              <Text fontSize="xs" color="blue.700" fontWeight="semibold" mb={1}>
                Demo Admin Credentials:
              </Text>
              <VStack spacing={1} fontSize="xs" color="blue.600">
                <Text><strong>Email:</strong> admin-vibeCoding@cognizant.com</Text>
                <Text><strong>Password:</strong> password123</Text>
              </VStack>
            </Box>
          </VStack>

          {error && (
            <Alert status="error" rounded="lg">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Box as="form" onSubmit={handleSubmit} w="full">
            <VStack spacing={4}>
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                w="full"
                isLoading={isLoading}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </VStack>
          </Box>

          <VStack spacing={4} w="full">
            <Link color="brand.500" fontSize="sm">
              Forgot your password?
            </Link>
            
            <Divider />
            
            <Text fontSize="sm" color="gray.600">
              Don't have an account?{' '}
              <Link as={RouterLink} to="/register" color="brand.500" fontWeight="semibold">
                Sign up here
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Login
