import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Alert, AlertIcon, Container, Box, Text } from '@chakra-ui/react'

const MasterAdminRoute = ({ children }) => {
  const { user, isAuthenticated, isMasterAdmin } = useAuthStore()

  // First check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Strict security check - only allow the specific master admin
  const isAuthorizedMasterAdmin = isMasterAdmin() && 
                                  user?.email === '2421255@cog.com' &&
                                  user?.role === 'master_admin' &&
                                  user?.isMasterAdmin === true

  if (!isAuthorizedMasterAdmin) {
    return (
      <Container maxW="4xl" py={8}>
        <Alert status="error">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Access Denied</Text>
            <Text>This area is restricted to authorized personnel only.</Text>
            <Text fontSize="sm" color="gray.600" mt={2}>
              If you believe this is an error, please contact system support.
            </Text>
          </Box>
        </Alert>
      </Container>
    )
  }

  return children
}

export default MasterAdminRoute
