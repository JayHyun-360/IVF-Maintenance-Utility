"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import BackButton from "@/components/BackButton";
import AccountDropdown from "@/components/AccountDropdown";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface DashboardStats {
  label: string;
  value: number;
  trend: string;
  status: string;
  icon: React.ReactNode;
  gradient: string;
}

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
  building?: string;
  roomNumber?: string;
  floor?: string;
  location?: string;
  contactPhone?: string;
  department?: string;
  images: string[];
  user?: {
    name: string;
    email: string;
  };
}

// Default mock data for fallback - Aligned with Physical Plant Request Form
const defaultStats: DashboardStats[] = [
  {
    label: "Total Requests",
    value: 0,
    trend: "+0%",
    status: "Active",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    label: "Pending",
    value: 0,
    trend: "+0%",
    status: "Stable",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
  },
  {
    label: "In Progress",
    value: 0,
    trend: "+0%",
    status: "Processing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    label: "Completed",
    value: 0,
    trend: "+0%",
    status: "Resolved",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-600",
  },
];

export default function AdminDashboard() {
  const { isMobile } = useMobileOptimizations();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<DashboardStats[]>(defaultStats);
  const [recentRequests, setRecentRequests] = useState<MaintenanceRequest[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Request management state
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [editingStatus, setEditingStatus] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      if (activeTab === "overview") {
        fetchDashboardData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use mock data directly for development
      const transformedStats: DashboardStats[] = [
        {
          label: "Total Requests",
          value: 20,
          trend: "+12%",
          status: "Active",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ),
          gradient: "from-blue-500 to-cyan-600",
        },
        {
          label: "Pending",
          value: 8,
          trend: "+3%",
          status: "Pending",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          gradient: "from-amber-500 to-orange-600",
        },
        {
          label: "In Progress",
          value: 5,
          trend: "-2%",
          status: "Processing",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          ),
          gradient: "from-purple-500 to-pink-600",
        },
        {
          label: "Completed",
          value: 7,
          trend: "+8%",
          status: "Completed",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          gradient: "from-green-500 to-emerald-600",
        },
      ];

      setStats(transformedStats);

      // Create 20 mock maintenance requests with images - Aligned with Physical Plant Request Form
      const mockRequests: MaintenanceRequest[] = [
        {
          id: "PPR-2026-001",
          title: "Air Conditioning Unit Not Working",
          description:
            "AC unit in Room 203 is not cooling properly, temperature is too high.",
          category: "HVAC/Air Conditioning",
          priority: "High Priority",
          status: "Pending",
          requestedBy: "John Smith",
          createdAt: "02/10/2026 14:30:00",
          updatedAt: "02/10/2026 14:30:00",
          building: "Main Building",
          roomNumber: "203",
          floor: "2nd Floor",
          location: "Near main entrance, Back corner",
          contactPhone: "0912-345-6789",
          department: "Academic",
          images: [
            "https://picsum.photos/seed/ac-unit/400/300.jpg",
            "https://picsum.photos/seed/ac-unit2/400/300.jpg",
          ],
        },
        {
          id: "PPR-2026-002",
          title: "Water Leak in Bathroom",
          description:
            "Water leaking from ceiling in men's bathroom on 2nd floor.",
          category: "Plumbing Issues",
          priority: "Urgent - Emergency",
          status: "In Progress",
          requestedBy: "Maria Garcia",
          createdAt: "02/10/2026 12:15:00",
          updatedAt: "02/10/2026 13:45:00",
          building: "Science Building",
          roomNumber: "Men's Bathroom",
          floor: "2nd Floor",
          location: "Center of building",
          contactPhone: "0917-234-5678",
          department: "Administrative",
          images: ["https://picsum.photos/seed/water-leak/400/300.jpg"],
        },
        {
          id: "REQ-003",
          title: "Broken Window",
          description: "Window cracked in classroom 105 due to storm damage.",
          category: "Structural",
          priority: "Medium",
          status: "Completed",
          requestedBy: "Robert Johnson",
          createdAt: "02/09/2026 09:00:00",
          updatedAt: "02/10/2026 11:30:00",
          location: "Classroom 105, Building A",
          images: [
            "https://picsum.photos/seed/broken-window/400/300.jpg",
            "https://picsum.photos/seed/window-repair/400/300.jpg",
          ],
        },
        {
          id: "REQ-004",
          title: "Electrical Outlet Not Working",
          description: "Power outlet near teacher's desk not functioning.",
          category: "Electrical",
          priority: "Low",
          status: "Pending",
          requestedBy: "Sarah Williams",
          createdAt: "02/10/2026 16:20:00",
          updatedAt: "02/10/2026 16:20:00",
          location: "Classroom 201, Building A",
          images: ["https://picsum.photos/seed/outlet/400/300.jpg"],
        },
        {
          id: "REQ-005",
          title: "Fire Alarm System Check",
          description:
            "Monthly fire alarm system inspection and testing required.",
          category: "Safety",
          priority: "High",
          status: "In Progress",
          requestedBy: "David Brown",
          createdAt: "02/10/2026 08:00:00",
          updatedAt: "02/10/2026 10:15:00",
          location: "Main Building, All Floors",
          images: [
            "https://picsum.photos/seed/fire-alarm/400/300.jpg",
            "https://picsum.photos/seed/alarm-panel/400/300.jpg",
          ],
        },
        {
          id: "REQ-006",
          title: "Parking Lot Lighting",
          description:
            "Several lights in parking lot are not working, creating safety concerns.",
          category: "Electrical",
          priority: "Medium",
          status: "Pending",
          requestedBy: "Jennifer Davis",
          createdAt: "02/10/2026 17:45:00",
          updatedAt: "02/10/2026 17:45:00",
          location: "Main Parking Lot",
          images: ["https://picsum.photos/seed/parking-lights/400/300.jpg"],
        },
        {
          id: "REQ-007",
          title: "Door Lock Replacement",
          description:
            "Main entrance door lock needs replacement for security reasons.",
          category: "Security",
          priority: "High",
          status: "Completed",
          requestedBy: "Michael Wilson",
          createdAt: "02/08/2026 11:30:00",
          updatedAt: "02/09/2026 15:00:00",
          location: "Main Entrance, Building A",
          images: [
            "https://picsum.photos/seed/door-lock/400/300.jpg",
            "https://picsum.photos/seed/new-lock/400/300.jpg",
          ],
        },
        {
          id: "REQ-008",
          title: "Clogged Drain",
          description:
            "Kitchen sink drain is completely clogged and backing up.",
          category: "Plumbing",
          priority: "Medium",
          status: "Dismissed",
          requestedBy: "Linda Martinez",
          createdAt: "02/09/2026 13:20:00",
          updatedAt: "02/10/2026 09:30:00",
          location: "Cafeteria Kitchen, Building B",
          images: ["https://picsum.photos/seed/clogged-drain/400/300.jpg"],
        },
        {
          id: "REQ-009",
          title: "Roof Leak",
          description:
            "Water leaking through roof during rain in storage room.",
          category: "Structural",
          priority: "Critical",
          status: "In Progress",
          requestedBy: "James Anderson",
          createdAt: "02/09/2026 20:15:00",
          updatedAt: "02/10/2026 14:00:00",
          location: "Storage Room, Building C",
          images: [
            "https://picsum.photos/seed/roof-leak/400/300.jpg",
            "https://picsum.photos/seed/water-damage/400/300.jpg",
          ],
        },
        {
          id: "REQ-010",
          title: "Internet Connection Issues",
          description: "WiFi not working in computer lab, affecting classes.",
          category: "IT",
          priority: "High",
          status: "Pending",
          requestedBy: "Patricia Taylor",
          createdAt: "02/10/2026 10:30:00",
          updatedAt: "02/10/2026 10:30:00",
          location: "Computer Lab, Building A",
          images: ["https://picsum.photos/seed/wifi-issue/400/300.jpg"],
        },
        {
          id: "REQ-011",
          title: "Elevator Maintenance",
          description: "Elevator making unusual noises and slow operation.",
          category: "Mechanical",
          priority: "Medium",
          status: "In Progress",
          requestedBy: "Christopher Lee",
          createdAt: "02/09/2026 15:45:00",
          updatedAt: "02/10/2026 12:00:00",
          location: "Elevator Shaft, Building B",
          images: ["https://picsum.photos/seed/elevator/400/300.jpg"],
        },
        {
          id: "REQ-012",
          title: "Paint Touch-ups",
          description:
            "Walls in hallway need painting due to scuff marks and damage.",
          category: "Cosmetic",
          priority: "Low",
          status: "Pending",
          requestedBy: "Nancy Thomas",
          createdAt: "02/10/2026 09:15:00",
          updatedAt: "02/10/2026 09:15:00",
          location: "Main Hallway, Building A",
          images: ["https://picsum.photos/seed/wall-damage/400/300.jpg"],
        },
        {
          id: "REQ-013",
          title: "Pest Control",
          description:
            "Signs of pest activity in kitchen area, immediate attention needed.",
          category: "Sanitation",
          priority: "High",
          status: "Completed",
          requestedBy: "Daniel Jackson",
          createdAt: "02/08/2026 07:00:00",
          updatedAt: "02/09/2026 16:30:00",
          location: "Kitchen Area, Building B",
          images: ["https://picsum.photos/seed/pest-control/400/300.jpg"],
        },
        {
          id: "REQ-014",
          title: "Floor Tile Replacement",
          description:
            "Broken floor tiles in main lobby creating tripping hazard.",
          category: "Structural",
          priority: "Medium",
          status: "In Progress",
          requestedBy: "Karen White",
          createdAt: "02/09/2026 14:00:00",
          updatedAt: "02/10/2026 11:00:00",
          location: "Main Lobby, Building A",
          images: [
            "https://picsum.photos/seed/broken-tiles/400/300.jpg",
            "https://picsum.photos/seed/floor-repair/400/300.jpg",
          ],
        },
        {
          id: "REQ-015",
          title: "Security Camera Installation",
          description:
            "Install new security cameras in parking lot for improved monitoring.",
          category: "Security",
          priority: "Medium",
          status: "Pending",
          requestedBy: "Paul Harris",
          createdAt: "02/10/2026 13:00:00",
          updatedAt: "02/10/2026 13:00:00",
          location: "Parking Lot, All Areas",
          images: ["https://picsum.photos/seed/security-camera/400/300.jpg"],
        },
        {
          id: "REQ-016",
          title: "HVAC Filter Replacement",
          description:
            "Regular maintenance: replace HVAC filters in all buildings.",
          category: "HVAC",
          priority: "Low",
          status: "Completed",
          requestedBy: "Lisa Martin",
          createdAt: "02/07/2026 08:30:00",
          updatedAt: "02/08/2026 17:00:00",
          location: "All Buildings",
          images: ["https://picsum.photos/seed/hvac-filter/400/300.jpg"],
        },
        {
          id: "REQ-017",
          title: "Emergency Exit Sign",
          description:
            "Emergency exit sign not illuminated, needs immediate repair.",
          category: "Safety",
          priority: "Critical",
          status: "In Progress",
          requestedBy: "Anthony Thompson",
          createdAt: "02/10/2026 06:30:00",
          updatedAt: "02/10/2026 08:00:00",
          location: "Emergency Exit, Building C",
          images: ["https://picsum.photos/seed/exit-sign/400/300.jpg"],
        },
        {
          id: "REQ-018",
          title: "Computer Lab Equipment",
          description: "Several computers not booting up properly in lab.",
          category: "IT",
          priority: "Medium",
          status: "Pending",
          requestedBy: "Michelle Garcia",
          createdAt: "02/10/2026 15:00:00",
          updatedAt: "02/10/2026 15:00:00",
          location: "Computer Lab, Building B",
          images: ["https://picsum.photos/seed/computer-issue/400/300.jpg"],
        },
        {
          id: "REQ-019",
          title: "Gym Equipment Maintenance",
          description: "Treadmill making grinding noise, needs inspection.",
          category: "Mechanical",
          priority: "Low",
          status: "Dismissed",
          requestedBy: "Kevin Rodriguez",
          createdAt: "02/08/2026 12:00:00",
          updatedAt: "02/09/2026 14:15:00",
          location: "Gym, Building D",
          images: ["https://picsum.photos/seed/treadmill/400/300.jpg"],
        },
        {
          id: "REQ-020",
          title: "Handicap Access Ramp",
          description:
            "Ramp needs repair for wheelchair accessibility compliance.",
          category: "Structural",
          priority: "High",
          status: "Pending",
          requestedBy: "Ashley Martinez",
          createdAt: "02/10/2026 11:45:00",
          updatedAt: "02/10/2026 11:45:00",
          location: "Main Entrance, Building A",
          images: [
            "https://picsum.photos/seed/access-ramp/400/300.jpg",
            "https://picsum.photos/seed/ramp-repair/400/300.jpg",
          ],
        },
      ];

      setRecentRequests(mockRequests); // Show all 20 requests
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");

      // Keep default data on error
      setStats(defaultStats);
      setRecentRequests([]);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // All tabs now stay on the same dashboard page
  };

  const handleRequestClick = (requestId: string) => {
    router.push(`/admin/requests/${requestId.replace("REQ-", "")}`);
  };

  const handleViewAllRequests = () => {
    router.push("/admin/requests");
  };

  // Helper functions for reports
  const getWeekRange = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
  };

  const getMonthRange = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return `${startOfMonth.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - ${endOfMonth.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  const handleDownloadReport = (report: any) => {
    // Simulate report download
    console.log(`Downloading ${report.title} (${report.type})`);
    // In a real implementation, this would trigger file download
    alert(`Downloading ${report.title} (${report.type}) - ${report.size}`);
  };

  const handleGenerateCustomReport = (type: string) => {
    // Simulate custom report generation
    console.log(`Generating ${type} custom report`);
    // In a real implementation, this would trigger report generation
    alert(
      `Generating custom ${type} report... This feature will be available soon!`,
    );
  };

  // Request management functions
  const handleViewImages = (
    request: MaintenanceRequest,
    imageIndex: number = 0,
  ) => {
    setSelectedRequest(request);
    setSelectedImageIndex(imageIndex);
    setShowImageViewer(true);
  };

  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
    setSelectedRequest(null);
    setSelectedImageIndex(0);
  };

  const handleStatusChange = (requestId: string, newStatus: string) => {
    setRecentRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: newStatus,
              updatedAt: new Date()
                .toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
                .replace(",", ""),
            }
          : req,
      ),
    );
    setEditingStatus(null);
  };

  const handlePreviousImage = () => {
    if (selectedRequest && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (
      selectedRequest &&
      selectedImageIndex < selectedRequest.images.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  // Generate analytics from mock requests
  const generateAnalyticsFromRequests = (requests: MaintenanceRequest[]) => {
    // Monthly trends - extract from request dates and generate realistic data
    const monthlyData = [
      { month: "Jan", count: Math.floor(Math.random() * 20) + 30 },
      { month: "Feb", count: requests.length }, // Current month from actual data
      { month: "Mar", count: Math.floor(Math.random() * 20) + 25 },
      { month: "Apr", count: Math.floor(Math.random() * 20) + 35 },
    ];

    // Calculate actual metrics from requests
    const completedRequests = requests.filter(
      (r) => r.status === "Completed",
    ).length;
    const totalRequests = requests.length;
    const completionRate =
      totalRequests > 0
        ? Math.round((completedRequests / totalRequests) * 100)
        : 0;

    // Calculate priority distribution
    const priorityDistribution = {
      Critical: requests.filter((r) => r.priority === "Critical").length,
      High: requests.filter((r) => r.priority === "High").length,
      Medium: requests.filter((r) => r.priority === "Medium").length,
      Low: requests.filter((r) => r.priority === "Low").length,
    };

    // Calculate category distribution
    const categoryDistribution = requests.reduce(
      (acc, request) => {
        acc[request.category] = (acc[request.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate status distribution
    const statusDistribution = {
      Pending: requests.filter((r) => r.status === "Pending").length,
      "In Progress": requests.filter((r) => r.status === "In Progress").length,
      Completed: requests.filter((r) => r.status === "Completed").length,
      Dismissed: requests.filter((r) => r.status === "Dismissed").length,
    };

    // Performance metrics (simulated but based on actual data)
    const avgResponseTime = (Math.random() * 2 + 1).toFixed(1) + " hrs";
    const satisfactionScore = (Math.random() * 0.5 + 4.3).toFixed(1) + "/5";

    return {
      monthlyData,
      completionRate,
      avgResponseTime,
      satisfactionScore,
      priorityDistribution,
      categoryDistribution,
      statusDistribution,
      totalRequests,
      completedRequests,
    };
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "online":
        return "text-lime-400";
      case "in progress":
      case "processing":
        return "text-cyan-400";
      case "pending":
        return "text-amber-400";
      case "stable":
        return "text-teal-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "text-purple-400";
      case "high":
        return "text-red-400";
      case "medium":
        return "text-amber-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  if (!mounted) {
    return (
      <AuthGuard requiredRole="ADMIN">
        <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="min-h-screen bg-[#0B0E11] relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <g fill="none" fillRule="evenodd">
              <g stroke="#14b8a6" strokeWidth="0.5" opacity="0.3">
                <path d="M0 0h40v40H0z M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" />
              </g>
            </g>
          </svg>
        </div>

        {/* Teal Mesh Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 blur-3xl"></div>

        {/* Main Header */}
        {/* Unified Header with Connected Navigation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        >
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between h-14 md:h-16 w-full">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg md:text-xl font-bold text-gray-100">
                    IVF Admin
                  </h1>
                  <p className="text-xs text-gray-400">Control Panel</p>
                </div>
              </motion.div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4 ml-auto">
                {/* Settings Button - Standalone */}
                <motion.button
                  onClick={() => router.push("/admin/settings")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
                  title="Settings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </motion.button>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <BackButton fallback="/" />
                  <AccountDropdown />
                </div>
              </div>
            </div>
          </div>
          {/* Connected Tab Navigation */}
          <div className="border-t border-white/5 bg-black/10 backdrop-blur-lg">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="flex items-center gap-2 md:gap-4 py-4 w-full">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "requests", label: "Maintenance" },
                  { id: "analytics", label: "Analytics" },
                  { id: "users", label: "Users" },
                  { id: "reports", label: "Reports" },
                ].map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    onClick={() => handleTabClick(item.id)}
                    className={`relative px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-teal-500/10 border border-teal-500/30"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Floating Refresh Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            onClick={fetchDashboardData}
            disabled={loading}
            className="group relative p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Refresh dashboard"
          >
            {/* Button Icon */}
            <motion.div
              animate={{ rotate: loading ? 360 : 0 }}
              transition={{
                duration: loading ? 1 : 0,
                repeat: loading ? Infinity : 0,
              }}
              className="flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl"
              >
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </motion.div>
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <main className="pt-40 md:pt-44 px-4 sm:px-6 lg:px-8 xl:px-12 pb-12">
          <div className="w-full max-w-screen-2xl mx-auto">
            {/* Content Container with stable layout */}
            <div className="min-h-[600px] relative w-full">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6 md:space-y-8"
                >
                  {/* Last Updated Indicator */}
                  {lastUpdated && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      className="flex items-center justify-end text-xs text-gray-500"
                    >
                      <span>
                        Last updated: {lastUpdated.toLocaleTimeString()}
                      </span>
                      <span className="mx-2">•</span>
                      <span>Auto-refresh every 30s</span>
                    </motion.div>
                  )}

                  {/* Enhanced Bento Grid - Stats Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.05 * i,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="group relative"
                        whileHover={{ y: -2 }}
                      >
                        {/* Enhanced hover effect with proper text color change */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("orange") ? "#ea580c" : "#059669"})`,
                          }}
                        />

                        {/* Premium Glassmorphic Card */}
                        <div
                          className="relative bg-gray-800/50 border border-gray-700 rounded-lg p-4 transition-all duration-300 overflow-hidden group-hover:bg-gray-800/70"
                          style={{
                            background: "rgba(255, 255, 255, 0.03) !important",
                            backdropFilter: "blur(25px) !important",
                            border:
                              "1px solid rgba(255, 255, 255, 0.1) !important",
                            boxShadow:
                              "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                          }}
                        >
                          {/* Dynamic border overlay for hover effect */}
                          <div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              border: `2px solid ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}`,
                              boxShadow: `0 0 20px ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}40`,
                            }}
                          />
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div
                                className="p-2 rounded-lg bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-all duration-300"
                                style={{
                                  background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("orange") ? "#ea580c" : "#059669"})`,
                                }}
                              >
                                <div className="text-lg font-bold text-white transition-colors duration-300">
                                  {stat.icon}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span
                                  className={`text-xs font-mono px-2 py-1 rounded-full transition-colors duration-300 ${stat.trend.startsWith("+") ? "bg-lime-500/20 text-lime-400 border border-lime-500/30 group-hover:bg-lime-500/30 group-hover:text-lime-300" : "bg-red-500/20 text-red-400 border border-red-500/30 group-hover:bg-red-500/30 group-hover:text-red-300"}`}
                                >
                                  {loading ? "..." : stat.trend}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <h3 className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-white">
                                  {stat.label}
                                </h3>
                                <div className="flex items-baseline gap-2">
                                  <motion.div
                                    className="text-2xl font-mono font-bold transition-colors duration-300 group-hover:text-white"
                                    style={{
                                      background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("orange") ? "#ea580c" : "#059669"})`,
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      backgroundClip: "text",
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                  >
                                    {loading ? "..." : stat.value}
                                  </motion.div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${getStatusColor(stat.status)} ${!loading && "animate-pulse"}`}
                                />
                                <span
                                  className={`text-xs font-mono transition-colors duration-300 group-hover:text-white ${getStatusColor(stat.status)}`}
                                >
                                  {stat.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Bento Grid - Recent Requests */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.03) !important",
                      backdropFilter: "blur(25px) !important",
                      border: "1px solid rgba(255, 255, 255, 0.1) !important",
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6 md:mb-8">
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-2">
                            Recent Requests Today
                          </h2>
                          <p className="text-gray-400 text-sm">
                            Latest maintenance requests and updates
                          </p>
                        </div>
                        <motion.button
                          onClick={handleViewAllRequests}
                          className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-400 hover:text-teal-300 hover:bg-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="flex items-center gap-2">
                            View All
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                        </motion.button>
                      </div>

                      {loading ? (
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4"
                            >
                              <div className="animate-pulse">
                                <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
                                <div className="h-3 bg-gray-600 rounded w-3/4 mb-1"></div>
                                <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : recentRequests.length > 0 ? (
                        <div className="space-y-3">
                          {recentRequests.map((request, i) => (
                            <motion.div
                              key={request.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.05 * i,
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                              className="group backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono text-teal-400">
                                      {request.id}
                                    </span>
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full font-mono ${getPriorityColor(request.priority)} bg-current/10`}
                                    >
                                      {request.priority}
                                    </span>

                                    {/* Status Edit Dropdown */}
                                    <div className="relative">
                                      {editingStatus === request.id ? (
                                        <select
                                          value={request.status}
                                          onChange={(e) =>
                                            handleStatusChange(
                                              request.id,
                                              e.target.value,
                                            )
                                          }
                                          onBlur={() => setEditingStatus(null)}
                                          className="text-xs px-2 py-1 rounded-full font-mono bg-gray-800/50 border border-gray-600/50 text-gray-300 focus:outline-none focus:border-teal-500/50"
                                          autoFocus
                                        >
                                          <option value="Pending">
                                            Pending
                                          </option>
                                          <option value="In Progress">
                                            In Progress
                                          </option>
                                          <option value="Completed">
                                            Completed
                                          </option>
                                          <option value="Dismissed">
                                            Dismissed
                                          </option>
                                        </select>
                                      ) : (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingStatus(request.id);
                                          }}
                                          className={`text-xs px-2 py-1 rounded-full font-mono ${getStatusColor(request.status)} bg-current/10 hover:bg-current/20 transition-colors duration-200`}
                                        >
                                          {request.status}
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <h3 className="text-gray-100 font-medium mb-1 truncate">
                                    {request.title}
                                  </h3>

                                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                                    <span className="font-mono">
                                      {request.category}
                                    </span>
                                    <span>•</span>
                                    <span>{request.requestedBy}</span>
                                    <span>•</span>
                                    <span className="font-mono">
                                      {request.createdAt}
                                    </span>
                                  </div>

                                  {/* Structured Location Information - Aligned with Paper Form */}
                                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                    <div className="flex items-center gap-1">
                                      <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                      <span>
                                        {request.building} -{" "}
                                        {request.roomNumber}
                                      </span>
                                    </div>
                                    {request.floor && (
                                      <>
                                        <span>•</span>
                                        <span>{request.floor}</span>
                                      </>
                                    )}
                                  </div>

                                  {/* Contact Information */}
                                  {(request.contactPhone ||
                                    request.department) && (
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                      {request.contactPhone && (
                                        <div className="flex items-center gap-1">
                                          <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
                                            />
                                          </svg>
                                          <span>{request.contactPhone}</span>
                                        </div>
                                      )}
                                      {request.department && (
                                        <>
                                          {request.contactPhone && (
                                            <span>•</span>
                                          )}
                                          <div className="flex items-center gap-1">
                                            <svg
                                              className="w-3 h-3"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                              />
                                            </svg>
                                            <span>{request.department}</span>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  )}

                                  {/* Images Display */}
                                  {request.images.length > 0 && (
                                    <div className="flex items-center gap-2">
                                      <div className="flex gap-1">
                                        {request.images
                                          .slice(0, 3)
                                          .map((image, index) => (
                                            <button
                                              key={index}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewImages(
                                                  request,
                                                  index,
                                                );
                                              }}
                                              className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 hover:border-teal-500/50 transition-colors duration-200"
                                            >
                                              <img
                                                src={image}
                                                alt={`Request image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                              />
                                              {index === 2 &&
                                                request.images.length > 3 && (
                                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">
                                                      +
                                                      {request.images.length -
                                                        3}
                                                    </span>
                                                  </div>
                                                )}
                                            </button>
                                          ))}
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleViewImages(request, 0);
                                        }}
                                        className="text-xs text-teal-400 hover:text-teal-300 transition-colors duration-200"
                                      >
                                        View All ({request.images.length})
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 ml-4">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRequestClick(request.id);
                                    }}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200"
                                    title="View Details"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center opacity-50">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-400">
                            No maintenance requests found
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Maintenance Tab Content */}
              {activeTab === "requests" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div
                    className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.03) !important",
                      backdropFilter: "blur(25px) !important",
                      border: "1px solid rgba(255, 255, 255, 0.1) !important",
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6 md:mb-8">
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-2">
                            All Maintenance Requests
                          </h2>
                          <p className="text-gray-400 text-sm">
                            Manage and track all maintenance requests across the
                            facility
                          </p>
                        </div>
                        <div className="text-sm text-gray-400">
                          <span className="font-mono text-teal-400">
                            {recentRequests.length}
                          </span>{" "}
                          total requests
                        </div>
                      </div>

                      {/* Requests Grid - Horizontal Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {recentRequests.map((request, i) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.05 * i,
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="group backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-teal-500/30"
                          >
                            {/* Header with ID and Priority */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono text-teal-400 font-bold">
                                {request.id}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-mono ${getPriorityColor(request.priority)} bg-current/10`}
                              >
                                {request.priority}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-gray-100 font-semibold text-sm mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                              {request.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                              {request.description}
                            </p>

                            {/* Meta Information */}
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                  />
                                </svg>
                                <span className="font-mono truncate">
                                  {request.category}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span className="truncate">
                                  {request.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                <span className="truncate">
                                  {request.requestedBy}
                                </span>
                              </div>
                            </div>

                            {/* Status and Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                              {/* Status Edit Dropdown */}
                              <div className="relative">
                                {editingStatus === request.id ? (
                                  <select
                                    value={request.status}
                                    onChange={(e) =>
                                      handleStatusChange(
                                        request.id,
                                        e.target.value,
                                      )
                                    }
                                    onBlur={() => setEditingStatus(null)}
                                    className="text-xs px-2 py-1 rounded-full font-mono bg-gray-800/50 border border-gray-600/50 text-gray-300 focus:outline-none focus:border-teal-500/50"
                                    autoFocus
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                    <option value="Completed">Completed</option>
                                    <option value="Dismissed">Dismissed</option>
                                  </select>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingStatus(request.id);
                                    }}
                                    className={`text-xs px-2 py-1 rounded-full font-mono ${getStatusColor(request.status)} bg-current/10 hover:bg-current/20 transition-colors duration-200`}
                                  >
                                    {request.status}
                                  </button>
                                )}
                              </div>

                              {/* Action Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRequestClick(request.id);
                                }}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                                title="View Details"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Images Preview */}
                            {request.images.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <div className="flex items-center gap-1">
                                  {request.images
                                    .slice(0, 3)
                                    .map((image, index) => (
                                      <button
                                        key={index}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleViewImages(request, index);
                                        }}
                                        className="relative w-8 h-8 rounded overflow-hidden border border-white/10 hover:border-teal-500/50 transition-colors duration-200"
                                      >
                                        <img
                                          src={image}
                                          alt={`Request image ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                        {index === 2 &&
                                          request.images.length > 3 && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                              <span className="text-white text-xs font-bold">
                                                +{request.images.length - 3}
                                              </span>
                                            </div>
                                          )}
                                      </button>
                                    ))}
                                  {request.images.length > 3 && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewImages(request, 0);
                                      }}
                                      className="text-xs text-teal-400 hover:text-teal-300 transition-colors duration-200 ml-1"
                                    >
                                      View All
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {recentRequests.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center opacity-50">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-100 mb-2">
                            No Maintenance Requests
                          </h3>
                          <p className="text-gray-400">
                            All maintenance requests are currently resolved or
                            none have been submitted.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Analytics Tab Content */}
              {activeTab === "analytics" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-sans text-gray-100 leading-tight mb-8"
                    style={{
                      fontWeight: "800 !important",
                      letterSpacing: "-0.05em !important",
                    }}
                  >
                    Analytics &<span className="text-teal-400"> Insights</span>
                  </motion.h2>

                  {/* Generate analytics from actual requests */}
                  {(() => {
                    const analytics =
                      generateAnalyticsFromRequests(recentRequests);
                    const maxMonthlyCount = Math.max(
                      ...analytics.monthlyData.map((d) => d.count),
                    );

                    return (
                      <div className="space-y-4">
                        {/* Key Metrics Row - Compact */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            {
                              label: "Total",
                              value: analytics.totalRequests.toString(),
                              color: "text-blue-400",
                            },
                            {
                              label: "Complete",
                              value: `${analytics.completionRate}%`,
                              color: "text-green-400",
                            },
                            {
                              label: "Active",
                              value: (
                                analytics.statusDistribution["Pending"] +
                                analytics.statusDistribution["In Progress"]
                              ).toString(),
                              color: "text-amber-400",
                            },
                            {
                              label: "Response",
                              value: analytics.avgResponseTime,
                              color: "text-purple-400",
                            },
                          ].map((metric, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 * i }}
                              className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center"
                            >
                              <div
                                className={`text-lg font-bold ${metric.color}`}
                              >
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-400">
                                {metric.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Charts Row - Compact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Request Trends */}
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                              Monthly Trends
                            </h3>
                            <div className="space-y-2">
                              {analytics.monthlyData.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-xs text-gray-400 w-8">
                                    {item.month}
                                  </span>
                                  <div className="flex-1 mx-2 bg-gray-700 rounded-full h-2">
                                    <motion.div
                                      className="bg-teal-500 h-2 rounded-full"
                                      style={{
                                        width: `${(item.count / maxMonthlyCount) * 100}%`,
                                      }}
                                      initial={{ width: 0 }}
                                      animate={{
                                        width: `${(item.count / maxMonthlyCount) * 100}%`,
                                      }}
                                      transition={{ delay: 0.1 * i }}
                                    />
                                  </div>
                                  <span className="text-xs font-mono text-gray-300 w-6 text-right">
                                    {item.count}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Priority Distribution */}
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                              Priority Breakdown
                            </h3>
                            <div className="space-y-2">
                              {Object.entries(
                                analytics.priorityDistribution,
                              ).map(([priority, count], i) => (
                                <div
                                  key={priority}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        priority === "Critical"
                                          ? "bg-red-500"
                                          : priority === "High"
                                            ? "bg-amber-500"
                                            : priority === "Medium"
                                              ? "bg-yellow-500"
                                              : "bg-green-500"
                                      }`}
                                    />
                                    <span className="text-xs text-gray-400">
                                      {priority}
                                    </span>
                                  </div>
                                  <span className="text-xs font-mono text-gray-300">
                                    {count}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row - Status & Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Status Overview */}
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                              Status Overview
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(analytics.statusDistribution).map(
                                ([status, count], i) => (
                                  <div
                                    key={status}
                                    className="text-center p-2 bg-gray-700/50 rounded"
                                  >
                                    <div
                                      className={`text-sm font-bold ${
                                        status === "Completed"
                                          ? "text-green-400"
                                          : status === "In Progress"
                                            ? "text-blue-400"
                                            : status === "Pending"
                                              ? "text-amber-400"
                                              : "text-gray-400"
                                      }`}
                                    >
                                      {count}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {status}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Category Distribution */}
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                              Top Categories
                            </h3>
                            <div className="space-y-1">
                              {Object.entries(analytics.categoryDistribution)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 4)
                                .map(([category, count], i) => (
                                  <div
                                    key={category}
                                    className="flex justify-between"
                                  >
                                    <span className="text-xs text-gray-400 truncate">
                                      {category}
                                    </span>
                                    <span className="text-xs font-mono text-gray-300">
                                      {count}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {/* Users Tab Content */}
              {activeTab === "users" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">
                      User Management
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="pb-4 text-gray-400 font-medium">
                              User
                            </th>
                            <th className="pb-4 text-gray-400 font-medium">
                              Role
                            </th>
                            <th className="pb-4 text-gray-400 font-medium">
                              Status
                            </th>
                            <th className="pb-4 text-gray-400 font-medium">
                              Requests
                            </th>
                            <th className="pb-4 text-gray-400 font-medium">
                              Last Active
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {(() => {
                            // Extract all unique users from maintenance requests
                            const uniqueUsers = Array.from(
                              new Set(recentRequests.map((r) => r.requestedBy)),
                            ).map((userName) => {
                              const userRequests = recentRequests.filter(
                                (r) => r.requestedBy === userName,
                              );
                              const requestCount = userRequests.length;
                              const lastRequest = userRequests.sort(
                                (a, b) =>
                                  new Date(b.updatedAt).getTime() -
                                  new Date(a.updatedAt).getTime(),
                              )[0];

                              // Determine role based on name patterns
                              let role = "Student";
                              if (
                                userName.includes("Admin") ||
                                userName === "John Smith"
                              ) {
                                role = "Admin";
                              } else if (
                                userName.includes("Staff") ||
                                userName.includes("Garcia") ||
                                userName.includes("Martinez") ||
                                userName.includes("Anderson") ||
                                userName.includes("Taylor") ||
                                userName.includes("Lee") ||
                                userName.includes("White") ||
                                userName.includes("Harris")
                              ) {
                                role = "Staff";
                              }

                              return {
                                name: userName,
                                email:
                                  userName.toLowerCase().replace(" ", ".") +
                                  "@ivf.edu",
                                role: role,
                                status: "Active",
                                requests: requestCount,
                                lastActive: lastRequest
                                  ? Math.floor(
                                      (Date.now() -
                                        new Date(
                                          lastRequest.updatedAt,
                                        ).getTime()) /
                                        (1000 * 60 * 60),
                                    ) <= 24
                                    ? `${Math.floor((Date.now() - new Date(lastRequest.updatedAt).getTime()) / (1000 * 60 * 60))} hours ago`
                                    : `${Math.floor((Date.now() - new Date(lastRequest.updatedAt).getTime()) / (1000 * 60 * 60 * 24))} days ago`
                                  : "Unknown",
                              };
                            });

                            return uniqueUsers.map((user, i) => (
                              <tr
                                key={i}
                                className="hover:bg-white/5 transition-colors"
                              >
                                <td className="py-4">
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                      delay: 0.1 * i,
                                      duration: 0.3,
                                    }}
                                  >
                                    <div>
                                      <p className="text-gray-100 font-medium">
                                        {user.name}
                                      </p>
                                      <p className="text-gray-400 text-sm">
                                        {user.email}
                                      </p>
                                    </div>
                                  </motion.div>
                                </td>
                                <td className="py-4">
                                  <span
                                    className={`text-sm px-2 py-1 rounded-full font-mono ${
                                      user.role === "Admin"
                                        ? "bg-purple-500/20 text-purple-400"
                                        : user.role === "Staff"
                                          ? "bg-blue-500/20 text-blue-400"
                                          : "bg-gray-500/20 text-gray-400"
                                    }`}
                                  >
                                    {user.role}
                                  </span>
                                </td>
                                <td className="py-4">
                                  <span
                                    className={`text-sm ${
                                      user.status === "Active"
                                        ? "text-lime-400"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {user.status}
                                  </span>
                                </td>
                                <td className="py-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono text-gray-300">
                                      {user.requests}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      requests
                                    </span>
                                  </div>
                                </td>
                                <td className="py-4 text-gray-400 text-sm">
                                  {user.lastActive}
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Reports Tab Content - Aligned with Physical Plant Maintenance */}
              {activeTab === "reports" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {/* Physical Plant Maintenance Reports */}
                  <div className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">
                      Physical Plant Maintenance Reports
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">
                      Comprehensive maintenance reports and documentation for
                      facility management
                    </p>

                    {/* Report Categories */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Daily Reports */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-teal-400 mb-3">
                          📊 Daily Reports
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Daily Work Order Summary",
                              description:
                                "Summary of all maintenance work orders completed today",
                              date: new Date().toLocaleDateString(),
                              type: "PDF",
                              size: "1.2 MB",
                              icon: "📋",
                              status: "ready",
                              priority: "high",
                            },
                            {
                              title: "Emergency Response Log",
                              description:
                                "Log of all urgent maintenance requests and response times",
                              date: new Date().toLocaleDateString(),
                              type: "PDF",
                              size: "856 KB",
                              icon: "🚨",
                              status: "ready",
                              priority: "high",
                            },
                            {
                              title: "Staff Attendance Report",
                              description:
                                "Daily attendance and work hours of maintenance staff",
                              date: new Date().toLocaleDateString(),
                              type: "Excel",
                              size: "445 KB",
                              icon: "👥",
                              status: "ready",
                              priority: "medium",
                            },
                          ].map((report, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.05 * i,
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                              className="backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                              onClick={() => handleDownloadReport(report)}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                  <span className="text-lg">{report.icon}</span>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <span className="text-xs font-mono text-gray-400">
                                    {report.type}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full font-mono ${
                                      report.priority === "high"
                                        ? "bg-red-500/20 text-red-400"
                                        : report.priority === "medium"
                                          ? "bg-amber-500/20 text-amber-400"
                                          : "bg-green-500/20 text-green-400"
                                    }`}
                                  >
                                    {report.status}
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-gray-100 font-medium mb-2">
                                {report.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-3">
                                {report.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{report.date}</span>
                                <span>{report.size}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Weekly Reports */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-purple-400 mb-3">
                          📈 Weekly Reports
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Weekly Maintenance Summary",
                              description:
                                "Comprehensive weekly overview of all maintenance activities",
                              date: getWeekRange(),
                              type: "PDF",
                              size: "3.8 MB",
                              icon: "📊",
                              status: "ready",
                              priority: "high",
                            },
                            {
                              title: "Budget Utilization Report",
                              description:
                                "Weekly budget spending and cost analysis",
                              date: getWeekRange(),
                              type: "Excel",
                              size: "1.2 MB",
                              icon: "💰",
                              status: "ready",
                              priority: "high",
                            },
                            {
                              title: "Preventive Maintenance Schedule",
                              description:
                                "Upcoming preventive maintenance tasks and inspections",
                              date: getWeekRange(),
                              type: "PDF",
                              size: "2.1 MB",
                              icon: "🔧",
                              status: "ready",
                              priority: "medium",
                            },
                          ].map((report, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.05 * i,
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                              className="backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                              onClick={() => handleDownloadReport(report)}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                  <span className="text-lg">{report.icon}</span>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <span className="text-xs font-mono text-gray-400">
                                    {report.type}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full font-mono ${
                                      report.priority === "high"
                                        ? "bg-red-500/20 text-red-400"
                                        : report.priority === "medium"
                                          ? "bg-amber-500/20 text-amber-400"
                                          : "bg-green-500/20 text-green-400"
                                    }`}
                                  >
                                    {report.status}
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-gray-100 font-medium mb-2">
                                {report.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-3">
                                {report.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{report.date}</span>
                                <span>{report.size}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Monthly Reports */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-green-400 mb-3">
                          📅 Monthly Reports
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Monthly Performance Analysis",
                              description:
                                "Detailed analysis of maintenance team performance and KPIs",
                              date: getMonthRange(),
                              type: "PDF",
                              size: "5.2 MB",
                              icon: "📈",
                              status: "ready",
                              priority: "high",
                            },
                            {
                              title: "Inventory & Supplies Report",
                              description:
                                "Monthly inventory status and supplies consumption report",
                              date: getMonthRange(),
                              type: "Excel",
                              size: "2.8 MB",
                              icon: "📦",
                              status: "ready",
                              priority: "medium",
                            },
                            {
                              title: "Vendor Performance Report",
                              description:
                                "Monthly evaluation of external vendors and contractors",
                              date: getMonthRange(),
                              type: "PDF",
                              size: "1.9 MB",
                              icon: "🤝",
                              status: "ready",
                              priority: "low",
                            },
                            {
                              title: "Compliance & Safety Report",
                              description:
                                "Monthly safety inspections and compliance documentation",
                              date: getMonthRange(),
                              type: "PDF",
                              size: "3.1 MB",
                              icon: "🛡️",
                              status: "ready",
                              priority: "high",
                            },
                          ].map((report, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.05 * i,
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                              className="backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                              onClick={() => handleDownloadReport(report)}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-green-500/10">
                                  <span className="text-lg">{report.icon}</span>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <span className="text-xs font-mono text-gray-400">
                                    {report.type}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full font-mono ${
                                      report.priority === "high"
                                        ? "bg-red-500/20 text-red-400"
                                        : report.priority === "medium"
                                          ? "bg-amber-500/20 text-amber-400"
                                          : "bg-green-500/20 text-green-400"
                                    }`}
                                  >
                                    {report.status}
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-gray-100 font-medium mb-2">
                                {report.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-3">
                                {report.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{report.date}</span>
                                <span>{report.size}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => handleGenerateCustomReport("daily")}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-lg bg-blue-500/10">
                            <svg
                              className="w-5 h-5 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m-3.013-3.013l-2.933 2.933m0 5.866V6a2 2 0 002 2H5a2 2 0 002-2V6a2 2 0 012-2h3.28a1 1 0 011 .948.684l1.498 4.493a1 1 0 00-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 00.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-100 font-medium">
                            Generate Daily Report
                          </span>
                          <span className="text-xs text-gray-400">
                            Custom daily summary
                          </span>
                        </div>
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => handleGenerateCustomReport("weekly")}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-lg bg-purple-500/10">
                            <svg
                              className="w-5 h-5 text-purple-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2v6m-6 0V9a2 2 0 012 2h2a2 2 0 012-2V9a2 2 0 00-2-2H9a2 2 0 00-2-2V9z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-100 font-medium">
                            Generate Weekly Report
                          </span>
                          <span className="text-xs text-gray-400">
                            Custom weekly analysis
                          </span>
                        </div>
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => handleGenerateCustomReport("monthly")}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-lg bg-green-500/10">
                            <svg
                              className="w-5 h-5 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17v-2m3 2v-6m0 0V9m0 6h6m-6-2v6m6 6v-6m0 0h6m-6-6h6"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-100 font-medium">
                            Generate Monthly Report
                          </span>
                          <span className="text-xs text-gray-400">
                            Comprehensive monthly data
                          </span>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>

        {/* Image Viewer Modal */}
        <AnimatePresence>
          {showImageViewer && selectedRequest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={handleCloseImageViewer}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="relative max-w-6xl max-h-[90vh] w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <h3 className="text-lg font-bold">
                        {selectedRequest.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {selectedRequest.id} • {selectedRequest.location}
                      </p>
                    </div>
                    <button
                      onClick={handleCloseImageViewer}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <img
                    src={selectedRequest.images[selectedImageIndex]}
                    alt={`${selectedRequest.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />

                  {/* Navigation Arrows */}
                  {selectedRequest.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePreviousImage}
                        disabled={selectedImageIndex === 0}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        disabled={
                          selectedImageIndex ===
                          selectedRequest.images.length - 1
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="text-sm">
                      <span className="font-medium">
                        {selectedImageIndex + 1}
                      </span>
                      <span className="text-gray-300">
                        {" "}
                        / {selectedRequest.images.length}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {selectedRequest.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === selectedImageIndex
                              ? "bg-white w-8"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  );
}
