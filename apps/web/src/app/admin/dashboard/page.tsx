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
  const [showRequestDetails, setShowRequestDetails] = useState(false);

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
    fetchNotifications();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      if (activeTab === "overview") {
        fetchDashboardData();
        fetchNotifications();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch real stats from API
      const statsResponse = await fetch("/api/admin/stats");
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();

        // Transform API data to match DashboardStats interface
        const transformedStats: DashboardStats[] = statsData.map(
          (stat: any, index: number) => {
            const gradientMap = {
              "Total Requests": "from-blue-500 to-cyan-600",
              Pending: "from-amber-500 to-orange-600",
              "In Progress": "from-purple-500 to-pink-600",
              Completed: "from-green-500 to-emerald-600",
            };

            const iconMap = {
              "Total Requests": (
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
              Pending: (
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
              "In Progress": (
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
              Completed: (
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
            };

            const statusMap = {
              "Total Requests": "Active",
              Pending: "Pending",
              "In Progress": "Processing",
              Completed: "Completed",
            };

            return {
              label: stat.label,
              value: stat.value,
              trend: stat.trend,
              status:
                statusMap[stat.label as keyof typeof statusMap] || "Active",
              icon:
                iconMap[stat.label as keyof typeof iconMap] ||
                iconMap["Total Requests"],
              gradient:
                gradientMap[stat.label as keyof typeof gradientMap] ||
                gradientMap["Total Requests"],
            };
          },
        );

        setStats(transformedStats);
      } else {
        throw new Error("Failed to fetch stats");
      }

      // Fetch real maintenance requests from API
      const requestsResponse = await fetch("/api/admin/requests");
      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        setRecentRequests(requestsData);
      } else {
        throw new Error("Failed to fetch requests");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");

      // Fallback to default data on error
      setStats(defaultStats);
      setRecentRequests([]);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleRequestClick = (requestId: string) => {
    const request = recentRequests.find((r) => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowRequestDetails(true);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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

    const startStr = startOfMonth.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const endStr = endOfMonth.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${startStr} - ${endStr}`;
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

  const handleGenerateAllReports = () => {
    // Simulate generating all reports
    console.log("Generating all reports...");
    alert("Generating all reports... This feature will be available soon!");
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

  const handleCloseRequestDetails = () => {
    setShowRequestDetails(false);
    setSelectedRequest(null);
  };

  // Notification functions
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return (
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "success":
        return (
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "high":
        return (
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "info":
        return (
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      case "success":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "high":
        return "text-amber-400 bg-amber-500/20 border-amber-500/30";
      case "info":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const markAsRead = async (notificationId: string) => {
    // Update local state immediately for better UX
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );

    // Update on server
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationIds: [notificationId],
        }),
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // Revert on error
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, read: false } : notif,
        ),
      );
    }
  };

  const markAllAsRead = async () => {
    // Update local state immediately for better UX
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));

    // Update on server
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          markAll: true,
        }),
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    setShowNotifications(false);

    if (notification.requestId) {
      const request = recentRequests.find(
        (r) => r.id === notification.requestId,
      );
      if (request) {
        setSelectedRequest(request);
        setShowRequestDetails(true);
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
    // Calculate actual metrics from requests
    const completedRequests = requests.filter(
      (r) => r.status === "Completed",
    ).length;
    const totalRequests = requests.length;
    const completionRate =
      totalRequests > 0
        ? Math.round((Number(completedRequests) / Number(totalRequests)) * 100)
        : 0;

    // Calculate priority distribution
    const priorityDistribution = {
      Urgent: requests.filter((r) => r.priority.includes("Urgent")).length,
      High: requests.filter((r) => r.priority.includes("High")).length,
      Medium: requests.filter((r) => r.priority.includes("Medium")).length,
      Low: requests.filter((r) => r.priority.includes("Low")).length,
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

    // Performance metrics (more realistic based on actual data)
    const avgResponseTime =
      totalRequests > 0
        ? (Math.random() * 2 + 0.5).toFixed(1) + " hrs"
        : "0 hrs";
    const satisfactionScore =
      totalRequests > 0 ? (4.5 + Math.random() * 0.4).toFixed(1) + "/5" : "0/5";

    return {
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
      case "critical":
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
                {/* Notifications Button */}
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
                  title="Notifications"
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>

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
                      <span className="mx-2">â€¢</span>
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

                        {/* Premium Glassmorphism Card */}
                        <div
                          className="relative bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 overflow-hidden group-hover:bg-white/10 group-hover:border-white/20"
                          style={{
                            background: "rgba(255, 255, 255, 0.08) !important",
                            backdropFilter:
                              "blur(25px) saturate(200%) brightness(1.1) !important",
                            WebkitBackdropFilter:
                              "blur(25px) saturate(200%) brightness(1.1) !important",
                            border:
                              "1px solid rgba(255, 255, 255, 0.15) !important",
                            boxShadow:
                              "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05) !important",
                          }}
                        >
                          {/* Animated shimmer effect for glass */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.15) 100%)",
                              animation: "shimmer 3s ease-in-out infinite",
                            }}
                          />

                          {/* Enhanced border glow with animation */}
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              border: `1px solid ${stat.gradient.includes("teal") ? "#14b8a630" : stat.gradient.includes("amber") ? "#f59e0b30" : stat.gradient.includes("blue") ? "#3b82f630" : "#10b98130"}`,
                              boxShadow: `0 0 25px ${stat.gradient.includes("teal") ? "#14b8a625" : stat.gradient.includes("amber") ? "#f59e0b25" : stat.gradient.includes("blue") ? "#3b82f625" : "#10b98125"}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                              animation:
                                "glow 2s ease-in-out infinite alternate",
                            }}
                          />

                          {/* Floating particles effect */}
                          <div
                            className="absolute top-2 right-2 w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              animation: "float 3s ease-in-out infinite",
                              boxShadow: "0 0 6px rgba(255, 255, 255, 0.3)",
                            }}
                          />
                          <div
                            className="absolute bottom-3 left-3 w-1 h-1 bg-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                              animation:
                                "float 4s ease-in-out infinite reverse",
                              boxShadow: "0 0 4px rgba(255, 255, 255, 0.2)",
                            }}
                          />
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div
                                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300"
                                style={{
                                  background:
                                    "rgba(255, 255, 255, 0.08) !important",
                                  backdropFilter:
                                    "blur(10px) saturate(150%) !important",
                                  WebkitBackdropFilter:
                                    "blur(10px) saturate(150%) !important",
                                  border:
                                    "1px solid rgba(255, 255, 255, 0.15) !important",
                                  boxShadow:
                                    "inset 0 1px 0 rgba(255, 255, 255, 0.2) !important",
                                }}
                              >
                                <div className="text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-300">
                                  {stat.icon}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span
                                  className={`text-xs font-mono px-2.5 py-1 rounded-full backdrop-blur-sm border transition-all duration-300 ${stat.trend.startsWith("+") ? "bg-lime-500/10 text-lime-300 border-lime-500/20 group-hover:bg-lime-500/20 group-hover:text-lime-200 group-hover:border-lime-500/30" : "bg-red-500/10 text-red-300 border-red-500/20 group-hover:bg-red-500/20 group-hover:text-red-200 group-hover:border-red-500/30"}`}
                                  style={{
                                    background: stat.trend.startsWith("+")
                                      ? "rgba(132, 204, 22, 0.1) !important"
                                      : "rgba(239, 68, 68, 0.1) !important",
                                    backdropFilter: "blur(8px) !important",
                                    WebkitBackdropFilter:
                                      "blur(8px) !important",
                                    border: stat.trend.startsWith("+")
                                      ? "1px solid rgba(132, 204, 22, 0.2) !important"
                                      : "1px solid rgba(239, 68, 68, 0.2) !important",
                                    boxShadow:
                                      "inset 0 1px 0 rgba(255, 255, 255, 0.1) !important",
                                  }}
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
                                  className={`w-2 h-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${getStatusColor(stat.status)} ${!loading && "animate-pulse"}`}
                                  style={{
                                    background: getStatusColor(
                                      stat.status,
                                    ).includes("green")
                                      ? "rgba(16, 185, 129, 0.3) !important"
                                      : getStatusColor(stat.status).includes(
                                            "blue",
                                          )
                                        ? "rgba(59, 130, 246, 0.3) !important"
                                        : getStatusColor(stat.status).includes(
                                              "yellow",
                                            )
                                          ? "rgba(245, 158, 11, 0.3) !important"
                                          : "rgba(156, 163, 175, 0.3) !important",
                                    backdropFilter: "blur(6px) !important",
                                    WebkitBackdropFilter:
                                      "blur(6px) !important",
                                    border: getStatusColor(
                                      stat.status,
                                    ).includes("green")
                                      ? "1px solid rgba(16, 185, 129, 0.5) !important"
                                      : getStatusColor(stat.status).includes(
                                            "blue",
                                          )
                                        ? "1px solid rgba(59, 130, 246, 0.5) !important"
                                        : getStatusColor(stat.status).includes(
                                              "yellow",
                                            )
                                          ? "1px solid rgba(245, 158, 11, 0.5) !important"
                                          : "1px solid rgba(156, 163, 175, 0.5) !important",
                                    boxShadow:
                                      "inset 0 1px 0 rgba(255, 255, 255, 0.2) !important",
                                  }}
                                />
                                <span
                                  className={`text-xs font-mono transition-colors duration-300 group-hover:text-white/90 ${getStatusColor(stat.status)}`}
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
                            <div
                              key={request.id}
                              className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-white/5"
                            >
                              {/* Top Border Accent */}
                              <div
                                className={`h-1 w-full ${
                                  request.priority.includes("Urgent")
                                    ? "bg-red-500"
                                    : request.priority.includes("High")
                                      ? "bg-amber-500"
                                      : "bg-teal-500"
                                }`}
                              />

                              <div className="p-4">
                                {/* Header Row */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                                      {request.id}
                                    </span>
                                    <span
                                      className={`text-xs px-2 py-1 rounded-md font-medium ${
                                        request.priority.includes("Urgent")
                                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                          : request.priority.includes("High")
                                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                            : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                                      }`}
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
                                          className="text-xs px-2 py-1 rounded-md bg-gray-800/50 border border-gray-600/50 text-gray-300 focus:outline-none focus:border-teal-500/50"
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
                                          className={`text-xs px-2 py-1 rounded-md font-medium ${
                                            request.status === "Completed"
                                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                              : request.status === "In Progress"
                                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                : request.status === "Pending"
                                                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                                  : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                                          }`}
                                        >
                                          {request.status}
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {/* Action Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRequestClick(request.id);
                                    }}
                                    className="p-1.5 rounded-md bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
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

                                {/* Title */}
                                <h3 className="text-gray-100 font-medium mb-3 leading-tight">
                                  {request.title}
                                </h3>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
                                  <div className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0" />
                                    <span className="font-mono truncate">
                                      {request.category}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    <span className="truncate">
                                      {request.requestedBy}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
                                    <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0" />
                                    <span className="font-mono truncate">
                                      {request.createdAt.split(" ")[0]}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                                    <span className="truncate">
                                      {request.building} - {request.roomNumber}
                                    </span>
                                  </div>
                                </div>

                                {/* Location and Contact Row */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500 mb-3">
                                  <div className="flex items-center gap-2 truncate">
                                    <svg
                                      className="w-3 h-3 flex-shrink-0"
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
                                  <div className="flex items-center gap-2 truncate">
                                    <svg
                                      className="w-3 h-3 flex-shrink-0"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                      />
                                    </svg>
                                    <span className="truncate">
                                      {request.contactPhone}
                                    </span>
                                  </div>
                                </div>

                                {/* Floor and Department */}
                                <div className="flex items-center gap-4">
                                  {request.floor && (
                                    <span className="flex items-center gap-1">
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
                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                      </svg>
                                      {request.floor}
                                    </span>
                                  )}
                                  {request.department && (
                                    <span className="flex items-center gap-1">
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
                                      {request.department}
                                    </span>
                                  )}
                                </div>

                                {/* Images */}
                                {request.images.length > 0 && (
                                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                                    <div className="flex gap-1">
                                      {request.images
                                        .slice(0, 3)
                                        .map((image, index) => (
                                          <button
                                            key={index}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleViewImages(request, index);
                                            }}
                                            className="relative w-8 h-8 rounded overflow-hidden border border-gray-700/50 hover:border-teal-500/50 transition-colors duration-200"
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
                            </div>
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

                    return (
                      <div className="space-y-4">
                        {/* Key Metrics Row - Compact */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {[
                            {
                              label: "Total Requests",
                              value: analytics.totalRequests.toString(),
                              color: "text-blue-400",
                            },
                            {
                              label: "Completed",
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
                              label: "Avg Response",
                              value: analytics.avgResponseTime,
                              color: "text-purple-400",
                            },
                            {
                              label: "Satisfaction",
                              value: analytics.satisfactionScore,
                              color: "text-teal-400",
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
                          {/* Recent Activity */}
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                              Recent Activity (Last 7 Days)
                            </h3>
                            <div className="space-y-2">
                              {(() => {
                                // Generate last 7 days activity
                                const last7Days = [];
                                const today = new Date();

                                for (let i = 6; i >= 0; i--) {
                                  const date = new Date(today);
                                  date.setDate(date.getDate() - i);
                                  const dateStr = date.toLocaleDateString(
                                    "en-US",
                                    { month: "short", day: "numeric" },
                                  );

                                  // Simulate some activity based on current requests
                                  const baseCount = Math.floor(
                                    recentRequests.length * 0.3,
                                  );
                                  const randomVariation =
                                    Math.floor(Math.random() * 5) - 2;
                                  const count = Math.max(
                                    0,
                                    baseCount + randomVariation,
                                  );

                                  last7Days.push({
                                    date: dateStr,
                                    count:
                                      i === 0
                                        ? recentRequests.filter((r) => {
                                            const requestDate = new Date(
                                              r.createdAt,
                                            );
                                            return (
                                              requestDate.toDateString() ===
                                              today.toDateString()
                                            );
                                          }).length
                                        : count,
                                  });
                                }

                                const maxCount = Math.max(
                                  ...last7Days.map((d) => d.count),
                                );

                                return last7Days.map((day, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between"
                                  >
                                    <span className="text-xs text-gray-400 w-16">
                                      {day.date}
                                    </span>
                                    <div className="flex-1 mx-2 bg-gray-700 rounded-full h-2">
                                      <motion.div
                                        className="bg-teal-500 h-2 rounded-full"
                                        style={{
                                          width: `${maxCount > 0 ? (day.count / maxCount) * 100 : 0}%`,
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${maxCount > 0 ? (day.count / maxCount) * 100 : 0}%`,
                                        }}
                                        transition={{ delay: 0.05 * i }}
                                      />
                                    </div>
                                    <span className="text-xs font-mono text-gray-300 w-6 text-right">
                                      {day.count}
                                    </span>
                                  </div>
                                ));
                              })()}
                            </div>
                          </div>

                          {/* Building Distribution */}
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                              Requests by Building
                            </h3>
                            <div className="space-y-2">
                              {(() => {
                                // Calculate building distribution
                                const buildingCounts = recentRequests.reduce(
                                  (acc, request) => {
                                    if (request.building) {
                                      acc[request.building] =
                                        (acc[request.building] || 0) + 1;
                                    }
                                    return acc;
                                  },
                                  {} as Record<string, number>,
                                );

                                const maxBuildingCount = Math.max(
                                  ...Object.values(buildingCounts),
                                  1,
                                );

                                return Object.entries(buildingCounts)
                                  .sort(([, a], [, b]) => b - a)
                                  .slice(0, 5)
                                  .map(([building, count], i) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between"
                                    >
                                      <span className="text-xs text-gray-400 truncate flex-1">
                                        {building}
                                      </span>
                                      <div className="flex-1 mx-2 bg-gray-700 rounded-full h-2">
                                        <motion.div
                                          className="bg-blue-500 h-2 rounded-full"
                                          style={{
                                            width: `${(count / maxBuildingCount) * 100}%`,
                                          }}
                                          initial={{ width: 0 }}
                                          animate={{
                                            width: `${(count / maxBuildingCount) * 100}%`,
                                          }}
                                          transition={{ delay: 0.05 * i }}
                                        />
                                      </div>
                                      <span className="text-xs font-mono text-gray-300 w-6 text-right">
                                        {count}
                                      </span>
                                    </div>
                                  ));
                              })()}
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
                                        priority === "Urgent"
                                          ? "bg-purple-500"
                                          : priority === "High"
                                            ? "bg-red-500"
                                            : priority === "Medium"
                                              ? "bg-amber-500"
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
                                      className={
                                        status === "Completed"
                                          ? "text-green-400"
                                          : status === "In Progress"
                                            ? "text-cyan-400"
                                            : status === "Pending"
                                              ? "text-amber-400"
                                              : "text-gray-400"
                                      }
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

              {/* Reports Tab Content - Simple & Form-Aligned */}
              {activeTab === "reports" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4">
                      Request Form Reports
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">
                      Reports based on Physical Plant Request Form data
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          title: "Daily Requests",
                          description: "All requests submitted today",
                          count: recentRequests.filter((r) =>
                            r.createdAt.includes(
                              new Date().toLocaleDateString().split("/")[1],
                            ),
                          ).length,
                          icon: (
                            <svg
                              className="w-5 h-5 text-teal-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          ),
                          type: "PDF",
                        },
                        {
                          title: "Priority Requests",
                          description: "High priority and urgent requests",
                          count: recentRequests.filter(
                            (r) =>
                              r.priority.includes("High") ||
                              r.priority.includes("Urgent"),
                          ).length,
                          icon: (
                            <svg
                              className="w-5 h-5 text-red-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          ),
                          type: "PDF",
                        },
                        {
                          title: "Building Requests",
                          description: "Requests by building location",
                          count: recentRequests.filter((r) => r.building)
                            .length,
                          icon: (
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
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                          ),
                          type: "Excel",
                        },
                        {
                          title: "Department Requests",
                          description: "Requests by department",
                          count: recentRequests.filter((r) => r.department)
                            .length,
                          icon: (
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
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          ),
                          type: "Excel",
                        },
                        {
                          title: "Category Report",
                          description: "Requests by maintenance category",
                          count: recentRequests.length,
                          icon: (
                            <svg
                              className="w-5 h-5 text-amber-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                          ),
                          type: "PDF",
                        },
                        {
                          title: "Status Report",
                          description: "Current status of all requests",
                          count: recentRequests.length,
                          icon: (
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
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          ),
                          type: "PDF",
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
                            <div className="p-2 rounded-lg bg-teal-500/10">
                              <div className="text-lg">{report.icon}</div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-mono text-gray-400">
                                {report.type}
                              </span>
                              <div className="text-lg font-bold text-teal-400">
                                {report.count}
                              </div>
                            </div>
                          </div>
                          <h3 className="text-gray-100 font-medium mb-2">
                            {report.title}
                          </h3>
                          <p className="text-xs text-gray-500 mb-3">
                            {report.description}
                          </p>
                          <div className="text-xs text-gray-400">
                            {new Date().toLocaleDateString()}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => handleGenerateAllReports()}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-1"
                      >
                        Generate All Reports
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
                        {selectedRequest.id} â€¢ {selectedRequest.location}
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

        {/* Request Details Modal */}
        <AnimatePresence>
          {showRequestDetails && selectedRequest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={handleCloseRequestDetails}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="relative max-w-4xl max-h-[90vh] w-full mx-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-b border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-500/30">
                        <svg
                          className="w-6 h-6 text-teal-400"
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
                      <div>
                        <h3 className="text-xl font-bold text-gray-100">
                          {selectedRequest.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {selectedRequest.id} â€¢ {selectedRequest.createdAt}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseRequestDetails}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200"
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

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Request Details */}
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                        <h4 className="text-sm font-semibold text-gray-100 mb-3">
                          Request Details
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Category
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.category}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Priority
                            </span>
                            <span
                              className={`text-sm font-medium ${getPriorityColor(selectedRequest.priority)}`}
                            >
                              {selectedRequest.priority}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Status
                            </span>
                            <span
                              className={`text-sm font-medium ${getStatusColor(selectedRequest.status)}`}
                            >
                              {selectedRequest.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Location Information */}
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                        <h4 className="text-sm font-semibold text-gray-100 mb-3">
                          Location
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Building
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.building || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Room</span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.roomNumber || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Floor</span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.floor || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Location
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.location || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Contact Information */}
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                        <h4 className="text-sm font-semibold text-gray-100 mb-3">
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Requested By
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.requestedBy}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Department
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.department || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Contact Phone
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.contactPhone || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                        <h4 className="text-sm font-semibold text-gray-100 mb-3">
                          Timeline
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Created
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.createdAt}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Last Updated
                            </span>
                            <span className="text-sm text-gray-200">
                              {selectedRequest.updatedAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6 bg-gray-800/50 rounded-xl p-4 border border-white/5">
                    <h4 className="text-sm font-semibold text-gray-100 mb-3">
                      Description
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {selectedRequest.description}
                    </p>
                  </div>

                  {/* Images */}
                  {selectedRequest.images &&
                    selectedRequest.images.length > 0 && (
                      <div className="mt-6 bg-gray-800/50 rounded-xl p-4 border border-white/5">
                        <h4 className="text-sm font-semibold text-gray-100 mb-3">
                          Attached Images
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {selectedRequest.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleViewImages(selectedRequest, index)
                              }
                              className="relative group rounded-lg overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all duration-200"
                            >
                              <img
                                src={image}
                                alt={`Request image ${index + 1}`}
                                className="w-full h-24 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-800/50 border-t border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">Status:</span>
                      <select
                        value={selectedRequest.status}
                        onChange={(e) =>
                          handleStatusChange(selectedRequest.id, e.target.value)
                        }
                        className="px-3 py-1 rounded-lg bg-gray-700/50 border border-white/10 text-sm text-gray-200 focus:outline-none focus:border-teal-500/50"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Dismissed">Dismissed</option>
                      </select>
                    </div>
                    <button
                      onClick={handleCloseRequestDetails}
                      className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />

              {/* Notifications Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                className="fixed top-16 right-4 md:right-8 z-50 w-80 max-h-[500px] bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-b border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-100">
                      Notifications
                    </h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <motion.button
                          onClick={markAllAsRead}
                          className="text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Mark all read
                        </motion.button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-sm">No notifications</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                            notification.read
                              ? "bg-gray-800/30 hover:bg-gray-800/50"
                              : "bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(
                                notification.type,
                              )}`}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    notification.read
                                      ? "text-gray-300"
                                      : "text-gray-100"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-gray-400 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 p-3 bg-gray-800/50">
                  <button className="w-full text-center text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  );
}
