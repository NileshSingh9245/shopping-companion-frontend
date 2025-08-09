import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Avatar,
  Text,
  Badge,
  Container,
  VStack,
  Icon
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, BellIcon } from '@chakra-ui/icons'
import { FiShoppingBag, FiUsers, FiMapPin, FiPlus, FiShield, FiSettings, FiBarChart } from 'react-icons/fi'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const NavLink = ({ children, to, ...props }) => (
  <Link
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    {...props}
  >
    {children}
  </Link>
)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, isAuthenticated, logout, isAdmin, isMasterAdmin } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const isUserAdmin = isAdmin()
  const isUserMasterAdmin = isMasterAdmin && isMasterAdmin()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      // If on homepage, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      // If not on homepage, navigate to home
      navigate('/')
    }
  }

  const navItems = [
    { name: 'Stores', path: '/stores', icon: FiShoppingBag },
    { name: 'Shopping Trips', path: '/trips', icon: FiMapPin },
    { name: 'Buddies', path: '/buddies', icon: FiUsers },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <Box 
      bg="white" 
      px={4} 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={1000}
      boxShadow="sm"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Container maxW="7xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <HStack spacing={8} alignItems="center">
            <Box
              onClick={handleLogoClick}
              cursor="pointer"
              _hover={{ 
                transform: 'scale(1.02)',
                transition: 'all 0.2s ease-in-out'
              }}
              transition="all 0.2s ease-in-out"
            >
              <HStack>
                <Box
                  w={8}
                  h={8}
                  bg="brand.500"
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontWeight="bold"
                  _hover={{
                    bg: 'brand.600',
                    transform: 'rotate(5deg)',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  SC
                </Box>
                <Text 
                  fontSize="xl" 
                  fontWeight="bold" 
                  color="brand.500"
                  _hover={{ color: 'brand.600' }}
                  transition="color 0.2s ease-in-out"
                >
                  Shopping Companion
                </Text>
              </HStack>
            </Box>
            
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  bg={isActive(item.path) ? 'brand.50' : 'transparent'}
                  color={isActive(item.path) ? 'brand.500' : 'gray.600'}
                  fontWeight={isActive(item.path) ? 'semibold' : 'normal'}
                >
                  <HStack>
                    <Box as={item.icon} />
                    <Text>{item.name}</Text>
                  </HStack>
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems="center">
            {isAuthenticated ? (
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/trips/create"
                  leftIcon={<FiPlus />}
                  colorScheme="brand"
                  size="sm"
                  display={{ base: 'none', md: 'flex' }}
                >
                  Create Trip
                </Button>
                
                <IconButton
                  icon={<BellIcon />}
                  aria-label="Notifications"
                  variant="ghost"
                  position="relative"
                >
                  <Badge
                    colorScheme="red"
                    position="absolute"
                    top="-1"
                    right="-1"
                    fontSize="xs"
                    borderRadius="full"
                  >
                    3
                  </Badge>
                </IconButton>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    position="relative"
                  >
                    <Avatar
                      size="sm"
                      src={user?.avatar || user?.profilePicture}
                      name={user?.name}
                    />
                    {(isUserAdmin || isUserMasterAdmin) && (
                      <Badge
                        position="absolute"
                        top="-1"
                        right="-1"
                        colorScheme={isUserMasterAdmin ? "purple" : "red"}
                        fontSize="xs"
                        borderRadius="full"
                        px={1}
                      >
                        <Icon as={FiShield} boxSize={2} />
                      </Badge>
                    )}
                  </MenuButton>
                  <MenuList minW="250px">
                    <Box px={3} py={2} borderBottom="1px" borderColor="gray.200">
                      <VStack spacing={1} align="start">
                        <HStack>
                          <Text fontWeight="semibold" fontSize="sm">{user?.name}</Text>
                          {isUserMasterAdmin ? (
                            <Badge colorScheme="purple" fontSize="xs">
                              <Icon as={FiShield} mr={1} boxSize={2} />
                              Master Admin
                            </Badge>
                          ) : isUserAdmin ? (
                            <Badge colorScheme="red" fontSize="xs">
                              <Icon as={FiShield} mr={1} boxSize={2} />
                              Admin
                            </Badge>
                          ) : null}
                        </HStack>
                        <Text fontSize="xs" color="gray.600">{user?.email}</Text>
                      </VStack>
                    </Box>
                    
                    <MenuItem as={RouterLink} to="/dashboard">
                      Dashboard
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/trips/user/my-trips">
                      My Trips
                    </MenuItem>
                    
                    {(isUserAdmin || isUserMasterAdmin) && (
                      <>
                        <MenuDivider />
                        <MenuItem as={RouterLink} to="/admin/users" color="red.600">
                          <Icon as={FiUsers} mr={2} />
                          Manage Users
                        </MenuItem>
                        <MenuItem as={RouterLink} to="/admin/stores" color="red.600">
                          <Icon as={FiShoppingBag} mr={2} />
                          Manage Stores
                        </MenuItem>
                        <MenuItem as={RouterLink} to="/admin/analytics" color="red.600">
                          <Icon as={FiBarChart} mr={2} />
                          Analytics
                        </MenuItem>
                        <MenuItem as={RouterLink} to="/admin/settings" color="red.600">
                          <Icon as={FiSettings} mr={2} />
                          Admin Settings
                        </MenuItem>
                      </>
                    )}
                    
                    {isUserMasterAdmin && (
                      <>
                        <MenuDivider />
                        <MenuItem as={RouterLink} to="/admin/master-dashboard" color="purple.600">
                          <Icon as={FiShield} mr={2} />
                          Master Admin Dashboard
                        </MenuItem>
                      </>
                    )}
                    
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ) : (
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="brand"
                  size="sm"
                >
                  Sign Up
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  bg={isActive(item.path) ? 'brand.50' : 'transparent'}
                  color={isActive(item.path) ? 'brand.500' : 'gray.600'}
                  fontWeight={isActive(item.path) ? 'semibold' : 'normal'}
                >
                  <HStack>
                    <Box as={item.icon} />
                    <Text>{item.name}</Text>
                  </HStack>
                </NavLink>
              ))}
              {isAuthenticated && (
                <Button
                  as={RouterLink}
                  to="/trips/create"
                  leftIcon={<FiPlus />}
                  colorScheme="brand"
                  size="sm"
                  onClick={onClose}
                >
                  Create Trip
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Navbar
