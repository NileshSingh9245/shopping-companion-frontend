import { Box } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <Box minH="100vh" bg="gray.50">
      {!isAuthPage && <Navbar />}
      <Box 
        as="main" 
        pt={!isAuthPage ? "64px" : 0}
        minH={!isAuthPage ? "calc(100vh - 64px)" : "100vh"}
      >
        {children}
      </Box>
      {!isAuthPage && <Footer />}
    </Box>
  )
}

export default Layout
