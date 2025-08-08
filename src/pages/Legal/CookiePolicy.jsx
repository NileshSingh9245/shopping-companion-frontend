import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react'

const CookiePolicy = () => {
  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Cookie Policy</Heading>
        <Text color="gray.600" fontSize="sm">Last updated: August 8, 2025</Text>
        
        <Box>
          <Heading size="md" mb={3}>What Are Cookies</Heading>
          <Text>
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and 
            improving our service.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>How We Use Cookies</Heading>
          <Text>We use cookies for:</Text>
          <Box as="ul" pl={6} mt={2}>
            <Box as="li">Authentication and security</Box>
            <Box as="li">Remembering your preferences</Box>
            <Box as="li">Analytics and performance monitoring</Box>
            <Box as="li">Improving user experience</Box>
          </Box>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Types of Cookies We Use</Heading>
          <VStack spacing={3} align="stretch">
            <Box>
              <Text fontWeight="semibold">Essential Cookies</Text>
              <Text fontSize="sm">Required for the website to function properly</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Analytics Cookies</Text>
              <Text fontSize="sm">Help us understand how visitors use our site</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Preference Cookies</Text>
              <Text fontSize="sm">Remember your settings and preferences</Text>
            </Box>
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Managing Cookies</Heading>
          <Text>
            You can control and/or delete cookies as you wish. You can delete all cookies that are 
            already on your computer and you can set most browsers to prevent them from being placed.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Contact Us</Heading>
          <Text>
            If you have any questions about our use of cookies, please contact us at 
            privacy@shoppingcompanion.com
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default CookiePolicy
