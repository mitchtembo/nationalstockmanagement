'use client';

import { ReactNode, useEffect } from 'react';
import { initApi } from '@/lib/api';

interface ApiProviderProps {
  children: ReactNode;
}

/**
 * API Provider that initializes the API client
 * Wrap your app in this provider to ensure authentication state is restored from localStorage
 */
export function ApiProvider({ children }: ApiProviderProps) {
  useEffect(() => {
    // Initialize the API when the application mounts
    initApi();
  }, []);

  return <>{children}</>;
} 