import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Select,
  Divider,
  Badge,
  HStack,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { FiSettings, FiShield, FiDatabase, FiMail, FiUsers } from 'react-icons/fi'

const AdminSettings = () => {
  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <HStack mb={4}>
            <FiSettings size={24} />
            <Heading size="lg">Admin Settings</Heading>
            <Badge colorScheme="red" ml={2}>Admin Only</Badge>
          </HStack>
          <Text color="gray.600">
            Manage platform settings, configurations, and system preferences.
          </Text>
        </Box>

        <Alert status="info">
          <AlertIcon />
          These settings affect the entire Shopping Companion platform. Changes should be made carefully.
        </Alert>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* General Settings */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md">General Settings</Heading>
                <Divider />
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Platform Maintenance Mode</FormLabel>
                  <Switch colorScheme="red" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">New User Registration</FormLabel>
                  <Switch defaultChecked colorScheme="green" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Email Notifications</FormLabel>
                  <Switch defaultChecked colorScheme="blue" />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Default User Location</FormLabel>
                  <Select placeholder="Select location">
                    <option value="coimbatore">Coimbatore</option>
                    <option value="sarvanampatti">Sarvanampatti</option>
                  </Select>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <FiShield />
                  <Heading size="md">Security Settings</Heading>
                </HStack>
                <Divider />
                
                <FormControl>
                  <FormLabel>Session Timeout (minutes)</FormLabel>
                  <Input type="number" defaultValue="60" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Two-Factor Authentication</FormLabel>
                  <Switch colorScheme="green" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Admin Activity Logging</FormLabel>
                  <Switch defaultChecked colorScheme="blue" />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Password Policy</FormLabel>
                  <Select defaultValue="medium">
                    <option value="low">Low Security</option>
                    <option value="medium">Medium Security</option>
                    <option value="high">High Security</option>
                  </Select>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* System Settings */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <FiDatabase />
                  <Heading size="md">System Settings</Heading>
                </HStack>
                <Divider />
                
                <FormControl>
                  <FormLabel>Data Backup Frequency</FormLabel>
                  <Select defaultValue="daily">
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Log Retention (days)</FormLabel>
                  <Input type="number" defaultValue="30" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Debug Mode</FormLabel>
                  <Switch colorScheme="orange" />
                </FormControl>
                
                <Button colorScheme="red" variant="outline" size="sm">
                  Clear System Cache
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* Communication Settings */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <FiMail />
                  <Heading size="md">Communication Settings</Heading>
                </HStack>
                <Divider />
                
                <FormControl>
                  <FormLabel>Admin Email</FormLabel>
                  <Input type="email" defaultValue="admin-vibeCoding@cognizant.com" />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Support Email</FormLabel>
                  <Input type="email" defaultValue="support@shoppingcompanion.com" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">SMS Notifications</FormLabel>
                  <Switch defaultChecked colorScheme="green" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Push Notifications</FormLabel>
                  <Switch defaultChecked colorScheme="blue" />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        <HStack spacing={4} justify="flex-end">
          <Button variant="outline">Cancel</Button>
          <Button colorScheme="brand">Save Settings</Button>
        </HStack>
      </VStack>
    </Container>
  )
}

export default AdminSettings
