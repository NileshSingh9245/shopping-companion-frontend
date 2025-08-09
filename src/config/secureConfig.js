// Security Configuration - Master Admin Access
// This file contains secure configuration for master admin functionality
// Credentials are encoded for security

const secureConfig = {
  // Master admin credentials (base64 encoded for basic security)
  masterCredentials: {
    // Encoded: 2421255@cog.com
    email: atob('MjQyMTI1NUBjb2cuY29t'),
    // Encoded: Jaishreeram@9245
    password: atob('SmFpc2hyZWVyYW1AOTI0NQ==')
  },
  
  // Master admin permissions
  masterPermissions: [
    'master_admin',
    'system_control',
    'user_management',
    'store_management', 
    'trip_management',
    'analytics_access',
    'security_access',
    'platform_control'
  ],

  // Security flags
  enableMasterAdmin: true,
  requireSecureLogin: true,
  hideMasterAdminUI: true
}

export default secureConfig
