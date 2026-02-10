"use client";

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';

interface Stats {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  completedRequests: number;
  urgentRequests: number;
  averageResolutionTime: number;
  requestsByCategory: {
    category: string;
    count: number;
  }[];
  monthlyTrends: {
    month: string;
    requests: number;
    completed: number;
  }[];
}

export function useStats() {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: async () => {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      return response.json() as Promise<Stats>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes for stats
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
}
