import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Badge,
  Link,
  Divider
} from '@chakra-ui/react'
import { 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiUsers,
  FiTrendingUp,
  FiTarget
} from 'react-icons/fi'

const PartnershipsPage = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="6xl" py={12}>
        <VStack spacing={12} align="stretch">
          {/* Header Section */}
          <VStack spacing={4} textAlign="center">
            <Badge colorScheme="purple" fontSize="sm" px={3} py={1} borderRadius="full">
              Business Partnerships
            </Badge>
            <Heading size="2xl" color="gray.800">
              Partner with Shopping Companion
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl">
              Join our growing network of retail partners and shopping enthusiasts. 
              Together, we're revolutionizing the way people discover, shop, and connect.
            </Text>
          </VStack>

          {/* Partnership Benefits */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Card>
              <CardBody textAlign="center">
                <Icon as={FiUsers} w={10} h={10} color="purple.500" mb={4} />
                <Heading size="md" mb={3}>Expand Your Reach</Heading>
                <Text color="gray.600">
                  Connect with thousands of active shoppers in your area through our platform.
                </Text>
              </CardBody>
            </Card>

            <Card>
              <CardBody textAlign="center">
                <Icon as={FiTrendingUp} w={10} h={10} color="green.500" mb={4} />
                <Heading size="md" mb={3}>Increase Sales</Heading>
                <Text color="gray.600">
                  Drive foot traffic and boost sales through organized group shopping events.
                </Text>
              </CardBody>
            </Card>

            <Card>
              <CardBody textAlign="center">
                <Icon as={FiTarget} w={10} h={10} color="blue.500" mb={4} />
                <Heading size="md" mb={3}>Build Community</Heading>
                <Text color="gray.600">
                  Foster stronger relationships with customers through shared shopping experiences.
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Partnership Types */}
          <VStack spacing={8} align="stretch">
            <Heading size="lg" textAlign="center">Partnership Opportunities</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card>
                <CardBody>
                  <Heading size="md" mb={3} color="purple.600">Retail Store Partners</Heading>
                  <Text color="gray.600" mb={4}>
                    Feature your store on our platform, host group shopping events, and offer exclusive deals to our community.
                  </Text>
                  <VStack align="start" spacing={2}>
                    <Text fontSize="sm">• Store listing and promotions</Text>
                    <Text fontSize="sm">• Event hosting capabilities</Text>
                    <Text fontSize="sm">• Customer analytics dashboard</Text>
                    <Text fontSize="sm">• Marketing support</Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Heading size="md" mb={3} color="blue.600">Technology Partners</Heading>
                  <Text color="gray.600" mb={4}>
                    Integrate your services with our platform to enhance the shopping experience for our users.
                  </Text>
                  <VStack align="start" spacing={2}>
                    <Text fontSize="sm">• API integration opportunities</Text>
                    <Text fontSize="sm">• White-label solutions</Text>
                    <Text fontSize="sm">• Co-marketing opportunities</Text>
                    <Text fontSize="sm">• Revenue sharing models</Text>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>

          <Divider />

          {/* Contact Section */}
          <VStack spacing={6} textAlign="center">
            <Heading size="lg">Ready to Partner?</Heading>
            <Text color="gray.600" maxW="2xl">
              We're always looking for innovative partners who share our vision of making shopping 
              more social, enjoyable, and efficient. Let's discuss how we can work together.
            </Text>
            
            <VStack spacing={4}>
              <HStack spacing={6} flexWrap="wrap" justify="center">
                <HStack>
                  <Icon as={FiMail} color="purple.500" />
                  <Link href="mailto:partnerships@shoppingcompanion.com" color="purple.600">
                    partnerships@shoppingcompanion.com
                  </Link>
                </HStack>
                <HStack>
                  <Icon as={FiPhone} color="purple.500" />
                  <Text color="gray.600">+91-9876543210</Text>
                </HStack>
              </HStack>
              
              <Button 
                colorScheme="purple" 
                size="lg" 
                as="a" 
                href="mailto:partnerships@shoppingcompanion.com"
              >
                Get in Touch
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default PartnershipsPage
