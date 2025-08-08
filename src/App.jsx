import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import ShoppingTrips from './pages/ShoppingTrips/ShoppingTrips'
import TripDetails from './pages/ShoppingTrips/TripDetails'
import CreateTrip from './pages/ShoppingTrips/CreateTrip'
import Stores from './pages/Stores/Stores'
import StoreDetails from './pages/Stores/StoreDetails'
import AddStore from './pages/Stores/AddStore'
import ShoppingBuddies from './pages/ShoppingBuddies/ShoppingBuddies'
import Profile from './pages/Profile/Profile'
import Analytics from './pages/Analytics/Analytics'
import AdminSettings from './pages/Admin/AdminSettings'
import ManageUsers from './pages/Admin/ManageUsers'
import ManageStores from './pages/Admin/ManageStores'
import TermsOfService from './pages/Legal/TermsOfService'
import CookiePolicy from './pages/Legal/CookiePolicy'
import Accessibility from './pages/Legal/Accessibility'
import CareersPage from './pages/Company/CareersPage'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

function App() {
  const { checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <Box 
        height="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="gray.50"
      >
        <Box>Loading...</Box>
      </Box>
    )
  }

  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/trips" element={
          <ProtectedRoute>
            <ShoppingTrips />
          </ProtectedRoute>
        } />
        
        <Route path="/trips/:id" element={
          <ProtectedRoute>
            <TripDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/trips/create" element={
          <ProtectedRoute>
            <CreateTrip />
          </ProtectedRoute>
        } />
        
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        
        <Route path="/stores/add" element={
          <ProtectedRoute>
            <AddStore />
          </ProtectedRoute>
        } />
        
        <Route path="/buddies" element={<ShoppingBuddies />} />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <ManageUsers />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/stores" element={
          <ProtectedRoute>
            <ManageStores />
          </ProtectedRoute>
        } />
        
        {/* Legal Pages */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </Layout>
  )
}

export default App
