import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react'

const TermsOfService = () => {
  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Terms of Service</Heading>
        <Text color="gray.600" fontSize="sm">Last updated: August 8, 2025</Text>
        
        <Box>
          <Heading size="md" mb={3}>1. Acceptance of Terms</Heading>
          <Text>
            By accessing and using Shopping Companion, you accept and agree to be bound by the terms 
            and provision of this agreement.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>2. Platform Description</Heading>
          <Text>
            Shopping Companion is a platform that connects people in Coimbatore for group shopping 
            experiences. We facilitate connections between users but are not responsible for individual 
            user interactions.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>3. User Responsibilities</Heading>
          <Text>
            Users are responsible for their own safety and conduct. This includes but is not limited to:
          </Text>
          <Box as="ul" pl={6} mt={2}>
            <Box as="li">Meeting in public, safe locations</Box>
            <Box as="li">Respecting other users and their boundaries</Box>
            <Box as="li">Providing accurate information in profiles</Box>
            <Box as="li">Following all safety guidelines</Box>
          </Box>
        </Box>

        <Box>
          <Heading size="md" mb={3}>4. Privacy</Heading>
          <Text>
            Your privacy is important to us. Please review our Privacy Policy to understand how we 
            collect, use, and protect your information.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>5. Contact Information</Heading>
          <Text>
            For questions about these Terms of Service, please contact us at legal@shoppingcompanion.com
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default TermsOfService
