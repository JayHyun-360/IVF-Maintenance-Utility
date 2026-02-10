"use client";

import { useState, useMemo } from "react";
import { useRequests } from "./useRequests";

interface SearchFilters {
  status?: string;
  category?: string;
  priority?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

interface UseSearchOptions {
  filters?: SearchFilters;
  enabled?: boolean;
}

export function useSearch(options: UseSearchOptions = {}) {
  const { filters, enabled = true } = options;
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get all requests (or filtered requests)
  const { data: allRequests, isLoading, error } = useRequests(filters);

  // Filter requests based on search query
  const filteredRequests = useMemo(() => {
    if (!allRequests || !searchQuery.trim()) {
      return allRequests || [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    return allRequests.filter((request) => {
      // Search in title
      if (request.title.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in description
      if (request.description.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in location
      if (request.location && request.location.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in user name
      if (request.user?.name && request.user.name.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in category
      if (request.category.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in status
      if (request.status.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in priority
      if (request.priority.toLowerCase().includes(query)) {
        return true;
      }
      
      return false;
    });
  }, [allRequests, searchQuery]);

  // Search statistics
  const searchStats = useMemo(() => {
    const total = allRequests?.length || 0;
    const filtered = filteredRequests.length;
    const hasQuery = searchQuery.trim().length > 0;
    
    return {
      total,
      filtered,
      hasQuery,
      isActive: hasQuery && filtered < total,
    };
  }, [allRequests, filteredRequests, searchQuery]);

  return {
    // Search state
    searchQuery,
    setSearchQuery,
    
    // Data
    requests: filteredRequests,
    allRequests,
    
    // Loading and error states
    isLoading,
    error,
    
    // Search statistics
    searchStats,
    
    // Convenience methods
    clearSearch: () => setSearchQuery(""),
    hasResults: filteredRequests.length > 0,
    isEmpty: filteredRequests.length === 0 && searchQuery.trim().length > 0,
  };
}
