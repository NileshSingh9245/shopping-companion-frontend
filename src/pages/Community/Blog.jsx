import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Icon,
  Image,
  Badge,
  HStack,
  Link,
  Tag
} from '@chakra-ui/react'
import { 
  FiCalendar, 
  FiUser, 
  FiClock,
  FiExternalLink,
  FiHeart,
  FiShare2
} from 'react-icons/fi'

const BlogCard = ({ post }) => (
  <Card variant="outline" _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
    <Image
      src={post.image}
      alt={post.title}
      height="200px"
      objectFit="cover"
      borderTopRadius="md"
    />
    <CardBody>
      <VStack spacing={4} align="stretch">
        <VStack align="start" spacing={2}>
          <HStack>
            <Badge colorScheme={post.category === 'tips' ? 'blue' : post.category === 'news' ? 'green' : 'purple'}>
              {post.category}
            </Badge>
            <Text fontSize="xs" color="gray.500">{post.readTime} min read</Text>
          </HStack>
          <Heading size="md" noOfLines={2}>
            {post.title}
          </Heading>
          <Text color="gray.600" fontSize="sm" noOfLines={3}>
            {post.excerpt}
          </Text>
        </VStack>
        
        <HStack justify="space-between" fontSize="sm" color="gray.500">
          <HStack>
            <Icon as={FiUser} />
            <Text>{post.author}</Text>
          </HStack>
          <HStack>
            <Icon as={FiCalendar} />
            <Text>{post.date}</Text>
          </HStack>
        </HStack>
        
        <HStack wrap="wrap" spacing={2}>
          {post.tags.map((tag) => (
            <Tag key={tag} size="sm" colorScheme="gray">
              {tag}
            </Tag>
          ))}
        </HStack>
        
        <HStack justify="space-between">
          <Button
            colorScheme="brand"
            size="sm"
            rightIcon={<Icon as={FiExternalLink} />}
          >
            Read More
          </Button>
          <HStack spacing={2}>
            <Button variant="ghost" size="sm" leftIcon={<Icon as={FiHeart} />}>
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<Icon as={FiShare2} />}>
              Share
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </CardBody>
  </Card>
)

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: '10 Smart Shopping Tips for Coimbatore Shoppers',
      excerpt: 'Discover insider secrets to get the best deals and save money while shopping in Coimbatore. From timing your visits to knowing which stores offer the best prices.',
      category: 'tips',
      author: 'Priya Krishnan',
      date: '3 days ago',
      readTime: 5,
      likes: 127,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      tags: ['shopping', 'budgeting', 'coimbatore']
    },
    {
      id: 2,
      title: 'New Shopping Mall Opens in Sarvanampatti',
      excerpt: 'The latest addition to Coimbatore shopping scene brings international brands and dining options to the growing Sarvanampatti area.',
      category: 'news',
      author: 'Rajesh Kumar',
      date: '1 week ago',
      readTime: 3,
      likes: 89,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      tags: ['malls', 'sarvanampatti', 'news']
    },
    {
      id: 3,
      title: 'Building a Shopping Community: The Power of Group Buying',
      excerpt: 'Learn how group shopping trips can lead to better deals, new friendships, and more enjoyable shopping experiences in your local area.',
      category: 'community',
      author: 'Anitha Selvam',
      date: '2 weeks ago',
      readTime: 7,
      likes: 156,
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=300&fit=crop',
      tags: ['community', 'group-shopping', 'social']
    },
    {
      id: 4,
      title: 'Sustainable Shopping: Eco-Friendly Stores in Coimbatore',
      excerpt: 'Explore environmentally conscious shopping options and learn how to make more sustainable purchasing decisions in the textile city.',
      category: 'lifestyle',
      author: 'Meera Lakshmi',
      date: '3 weeks ago',
      readTime: 6,
      likes: 94,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      tags: ['sustainability', 'eco-friendly', 'lifestyle']
    }
  ]

  const categories = [
    { name: 'Shopping Tips', count: 23, color: 'blue' },
    { name: 'Local News', count: 18, color: 'green' },
    { name: 'Community', count: 15, color: 'purple' },
    { name: 'Lifestyle', count: 12, color: 'orange' }
  ]

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            Shopping Companion Blog
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            Stay informed with the latest shopping trends, tips, and community stories from Coimbatore
          </Text>
        </Box>

        {/* Categories */}
        <Card bg="gray.50">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md">Popular Categories</Heading>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
                {categories.map((category) => (
                  <VStack key={category.name} spacing={2} textAlign="center">
                    <Badge colorScheme={category.color} p={2} borderRadius="lg">
                      {category.name}
                    </Badge>
                    <Text fontSize="sm" color="gray.600">{category.count} articles</Text>
                  </VStack>
                ))}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Featured Posts */}
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Latest Articles</Heading>
            <Button colorScheme="brand">
              Subscribe to Blog
            </Button>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
        </VStack>

        {/* Newsletter CTA */}
        <Card bg="brand.50" textAlign="center">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md">Never Miss an Update</Heading>
              <Text color="gray.600">
                Get the latest shopping tips and community news delivered to your inbox
              </Text>
              <Button colorScheme="brand" size="lg">
                Subscribe to Newsletter
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default Blog
