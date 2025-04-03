// Stock Management Service for Impilo Stock Management System API

import { apiClient } from '../client';
import { 
  Drug, 
  StockBatch, 
  StockTransaction, 
  StockRequestDTO, 
  FacilityStock,
  Pageable,
  PageDrug
} from '../types';

/**
 * Service for stock management operations
 */
export const stockService = {
  // Drug operations
  drugs: {
    /**
     * Get all drugs with pagination
     * @param pageable - Pagination parameters
     * @returns Paginated list of drugs
     */
    getAll: async (pageable: Pageable) => {
      return await apiClient.get<PageDrug>('/stock/drugs', { pageable });
    },

    /**
     * Add a new drug
     * @param drugData - Drug data to add
     * @returns Created drug
     */
    add: async (drugData: Partial<Drug>) => {
      return await apiClient.post<Drug>('/stock/drug', drugData);
    },

    /**
     * Get drugs with low stock
     * @returns List of drugs with low stock
     */
    getLowStockDrugs: async () => {
      return await apiClient.get<Drug[]>('/stock/low-stock');
    },

    /**
     * Get drugs with critical stock levels
     * @param threshold - Critical threshold quantity
     * @returns List of drugs with critical stock
     */
    getCriticalStock: async (threshold: number) => {
      return await apiClient.get<Drug[]>('/stock/critical', { threshold });
    },
  },

  // Stock batch operations
  batches: {
    /**
     * Add a new stock batch for a drug
     * @param drugId - Drug ID
     * @param facilityId - Facility ID
     * @param batchData - Batch data
     * @returns Created batch
     */
    add: async (drugId: number, facilityId: number, batchData: Partial<StockBatch>) => {
      return await apiClient.post<StockBatch>(`/stock/batch/${drugId}`, batchData, { facilityId });
    },

    /**
     * Adjust stock quantity for a batch
     * @param batchId - Batch ID
     * @param newQuantity - New quantity
     * @param reason - Reason for adjustment
     * @returns Updated batch
     */
    adjustQuantity: async (batchId: number, newQuantity: number, reason: string) => {
      return await apiClient.put<StockBatch>(`/stock/adjust/${batchId}`, null, { newQuantity, reason });
    },

    /**
     * Get all stock batches for a facility
     * @param facilityId - Facility ID
     * @returns List of stock batches
     */
    getByFacility: async (facilityId: number) => {
      return await apiClient.get<StockBatch[]>(`/stock/facility/${facilityId}/stock`);
    },
  },

  // Stock transactions
  transactions: {
    /**
     * Transfer stock between facilities
     * @param drugId - Drug ID
     * @param quantity - Quantity to transfer
     * @param sourceFacilityId - Source facility ID
     * @param destinationFacilityId - Destination facility ID
     * @returns Transaction record
     */
    transfer: async (drugId: number, quantity: number, sourceFacilityId: number, destinationFacilityId: number) => {
      return await apiClient.post<StockTransaction>('/stock/transfer', null, {
        drugId, 
        quantity, 
        sourceFacilityId, 
        destinationFacilityId
      });
    },

    /**
     * Dispense a drug from stock
     * @param drugId - Drug ID
     * @param quantity - Quantity to dispense
     * @param facilityId - Facility ID
     * @returns Transaction record
     */
    dispense: async (drugId: number, quantity: number, facilityId: number) => {
      return await apiClient.post<StockTransaction>('/stock/dispense', null, { drugId, quantity, facilityId });
    },

    /**
     * Get stock transaction history for a drug
     * @param drugId - Drug ID
     * @param startDate - Start date for history
     * @param endDate - End date for history
     * @returns List of transactions
     */
    getHistory: async (drugId: number, startDate: Date, endDate: Date) => {
      return await apiClient.get<StockTransaction[]>(`/stock/history/${drugId}`, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
    },
  },

  // Stock requests
  requests: {
    /**
     * Create a stock request
     * @param requestData - Stock request data
     * @returns Request confirmation
     */
    create: async (requestData: StockRequestDTO) => {
      return await apiClient.post('/stock/request', requestData);
    },
  },

  // Facility stock
  facilityStock: {
    /**
     * Get all facility stock
     * @returns List of facility stock records
     */
    getAll: async () => {
      return await apiClient.get<FacilityStock[]>('/facility-stock');
    },

    /**
     * Get stock by ID
     * @param id - Stock ID
     * @returns Facility stock record
     */
    getById: async (id: number) => {
      return await apiClient.get<FacilityStock>(`/facility-stock/${id}`);
    },

    /**
     * Save new facility stock
     * @param stockData - Stock data
     * @returns Created stock record
     */
    save: async (stockData: Partial<FacilityStock>) => {
      return await apiClient.post<FacilityStock>('/facility-stock', stockData);
    },

    /**
     * Delete facility stock
     * @param id - Stock ID
     */
    delete: async (id: number) => {
      return await apiClient.delete(`/facility-stock/${id}`);
    },
  },

  // Stock reports
  reports: {
    /**
     * Generate a comprehensive stock report
     * @returns Stock report data
     */
    generateStockReport: async () => {
      return await apiClient.get<Record<string, any>>('/stock/report');
    },

    /**
     * Get stock levels by facility
     * @returns Stock levels grouped by facility
     */
    getStockLevelsByFacility: async () => {
      return await apiClient.get<Record<string, Record<string, number>>>('/stock/facility-stock-levels');
    },
  },
}; 