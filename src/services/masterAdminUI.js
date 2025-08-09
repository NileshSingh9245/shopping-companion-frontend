// Master Admin UI Security
// This module controls the visibility of master admin UI elements

import SecureMasterAuth from './secureMasterAuth'

class MasterAdminUI {
  static shouldShowMasterAdminFeatures(user) {
    // Only show if user is verified master admin AND config allows it
    return SecureMasterAuth.isMasterAdminUser(user) && !SecureMasterAuth.shouldHideMasterAdminUI()
  }
  
  static getMasterAdminRoutes() {
    // Hidden routes that only master admin can access
    return [
      '/master-control',
      '/system-admin', 
      '/platform-management',
      '/security-console'
    ]
  }
  
  static shouldShowInNavigation(user) {
    // Never show master admin in regular navigation
    return false
  }
  
  static getMasterAdminMenuItems(user) {
    if (!SecureMasterAuth.isMasterAdminUser(user)) {
      return []
    }
    
    return [
      {
        label: 'System Control',
        path: '/master-control',
        permission: 'system_control',
        hidden: true
      },
      {
        label: 'Platform Management', 
        path: '/platform-management',
        permission: 'platform_control',
        hidden: true
      },
      {
        label: 'Security Console',
        path: '/security-console', 
        permission: 'security_access',
        hidden: true
      }
    ]
  }
}

export default MasterAdminUI
