import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  Card,
  CardBody,
  Flex,
  Badge,
  IconButton,
  useToast,
  Divider,
  ScrollBox,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { FiSend, FiPhone, FiMoreVertical } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

// Mock chat data
const mockChats = [
  {
    id: '1',
    buddy: {
      id: '2',
      name: 'Priya Krishnan',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c8c1?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      lastSeen: null
    },
    lastMessage: 'Looking forward to our shopping trip tomorrow!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    unreadCount: 2
  },
  {
    id: '3',
    buddy: {
      id: '4',
      name: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    lastMessage: 'Thanks for the store recommendations!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0
  }
]

const mockMessages = {
  '1': [
    {
      id: '1',
      senderId: '2',
      senderName: 'Priya Krishnan',
      message: 'Hi! Are we still on for tomorrow\'s shopping trip?',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      type: 'text'
    },
    {
      id: '2',
      senderId: 'current-user',
      senderName: 'You',
      message: 'Yes! I\'m excited. What time should we meet?',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: 'text'
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Priya Krishnan',
      message: 'How about 10 AM at Brookefields Mall entrance?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text'
    },
    {
      id: '4',
      senderId: '2',
      senderName: 'Priya Krishnan',
      message: 'Looking forward to our shopping trip tomorrow!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text'
    }
  ]
}

const ChatBubble = ({ message, isOwnMessage }) => (
  <Flex justify={isOwnMessage ? 'flex-end' : 'flex-start'} mb={3}>
    <Box
      maxW="70%"
      bg={isOwnMessage ? 'blue.500' : 'gray.100'}
      color={isOwnMessage ? 'white' : 'black'}
      px={4}
      py={2}
      rounded="lg"
      borderRadius={isOwnMessage ? '20px 20px 5px 20px' : '20px 20px 20px 5px'}
    >
      <Text fontSize="sm">{message.message}</Text>
      <Text 
        fontSize="xs" 
        opacity={0.7} 
        mt={1}
        textAlign={isOwnMessage ? 'right' : 'left'}
      >
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Box>
  </Flex>
)

const ChatList = ({ chats, selectedChat, onSelectChat }) => (
  <VStack spacing={0} align="stretch">
    {chats.map((chat) => (
      <Card
        key={chat.id}
        variant={selectedChat?.id === chat.id ? 'filled' : 'outline'}
        cursor="pointer"
        onClick={() => onSelectChat(chat)}
        _hover={{ bg: 'gray.50' }}
      >
        <CardBody py={3}>
          <HStack spacing={3}>
            <Box position="relative">
              <Avatar size="md" src={chat.buddy.avatar} name={chat.buddy.name} />
              {chat.buddy.status === 'online' && (
                <Box
                  position="absolute"
                  bottom="0"
                  right="0"
                  w="12px"
                  h="12px"
                  bg="green.500"
                  border="2px"
                  borderColor="white"
                  rounded="full"
                />
              )}
            </Box>
            <VStack align="start" spacing={0} flex={1}>
              <HStack justify="space-between" w="full">
                <Text fontWeight="medium" fontSize="sm">
                  {chat.buddy.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  {chat.lastMessage}
                </Text>
                {chat.unreadCount > 0 && (
                  <Badge colorScheme="blue" rounded="full" minW="20px" textAlign="center">
                    {chat.unreadCount}
                  </Badge>
                )}
              </HStack>
            </VStack>
          </HStack>
        </CardBody>
      </Card>
    ))}
  </VStack>
)

const ChatWindow = ({ chat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const toast = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage('')
    }
  }

  const handleEmergencyContact = () => {
    toast({
      title: 'Emergency Contact Initiated',
      description: `Emergency contact sent to ${chat.buddy.name} and local authorities notified.`,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    })
  }

  if (!chat) {
    return (
      <Flex align="center" justify="center" h="full" color="gray.500">
        <Text>Select a chat to start messaging</Text>
      </Flex>
    )
  }

  return (
    <VStack h="full" spacing={0}>
      {/* Chat Header */}
      <HStack justify="space-between" p={4} borderBottom="1px" borderColor="gray.200" w="full">
        <HStack spacing={3}>
          <Box position="relative">
            <Avatar size="sm" src={chat.buddy.avatar} name={chat.buddy.name} />
            {chat.buddy.status === 'online' && (
              <Box
                position="absolute"
                bottom="0"
                right="0"
                w="8px"
                h="8px"
                bg="green.500"
                border="1px"
                borderColor="white"
                rounded="full"
              />
            )}
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="medium" fontSize="sm">{chat.buddy.name}</Text>
            <Text fontSize="xs" color="gray.500">
              {chat.buddy.status === 'online' ? 'Online' : 
               `Last seen ${chat.buddy.lastSeen?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <Button
            leftIcon={<FiPhone />}
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={handleEmergencyContact}
          >
            Emergency
          </Button>
          <IconButton
            icon={<FiMoreVertical />}
            size="sm"
            variant="ghost"
          />
        </HStack>
      </HStack>

      {/* Messages Area */}
      <Box flex={1} w="full" p={4} overflowY="auto">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === 'current-user'}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <HStack p={4} borderTop="1px" borderColor="gray.200" w="full">
        <InputGroup>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <InputRightElement>
            <IconButton
              icon={<FiSend />}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              onClick={handleSendMessage}
              isDisabled={!newMessage.trim()}
            />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </VStack>
  )
}

const BuddyChat = () => {
  const [chats, setChats] = useState(mockChats)
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState({})

  useEffect(() => {
    setMessages(mockMessages)
  }, [])

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    // Mark as read
    setChats(prev => prev.map(c => 
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    ))
  }

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      message: messageText,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }))

    // Update last message in chat list
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, lastMessage: messageText, timestamp: new Date() }
        : chat
    ))
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Shopping Buddy Chat</Text>
          <Text color="gray.600">Connect with your shopping companions</Text>
        </Box>

        <Card h="600px">
          <CardBody p={0}>
            <Flex h="full">
              {/* Chat List */}
              <Box w="350px" borderRight="1px" borderColor="gray.200" overflowY="auto">
                <Box p={4} borderBottom="1px" borderColor="gray.200">
                  <Text fontWeight="medium">Messages</Text>
                </Box>
                <Box p={2}>
                  <ChatList
                    chats={chats}
                    selectedChat={selectedChat}
                    onSelectChat={handleSelectChat}
                  />
                </Box>
              </Box>

              {/* Chat Window */}
              <Box flex={1}>
                <ChatWindow
                  chat={selectedChat}
                  messages={messages[selectedChat?.id] || []}
                  onSendMessage={handleSendMessage}
                />
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default BuddyChat
