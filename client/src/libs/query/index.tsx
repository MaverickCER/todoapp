'use client';

import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();

export function QueryProvider({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default useQueryClient;
