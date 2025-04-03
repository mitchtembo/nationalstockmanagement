// Authentication Service for Impilo Stock Management System API

import { apiClient } from '../client';
import { User, UserLoginDto, UserRegistrationDto } from '../types';

/**
 * Service for authentication-related API operations
 */
export const authService = {
  /**
   * User login
   * @param loginDto - Login credentials
   * @returns Authentication response with token and user details
   */
  login: async (loginDto: UserLoginDto) => {
    return await apiClient.post<{ token: string; user: User }>('/auth/login', loginDto);
  },

  /**
   * User registration
   * @param registrationDto - New user registration data
   * @returns Newly created user
   */
  register: async (registrationDto: UserRegistrationDto) => {
    return await apiClient.post<User>('/auth/register', registrationDto);
  },

  /**
   * Password reset request
   * @param email - User email for password reset
   * @returns Confirmation message
   */
  resetPassword: async (email: string) => {
    return await apiClient.post<string>('/auth/reset-password', null, { email });
  },

  /**
   * Validate authentication token
   * @param token - JWT token to validate
   * @returns Validation response
   */
  validateToken: async (token: string) => {
    return await apiClient.get<{valid: boolean, username?: string}>('/auth/validate-token', { token });
  },

  /**
   * Sets the auth token for subsequent API calls
   * @param token - JWT token
   */
  setAuthToken: (token: string) => {
    apiClient.setToken(token);
    // Store token in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },

  /**
   * Clears the auth token and performs logout
   */
  logout: () => {
    apiClient.clearToken();
    // Remove token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Initialize authentication from saved token
   */
  initAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        apiClient.setToken(token);
      }
    }
  }
}; 