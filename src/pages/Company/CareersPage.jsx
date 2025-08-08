import { Box, Heading, Text, VStack, Container, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const CareersPage = () => {
  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Join Our Team</Heading>
        <Text fontSize="lg" color="gray.600">
          Help us build the future of social shopping in Coimbatore
        </Text>
        
        <Box>
          <Heading size="md" mb={3}>Why Work With Us?</Heading>
          <Text>
            At Shopping Companion, we're passionate about connecting people and creating meaningful 
            shopping experiences. Join our growing team and help shape the future of social commerce 
            in India.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Current Openings</Heading>
          <VStack spacing={3} align="stretch">
            <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
              <Text fontWeight="semibold">Frontend Developer</Text>
              <Text fontSize="sm" color="gray.600">React, Chakra UI, TypeScript</Text>
              <Text fontSize="sm">Location: Coimbatore | Full-time</Text>
            </Box>
            <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
              <Text fontWeight="semibold">Backend Developer</Text>
              <Text fontSize="sm" color="gray.600">Node.js, Express, MongoDB</Text>
              <Text fontSize="sm">Location: Coimbatore | Full-time</Text>
            </Box>
            <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
              <Text fontWeight="semibold">UI/UX Designer</Text>
              <Text fontSize="sm" color="gray.600">Figma, User Research, Prototyping</Text>
              <Text fontSize="sm">Location: Coimbatore | Full-time</Text>
            </Box>
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Contact Us</Heading>
          <Text>
            Interested in joining our team? Send your resume to careers@shoppingcompanion.com
          </Text>
        </Box>

        <Box>
          <Button as={RouterLink} to="/" colorScheme="brand">
            Back to Home
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}

export default CareersPage
