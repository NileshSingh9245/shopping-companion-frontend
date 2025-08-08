import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react'

const Accessibility = () => {
  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Accessibility Statement</Heading>
        <Text color="gray.600" fontSize="sm">Last updated: August 8, 2025</Text>
        
        <Box>
          <Heading size="md" mb={3}>Our Commitment</Heading>
          <Text>
            Shopping Companion is committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone and applying the relevant 
            accessibility standards.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Accessibility Features</Heading>
          <Box as="ul" pl={6}>
            <Box as="li">Keyboard navigation support</Box>
            <Box as="li">Screen reader compatibility</Box>
            <Box as="li">High contrast color schemes</Box>
            <Box as="li">Resizable text up to 200%</Box>
            <Box as="li">Clear navigation and structure</Box>
            <Box as="li">Alternative text for images</Box>
          </Box>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Standards</Heading>
          <Text>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. 
            These guidelines explain how to make web content more accessible for people with disabilities.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Feedback</Heading>
          <Text>
            We welcome your feedback on the accessibility of Shopping Companion. Please let us know 
            if you encounter accessibility barriers:
          </Text>
          <Box mt={2}>
            <Text>Email: accessibility@shoppingcompanion.com</Text>
            <Text>Phone: +91 98765 43210</Text>
          </Box>
        </Box>

        <Box>
          <Heading size="md" mb={3}>Assessment</Heading>
          <Text>
            This website has been assessed using automated tools and manual testing. We continuously 
            monitor and improve our accessibility implementation.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default Accessibility
