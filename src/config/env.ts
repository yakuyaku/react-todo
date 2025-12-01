export const env = {
  apiUrl: import.meta.env.VITE_API_URL || '',
  appName: import.meta.env.VITE_APP_NAME || 'Todo App',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};