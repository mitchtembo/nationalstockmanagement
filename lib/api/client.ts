// Base API client for Impilo Stock Management System

import { API_BASE_URL, defaultHeaders, getAuthHeader, ApiError, API_TIMEOUT } from './config';

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL, headers: Record<string, string> = defaultHeaders) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
   * Sets the authentication token for API requests
   */
  setToken(token: string): void {
    this.token = token;
  }

  /**
   * Clears the authentication token
   */
  clearToken(): void {
    this.token = null;
  }

  /**
   * Gets the current headers with authentication if token is present
   */
  private getHeaders(): Record<string, string> {
    if (this.token) {
      return { ...this.headers, ...getAuthHeader(this.token) };
    }
    return this.headers;
  }

  /**
   * Builds the full URL for the API request
   */
  private buildUrl(endpoint: string, queryParams?: Record<string, any>): string {
    // Ensure endpoint starts with a slash if not already
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Build the URL with the base URL and endpoint
    let url = `${this.baseUrl}${formattedEndpoint}`;
    
    // Add query parameters if provided
    if (queryParams && Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams();
      
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, item.toString()));
          } else if (typeof value === 'object' && value !== null) {
            // Handle complex objects for API that expects stringified objects
            searchParams.append(key, JSON.stringify(value));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
      
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    return url;
  }

  /**
   * Handles the API response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (error) {
        // If response isn't valid JSON, use text instead
        errorData = await response.text();
      }
      
      throw new ApiError(
        `API request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }
    
    // For 204 No Content responses, return null
    if (response.status === 204) {
      return null as T;
    }
    
    // For successful responses with content, parse as JSON
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return await response.json() as T;
    }
    
    // For other content types, return as text
    return await response.text() as unknown as T;
  }

  /**
   * Generic request method
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    queryParams?: Record<string, any>,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = this.buildUrl(endpoint, queryParams);
    const headers = { ...this.getHeaders(), ...customHeaders };
    
    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };
    
    // Add request body for non-GET requests
    if (method !== 'GET' && data !== undefined) {
      if (data instanceof FormData) {
        // Don't set Content-Type for FormData, browser will set it with boundary
        delete fetchOptions.headers?.['Content-Type'];
        fetchOptions.body = data;
      } else {
        fetchOptions.body = JSON.stringify(data);
      }
    }
    
    // Set up timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    fetchOptions.signal = controller.signal;
    
    try {
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408);
      }
      
      throw new ApiError(`Request failed: ${(error as Error)?.message || 'Unknown error'}`, 0);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, queryParams?: Record<string, any>, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, queryParams, customHeaders);
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, queryParams?: Record<string, any>, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>('POST', endpoint, data, queryParams, customHeaders);
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, queryParams?: Record<string, any>, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>('PUT', endpoint, data, queryParams, customHeaders);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, queryParams?: Record<string, any>, customHeaders?: Record<string, string>): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, queryParams, customHeaders);
  }
}

// Export a singleton instance of the API client
export const apiClient = new ApiClient(); 