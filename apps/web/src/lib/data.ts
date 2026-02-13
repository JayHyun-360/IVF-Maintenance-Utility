// Clean data file - no test data or sample requests
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  location: string;
  requestedBy: string;
  createdAt: Date;
  updatedAt: Date;
  images?: string[]; // Array of base64 image strings
}

// Clean data arrays - no test data
let maintenanceRequests: MaintenanceRequest[] = [];

// Data access functions
export const getMaintenanceRequests = (): MaintenanceRequest[] => {
  return [...maintenanceRequests];
};

export const getMaintenanceStats = (): {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  completedRequests: number;
} => {
  return {
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  };
};

export const getRecentRequests = (limit: number = 10): MaintenanceRequest[] => {
  return [...maintenanceRequests]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

export const getRequestsByCategory = (): Record<string, number> => {
  const requests = getMaintenanceRequests();
  const categoryCount: Record<string, number> = {};

  requests.forEach((request) => {
    categoryCount[request.category] =
      (categoryCount[request.category] || 0) + 1;
  });

  return categoryCount;
};

export const getRequestsByPriority = (): Record<string, number> => {
  const requests = getMaintenanceRequests();
  const priorityCount: Record<string, number> = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    URGENT: 0,
  };

  requests.forEach((request) => {
    priorityCount[request.priority] =
      (priorityCount[request.priority] || 0) + 1;
  });

  return priorityCount;
};

// Add new request function
export const addMaintenanceRequest = (
  request: Omit<MaintenanceRequest, "id" | "createdAt" | "updatedAt">,
): MaintenanceRequest => {
  const newId = Date.now().toString();
  
  const newRequest: MaintenanceRequest = {
    id: newId,
    ...request,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  maintenanceRequests.push(newRequest);
  return newRequest;
};

// Update request status
export const updateRequestStatus = (
  id: string,
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED",
): MaintenanceRequest | null => {
  const request = maintenanceRequests.find((r) => r.id === id);
  if (request) {
    request.status = status;
    request.updatedAt = new Date();
    return request;
  }
  return null;
};

// Delete request
export const deleteMaintenanceRequest = (id: string): boolean => {
  const index = maintenanceRequests.findIndex((r) => r.id === id);
  if (index !== -1) {
    maintenanceRequests.splice(index, 1);
    return true;
  }
  return false;
};
