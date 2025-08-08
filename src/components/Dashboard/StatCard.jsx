import {
  Card,
  CardBody,
  HStack,
  VStack,
  Text,
  Icon,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  StatArrow,
  useColorModeValue
} from '@chakra-ui/react'

const StatCard = ({ icon, label, value, change, changeType, color = 'brand' }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const iconBg = useColorModeValue(`${color}.50`, `${color}.900`)
  
  return (
    <Card bg={cardBg} shadow="sm" border="1px" borderColor="gray.100">
      <CardBody>
        <Stat>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2} flex={1}>
              <HStack>
                <Icon 
                  as={icon} 
                  color={`${color}.500`} 
                  boxSize={5}
                  p={2}
                  bg={iconBg}
                  borderRadius="md"
                  //boxSize={8}
                />
                <StatLabel fontSize="sm" color="gray.600" fontWeight="medium">
                  {label}
                </StatLabel>
              </HStack>
              <StatNumber fontSize="2xl" fontWeight="bold" lineHeight="1">
                {value}
              </StatNumber>
              {change && (
                <StatHelpText mb={0}>
                  <StatArrow type={changeType} />
                  <Text 
                    fontSize="sm" 
                    color={changeType === 'increase' ? 'green.500' : 'red.500'}
                    fontWeight="medium"
                    as="span"
                    ml={1}
                  >
                    {change}
                  </Text>
                  <Text fontSize="sm" color="gray.500" as="span" ml={1}>
                    vs last month
                  </Text>
                </StatHelpText>
              )}
            </VStack>
          </HStack>
        </Stat>
      </CardBody>
    </Card>
  )
}

export default StatCard
