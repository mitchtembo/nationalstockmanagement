'use client';

import { useState, useEffect } from 'react';
import { ApiError } from '@/lib/api/config';

interface UseApiOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  dependencies?: any[];
  skipInitialFetch?: boolean;
}

/**
 * A custom hook for API data fetching with loading, error, and data states
 */
export function useApi<T = any>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const {
    initialData,
    onSuccess,
    onError,
    dependencies = [],
    skipInitialFetch = false,
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(!skipInitialFetch);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (skipInitialFetch) return;
    
    let isMounted = true;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await apiFunction();
        
        if (isMounted) {
          setData(result);
          setIsLoading(false);
          if (onSuccess) onSuccess(result);
        }
      } catch (err) {
        if (isMounted) {
          const apiError = err instanceof ApiError
            ? err
            : new ApiError('An unexpected error occurred', 0);
          
          setError(apiError);
          setIsLoading(false);
          if (onError) onError(apiError);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  // Function to manually refetch data
  const refetch = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      setData(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      const apiError = err instanceof ApiError
        ? err
        : new ApiError('An unexpected error occurred', 0);
      
      setError(apiError);
      if (onError) onError(apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
}

/**
 * A custom hook for handling form submissions to API endpoints
 */
export function useApiMutation<T = any, D = any>(
  apiFunction: (data: D) => Promise<T>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
  } = {}
) {
  const { onSuccess, onError } = options;
  
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = async (mutationData: D): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(mutationData);
      setData(result);
      setIsLoading(false);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      const apiError = err instanceof ApiError
        ? err
        : new ApiError('An unexpected error occurred', 0);
      
      setError(apiError);
      setIsLoading(false);
      if (onError) onError(apiError);
      return undefined;
    }
  };

  return { mutate, data, isLoading, error };
} 