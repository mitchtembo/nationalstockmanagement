// Export all API types and services
export * from './types';
export * from './config';
export { apiClient } from './client';

// Export services
export { authService } from './services/auth-service';
export { userService } from './services/user-service';
export { locationService } from './services/location-service';
export { stockService } from './services/stock-service';

// Export a convenience method to initialize API
export const initApi = () => {
  // Initialize authentication from saved token
  if (typeof window !== 'undefined') {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      apiClient.setToken(authToken);
    }
  }
};

// Utility for server-side setups
export const setupServerSideAuth = (token: string | undefined) => {
  if (token) {
    apiClient.setToken(token);
  } else {
    apiClient.clearToken();
  }
}; 