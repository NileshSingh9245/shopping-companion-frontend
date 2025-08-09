import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import Partnerships from './pages/Company/Partnerships'
import Reviews from './pages/Community/Reviews'
import Events from './pages/Community/Events'
import Blog from './pages/Community/Blog'
import ApiDocs from './pages/Developer/ApiDocs'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import MasterAdminRoute from './components/Auth/MasterAdminRoute'
import MasterAdminDashboard from './pages/Admin/MasterAdminDashboard'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import { scrollToTop } from './utils/scrollUtils'
import { showDemoModeInfo } from './utils/demoHelpers'

function App() {
  const { checkAuth, isLoading } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    checkAuth()
    // Show demo mode info on app start
    showDemoModeInfo()
  }, [checkAuth])

  // Auto-scroll to top on route change
  useEffect(() => {
    scrollToTop()
  }, [location.pathname])

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
        
        {/* Legacy route redirects */}
        <Route path="/shopping-trips" element={<Navigate to="/trips" replace />} />
        <Route path="/shopping-trips/:id" element={<Navigate to="/trips/:id" replace />} />
        
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
        
        {/* Master Admin route */}
        <Route path="/admin/master-dashboard" element={
          <MasterAdminRoute>
            <MasterAdminDashboard />
          </MasterAdminRoute>
        } />
        
        {/* Legal Pages */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        
        {/* Company Pages */}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/partnerships" element={<Partnerships />} />
        
        {/* Community Pages */}
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        
        {/* Developer Pages */}
        <Route path="/api-docs" element={<ApiDocs />} />
      </Routes>
    </Layout>
  )
}

export default App
