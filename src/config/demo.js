// Demo mode configuration
// Set DEMO_MODE to true to disable all API calls and use only local/seed data
export const config = {
  // Enable demo mode to disable API calls (useful when backend is not available)
  DEMO_MODE: false, // Set to true to disable all API calls
  
  // Show demo data notice
  SHOW_DEMO_NOTICE: true,
  
  // Logging preferences
  LOG_API_FAILURES: false, // Set to true to see API failure logs
  
  // API timeout settings
  API_TIMEOUT: 10000, // 10 seconds
}

export default config
