import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  HStack,
  VStack,
  SimpleGrid,
  useColorModeValue,
  IconButton,
  Divider,
  Heading,
  Badge,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Select
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { 
  FiHeart, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiShield,
  FiAward,
  FiUsers,
  FiStar,
  FiClock,
  FiHeadphones
} from 'react-icons/fi'
import { useState } from 'react'
import { 
  HelpCenterModal, 
  SafetyGuidelinesModal, 
  FAQModal, 
  AboutUsModal, 
  PrivacyPolicyModal,
  CommunityGuidelinesModal 
} from '../Modals/FooterModals'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isContactOpen,
    onOpen: onContactOpen,
    onClose: onContactClose
  } = useDisclosure()
  
  // Modal states for different sections
  const { isOpen: isHelpOpen, onOpen: onHelpOpen, onClose: onHelpClose } = useDisclosure()
  const { isOpen: isSafetyOpen, onOpen: onSafetyOpen, onClose: onSafetyClose } = useDisclosure()
  const { isOpen: isFAQOpen, onOpen: onFAQOpen, onClose: onFAQClose } = useDisclosure()
  const { isOpen: isAboutOpen, onOpen: onAboutOpen, onClose: onAboutClose } = useDisclosure()
  const { isOpen: isPrivacyOpen, onOpen: onPrivacyOpen, onClose: onPrivacyClose } = useDisclosure()
  const { isOpen: isCommunityOpen, onOpen: onCommunityOpen, onClose: onCommunityClose } = useDisclosure()
  
  const toast = useToast()

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })

  const handleNewsletterSubscribe = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter a valid email address',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubscribing(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false)
      setEmail('')
      toast({
        title: 'Subscribed successfully!',
        description: 'You will receive updates about new features and shopping tips',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }, 1000)
  }

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in all required fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Simulate sending message
    setTimeout(() => {
      toast({
        title: 'Message sent successfully!',
        description: 'We will get back to you within 24 hours',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      })
      onContactClose()
    }, 500)
  }

  const socialLinks = [
    { 
      icon: FiFacebook, 
      href: 'https://facebook.com/shoppingcompanion', 
      label: 'Facebook - Connect with our community', 
      color: 'facebook' 
    },
    { 
      icon: FiTwitter, 
      href: 'https://twitter.com/shopcompanion', 
      label: 'Twitter - Follow us for updates', 
      color: 'twitter' 
    },
    { 
      icon: FiInstagram, 
      href: 'https://instagram.com/shoppingcompanion', 
      label: 'Instagram - See shopping adventures', 
      color: 'pink' 
    },
    { 
      icon: FiLinkedin, 
      href: 'https://linkedin.com/company/shopping-companion', 
      label: 'LinkedIn - Professional network', 
      color: 'linkedin' 
    },
    { 
      icon: FiYoutube, 
      href: 'https://youtube.com/@shoppingcompanion', 
      label: 'YouTube - Shopping tips and tutorials', 
      color: 'red' 
    }
  ]

  const companyStats = [
    { icon: FiUsers, value: '1,245+', label: 'Active Users in Coimbatore' },
    { icon: FiStar, value: '4.8/5', label: 'Average User Rating' },
    { icon: FiShield, value: '100%', label: 'Secure & Verified' },
    { icon: FiAward, value: '2024', label: 'Best Shopping App Award' }
  ]

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      mt={20}
    >
      {/* Newsletter Section */}
      <Box bg={useColorModeValue('brand.500', 'brand.600')} color="white">
        <Container maxW="6xl" py={8}>
          <VStack spacing={4} textAlign="center">
            <Heading size="md">Stay Updated with Shopping Companion Coimbatore</Heading>
            <Text fontSize="sm" opacity={0.9} maxW="600px">
              Get the latest updates on new stores in Sarvanampatti and surrounding areas, 
              exclusive shopping tips from local experts, special offers from partnered stores, 
              and upcoming community shopping events. Join 1,200+ happy subscribers!
            </Text>
            <HStack maxW="md" w="full">
              <InputGroup>
                <Input
                  placeholder="Enter your email for weekly updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="white"
                  color="gray.800"
                  _placeholder={{ color: 'gray.500' }}
                />
                <InputRightElement>
                  <IconButton
                    icon={<FiSend />}
                    onClick={handleNewsletterSubscribe}
                    isLoading={isSubscribing}
                    loadingText="Subscribing..."
                    colorScheme="brand"
                    variant="ghost"
                    size="sm"
                    aria-label="Subscribe to newsletter"
                  />
                </InputRightElement>
              </InputGroup>
            </HStack>
            <Text fontSize="xs" opacity={0.8}>
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Footer Content */}
      <Container as={Stack} maxW="6xl" py={10} spacing={8}>
        <SimpleGrid
          templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          {/* Company Info */}
          <Stack spacing={6}>
            <Box>
              <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                <Heading size="md" color="brand.500" mb={2} _hover={{ color: 'brand.600' }}>
                  Shopping Companion
                </Heading>
              </Link>
              <Badge colorScheme="green" variant="subtle">
                Trusted Platform
              </Badge>
            </Box>
            <Text fontSize="sm" maxW="300px">
              Your trusted companion for discovering the best shopping experiences in Coimbatore. 
              Connect with verified local shopping buddies, explore authenticated stores, and make every shopping 
              trip safe, memorable, and enjoyable. Proudly serving the Sarvanampatti community since 2024.
            </Text>
            
            {/* Contact Info */}
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" fontWeight="semibold" color="brand.500">
                🚀 Created by Developer
              </Text>
              <HStack>
                <Box as={FiMapPin} color="brand.500" />
                <Text fontSize="sm">
                  Coimbatore, Tamil Nadu, India
                </Text>
              </HStack>
              <HStack>
                <Box as={FiPhone} color="brand.500" />
                <VStack align="start" spacing={0}>
                  <Link href="tel:+916200759921" fontSize="sm">
                    +91 6200759921 (Nilesh Kumar Singh)
                  </Link>
                  <Text fontSize="xs" color="gray.500">
                    For suggestions & collaboration
                  </Text>
                </VStack>
              </HStack>
              <HStack>
                <Box as={FiMail} color="brand.500" />
                <VStack align="start" spacing={0}>
                  <Link href="mailto:nileshkumarsingh9245@gmail.com" fontSize="sm">
                    nileshkumarsingh9245@gmail.com
                  </Link>
                  <Text fontSize="xs" color="gray.500">
                    App Creator & Full-Stack Developer
                  </Text>
                </VStack>
              </HStack>
              <HStack>
                <Box as={FiClock} color="brand.500" />
                <Text fontSize="sm">Available for custom development projects</Text>
              </HStack>
            </VStack>

            {/* Company Stats */}
            <SimpleGrid columns={2} spacing={4} maxW="250px">
              {companyStats.map((stat, index) => (
                <VStack key={index} spacing={1}>
                  <HStack>
                    <Box as={stat.icon} color="brand.500" />
                    <Text fontSize="sm" fontWeight="bold">{stat.value}</Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">{stat.label}</Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Stack>
          
          {/* Features */}
          <Stack align="flex-start">
            <Text fontWeight="600" fontSize="md" mb={2}>Features</Text>
            <Link as={RouterLink} to="/stores" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Discover Stores
            </Link>
            <Link as={RouterLink} to="/trips" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Shopping Trips
            </Link>
            <Link as={RouterLink} to="/buddies" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Find Buddies
            </Link>
            <Link as={RouterLink} to="/reviews" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Reviews & Ratings
            </Link>
          </Stack>
          
          {/* Support */}
          <Stack align="flex-start">
            <Text fontWeight="600" fontSize="md" mb={2}>Support</Text>
            <Button
              variant="link"
              fontSize="sm"
              p={0}
              h="auto"
              fontWeight="normal"
              color={useColorModeValue('gray.700', 'gray.200')}
              _hover={{ color: 'brand.500' }}
              onClick={onHelpOpen}
              textAlign="left"
            >
              Help Center
            </Button>
            <Button
              variant="link"
              fontSize="sm"
              p={0}
              h="auto"
              fontWeight="normal"
              color={useColorModeValue('gray.700', 'gray.200')}
              _hover={{ color: 'brand.500' }}
              onClick={onContactOpen}
              textAlign="left"
            >
              Contact Us
            </Button>
            <Button
              variant="link"
              fontSize="sm"
              p={0}
              h="auto"
              fontWeight="normal"
              color={useColorModeValue('gray.700', 'gray.200')}
              _hover={{ color: 'brand.500' }}
              onClick={onSafetyOpen}
              textAlign="left"
            >
              Safety Guidelines
            </Button>
            <Button
              variant="link"
              fontSize="sm"
              p={0}
              h="auto"
              fontWeight="normal"
              color={useColorModeValue('gray.700', 'gray.200')}
              _hover={{ color: 'brand.500' }}
              onClick={onFAQOpen}
              textAlign="left"
            >
              FAQ
            </Button>
            <Button
              variant="link"
              fontSize="sm"
              p={0}
              h="auto"
              fontWeight="normal"
              color={useColorModeValue('gray.700', 'gray.200')}
              _hover={{ color: 'brand.500' }}
              onClick={onCommunityOpen}
              textAlign="left"
            >
              Community Guidelines
            </Button>
            <Link as={RouterLink} to="/accessibility" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Accessibility
            </Link>
          </Stack>
          
          {/* Legal */}
          <Stack align="flex-start">
            <Text fontWeight="600" fontSize="md" mb={2}>Legal</Text>
            <Button
              variant="link"
              fontSize="sm"
              p={0}
              h="auto"
              fontWeight="normal"
              color={useColorModeValue('gray.700', 'gray.200')}
              _hover={{ color: 'brand.500' }}
              onClick={onAboutOpen}
              textAlign="left"
            >
              About Us
            </Button>
            <Button
              variant="link"
              fontSize="sm"
              p={0}
              h="auto"
              fontWeight="normal"
              color={useColorModeValue('gray.700', 'gray.200')}
              _hover={{ color: 'brand.500' }}
              onClick={onPrivacyOpen}
              textAlign="left"
            >
              Privacy Policy
            </Button>
            <Link as={RouterLink} to="/terms" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Terms of Service
            </Link>
            <Link as={RouterLink} to="/cookies" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Cookie Policy
            </Link>
          </Stack>

          {/* Connect */}
          <Stack align="flex-start">
            <Text fontWeight="600" fontSize="md" mb={2}>Connect</Text>
            
            {/* Social Links */}
            <HStack spacing={2} mb={4}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  as={Link}
                  href={social.href}
                  icon={<Box as={social.icon} />}
                  size="sm"
                  variant="ghost"
                  colorScheme={social.color}
                  aria-label={social.label}
                  _hover={{ transform: 'translateY(-2px)' }}
                />
              ))}
            </HStack>

            <Link as={RouterLink} to="/blog" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Blog & News
            </Link>
            <Link as={RouterLink} to="/events" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Community Events
            </Link>
            <Link as={RouterLink} to="/partnerships" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Business Partnerships
            </Link>
            <Link as={RouterLink} to="/api-docs" fontSize="sm" _hover={{ color: 'brand.500' }}>
              Developer API
            </Link>
            
            {/* Quick Info Button */}
            <Button size="sm" variant="outline" colorScheme="brand" onClick={onOpen} mt={2}>
              Platform Info
            </Button>
          </Stack>
        </SimpleGrid>

        <Divider />

        {/* Quick Links & Security */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <VStack align="start" spacing={3}>
            <Text fontWeight="600" fontSize="sm">Popular Areas in Coimbatore</Text>
            <HStack wrap="wrap" spacing={2}>
              {[
                'Sarvanampatti', 'Gandhipuram', 'Brookefields', 'Peelamedu', 
                'RS Puram', 'Race Course', 'Singanallur', 'Saibaba Colony'
              ].map((area, index) => (
                <Badge key={index} variant="outline" fontSize="xs">
                  {area}
                </Badge>
              ))}
            </HStack>
          </VStack>

          <VStack align="start" spacing={3}>
            <Text fontWeight="600" fontSize="sm">Security & Trust</Text>
            <HStack spacing={4}>
              <HStack>
                <Box as={FiShield} color="green.500" />
                <Text fontSize="xs">SSL Secured</Text>
              </HStack>
              <HStack>
                <Box as={FiAward} color="blue.500" />
                <Text fontSize="xs">Verified Platform</Text>
              </HStack>
              <HStack>
                <Box as={FiHeadphones} color="purple.500" />
                <Text fontSize="xs">24/7 Support</Text>
              </HStack>
            </HStack>
          </VStack>
        </SimpleGrid>
      </Container>

      {/* Bottom Bar */}
      <Box
        borderTopWidth={1}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        bg={useColorModeValue('gray.100', 'gray.800')}
      >
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} Shopping Companion. All rights reserved. 
            <Text as="span" color="gray.500" ml={2}>
              Built with VibeCoding expertise
            </Text>
          </Text>
          <HStack spacing={2}>
            <Text fontSize="sm">Made with</Text>
            <Box as={FiHeart} color="red.400" />
            <Text fontSize="sm">in Coimbatore, India</Text>
          </HStack>
        </Container>
      </Box>

      {/* Platform Info Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping Companion Platform</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4}>
              <Text>
                Shopping Companion is Coimbatore's premier platform for connecting shoppers 
                with local shopping buddies and discovering the best stores in the city.
              </Text>
              
              <Accordion allowToggle w="full">
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      How It Works
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm">1. Create your profile and set preferences</Text>
                      <Text fontSize="sm">2. Discover stores and shopping buddies nearby</Text>
                      <Text fontSize="sm">3. Plan shopping trips or join existing ones</Text>
                      <Text fontSize="sm">4. Enjoy safe, social shopping experiences</Text>
                      <Text fontSize="sm">5. Share reviews and build community</Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Safety First
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm">• All users are verified through phone and email</Text>
                      <Text fontSize="sm">• Meet in public places and popular stores</Text>
                      <Text fontSize="sm">• Share trip details with trusted contacts</Text>
                      <Text fontSize="sm">• Report any suspicious activity immediately</Text>
                      <Text fontSize="sm">• 24/7 customer support available</Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Platform Statistics
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={4}>
                      <VStack>
                        <Text fontWeight="bold">1,245+</Text>
                        <Text fontSize="sm">Active Users</Text>
                      </VStack>
                      <VStack>
                        <Text fontWeight="bold">89</Text>
                        <Text fontSize="sm">Verified Stores</Text>
                      </VStack>
                      <VStack>
                        <Text fontWeight="bold">156</Text>
                        <Text fontSize="sm">Active Trips</Text>
                      </VStack>
                      <VStack>
                        <Text fontWeight="bold">4.8/5</Text>
                        <Text fontSize="sm">User Rating</Text>
                      </VStack>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" onClick={onClose}>
              Got it!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Contact Us Modal */}
      <Modal isOpen={isContactOpen} onClose={onContactClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text color="gray.600" fontSize="sm" textAlign="center">
                We'd love to hear from you! Send us a message and we'll respond as soon as possible.
              </Text>
              
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Name</FormLabel>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Your full name"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Email</FormLabel>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="sm">Category</FormLabel>
                <Select
                  value={contactForm.category}
                  onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="safety">Safety Concern</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Bug Report</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Subject</FormLabel>
                <Input
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  placeholder="Brief subject line"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm">Message</FormLabel>
                <Textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Tell us how we can help you..."
                  rows={4}
                />
              </FormControl>

              <Box w="full" p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                <Text fontSize="xs" color="blue.700">
                  <strong>Quick Contact:</strong> For urgent matters, call us at +91 98765 43210 
                  or email support@shoppingcompanion.com
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onContactClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleContactSubmit}>
              Send Message
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Footer Information Modals */}
      <HelpCenterModal isOpen={isHelpOpen} onClose={onHelpClose} />
      <SafetyGuidelinesModal isOpen={isSafetyOpen} onClose={onSafetyClose} />
      <FAQModal isOpen={isFAQOpen} onClose={onFAQClose} />
      <AboutUsModal isOpen={isAboutOpen} onClose={onAboutClose} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={onPrivacyClose} />
      <CommunityGuidelinesModal isOpen={isCommunityOpen} onClose={onCommunityClose} />
    </Box>
  )
}

export default Footer
