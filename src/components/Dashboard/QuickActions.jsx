import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Button,
  Icon,
  VStack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const QuickActionCard = ({ title, description, path, icon, color, isDisabled = false }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue(`${color}.50`, `${color}.900`)
  
  return (
    <Card
      as={RouterLink}
      to={!isDisabled ? path : '#'}
      variant="outline"
      bg={cardBg}
      _hover={!isDisabled ? { 
        bg: hoverBg, 
        transform: 'translateY(-2px)', 
        shadow: 'md',
        borderColor: `${color}.200`
      } : {}}
      transition="all 0.2s"
      cursor={!isDisabled ? 'pointer' : 'not-allowed'}
      opacity={isDisabled ? 0.6 : 1}
      h="full"
    >
      <CardBody textAlign="center" py={6}>
        <VStack spacing={3}>
          <Icon 
            as={icon} 
            boxSize={8} 
            color={`${color}.500`}
            p={2}
            bg={useColorModeValue(`${color}.50`, `${color}.900`)}
            borderRadius="lg"
            // boxSize={12}
          />
          <VStack spacing={1}>
            <Text fontWeight="bold" fontSize="md">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center" lineHeight="short">
              {description}
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

const QuickActions = ({ actions, title = "Quick Actions", isAdmin = false }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  
  return (
    <Card bg={cardBg}>
      <CardHeader pb={2}>
        <Heading size="md" color={isAdmin ? 'red.500' : 'brand.500'}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody pt={2}>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {actions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}

export default QuickActions
