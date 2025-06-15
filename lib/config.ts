// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://3.83.195.172:3000',
} as const;

// Helper function to create API URLs
export const createApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};