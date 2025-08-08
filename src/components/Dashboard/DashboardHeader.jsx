import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Avatar,
  useColorModeValue
} from '@chakra-ui/react'
import { FiShield, FiSun, FiMoon } from 'react-icons/fi'

const DashboardHeader = ({ user, isAdmin = false, timeOfDay = 'morning' }) => {
  const alertBg = useColorModeValue('blue.50', 'blue.900')
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const getTimeIcon = () => {
    const hour = new Date().getHours()
    return hour >= 6 && hour < 18 ? FiSun : FiMoon
  }

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={4}>
        <VStack align="start" spacing={1}>
          <HStack align="center" spacing={3}>
            <Avatar 
              size="md" 
              name={user?.name} 
              src={user?.avatar}
              bg="brand.500"
            />
            <VStack align="start" spacing={0}>
              <HStack align="center" spacing={2}>
                <Icon as={getTimeIcon()} color="yellow.500" boxSize={4} />
                <Heading size="lg">
                  {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
                </Heading>
                {isAdmin && (
                  <Badge colorScheme="red" fontSize="xs" display="flex" alignItems="center" gap={1}>
                    <Icon as={FiShield} boxSize={3} />
                    Admin
                  </Badge>
                )}
              </HStack>
              <Text color="gray.600" fontSize="md">
                {isAdmin 
                  ? "Monitor platform activities and manage the Shopping Companion community"
                  : "Discover great deals and connect with shopping buddies in Coimbatore"
                }
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      
      {isAdmin && (
        <Alert status="info" bg={alertBg} borderRadius="md" border="1px" borderColor="blue.200">
          <AlertIcon color="blue.500" />
          <Box>
            <AlertTitle fontSize="sm" color="blue.700">
              Admin Dashboard Active
            </AlertTitle>
            <AlertDescription fontSize="xs" color="blue.600">
              You have full administrative access to manage users, stores, trips, and platform settings.
              All activities are logged and monitored for security.
            </AlertDescription>
          </Box>
        </Alert>
      )}
    </Box>
  )
}

export default DashboardHeader
