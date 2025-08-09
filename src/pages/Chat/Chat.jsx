import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  Card,
  CardBody,
  IconButton,
  useToast,
  Badge,
  Divider,
  Container,
  Heading
} from '@chakra-ui/react'
import { FiSend, FiPhone, FiVideo, FiMoreVertical } from 'react-icons/fi'
import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../../store/authStore'

// Mock chat data
const mockChats = [
  {
    id: '1',
    name: 'Priya Krishnan',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b89a4fa4?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Are we still meeting at 3 PM?',
    time: '2 min ago',
    unread: 2,
    status: 'online'
  },
  {
    id: '2', 
    name: 'Lakshmi Subramanian',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for the shopping trip!',
    time: '1 hour ago',
    unread: 0,
    status: 'offline'
  }
]

const mockMessages = {
  '1': [
    {
      id: '1',
      senderId: '1',
      senderName: 'Priya Krishnan',
      message: 'Hi! Ready for our shopping trip today?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'current-user',
      senderName: 'You',
      message: 'Yes! Looking forward to it. What time should we meet?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Priya Krishnan',
      message: 'Are we still meeting at 3 PM?',
      timestamp: '2 min ago',
      isOwn: false
    }
  ]
}

const ChatList = ({ chats, onSelectChat, selectedChatId }) => (
  <VStack spacing={0} align="stretch">
    {chats.map((chat) => (
      <Box
        key={chat.id}
        p={4}
        cursor="pointer"
        bg={selectedChatId === chat.id ? 'blue.50' : 'white'}
        _hover={{ bg: 'gray.50' }}
        borderBottom="1px"
        borderColor="gray.200"
        onClick={() => onSelectChat(chat)}
      >
        <HStack spacing={3}>
          <Box position="relative">
            <Avatar size="md" src={chat.avatar} name={chat.name} />
            {chat.status === 'online' && (
              <Box
                position="absolute"
                bottom="0"
                right="0"
                w="3"
                h="3"
                bg="green.500"
                border="2px"
                borderColor="white"
                rounded="full"
              />
            )}
          </Box>
          <VStack align="start" spacing={1} flex={1}>
            <HStack justify="space-between" w="full">
              <Text fontWeight="semibold" fontSize="sm">
                {chat.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {chat.time}
              </Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="gray.600" noOfLines={1}>
                {chat.lastMessage}
              </Text>
              {chat.unread > 0 && (
                <Badge colorScheme="blue" rounded="full" fontSize="xs">
                  {chat.unread}
                </Badge>
              )}
            </HStack>
          </VStack>
        </HStack>
      </Box>
    ))}
  </VStack>
)

const ChatMessage = ({ message }) => (
  <HStack
    justify={message.isOwn ? 'flex-end' : 'flex-start'}
    mb={3}
    align="end"
  >
    {!message.isOwn && (
      <Avatar size="xs" name={message.senderName} />
    )}
    <Box
      maxW="70%"
      bg={message.isOwn ? 'blue.500' : 'gray.100'}
      color={message.isOwn ? 'white' : 'black'}
      px={3}
      py={2}
      rounded="lg"
      roundedBottomLeft={message.isOwn ? 'lg' : 'sm'}
      roundedBottomRight={message.isOwn ? 'sm' : 'lg'}
    >
      <Text fontSize="sm">{message.message}</Text>
      <Text
        fontSize="xs"
        color={message.isOwn ? 'blue.100' : 'gray.500'}
        mt={1}
      >
        {message.timestamp}
      </Text>
    </Box>
  </HStack>
)

const ChatWindow = ({ chat, messages }) => {
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
    if (!newMessage.trim()) return

    toast({
      title: 'Message Sent',
      description: `Message sent to ${chat.name}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })

    setNewMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!chat) {
    return (
      <Box flex={1} display="flex" align="center" justify="center">
        <Text color="gray.500">Select a chat to start messaging</Text>
      </Box>
    )
  }

  return (
    <VStack h="full" spacing={0}>
      {/* Chat Header */}
      <HStack
        w="full"
        p={4}
        borderBottom="1px"
        borderColor="gray.200"
        bg="white"
        justify="space-between"
      >
        <HStack>
          <Avatar size="sm" src={chat.avatar} name={chat.name} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold" fontSize="sm">
              {chat.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {chat.status}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <IconButton
            icon={<FiPhone />}
            size="sm"
            variant="ghost"
            aria-label="Voice call"
          />
          <IconButton
            icon={<FiVideo />}
            size="sm"
            variant="ghost"
            aria-label="Video call"
          />
          <IconButton
            icon={<FiMoreVertical />}
            size="sm"
            variant="ghost"
            aria-label="More options"
          />
        </HStack>
      </HStack>

      {/* Messages */}
      <Box flex={1} w="full" p={4} overflowY="auto" bg="gray.50">
        <VStack spacing={2} align="stretch">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Message Input */}
      <HStack w="full" p={4} bg="white" borderTop="1px" borderColor="gray.200">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          flex={1}
        />
        <Button
          colorScheme="blue"
          onClick={handleSendMessage}
          leftIcon={<FiSend />}
          isDisabled={!newMessage.trim()}
        >
          Send
        </Button>
      </HStack>
    </VStack>
  )
}

const Chat = () => {
  const { user } = useAuthStore()
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    setMessages(mockMessages[chat.id] || [])
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Messages</Heading>
        
        <Card>
          <CardBody p={0}>
            <HStack spacing={0} h="600px">
              {/* Chat List */}
              <Box w="350px" borderRight="1px" borderColor="gray.200">
                <Box p={4} borderBottom="1px" borderColor="gray.200">
                  <Text fontWeight="semibold">Chats</Text>
                </Box>
                <ChatList
                  chats={mockChats}
                  onSelectChat={handleSelectChat}
                  selectedChatId={selectedChat?.id}
                />
              </Box>

              {/* Chat Window */}
              <Box flex={1}>
                <ChatWindow
                  chat={selectedChat}
                  messages={messages}
                />
              </Box>
            </HStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export default Chat
