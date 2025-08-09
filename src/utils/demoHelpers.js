// Demo helper functions
import demoConfig from '../config/demo'

export const showDemoModeInfo = () => {
  if (!demoConfig.DEMO_MODE) {
    console.info(`
🎮 Demo Mode Available!
====================
If you're seeing API errors (401 Unauthorized), you can enable demo mode for a better experience:

1. Go to src/config/demo.js
2. Set DEMO_MODE: true
3. Refresh the page

Demo mode will:
✅ Disable all API calls
✅ Use only local storage and seed data
✅ Provide a smooth demo experience
✅ Prevent console errors

Current status: Demo mode is ${demoConfig.DEMO_MODE ? 'ENABLED' : 'DISABLED'}
`)
  }
}

export const isDemoMode = () => demoConfig.DEMO_MODE

export const shouldLogApiFailures = () => demoConfig.LOG_API_FAILURES

export default {
  showDemoModeInfo,
  isDemoMode,
  shouldLogApiFailures
}
