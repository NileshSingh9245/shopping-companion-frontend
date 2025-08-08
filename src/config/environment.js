// Environment configuration for different deployment stages
const config = {
  development: {
    API_URL: 'http://localhost:5000',
    APP_ENV: 'development'
  },
  production: {
    API_URL: import.meta.env.VITE_API_URL || 'https://your-backend-url.render.com',
    APP_ENV: 'production'
  }
}

const environment = import.meta.env.VITE_APP_ENV || 'development'

export default config[environment]
