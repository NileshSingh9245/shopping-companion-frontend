import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Icon,
  Image,
  Badge,
  Divider
} from '@chakra-ui/react'
import { 
  FiUsers, 
  FiShoppingBag, 
  FiStar, 
  FiMail,
  FiPhone,
  FiGlobe,
  FiHeart
} from 'react-icons/fi'

const PartnerCard = ({ partner }) => (
  <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
    <CardBody>
      <VStack spacing={4} align="center" textAlign="center">
        <Image
          src={partner.logo}
          alt={partner.name}
          boxSize="80px"
          objectFit="contain"
          borderRadius="lg"
        />
        <VStack spacing={2}>
          <Heading size="md">{partner.name}</Heading>
          <Badge colorScheme={partner.type === 'mall' ? 'blue' : partner.type === 'brand' ? 'purple' : 'green'}>
            {partner.type}
          </Badge>
          <Text color="gray.600" fontSize="sm" noOfLines={3}>
            {partner.description}
          </Text>
        </VStack>
        
        <VStack spacing={1} fontSize="sm" color="gray.600">
          <HStack>
            <Icon as={FiStar} color="yellow.500" />
            <Text>{partner.benefits}</Text>
          </HStack>
          {partner.discount && (
            <HStack>
              <Icon as={FiShoppingBag} color="green.500" />
              <Text>Up to {partner.discount}% off</Text>
            </HStack>
          )}
        </VStack>

        <Button
          colorScheme="brand"
          size="sm"
          rightIcon={<Icon as={FiGlobe} />}
          onClick={() => window.open(partner.website, '_blank')}
        >
          Visit Store
        </Button>
      </VStack>
    </CardBody>
  </Card>
)

const Partnerships = () => {
  const partners = [
    {
      id: 1,
      name: 'Brookefields Mall',
      type: 'mall',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
      description: 'Premium shopping destination with 200+ brands and exclusive group discounts.',
      benefits: 'Group discounts, VIP parking',
      discount: 15,
      website: 'https://brookefieldsmall.com'
    },
    {
      id: 2,
      name: 'Fun Republic Mall',
      type: 'mall',
      logo: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=200&h=200&fit=crop',
      description: 'Entertainment and shopping hub with cinema, gaming, and dining options.',
      benefits: 'Movie discounts, food court deals',
      discount: 20,
      website: 'https://funrepublic.com'
    },
    {
      id: 3,
      name: 'Westside',
      type: 'brand',
      logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop',
      description: 'Fashion and lifestyle brand offering trendy clothing and accessories.',
      benefits: 'Exclusive collections, styling tips',
      discount: 10,
      website: 'https://westside.com'
    },
    {
      id: 4,
      name: 'Reliance Digital',
      type: 'electronics',
      logo: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=200&h=200&fit=crop',
      description: 'Leading electronics retailer with latest gadgets and extended warranties.',
      benefits: 'Extended warranty, tech support',
      discount: 12,
      website: 'https://reliancedigital.in'
    },
    {
      id: 5,
      name: 'Big Bazaar',
      type: 'retail',
      logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop',
      description: 'Hypermarket chain offering groceries, fashion, and home essentials.',
      benefits: 'Bulk purchase discounts',
      discount: 8,
      website: 'https://bigbazaar.com'
    },
    {
      id: 6,
      name: 'Lifestyle',
      type: 'brand',
      logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop',
      description: 'International fashion and lifestyle destination with premium brands.',
      benefits: 'Personal shopping assistance',
      discount: 15,
      website: 'https://lifestylestores.com'
    }
  ]

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="xl" mb={4} color="brand.600">
            Our Retail Partners
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            Shopping Companion has partnered with leading retailers in Coimbatore to bring you 
            exclusive discounts, special offers, and enhanced shopping experiences.
          </Text>
        </Box>

        {/* Benefits Section */}
        <Card bg="brand.50" border="1px" borderColor="brand.200">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md" color="brand.700">
                <Icon as={FiHeart} mr={2} />
                Partner Benefits
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
                <VStack spacing={2} textAlign="center">
                  <Icon as={FiShoppingBag} boxSize={8} color="brand.500" />
                  <Text fontWeight="bold">Exclusive Discounts</Text>
                  <Text fontSize="sm" color="gray.600">
                    Get special group rates and member-only offers
                  </Text>
                </VStack>
                <VStack spacing={2} textAlign="center">
                  <Icon as={FiUsers} boxSize={8} color="brand.500" />
                  <Text fontWeight="bold">Group Perks</Text>
                  <Text fontSize="sm" color="gray.600">
                    Additional benefits when shopping in groups
                  </Text>
                </VStack>
                <VStack spacing={2} textAlign="center">
                  <Icon as={FiStar} boxSize={8} color="brand.500" />
                  <Text fontWeight="bold">VIP Treatment</Text>
                  <Text fontSize="sm" color="gray.600">
                    Priority service and personalized assistance
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        <Divider />

        {/* Partners Grid */}
        <VStack spacing={6} align="stretch">
          <Heading size="lg" textAlign="center">Featured Partners</Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </SimpleGrid>
        </VStack>

        {/* Partnership CTA */}
        <Card bg="gray.50" textAlign="center">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md">Interested in Partnering with Us?</Heading>
              <Text color="gray.600">
                Join our growing network of retail partners and reach more customers in Coimbatore.
              </Text>
              <HStack spacing={4}>
                <Button
                  colorScheme="brand"
                  leftIcon={<Icon as={FiMail} />}
                  onClick={() => window.location.href = 'mailto:partnerships@shoppingcompanion.com'}
                >
                  Email Us
                </Button>
                <Button
                  variant="outline"
                  colorScheme="brand"
                  leftIcon={<Icon as={FiPhone} />}
                  onClick={() => window.location.href = 'tel:+919876543210'}
                >
                  Call Us
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default Partnerships
