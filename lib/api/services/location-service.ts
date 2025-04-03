// Location Service for Impilo Stock Management System API

import { apiClient } from '../client';
import { Province, District, Facility, Pageable, Page } from '../types';

/**
 * Service for location-related API operations (provinces, districts, facilities)
 */
export const locationService = {
  // Province operations
  provinces: {
    /**
     * Get all provinces
     * @returns List of all provinces
     */
    getAll: async () => {
      return await apiClient.get<Province[]>('/provinces');
    },

    /**
     * Get province by ID
     * @param id - Province ID
     * @returns Province details
     */
    getById: async (id: number) => {
      return await apiClient.get<Province>(`/provinces/${id}`);
    },

    /**
     * Get province by name
     * @param name - Province name
     * @returns Province details
     */
    getByName: async (name: string) => {
      return await apiClient.get<Province>(`/provinces/name/${name}`);
    },

    /**
     * Create a new province
     * @param name - Province name
     * @returns Created province
     */
    create: async (name: string) => {
      return await apiClient.post<Province>('/provinces', null, { name });
    },

    /**
     * Update a province
     * @param id - Province ID
     * @param name - New province name
     * @returns Updated province
     */
    update: async (id: number, name: string) => {
      return await apiClient.put<Province>(`/provinces/${id}`, null, { name });
    },
  },

  // District operations
  districts: {
    /**
     * Get all districts
     * @returns List of all districts
     */
    getAll: async () => {
      return await apiClient.get<District[]>('/districts');
    },

    /**
     * Get district by ID
     * @param id - District ID
     * @returns District details
     */
    getById: async (id: number) => {
      return await apiClient.get<District>(`/districts/${id}`, { id });
    },

    /**
     * Get district by name
     * @param name - District name
     * @returns District details
     */
    getByName: async (name: string) => {
      return await apiClient.get<District>(`/districts/name/${name}`);
    },

    /**
     * Get districts by province ID
     * @param provinceId - Province ID
     * @returns List of districts in the province
     */
    getByProvinceId: async (provinceId: number) => {
      return await apiClient.get<District[]>(`/districts/province/${provinceId}`);
    },

    /**
     * Create a new district
     * @param name - District name
     * @returns Created district
     */
    create: async (name: string) => {
      return await apiClient.post<District>('/districts', null, { name });
    },

    /**
     * Update a district
     * @param id - District ID
     * @param name - New district name
     * @returns Updated district
     */
    update: async (id: number, name: string) => {
      return await apiClient.put<District>(`/districts/${id}`, null, { name });
    },
  },

  // Facility operations
  facilities: {
    /**
     * Get all facilities with pagination
     * @param pageable - Pagination parameters
     * @returns Paginated list of facilities
     */
    getAll: async (pageable: Pageable) => {
      return await apiClient.get<Page<Facility>>('/facilities', { pageable });
    },

    /**
     * Get all facilities without pagination
     * @returns List of all facilities
     */
    getAllNoPagination: async () => {
      return await apiClient.get<Facility[]>('/facilities/all');
    },

    /**
     * Get facility by ID
     * @param id - Facility ID
     * @returns Facility details
     */
    getById: async (id: number) => {
      return await apiClient.get<Facility>(`/facilities/${id}`);
    },

    /**
     * Get facilities by district ID
     * @param districtId - District ID
     * @returns List of facilities in the district
     */
    getByDistrictId: async (districtId: number) => {
      return await apiClient.get<Facility[]>(`/facilities/district/${districtId}`);
    },

    /**
     * Search facilities
     * @param searchTerm - Search term
     * @param pageable - Pagination parameters
     * @returns Paginated search results
     */
    search: async (searchTerm: string, pageable: Pageable) => {
      return await apiClient.get<Page<Facility>>('/facilities/search', { searchTerm, pageable });
    },

    /**
     * Update a facility
     * @param id - Facility ID
     * @param facilityData - Updated facility data
     * @returns Updated facility
     */
    update: async (id: number, facilityData: Partial<Facility>) => {
      return await apiClient.put<Facility>(`/facilities/${id}`, facilityData);
    },
  },
}; 