"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, invalidateQueries } from '@/lib/queryClient';

// Types based on the existing schema
interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: 'PLUMBING' | 'ELECTRICAL' | 'CARPENTRY' | 'PERSONNEL';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  location?: string;
  images?: string;
  documents?: string;
  requestedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

interface CreateRequestData {
  title: string;
  description: string;
  category: MaintenanceRequest['category'];
  priority: MaintenanceRequest['priority'];
  location?: string;
  images?: string[];
}

interface UpdateRequestData {
  status?: MaintenanceRequest['status'];
  assignedTo?: string;
  priority?: MaintenanceRequest['priority'];
}

// Hook for fetching requests with filtering
export function useRequests(filters?: {
  status?: string;
  category?: string;
  priority?: string;
}) {
  const queryParams = new URLSearchParams();
  if (filters?.status) queryParams.set('status', filters.status);
  if (filters?.category) queryParams.set('category', filters.category);
  if (filters?.priority) queryParams.set('priority', filters.priority);

  return useQuery({
    queryKey: [...queryKeys.requests, filters],
    queryFn: async () => {
      const response = await fetch(`/api/requests?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      return response.json() as Promise<MaintenanceRequest[]>;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for fetching a single request
export function useRequest(id: string) {
  return useQuery({
    queryKey: queryKeys.request(id),
    queryFn: async () => {
      const response = await fetch(`/api/requests/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch request');
      }
      return response.json() as Promise<MaintenanceRequest>;
    },
    enabled: !!id,
  });
}

// Hook for creating a new request
export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRequestData) => {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create request');
      }

      return response.json() as Promise<MaintenanceRequest>;
    },
    onSuccess: () => {
      // Invalidate requests list to refetch
      invalidateQueries.requests();
    },
    onError: (error) => {
      console.error('Error creating request:', error);
    },
  });
}

// Hook for updating a request
export function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateRequestData }) => {
      const response = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update request');
      }

      return response.json() as Promise<MaintenanceRequest>;
    },
    onSuccess: (updatedRequest) => {
      // Update the specific request in cache
      queryClient.setQueryData(queryKeys.request(updatedRequest.id), updatedRequest);
      // Invalidate requests list
      invalidateQueries.requests();
    },
    onError: (error) => {
      console.error('Error updating request:', error);
    },
  });
}

// Hook for deleting a request
export function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/requests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete request');
      }

      return id;
    },
    onSuccess: (deletedId) => {
      // Remove the request from cache
      queryClient.removeQueries({ queryKey: queryKeys.request(deletedId) });
      // Invalidate requests list
      invalidateQueries.requests();
    },
    onError: (error) => {
      console.error('Error deleting request:', error);
    },
  });
}
