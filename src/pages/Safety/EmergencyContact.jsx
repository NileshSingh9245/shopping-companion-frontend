import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Avatar,
  Badge,
  Icon,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
  Container,
  SimpleGrid,
  Alert,
  AlertIcon,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Select
} from '@chakra-ui/react'
import { 
  FiPhone, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiShield, 
  FiMapPin, 
  FiClock,
  FiAlertTriangle,
  FiMoreVertical,
  FiShare,
  FiSettings
} from 'react-icons/fi'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'

// Mock emergency contacts
const mockEmergencyContacts = [
  {
    id: '1',
    name: 'Lakshmi Subramanian (Sister)',
    phone: '+91-9876543210',
    relationship: 'Family',
    isPrimary: true
  },
  {
    id: '2',
    name: 'Dr. Priya Clinic',
    phone: '+91-9876543211',
    relationship: 'Medical',
    isPrimary: false
  },
  {
    id: '3',
    name: 'Raj Security Services',
    phone: '+91-9876543212',
    relationship: 'Security',
    isPrimary: false
  }
]

// Mock safety settings
const mockSafetySettings = {
  shareLocationWithContacts: true,
  autoCheckIn: true,
  checkInInterval: 60, // minutes
  panicButtonEnabled: true,
  offlineAlerts: true
}

const EmergencyContactCard = ({ contact, onEdit, onDelete, onTogglePrimary }) => {
  const toast = useToast()

  const handleCall = () => {
    toast({
      title: 'Calling Emergency Contact',
      description: `Calling ${contact.name}...`,
      status: 'info',
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardBody>
        <HStack justify="space-between">
          <VStack align="start" spacing={2}>
            <HStack>
              <Text fontWeight="semibold">{contact.name}</Text>
              {contact.isPrimary && (
                <Badge colorScheme="red" size="sm">
                  Primary
                </Badge>
              )}
            </HStack>
            <Text color="gray.600">{contact.phone}</Text>
            <Badge colorScheme="blue" variant="subtle">
              {contact.relationship}
            </Badge>
          </VStack>
          
          <HStack>
            <Button
              size="sm"
              colorScheme="green"
              leftIcon={<FiPhone />}
              onClick={handleCall}
            >
              Call
            </Button>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FiMoreVertical />}
                size="sm"
                variant="ghost"
              />
              <MenuList>
                <MenuItem icon={<FiEdit />} onClick={() => onEdit(contact)}>
                  Edit
                </MenuItem>
                <MenuItem 
                  icon={<FiShield />} 
                  onClick={() => onTogglePrimary(contact.id)}
                >
                  {contact.isPrimary ? 'Remove Primary' : 'Set as Primary'}
                </MenuItem>
                <MenuItem 
                  icon={<FiTrash2 />} 
                  onClick={() => onDelete(contact.id)}
                  color="red.500"
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  )
}

const AddContactModal = ({ isOpen, onClose, editingContact }) => {
  const [name, setName] = useState(editingContact?.name || '')
  const [phone, setPhone] = useState(editingContact?.phone || '')
  const [relationship, setRelationship] = useState(editingContact?.relationship || 'Family')
  const toast = useToast()

  const handleSubmit = () => {
    if (!name || !phone) {
      toast({
        title: 'Please fill all required fields',
        status: 'error',
        duration: 3000,
      })
      return
    }

    toast({
      title: editingContact ? 'Contact Updated' : 'Contact Added',
      description: 'Emergency contact saved successfully',
      status: 'success',
      duration: 3000,
    })

    // Reset form
    setName('')
    setPhone('')
    setRelationship('Family')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {editingContact ? 'Edit' : 'Add'} Emergency Contact
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contact name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91-XXXXXXXXXX"
                type="tel"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Relationship</FormLabel>
              <Select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              >
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Medical">Medical</option>
                <option value="Security">Security</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {editingContact ? 'Update' : 'Add'} Contact
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const SafetySettings = ({ settings, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Safety Settings</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontWeight="medium">Share Location with Contacts</Text>
              <Text fontSize="sm" color="gray.600">
                Allow emergency contacts to see your location during trips
              </Text>
            </VStack>
            <Switch
              isChecked={settings.shareLocationWithContacts}
              onChange={(e) => onUpdate('shareLocationWithContacts', e.target.checked)}
            />
          </HStack>

          <Divider />

          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontWeight="medium">Auto Check-in</Text>
              <Text fontSize="sm" color="gray.600">
                Automatically notify contacts if you don't check in
              </Text>
            </VStack>
            <Switch
              isChecked={settings.autoCheckIn}
              onChange={(e) => onUpdate('autoCheckIn', e.target.checked)}
            />
          </HStack>

          {settings.autoCheckIn && (
            <FormControl>
              <FormLabel fontSize="sm">Check-in Interval (minutes)</FormLabel>
              <Select
                value={settings.checkInInterval}
                onChange={(e) => onUpdate('checkInInterval', parseInt(e.target.value))}
                size="sm"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={180}>3 hours</option>
              </Select>
            </FormControl>
          )}

          <Divider />

          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontWeight="medium">Panic Button</Text>
              <Text fontSize="sm" color="gray.600">
                Quick access to emergency services
              </Text>
            </VStack>
            <Switch
              isChecked={settings.panicButtonEnabled}
              onChange={(e) => onUpdate('panicButtonEnabled', e.target.checked)}
            />
          </HStack>

          <Divider />

          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontWeight="medium">Offline Alerts</Text>
              <Text fontSize="sm" color="gray.600">
                Alert contacts if you go offline unexpectedly
              </Text>
            </VStack>
            <Switch
              isChecked={settings.offlineAlerts}
              onChange={(e) => onUpdate('offlineAlerts', e.target.checked)}
            />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

const EmergencyContact = () => {
  const { user } = useAuthStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingContact, setEditingContact] = useState(null)
  const [contacts, setContacts] = useState(mockEmergencyContacts)
  const [settings, setSettings] = useState(mockSafetySettings)
  const toast = useToast()

  const handleAddContact = () => {
    setEditingContact(null)
    onOpen()
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    onOpen()
  }

  const handleDeleteContact = (contactId) => {
    toast({
      title: 'Contact Deleted',
      status: 'success',
      duration: 2000,
    })
  }

  const handleTogglePrimary = (contactId) => {
    toast({
      title: 'Primary Contact Updated',
      status: 'success',
      duration: 2000,
    })
  }

  const handleSettingsUpdate = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast({
      title: 'Settings Updated',
      status: 'success',
      duration: 2000,
    })
  }

  const handlePanicButton = () => {
    toast({
      title: 'Emergency Alert Sent!',
      description: 'Notifying all emergency contacts and services',
      status: 'error',
      duration: 5000,
    })
  }

  const handleShareLocation = () => {
    toast({
      title: 'Location Shared',
      description: 'Current location shared with emergency contacts',
      status: 'info',
      duration: 3000,
    })
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <Heading size="lg">Emergency Contacts & Safety</Heading>
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={handleAddContact}
          >
            Add Contact
          </Button>
        </HStack>

        {/* Emergency Actions */}
        <Card>
          <CardHeader>
            <Heading size="md" color="red.500">
              <Icon as={FiAlertTriangle} mr={2} />
              Emergency Actions
            </Heading>
          </CardHeader>
          <CardBody>
            <Alert status="warning" mb={4}>
              <AlertIcon />
              Use these features only in real emergencies. False alarms may result in unnecessary emergency response.
            </Alert>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Button
                colorScheme="red"
                size="lg"
                leftIcon={<FiAlertTriangle />}
                onClick={handlePanicButton}
              >
                PANIC BUTTON
              </Button>
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<FiMapPin />}
                onClick={handleShareLocation}
              >
                Share Location
              </Button>
              <Button
                colorScheme="green"
                size="lg"
                leftIcon={<FiPhone />}
                onClick={() => toast({ title: 'Calling 108 (Emergency)', status: 'info' })}
              >
                Call 108
              </Button>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Quick Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card>
            <CardBody textAlign="center">
              <VStack spacing={2}>
                <Icon as={FiPhone} boxSize={8} color="blue.500" />
                <Text fontSize="2xl" fontWeight="bold">
                  {contacts.length}
                </Text>
                <Text color="gray.600">Emergency Contacts</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <VStack spacing={2}>
                <Icon as={FiShield} boxSize={8} color="green.500" />
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  Active
                </Text>
                <Text color="gray.600">Safety Monitoring</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <VStack spacing={2}>
                <Icon as={FiClock} boxSize={8} color="purple.500" />
                <Text fontSize="2xl" fontWeight="bold">
                  24/7
                </Text>
                <Text color="gray.600">Emergency Support</Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Emergency Contacts List */}
        <Card>
          <CardHeader>
            <Heading size="md">Emergency Contacts</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {contacts.map((contact) => (
                <EmergencyContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                  onTogglePrimary={handleTogglePrimary}
                />
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Safety Settings */}
        <SafetySettings
          settings={settings}
          onUpdate={handleSettingsUpdate}
        />

        {/* Add/Edit Contact Modal */}
        <AddContactModal
          isOpen={isOpen}
          onClose={onClose}
          editingContact={editingContact}
        />
      </VStack>
    </Container>
  )
}

export default EmergencyContact
