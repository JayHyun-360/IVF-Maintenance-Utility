// Mock database for demonstration - in production this would come from your actual database
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

// Test examples for demonstration - in production this would come from your actual database
let maintenanceRequests: MaintenanceRequest[] = [
  // Completed requests (7 out of ~43 total)
  {
    id: "1",
    title: "Broken Light Fixture",
    description:
      "Main hallway light fixture is flickering and needs replacement.",
    category: "ELECTRICAL",
    priority: "HIGH",
    status: "COMPLETED",
    location: "Building B, Main Hallway",
    requestedBy: "Jane Staff",
    createdAt: new Date("2026-01-24T09:15:00Z"),
    updatedAt: new Date("2026-01-24T11:00:00Z"),
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
    ],
  },
  {
    id: "2",
    title: "Leaky Faucet",
    description:
      "The faucet in the men's restroom is constantly dripping and needs to be repaired.",
    category: "PLUMBING",
    priority: "MEDIUM",
    status: "COMPLETED",
    location: "Building A, Room 201",
    requestedBy: "John Student",
    createdAt: new Date("2026-01-24T10:30:00Z"),
    updatedAt: new Date("2026-01-24T14:20:00Z"),
    images: [],
  },
  {
    id: "3",
    title: "Broken Window",
    description:
      "Window in the library is cracked and needs to be replaced for safety reasons.",
    category: "CARPENTRY",
    priority: "MEDIUM",
    status: "COMPLETED",
    location: "Building D, Library 2nd Floor",
    requestedBy: "Emily Student",
    createdAt: new Date("2026-01-24T08:15:00Z"),
    updatedAt: new Date("2026-01-24T16:45:00Z"),
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
    ],
  },
  {
    id: "4",
    title: "HVAC System Not Working",
    description:
      "The air conditioning system in the main lecture hall is not functioning properly.",
    category: "HVAC",
    priority: "HIGH",
    status: "COMPLETED",
    location: "Building A, Lecture Hall 101",
    requestedBy: "Sarah Professor",
    createdAt: new Date("2026-01-23T16:45:00Z"),
    updatedAt: new Date("2026-01-24T09:30:00Z"),
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
    ],
  },
  {
    id: "5",
    title: "Electrical Outlet Not Working",
    description:
      "Several electrical outlets in the computer lab are not providing power.",
    category: "ELECTRICAL",
    priority: "MEDIUM",
    status: "COMPLETED",
    location: "Building E, Computer Lab 201",
    requestedBy: "David Staff",
    createdAt: new Date("2026-01-22T10:30:00Z"),
    updatedAt: new Date("2026-01-23T15:20:00Z"),
    images: [],
  },
  {
    id: "6",
    title: "Water Leak in Ceiling",
    description:
      "There appears to be a water leak in the ceiling of the storage room.",
    category: "PLUMBING",
    priority: "HIGH",
    status: "COMPLETED",
    location: "Building F, Storage Room",
    requestedBy: "Michael Staff",
    createdAt: new Date("2026-01-24T07:45:00Z"),
    updatedAt: new Date("2026-01-24T13:15:00Z"),
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
    ],
  },
  {
    id: "7",
    title: "Broken Chair",
    description:
      "One of the chairs in the cafeteria has a broken leg and needs repair.",
    category: "CARPENTRY",
    priority: "LOW",
    status: "COMPLETED",
    location: "Building G, Cafeteria",
    requestedBy: "Lisa Student",
    createdAt: new Date("2026-01-24T06:30:00Z"),
    updatedAt: new Date("2026-01-24T12:00:00Z"),
    images: [],
  },

  // In Progress requests (3 out of ~43 total)
  {
    id: "8",
    title: "Fire Alarm System Maintenance",
    description:
      "Monthly inspection and testing of fire alarm systems required.",
    category: "FIRE_SAFETY",
    priority: "HIGH",
    status: "IN_PROGRESS",
    location: "All Buildings",
    requestedBy: "Safety Officer",
    createdAt: new Date("2026-01-24T08:00:00Z"),
    updatedAt: new Date("2026-01-24T11:30:00Z"),
    images: [],
  },
  {
    id: "9",
    title: "Parking Lot Lighting Repair",
    description:
      "Several lights in the main parking lot are not working, creating safety concerns.",
    category: "ELECTRICAL",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    location: "Main Parking Lot",
    requestedBy: "Security Team",
    createdAt: new Date("2026-01-23T20:15:00Z"),
    updatedAt: new Date("2026-01-24T10:00:00Z"),
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
    ],
  },
  {
    id: "10",
    title: "Elevator Maintenance",
    description: "Routine maintenance and inspection of building elevators.",
    category: "HVAC",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    location: "Building A, Elevators",
    requestedBy: "Building Manager",
    createdAt: new Date("2026-01-24T09:00:00Z"),
    updatedAt: new Date("2026-01-24T14:00:00Z"),
    images: [],
  },

  // Pending requests (2 out of ~43 total)
  {
    id: "11",
    title: "Door Lock Replacement",
    description: "Office door lock is malfunctioning and needs replacement.",
    category: "CARPENTRY",
    priority: "MEDIUM",
    status: "PENDING",
    location: "Building C, Office 305",
    requestedBy: "Admin Staff",
    createdAt: new Date("2026-01-24T11:45:00Z"),
    updatedAt: new Date("2026-01-24T11:45:00Z"),
    images: [],
  },
  {
    id: "12",
    title: "Water Fountain Repair",
    description:
      "Water fountain on 3rd floor is not dispensing water properly.",
    category: "PLUMBING",
    priority: "LOW",
    status: "PENDING",
    location: "Building A, 3rd Floor",
    requestedBy: "Student Services",
    createdAt: new Date("2026-01-24T12:30:00Z"),
    updatedAt: new Date("2026-01-24T12:30:00Z"),
    images: [],
  },

  // Urgent requests (4 out of ~43 total)
  {
    id: "13",
    title: "Fire Alarm System Malfunction",
    description:
      "Fire alarm system is triggering false alarms and needs immediate attention.",
    category: "FIRE_SAFETY",
    priority: "URGENT",
    status: "PENDING",
    location: "Building B, All Floors",
    requestedBy: "Security Team",
    createdAt: new Date("2026-01-24T13:00:00Z"),
    updatedAt: new Date("2026-01-24T13:00:00Z"),
    images: [],
  },
  {
    id: "14",
    title: "Gas Leak Detected",
    description:
      "Strong gas smell detected near the science building - emergency response required.",
    category: "PLUMBING",
    priority: "URGENT",
    status: "IN_PROGRESS",
    location: "Building D, Science Labs",
    requestedBy: "Lab Technician",
    createdAt: new Date("2026-01-24T14:15:00Z"),
    updatedAt: new Date("2026-01-24T14:30:00Z"),
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
    ],
  },
  {
    id: "15",
    title: "Power Outage in Building A",
    description:
      "Complete power failure in Building A affecting all floors and systems.",
    category: "ELECTRICAL",
    priority: "URGENT",
    status: "PENDING",
    location: "Building A, All Floors",
    requestedBy: "Building Manager",
    createdAt: new Date("2026-01-24T15:30:00Z"),
    updatedAt: new Date("2026-01-24T15:30:00Z"),
    images: [],
  },
  {
    id: "16",
    title: "Burst Water Main",
    description:
      "Major water main break causing flooding in the parking area - immediate action needed.",
    category: "PLUMBING",
    priority: "URGENT",
    status: "IN_PROGRESS",
    location: "Main Campus, Parking Lot B",
    requestedBy: "Security Team",
    createdAt: new Date("2026-01-24T16:00:00Z"),
    updatedAt: new Date("2026-01-24T16:15:00Z"),
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A",
    ],
  },
];

// Generate additional requests to reach realistic numbers with balanced status distribution
const generateAdditionalRequests = (): MaintenanceRequest[] => {
  const additionalRequests: MaintenanceRequest[] = [];
  const categories = [
    "ELECTRICAL",
    "PLUMBING",
    "HVAC",
    "CARPENTRY",
    "FIRE_SAFETY",
  ];
  const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
  const requesters = ["Student", "Staff", "Faculty", "Admin", "Security"];
  const locations = [
    "Building A",
    "Building B",
    "Building C",
    "Building D",
    "Building E",
    "Building F",
    "Building G",
    "Main Campus",
  ];

  const titles = [
    "Light Bulb Replacement",
    "Pipe Repair",
    "AC Maintenance",
    "Door Fix",
    "Window Repair",
    "Outlet Installation",
    "Faucet Leak",
    "Vent Cleaning",
    "Lock Replacement",
    "Switch Repair",
    "Toilet Repair",
    "Thermostat Fix",
    "Cabinet Repair",
    "Circuit Check",
    "Drain Cleaning",
    "Filter Change",
  ];

  // Generate requests with balanced status distribution
  // Target: ~60% completed, ~25% pending, ~15% in progress
  const targetTotal = 43; // Total requests we want
  const currentCount = 16; // Current requests in the array
  const requestsToGenerate = targetTotal - currentCount;

  const statusDistribution = {
    COMPLETED: Math.floor(requestsToGenerate * 0.6),
    PENDING: Math.floor(requestsToGenerate * 0.25),
    IN_PROGRESS: Math.floor(requestsToGenerate * 0.15),
  };

  let requestIndex = 17;

  // Generate requests for each status
  Object.entries(statusDistribution).forEach(([status, count]) => {
    for (let i = 0; i < count; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const priority =
        priorities[Math.floor(Math.random() * priorities.length)];
      const requester =
        requesters[Math.floor(Math.random() * requesters.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const title = titles[Math.floor(Math.random() * titles.length)];

      // Create date within the last month
      const daysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      // Set updated time based on status
      const updatedAt = new Date(createdAt);
      if (status === "COMPLETED") {
        // Completed 1-7 days after creation
        updatedAt.setDate(
          updatedAt.getDate() + Math.floor(Math.random() * 7) + 1,
        );
      } else if (status === "IN_PROGRESS") {
        // Updated 0-2 days after creation
        updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 3));
      }
      // PENDING requests have same created and updated time

      additionalRequests.push({
        id: requestIndex.toString(),
        title: `${title} - ${location}`,
        description: `Maintenance request for ${title.toLowerCase()} in ${location}.`,
        category,
        priority:
          status === "COMPLETED"
            ? priorities[Math.floor(Math.random() * 3)] // Exclude URGENT from completed for realism
            : priority,
        status: status as "PENDING" | "IN_PROGRESS" | "COMPLETED",
        location: `${location}, Room ${Math.floor(Math.random() * 500) + 100}`,
        requestedBy: `${requester} ${Math.floor(Math.random() * 100)}`,
        createdAt,
        updatedAt,
        images: Math.random() > 0.7 ? [generateMockImage()] : [],
      });

      requestIndex++;
    }
  });

  return additionalRequests;
};

const generateMockImage = (): string => {
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A";
};

// Combine original requests with generated ones
maintenanceRequests = [...maintenanceRequests, ...generateAdditionalRequests()];

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
  const requests = getMaintenanceRequests();

  return {
    totalRequests: requests.length,
    pendingRequests: requests.filter((r) => r.status === "PENDING").length,
    inProgressRequests: requests.filter((r) => r.status === "IN_PROGRESS")
      .length,
    completedRequests: requests.filter((r) => r.status === "COMPLETED").length,
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
  // Find the highest current ID to generate proper sequential ID
  const maxId = Math.max(...maintenanceRequests.map((r) => parseInt(r.id)), 0);
  const newId = (maxId + 1).toString();

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
