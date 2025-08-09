// Secure Master Admin Authentication
// This module handles master admin authentication securely

import secureConfig from '../config/secureConfig'

class SecureMasterAuth {
  static verifyMasterCredentials(email, password) {
    if (!secureConfig.enableMasterAdmin) {
      return false
    }
    
    return email === secureConfig.masterCredentials.email && 
           password === secureConfig.masterCredentials.password
  }
  
  static createMasterAdminUser(email) {
    if (!this.verifyMasterCredentials(email, secureConfig.masterCredentials.password)) {
      return null
    }
    
    return {
      id: 'master_admin_001',
      email: email,
      name: 'System Administrator',
      role: 'master_admin',
      isMasterAdmin: true,
      isVerified: true,
      adminPermissions: secureConfig.masterPermissions,
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      securityLevel: 'maximum'
    }
  }
  
  static isMasterAdminUser(user) {
    return user && 
           user.role === 'master_admin' && 
           user.isMasterAdmin === true &&
           user.securityLevel === 'maximum' &&
           user.adminPermissions && 
           user.adminPermissions.includes('master_admin')
  }
  
  static shouldHideMasterAdminUI() {
    return secureConfig.hideMasterAdminUI
  }
}

export default SecureMasterAuth
