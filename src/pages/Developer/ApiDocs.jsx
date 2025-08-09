import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  Code,
  Divider,
  SimpleGrid,
  Badge,
  HStack,
  Icon,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react'
import { 
  FiCode, 
  FiDatabase, 
  FiLock,
  FiGlobe,
  FiUsers,
  FiShoppingBag
} from 'react-icons/fi'

const ApiDocs = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/trips/nearby',
      description: 'Get shopping trips near a location',
      parameters: ['latitude', 'longitude', 'radius'],
      example: '/api/trips/nearby?latitude=11.0168&longitude=76.9558&radius=10'
    },
    {
      method: 'POST',
      path: '/api/trips',
      description: 'Create a new shopping trip',
      parameters: ['title', 'description', 'date', 'location'],
      example: 'POST /api/trips with trip data in body'
    },
    {
      method: 'GET',
      path: '/api/stores',
      description: 'Get list of partner stores',
      parameters: ['category', 'location', 'limit'],
      example: '/api/stores?category=electronics&limit=20'
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      description: 'User authentication',
      parameters: ['email', 'password'],
      example: 'POST /api/auth/login with credentials'
    }
  ]

  const features = [
    {
      icon: FiShoppingBag,
      title: 'Trip Management',
      description: 'Create, join, and manage shopping trips',
      color: 'blue'
    },
    {
      icon: FiUsers,
      title: 'Social Features',
      description: 'Connect with shopping buddies',
      color: 'green'
    },
    {
      icon: FiDatabase,
      title: 'Store Directory',
      description: 'Access partner store information',
      color: 'purple'
    },
    {
      icon: FiLock,
      title: 'Secure Authentication',
      description: 'JWT-based user authentication',
      color: 'red'
    }
  ]

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            Shopping Companion API
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            Integrate Shopping Companion features into your applications with our RESTful API
          </Text>
        </Box>

        {/* Quick Start */}
        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">
                <Icon as={FiCode} mr={2} />
                Quick Start
              </Heading>
              <Text color="gray.600">
                Base URL: <Code>https://api.shoppingcompanion.com</Code>
              </Text>
              <Text color="gray.600">
                Authentication: Include your API key in the Authorization header
              </Text>
              <Code p={4} borderRadius="md">
                curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
                &nbsp;&nbsp;&nbsp;&nbsp;"https://api.shoppingcompanion.com/api/trips/nearby?latitude=11.0168&longitude=76.9558"
              </Code>
            </VStack>
          </CardBody>
        </Card>

        {/* Features */}
        <VStack spacing={6} align="stretch">
          <Heading size="lg">API Features</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {features.map((feature) => (
              <Card key={feature.title} variant="outline">
                <CardBody>
                  <HStack spacing={4}>
                    <Icon as={feature.icon} boxSize={8} color={`${feature.color}.500`} />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">{feature.title}</Text>
                      <Text fontSize="sm" color="gray.600">{feature.description}</Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>

        <Divider />

        {/* Endpoints */}
        <VStack spacing={6} align="stretch">
          <Heading size="lg">API Endpoints</Heading>
          <Accordion allowToggle>
            {endpoints.map((endpoint, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Badge 
                          colorScheme={endpoint.method === 'GET' ? 'green' : 'blue'}
                          fontSize="xs"
                        >
                          {endpoint.method}
                        </Badge>
                        <Code>{endpoint.path}</Code>
                        <Text color="gray.600">{endpoint.description}</Text>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack spacing={3} align="stretch">
                    <Text><strong>Description:</strong> {endpoint.description}</Text>
                    <Text><strong>Parameters:</strong> {endpoint.parameters.join(', ')}</Text>
                    <Text><strong>Example:</strong></Text>
                    <Code p={2} fontSize="sm">{endpoint.example}</Code>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>

        {/* Rate Limits */}
        <Card bg="yellow.50" border="1px" borderColor="yellow.200">
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Rate Limits</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <VStack spacing={1} textAlign="center">
                  <Text fontWeight="bold">Free Tier</Text>
                  <Text fontSize="sm" color="gray.600">100 requests/hour</Text>
                </VStack>
                <VStack spacing={1} textAlign="center">
                  <Text fontWeight="bold">Premium Tier</Text>
                  <Text fontSize="sm" color="gray.600">1,000 requests/hour</Text>
                </VStack>
                <VStack spacing={1} textAlign="center">
                  <Text fontWeight="bold">Enterprise</Text>
                  <Text fontSize="sm" color="gray.600">Custom limits</Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Get API Key */}
        <Card bg="brand.50" textAlign="center">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md">Ready to Get Started?</Heading>
              <Text color="gray.600">
                Get your API key and start building amazing shopping experiences
              </Text>
              <HStack spacing={4}>
                <Button colorScheme="brand" size="lg">
                  Get API Key
                </Button>
                <Button variant="outline" colorScheme="brand" size="lg">
                  View Documentation
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default ApiDocs
