import {
  Card,
  CardBody,
  HStack,
  VStack,
  Text,
  Badge,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { 
  FiCalendar, 
  FiStar, 
  FiUsers, 
  FiShield,
  FiShoppingBag,
  FiMapPin,
  FiHeart
} from 'react-icons/fi'

const ActivityCard = ({ title, description, time, type, category }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  
  const getTypeConfig = (type) => {
    switch (type) {
      case 'trip':
        return { color: 'blue', icon: FiCalendar, label: 'Trip' }
      case 'review':
        return { color: 'green', icon: FiStar, label: 'Review' }
      case 'buddy':
        return { color: 'purple', icon: FiUsers, label: 'Buddy' }
      case 'admin':
        return { color: 'red', icon: FiShield, label: 'Admin' }
      case 'store':
        return { color: 'orange', icon: FiShoppingBag, label: 'Store' }
      case 'location':
        return { color: 'teal', icon: FiMapPin, label: 'Location' }
      case 'favorite':
        return { color: 'pink', icon: FiHeart, label: 'Favorite' }
      default:
        return { color: 'gray', icon: FiCalendar, label: 'Activity' }
    }
  }

  const typeConfig = getTypeConfig(type)

  return (
    <Card 
      variant="outline" 
      bg={cardBg}
      _hover={{ shadow: 'md', transform: 'translateY(-1px)' }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <CardBody py={3}>
        <HStack justify="space-between" align="start" spacing={3}>
          <VStack align="start" spacing={1} flex={1}>
            <HStack spacing={2} wrap="wrap">
              <Badge 
                colorScheme={typeConfig.color} 
                variant="subtle"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Icon as={typeConfig.icon} boxSize={3} />
                {typeConfig.label}
              </Badge>
              {category && (
                <Badge variant="outline" fontSize="xs">
                  {category}
                </Badge>
              )}
              <Text fontSize="xs" color="gray.500">
                {time}
              </Text>
            </HStack>
            <Text fontWeight="semibold" fontSize="sm" lineHeight="short">
              {title}
            </Text>
            <Text fontSize="xs" color="gray.600" lineHeight="short">
              {description}
            </Text>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default ActivityCard
