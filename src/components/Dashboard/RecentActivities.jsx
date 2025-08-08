import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  useColorModeValue,
  Skeleton,
  Box
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import ActivityCard from './ActivityCard'

const RecentActivities = ({ 
  activities = [], 
  title = "Recent Activities", 
  isLoading = false,
  viewAllLink = "/activities",
  isAdmin = false 
}) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  
  if (isLoading) {
    return (
      <Card bg={cardBg}>
        <CardHeader>
          <Skeleton height="20px" width="200px" />
        </CardHeader>
        <CardBody>
          <VStack spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} height="80px" width="100%" borderRadius="md" />
            ))}
          </VStack>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card bg={cardBg}>
      <CardHeader>
        <HStack justify="space-between" align="center">
          <Heading size="md" color={isAdmin ? 'red.500' : 'brand.500'}>
            {title}
          </Heading>
          <Button 
            as={RouterLink}
            to={viewAllLink}
            size="sm" 
            variant="ghost" 
            color="brand.500"
            _hover={{ bg: 'brand.50' }}
          >
            View All
          </Button>
        </HStack>
      </CardHeader>
      <CardBody pt={2}>
        <VStack spacing={3} align="stretch">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))
          ) : (
            <Box textAlign="center" py={8}>
              <Text color="gray.500" fontSize="sm">
                No recent activities to show
              </Text>
              <Text color="gray.400" fontSize="xs" mt={1}>
                Start shopping or join trips to see activities here
              </Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}

export default RecentActivities
