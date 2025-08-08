import {
  Box,
  Container,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Icon,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { 
  FiUsers, 
  FiShoppingBag, 
  FiCalendar, 
  FiTrendingUp, 
  FiTrendingDown,
  FiMapPin,
  FiStar,
  FiActivity,
  FiEye,
  FiHeart
} from 'react-icons/fi'
import { useAuthStore } from '../../store/authStore'

const MetricCard = ({ title, value, change, changeType, icon, color }) => (
  <Card>
    <CardBody>
      <Stat>
        <HStack justify="space-between">
          <VStack align="start" spacing={2}>
            <HStack>
              <Icon as={icon} color={`${color}.500`} boxSize={5} />
              <StatLabel fontSize="sm" color="gray.600" fontWeight="medium">
                {title}
              </StatLabel>
            </HStack>
            <StatNumber fontSize="2xl" fontWeight="bold">
              {value}
            </StatNumber>
            {change && (
              <StatHelpText mb={0}>
                <StatArrow type={changeType} />
                <Text fontSize="sm" color={changeType === 'increase' ? 'green.500' : 'red.500'} as="span" ml={1}>
                  {change} from last month
                </Text>
              </StatHelpText>
            )}
          </VStack>
        </HStack>
      </Stat>
    </CardBody>
  </Card>
)

const CategoryCard = ({ category, percentage, growth, color }) => (
  <Card>
    <CardBody>
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="semibold">{category}</Text>
          <Badge colorScheme={color} variant="subtle">
            {percentage}%
          </Badge>
        </HStack>
        <Progress 
          value={percentage} 
          colorScheme={color}
          size="md"
          borderRadius="md"
        />
        <HStack justify="space-between" fontSize="sm">
          <Text color="gray.600">Growth Rate</Text>
          <HStack>
            <Icon 
              as={growth >= 0 ? FiTrendingUp : FiTrendingDown} 
              color={growth >= 0 ? 'green.500' : 'red.500'}
              boxSize={3}
            />
            <Text color={growth >= 0 ? 'green.500' : 'red.500'}>
              {growth > 0 ? '+' : ''}{growth}%
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </CardBody>
  </Card>
)

const Analytics = () => {
  const { user, isAdmin } = useAuthStore()
  const bgColor = useColorModeValue('white', 'gray.800')
  const isUserAdmin = isAdmin()

  // Redirect if not admin
  if (!isUserAdmin) {
    return (
      <Container maxW="7xl" py={8}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          Access Denied. Admin permissions required to view analytics.
        </Alert>
      </Container>
    )
  }

  // Mock analytics data
  const platformMetrics = [
    { 
      title: 'Total Users', 
      value: '1,245', 
      change: '+12%', 
      changeType: 'increase', 
      icon: FiUsers, 
      color: 'blue' 
    },
    { 
      title: 'Active Shopping Trips', 
      value: '156', 
      change: '+18%', 
      changeType: 'increase', 
      icon: FiCalendar, 
      color: 'green' 
    },
    { 
      title: 'Registered Stores', 
      value: '89', 
      change: '+8%', 
      changeType: 'increase', 
      icon: FiShoppingBag, 
      color: 'purple' 
    },
    { 
      title: 'Shopping Buddies', 
      value: '432', 
      change: '+15%', 
      changeType: 'increase', 
      icon: FiHeart, 
      color: 'pink' 
    },
    { 
      title: 'Total Reviews', 
      value: '2,847', 
      change: '+22%', 
      changeType: 'increase', 
      icon: FiStar, 
      color: 'yellow' 
    },
    { 
      title: 'Daily Active Users', 
      value: '387', 
      change: '+5%', 
      changeType: 'increase', 
      icon: FiActivity, 
      color: 'cyan' 
    }
  ]

  const categoryData = [
    { category: 'Electronics', percentage: 35, growth: 12, color: 'blue' },
    { category: 'Clothing & Fashion', percentage: 28, growth: 8, color: 'pink' },
    { category: 'Home & Garden', percentage: 18, growth: 15, color: 'green' },
    { category: 'Books & Media', percentage: 12, growth: -2, color: 'purple' },
    { category: 'Sports & Fitness', percentage: 7, growth: 25, color: 'orange' }
  ]

  const topStores = [
    { name: 'Phoenix Mall', trips: 45, rating: 4.8, category: 'Shopping Mall' },
    { name: 'Reliance Digital', trips: 38, rating: 4.6, category: 'Electronics' },
    { name: 'Brookefields Mall', trips: 32, rating: 4.7, category: 'Shopping Mall' },
    { name: 'Fun Republic Mall', trips: 28, rating: 4.5, category: 'Shopping Mall' },
    { name: 'Croma Electronics', trips: 24, rating: 4.4, category: 'Electronics' }
  ]

  const recentActivities = [
    { time: '2 hours ago', activity: 'New user registration: Priya Sharma', type: 'user' },
    { time: '4 hours ago', activity: 'Shopping trip completed: Electronics Shopping', type: 'trip' },
    { time: '6 hours ago', activity: 'Store added: New Vijay Sales outlet', type: 'store' },
    { time: '8 hours ago', activity: 'Review posted: 5-star rating for Phoenix Mall', type: 'review' },
    { time: '12 hours ago', activity: 'Buddy partnership formed: Rahul & Priya', type: 'buddy' }
  ]

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" mb={2}>
            Platform Analytics Dashboard
          </Heading>
          <Text color="gray.600">
            Real-time insights and metrics for Shopping Companion platform - Coimbatore Sarvanampatti
          </Text>
        </Box>

        {/* Platform Metrics */}
        <Box>
          <Heading size="md" mb={4}>Platform Overview</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {platformMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Category Analytics */}
        <Box>
          <Heading size="md" mb={4}>Shopping Categories Performance</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {categoryData.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Top Performing Stores */}
        <Card>
          <CardHeader>
            <Heading size="md">Top Performing Stores</Heading>
            <Text color="gray.600" fontSize="sm">
              Based on number of shopping trips and user ratings
            </Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Store Name</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Trips</Th>
                  <Th isNumeric>Rating</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {topStores.map((store, index) => (
                  <Tr key={index}>
                    <Td fontWeight="medium">{store.name}</Td>
                    <Td>
                      <Badge colorScheme="blue" variant="subtle">
                        {store.category}
                      </Badge>
                    </Td>
                    <Td isNumeric>{store.trips}</Td>
                    <Td isNumeric>
                      <HStack justify="flex-end">
                        <Icon as={FiStar} color="yellow.400" boxSize={3} />
                        <Text>{store.rating}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Badge 
                        colorScheme={store.rating >= 4.5 ? 'green' : store.rating >= 4.0 ? 'yellow' : 'red'}
                        variant="subtle"
                      >
                        {store.rating >= 4.5 ? 'Excellent' : store.rating >= 4.0 ? 'Good' : 'Average'}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Recent Platform Activities */}
        <Card>
          <CardHeader>
            <Heading size="md">Recent Platform Activities</Heading>
            <Text color="gray.600" fontSize="sm">
              Latest activities and events on the platform
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {recentActivities.map((activity, index) => (
                <Box key={index}>
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium">{activity.activity}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {activity.time}
                      </Text>
                    </VStack>
                    <Badge 
                      colorScheme={
                        activity.type === 'user' ? 'blue' :
                        activity.type === 'trip' ? 'green' :
                        activity.type === 'store' ? 'purple' :
                        activity.type === 'review' ? 'yellow' : 'pink'
                      }
                      variant="subtle"
                    >
                      {activity.type}
                    </Badge>
                  </HStack>
                  {index < recentActivities.length - 1 && <Divider mt={4} />}
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Geographic Distribution */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <Card>
            <CardHeader>
              <Heading size="md">Geographic Distribution</Heading>
              <Text color="gray.600" fontSize="sm">
                User distribution across Coimbatore areas
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {[
                  { area: 'Sarvanampatti', percentage: 35, users: 436 },
                  { area: 'Gandhipuram', percentage: 25, users: 311 },
                  { area: 'Brookefields', percentage: 20, users: 249 },
                  { area: 'Peelamedu', percentage: 12, users: 149 },
                  { area: 'Other Areas', percentage: 8, users: 100 }
                ].map((area, index) => (
                  <Box key={index}>
                    <HStack justify="space-between" mb={2}>
                      <HStack>
                        <Icon as={FiMapPin} color="brand.500" boxSize={4} />
                        <Text fontWeight="medium">{area.area}</Text>
                      </HStack>
                      <VStack align="end" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold">{area.users} users</Text>
                        <Text fontSize="xs" color="gray.600">{area.percentage}%</Text>
                      </VStack>
                    </HStack>
                    <Progress 
                      value={area.percentage} 
                      colorScheme="brand" 
                      size="sm" 
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">User Engagement Metrics</Heading>
              <Text color="gray.600" fontSize="sm">
                Platform engagement and retention rates
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                <Stat>
                  <StatLabel>Daily Active Users</StatLabel>
                  <StatNumber>387</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    31% from last week
                  </StatHelpText>
                </Stat>
                
                <Stat>
                  <StatLabel>Average Session Duration</StatLabel>
                  <StatNumber>12m 34s</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    8% from last week
                  </StatHelpText>
                </Stat>
                
                <Stat>
                  <StatLabel>User Retention Rate</StatLabel>
                  <StatNumber>78%</StatNumber>
                  <StatHelpText>
                    <StatArrow type='increase' />
                    5% from last month
                  </StatHelpText>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Analytics
