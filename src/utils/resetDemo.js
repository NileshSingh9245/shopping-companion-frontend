// Demo reset utility for showcase mode
// This will clear existing demo data and reload with showcase content

const resetDemoData = () => {
  // Clear all existing localStorage data for a fresh showcase
  const keysToReset = [
    'shopping_companion_users',
    'shopping_companion_enhanced_trips',
    'shopping_companion_trip_participants',
    'shopping_companion_trip_chat',
    'shopping_companion_user_profiles',
    'shopping_companion_stores',
    'shopping_companion_user_trips'
  ]
  
  keysToReset.forEach(key => {
    localStorage.removeItem(key)
  })
  
  console.log('Demo data reset - reload the page to see showcase content')
}

// Export for use in browser console
window.resetDemoData = resetDemoData

export default resetDemoData
