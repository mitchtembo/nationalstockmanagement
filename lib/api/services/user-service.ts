// User Service for Impilo Stock Management System API

import { apiClient } from '../client';
import { User, UserDetails, PageUser } from '../types';

/**
 * Service for user-related API operations
 */
export const userService = {
  /**
   * Get all users with pagination
   * @param page - Page number (0-based)
   * @param size - Page size
   * @returns Paginated list of users
   */
  getAllUsers: async (page: number = 0, size: number = 10) => {
    return await apiClient.get<PageUser>('/users/all', { page, size });
  },

  /**
   * Get user by username
   * @param username - Username to lookup
   * @returns User details
   */
  getUserByUsername: async (username: string) => {
    return await apiClient.get<UserDetails>(`/users/${username}`);
  },

  /**
   * Update user information
   * @param username - Username of the user to update
   * @param userData - Updated user data
   * @returns Updated user
   */
  updateUser: async (username: string, userData: Partial<User>) => {
    return await apiClient.put<User>(`/users/${username}`, userData);
  },

  /**
   * Update user role
   * @param username - Username of the user
   * @param role - New role to assign
   * @returns Updated user
   */
  updateUserRole: async (username: string, role: string) => {
    return await apiClient.put<User>(`/users/${username}/update-role`, null, { role });
  },

  /**
   * Change user password
   * @param username - Username of the user
   * @param newPassword - New password
   * @returns Success message
   */
  changePassword: async (username: string, newPassword: string) => {
    return await apiClient.put<string>(`/users/${username}/change-password`, null, { newPassword });
  },
}; 