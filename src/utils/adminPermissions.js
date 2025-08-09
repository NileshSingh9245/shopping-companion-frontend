// Admin permission management system
// Handles role-based access control for demo admin vs master admin

export const ADMIN_PERMISSIONS = {
  // Master Admin - Full Control
  MASTER_ADMIN: [
    'master_admin',
    'manage_users',
    'delete_users',
    'ban_users',
    'promote_users',
    'manage_stores', 
    'approve_stores',
    'feature_stores',
    'manage_trips',
    'moderate_content',
    'view_analytics',
    'advanced_analytics',
    'system_settings',
    'export_data',
    'send_notifications',
    'financial_reports',
    'platform_config'
  ],

  // Demo Admin - Limited Control (View mostly)
  DEMO_ADMIN: [
    'view_users',
    'view_stores',
    'view_trips',
    'basic_analytics',
    'view_reviews'
  ],

  // Regular Admin - Moderate Control
  ADMIN: [
    'manage_users',
    'manage_stores',
    'manage_trips',
    'view_analytics',
    'moderate_content'
  ]
}

export const PERMISSION_DESCRIPTIONS = {
  'master_admin': 'Full system access and control',
  'manage_users': 'Create, edit, and manage user accounts',
  'delete_users': 'Permanently delete user accounts',
  'ban_users': 'Ban and unban user accounts',
  'promote_users': 'Change user roles and permissions',
  'manage_stores': 'Add, edit, and manage store listings',
  'approve_stores': 'Approve and reject store applications',
  'feature_stores': 'Feature stores on platform',
  'manage_trips': 'Moderate and manage shopping trips',
  'moderate_content': 'Moderate reviews, comments, and reports',
  'view_analytics': 'Access basic platform analytics',
  'advanced_analytics': 'Access detailed analytics and reports',
  'system_settings': 'Modify platform configuration',
  'export_data': 'Export user and platform data',
  'send_notifications': 'Send platform-wide notifications',
  'financial_reports': 'Access financial and revenue data',
  'platform_config': 'Configure platform settings and features',
  'view_users': 'View user information (read-only)',
  'view_stores': 'View store information (read-only)',
  'view_trips': 'View trip information (read-only)',
  'basic_analytics': 'View basic usage statistics',
  'view_reviews': 'View reviews and ratings (read-only)'
}

// Check if user has specific permission
export const hasPermission = (user, permission) => {
  if (!user || !user.adminPermissions) return false
  
  // Master admin has all permissions
  if (user.isMasterAdmin && user.adminPermissions.includes('master_admin')) {
    return true
  }
  
  return user.adminPermissions.includes(permission)
}

// Check if user can perform destructive actions
export const canPerformDestructiveAction = (user) => {
  return hasPermission(user, 'master_admin') || hasPermission(user, 'delete_users')
}

// Check if user can modify other users
export const canModifyUsers = (user) => {
  return hasPermission(user, 'master_admin') || hasPermission(user, 'manage_users')
}

// Check if user can access advanced features
export const canAccessAdvancedFeatures = (user) => {
  return hasPermission(user, 'master_admin') || hasPermission(user, 'advanced_analytics')
}

// Get user's role display name
export const getUserRoleDisplay = (user) => {
  if (!user) return 'Guest'
  
  if (user.isMasterAdmin) return 'Master Admin'
  if (user.role === 'admin') return 'Admin'
  if (user.role === 'demo_admin') return 'Demo Admin'
  return 'User'
}

// Get available permissions for a role
export const getPermissionsForRole = (role) => {
  switch (role) {
    case 'master_admin':
      return ADMIN_PERMISSIONS.MASTER_ADMIN
    case 'admin':
      return ADMIN_PERMISSIONS.ADMIN
    case 'demo_admin':
      return ADMIN_PERMISSIONS.DEMO_ADMIN
    default:
      return []
  }
}

// Check if action is allowed for user
export const isActionAllowed = (user, action) => {
  const actionPermissions = {
    'CREATE_USER': ['master_admin', 'manage_users'],
    'EDIT_USER': ['master_admin', 'manage_users'],
    'DELETE_USER': ['master_admin', 'delete_users'],
    'BAN_USER': ['master_admin', 'ban_users'],
    'PROMOTE_USER': ['master_admin', 'promote_users'],
    'VIEW_USERS': ['master_admin', 'manage_users', 'view_users'],
    'APPROVE_STORE': ['master_admin', 'approve_stores'],
    'FEATURE_STORE': ['master_admin', 'feature_stores'],
    'MODERATE_TRIP': ['master_admin', 'manage_trips'],
    'VIEW_ADVANCED_ANALYTICS': ['master_admin', 'advanced_analytics'],
    'EXPORT_DATA': ['master_admin', 'export_data'],
    'SEND_NOTIFICATIONS': ['master_admin', 'send_notifications']
  }

  const requiredPermissions = actionPermissions[action] || []
  return requiredPermissions.some(permission => hasPermission(user, permission))
}

export default {
  ADMIN_PERMISSIONS,
  PERMISSION_DESCRIPTIONS,
  hasPermission,
  canPerformDestructiveAction,
  canModifyUsers,
  canAccessAdvancedFeatures,
  getUserRoleDisplay,
  getPermissionsForRole,
  isActionAllowed
}
