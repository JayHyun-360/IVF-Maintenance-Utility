import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Query keys for better cache management
export const queryKeys = {
  requests: ['requests'] as const,
  request: (id: string) => ['requests', id] as const,
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  stats: ['stats'] as const,
  notifications: ['notifications'] as const,
};

// Helper functions for invalidating queries
export const invalidateQueries = {
  requests: () => queryClient.invalidateQueries({ queryKey: queryKeys.requests }),
  request: (id: string) => queryClient.invalidateQueries({ queryKey: queryKeys.request(id) }),
  users: () => queryClient.invalidateQueries({ queryKey: queryKeys.users }),
  stats: () => queryClient.invalidateQueries({ queryKey: queryKeys.stats }),
  notifications: () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications }),
};
