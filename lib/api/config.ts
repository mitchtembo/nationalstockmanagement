// API configuration for Impilo Stock Management System

// Base URL from the OpenAPI specification
export const API_BASE_URL = 'http://192.168.1.175:8080/api';

// Default headers for all API requests
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Authorization header
export const getAuthHeader = (token: string) => ({
  'Authorization': `Bearer ${token}`
});

// Error handling
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any = null) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// API request timeout (in milliseconds)
export const API_TIMEOUT = 30000; // 30 seconds 