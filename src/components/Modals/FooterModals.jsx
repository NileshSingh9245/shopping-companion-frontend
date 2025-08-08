import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Box,
  List,
  ListItem,
  ListIcon,
  Badge,
  Divider,
  Alert,
  AlertIcon,
  Code,
  useColorModeValue
} from '@chakra-ui/react'
import { FiCheck, FiShield, FiUsers, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

export const HelpCenterModal = ({ isOpen, onClose }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor} maxH="80vh">
        <ModalHeader>
          <HStack>
            <FiPhone />
            <Text>Help Center - 24/7 Support</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Alert status="info">
              <AlertIcon />
              Our support team is available 24/7 to help you with any questions or issues.
            </Alert>

            <Box>
              <Heading size="md" mb={3}>Contact Support</Heading>
              <VStack spacing={3} align="stretch">
                <HStack>
                  <FiPhone />
                  <Text>Phone: +91 98765 43210 (24/7 Support)</Text>
                </HStack>
                <HStack>
                  <FiMail />
                  <Text>Email: support@shoppingcompanion.com</Text>
                </HStack>
                <HStack>
                  <FiMapPin />
                  <Text>Office: 123 Tech Park, Sarvanampatti, Coimbatore</Text>
                </HStack>
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Common Issues & Solutions</Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="semibold">Login Issues:</Text> Clear browser cache or reset password
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="semibold">Trip Booking:</Text> Ensure all required fields are filled
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="semibold">Payment Problems:</Text> Check your internet connection
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="semibold">Profile Updates:</Text> Changes may take 5-10 minutes to reflect
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Quick Actions</Heading>
              <VStack spacing={2}>
                <Button colorScheme="blue" size="sm" w="full">
                  Report a Problem
                </Button>
                <Button colorScheme="green" size="sm" w="full">
                  Request Feature
                </Button>
                <Button colorScheme="purple" size="sm" w="full">
                  Account Recovery
                </Button>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const SafetyGuidelinesModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <ModalHeader>
          <HStack>
            <FiShield />
            <Text>Safety Guidelines</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Alert status="warning">
              <AlertIcon />
              Your safety is our top priority. Please follow these guidelines when meeting shopping companions.
            </Alert>

            <Box>
              <Heading size="md" mb={3}>Before Meeting</Heading>
              <List spacing={2}>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Always meet in public, well-lit areas
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Inform a friend or family member about your plans
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Verify the companion's profile and reviews
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Share your location with trusted contacts
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>During Shopping</Heading>
              <List spacing={2}>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Stay in crowded areas of the mall/store
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Keep your personal belongings secure
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Don't share personal financial information
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  Trust your instincts - leave if you feel uncomfortable
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Emergency Contacts</Heading>
              <VStack spacing={2} align="stretch">
                <Text><strong>Emergency:</strong> 108 (India Emergency)</Text>
                <Text><strong>Police:</strong> 100</Text>
                <Text><strong>Shopping Companion Support:</strong> +91 98765 43210</Text>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>I Understand</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const FAQModal = ({ isOpen, onClose }) => {
  const faqs = [
    {
      question: "How do I find shopping companions?",
      answer: "Use our 'Find Buddies' feature to browse verified shopping companions in your area. Filter by preferences, location, and ratings."
    },
    {
      question: "Is it safe to shop with strangers?",
      answer: "Yes! All our users are verified. Always follow our safety guidelines and meet in public places. Report any suspicious behavior immediately."
    },
    {
      question: "How do I create a shopping trip?",
      answer: "Go to 'Shopping Trips' and click 'Create Trip'. Fill in details like destination, time, and preferences. Others can join your trip!"
    },
    {
      question: "Can I cancel a trip?",
      answer: "Yes, you can cancel trips up to 2 hours before the scheduled time. Please be considerate of other participants."
    },
    {
      question: "How are stores verified?",
      answer: "We verify stores through official documentation, physical visits, and user reviews. Verified stores display a blue checkmark."
    },
    {
      question: "What if I have a bad experience?",
      answer: "Report the incident immediately through our app. We take all reports seriously and investigate within 24 hours."
    }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <ModalHeader>Frequently Asked Questions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {faqs.map((faq, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                <Text fontWeight="semibold" mb={2}>{faq.question}</Text>
                <Text fontSize="sm" color="gray.600">{faq.answer}</Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const AboutUsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <ModalHeader>About Shopping Companion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={3}>Our Mission</Heading>
              <Text>
                Shopping Companion connects people in Coimbatore to create safe, enjoyable, and social shopping experiences. 
                We believe shopping is more fun with friends, and our platform helps you find like-minded companions 
                in your local area.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Why We Started</Heading>
              <Text>
                Founded in 2024, Shopping Companion was created to address the growing need for social connection 
                in urban areas. Many people, especially newcomers to Coimbatore, struggle to find shopping partners 
                who share similar interests and preferences.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Our Values</Heading>
              <List spacing={2}>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <strong>Safety First:</strong> Verified users and comprehensive safety measures
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <strong>Community:</strong> Building lasting friendships through shared experiences
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <strong>Local Focus:</strong> Supporting local businesses in Coimbatore
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <strong>Inclusivity:</strong> Welcome to everyone regardless of background
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Our Impact</Heading>
              <HStack spacing={8} justify="center">
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">1,245+</Text>
                  <Text fontSize="sm">Happy Users</Text>
                </VStack>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">500+</Text>
                  <Text fontSize="sm">Successful Trips</Text>
                </VStack>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">89</Text>
                  <Text fontSize="sm">Partner Stores</Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <ModalHeader>Privacy Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">Last updated: August 8, 2025</Text>
            
            <Box>
              <Heading size="md" mb={2}>Information We Collect</Heading>
              <Text fontSize="sm" mb={2}>We collect information you provide directly to us:</Text>
              <List spacing={1} fontSize="sm">
                <ListItem>• Account information (name, email, phone)</ListItem>
                <ListItem>• Profile preferences and shopping interests</ListItem>
                <ListItem>• Location data (with your permission)</ListItem>
                <ListItem>• Trip and interaction history</ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={2}>How We Use Your Information</Heading>
              <List spacing={1} fontSize="sm">
                <ListItem>• Match you with compatible shopping companions</ListItem>
                <ListItem>• Provide personalized store recommendations</ListItem>
                <ListItem>• Ensure safety and security of our platform</ListItem>
                <ListItem>• Send you relevant updates and notifications</ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={2}>Data Security</Heading>
              <Text fontSize="sm">
                We use industry-standard encryption and security measures to protect your data. 
                Your personal information is never shared with third parties without your explicit consent.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>Your Rights</Heading>
              <List spacing={1} fontSize="sm">
                <ListItem>• Access your personal data</ListItem>
                <ListItem>• Update or correct your information</ListItem>
                <ListItem>• Delete your account and data</ListItem>
                <ListItem>• Opt-out of communications</ListItem>
              </List>
            </Box>

            <Alert status="info" fontSize="sm">
              <AlertIcon />
              For questions about this policy, contact us at privacy@shoppingcompanion.com
            </Alert>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const CommunityGuidelinesModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <ModalHeader>
          <HStack>
            <FiUsers />
            <Text>Community Guidelines</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Alert status="success">
              <AlertIcon />
              These guidelines help create a positive experience for everyone in our community.
            </Alert>

            <Box>
              <Heading size="md" mb={3}>Be Respectful</Heading>
              <List spacing={2} fontSize="sm">
                <ListItem>• Treat all members with kindness and respect</ListItem>
                <ListItem>• Be punctual for scheduled trips and meetings</ListItem>
                <ListItem>• Respect others' shopping preferences and budgets</ListItem>
                <ListItem>• Use appropriate language in all communications</ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Stay Safe</Heading>
              <List spacing={2} fontSize="sm">
                <ListItem>• Follow all safety guidelines</ListItem>
                <ListItem>• Report suspicious or inappropriate behavior</ListItem>
                <ListItem>• Don't share personal financial information</ListItem>
                <ListItem>• Meet only in public, well-lit areas</ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Be Authentic</Heading>
              <List spacing={2} fontSize="sm">
                <ListItem>• Use your real name and photo</ListItem>
                <ListItem>• Provide accurate information in your profile</ListItem>
                <ListItem>• Give honest reviews and ratings</ListItem>
                <ListItem>• Don't create fake accounts</ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Prohibited Activities</Heading>
              <List spacing={2} fontSize="sm">
                <ListItem>• No harassment, bullying, or discrimination</ListItem>
                <ListItem>• No spam or unauthorized advertising</ListItem>
                <ListItem>• No illegal activities or promoting unsafe behavior</ListItem>
                <ListItem>• No sharing of inappropriate content</ListItem>
              </List>
            </Box>

            <Alert status="warning" fontSize="sm">
              <AlertIcon />
              Violations may result in warnings, temporary suspension, or permanent ban from the platform.
            </Alert>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>I Agree</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const TermsOfServiceModal = ({ isOpen, onClose }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor} maxH="80vh">
        <ModalHeader>Terms of Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Alert status="info">
              <AlertIcon />
              These terms govern your use of Shopping Companion services.
            </Alert>

            <Box>
              <Heading size="md" mb={3}>Acceptance of Terms</Heading>
              <Text fontSize="sm">
                By accessing and using Shopping Companion, you accept and agree to be bound by these terms. 
                If you do not agree to these terms, please do not use our services.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>User Responsibilities</Heading>
              <List spacing={2} fontSize="sm">
                <ListItem>• You must be 18 years or older to use our services</ListItem>
                <ListItem>• Provide accurate and truthful information</ListItem>
                <ListItem>• Maintain the security of your account</ListItem>
                <ListItem>• Follow all applicable laws and regulations</ListItem>
                <ListItem>• Respect other users and their privacy</ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Service Availability</Heading>
              <Text fontSize="sm">
                We strive to provide continuous service but cannot guarantee 100% uptime. 
                Services may be temporarily unavailable for maintenance or technical issues.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Limitation of Liability</Heading>
              <Text fontSize="sm">
                Shopping Companion serves as a platform to connect users. We are not responsible 
                for the actions of other users or the outcome of shopping trips organized through our platform.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Modifications</Heading>
              <Text fontSize="sm">
                We reserve the right to modify these terms at any time. Users will be notified 
                of significant changes via email or in-app notifications.
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const CookiePolicyModal = ({ isOpen, onClose }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor} maxH="80vh">
        <ModalHeader>Cookie Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Alert status="info">
              <AlertIcon />
              This policy explains how we use cookies and similar technologies.
            </Alert>

            <Box>
              <Heading size="md" mb={3}>What Are Cookies?</Heading>
              <Text fontSize="sm">
                Cookies are small text files stored on your device that help us provide 
                a better user experience and analyze how our services are used.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Types of Cookies We Use</Heading>
              <VStack spacing={3} align="stretch">
                <Box>
                  <Text fontWeight="semibold" fontSize="sm">Essential Cookies</Text>
                  <Text fontSize="sm" color="gray.600">
                    Required for basic functionality like login and security
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="sm">Performance Cookies</Text>
                  <Text fontSize="sm" color="gray.600">
                    Help us understand how users interact with our site
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="sm">Functional Cookies</Text>
                  <Text fontSize="sm" color="gray.600">
                    Remember your preferences and settings
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="sm">Targeting Cookies</Text>
                  <Text fontSize="sm" color="gray.600">
                    Used to show relevant content and advertisements
                  </Text>
                </Box>
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Managing Cookies</Heading>
              <Text fontSize="sm">
                You can control cookies through your browser settings. However, disabling 
                certain cookies may affect the functionality of our services.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Third-Party Cookies</Heading>
              <Text fontSize="sm">
                We may use third-party services like Google Analytics that place their own cookies. 
                These are governed by their respective privacy policies.
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const AccessibilityModal = ({ isOpen, onClose }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor} maxH="80vh">
        <ModalHeader>Accessibility Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Alert status="success">
              <AlertIcon />
              We're committed to making Shopping Companion accessible to everyone.
            </Alert>

            <Box>
              <Heading size="md" mb={3}>Our Accessibility Features</Heading>
              <List spacing={2} fontSize="sm">
                <ListItem>• Keyboard navigation support</ListItem>
                <ListItem>• Screen reader compatibility</ListItem>
                <ListItem>• High contrast color options</ListItem>
                <ListItem>• Adjustable font sizes</ListItem>
                <ListItem>• Alternative text for images</ListItem>
                <ListItem>• Clear headings and structure</ListItem>
              </List>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Accessibility Standards</Heading>
              <Text fontSize="sm">
                We strive to comply with WCAG 2.1 AA guidelines to ensure our platform 
                is usable by people with various disabilities.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Assistive Technologies</Heading>
              <Text fontSize="sm">
                Our platform works with popular screen readers including JAWS, NVDA, 
                and VoiceOver. We also support voice recognition software.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Feedback & Support</Heading>
              <Text fontSize="sm">
                If you encounter accessibility barriers or need assistance, please contact 
                our support team at accessibility@shoppingcompanion.com
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={3}>Continuous Improvement</Heading>
              <Text fontSize="sm">
                We regularly review and update our accessibility features based on user 
                feedback and evolving standards.
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
