"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getMaintenanceStats,
  getRecentRequests,
  getRequestsByCategory,
  getRequestsByPriority,
  getMaintenanceRequests,
  updateRequestStatus,
  deleteMaintenanceRequest,
  MaintenanceRequest,
} from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import { Theme } from "@/lib/theme";

export default function AdminDashboard() {
  const router = useRouter();
  const { theme, themeConfig, setTheme, availableThemes } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });
  const [recentRequests, setRecentRequests] = useState<MaintenanceRequest[]>(
    [],
  );
  const [allRequests, setAllRequests] = useState<MaintenanceRequest[]>([]);
  const [categoryData, setCategoryData] = useState<Record<string, number>>({});
  const [priorityData, setPriorityData] = useState<Record<string, number>>({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] =
    useState<MaintenanceRequest | null>(null);
  const [showDeleteOptionsModal, setShowDeleteOptionsModal] = useState(false);
  const [autoDeleteCompleted, setAutoDeleteCompleted] = useState(false);
  const [deleteFilters, setDeleteFilters] = useState({
    status: "all",
    category: "all",
    priority: "all",
    dateRange: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState<
    MaintenanceRequest[]
  >([]);

  // Load real data on component mount
  useEffect(() => {
    const loadData = () => {
      const realStats = getMaintenanceStats();
      const realRecentRequests = getRecentRequests();
      const realAllRequests = getMaintenanceRequests();
      const realCategoryData = getRequestsByCategory();
      const realPriorityData = getRequestsByPriority();

      setStats(realStats);
      setRecentRequests(realRecentRequests);
      setAllRequests(realAllRequests);
      setCategoryData(realCategoryData);
      setPriorityData(realPriorityData);
    };

    loadData();

    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);

    return () => clearInterval(interval);
  }, []);

  // Update filtered requests when search query or all requests change
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRequests(allRequests);
    } else {
      const filtered = allRequests.filter(
        (request) =>
          request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.requestedBy
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredRequests(filtered);
    }
  }, [searchQuery, allRequests]);

  // Handle status update
  const handleStatusUpdate = (
    requestId: string,
    newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED",
  ) => {
    updateRequestStatus(requestId, newStatus);
    // Refresh data after update
    const loadData = () => {
      const realStats = getMaintenanceStats();
      const realRecentRequests = getRecentRequests();
      const realAllRequests = getMaintenanceRequests();

      setStats(realStats);
      setRecentRequests(realRecentRequests);
      setAllRequests(realAllRequests);
    };
    loadData();
  };

  const handleImageModal = (images: string[]) => {
    setSelectedImages(images);
    setShowImageModal(true);
  };

  // Handle delete request
  const handleDeleteRequest = (request: MaintenanceRequest) => {
    setRequestToDelete(request);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      const success = deleteMaintenanceRequest(requestToDelete.id);
      if (success) {
        // Reload data to reflect the deletion
        const loadData = () => {
          const realStats = getMaintenanceStats();
          const realRecentRequests = getRecentRequests();
          const realAllRequests = getMaintenanceRequests();

          setStats(realStats);
          setRecentRequests(realRecentRequests);
          setAllRequests(realAllRequests);
        };
        loadData();
      }
    }
    setShowDeleteModal(false);
    setRequestToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setRequestToDelete(null);
  };

  // Handle delete options modal
  const handleDeleteOptions = () => {
    setShowDeleteOptionsModal(true);
  };

  const closeDeleteOptions = () => {
    setShowDeleteOptionsModal(false);
  };

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setDeleteFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle bulk delete with filters
  const handleBulkDelete = () => {
    const requestsToDelete = filteredRequests.filter((request) => {
      let matches = true;

      if (deleteFilters.status !== "all") {
        matches = matches && request.status === deleteFilters.status;
      }

      if (deleteFilters.category !== "all") {
        matches = matches && request.category === deleteFilters.category;
      }

      if (deleteFilters.priority !== "all") {
        matches = matches && request.priority === deleteFilters.priority;
      }

      if (deleteFilters.dateRange !== "all") {
        const now = new Date();
        const requestDate = new Date(request.createdAt);

        switch (deleteFilters.dateRange) {
          case "7days":
            matches =
              matches &&
              now.getTime() - requestDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
            break;
          case "30days":
            matches =
              matches &&
              now.getTime() - requestDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
            break;
          case "90days":
            matches =
              matches &&
              now.getTime() - requestDate.getTime() <= 90 * 24 * 60 * 60 * 1000;
            break;
        }
      }

      return matches;
    });

    let deletedCount = 0;
    requestsToDelete.forEach((request) => {
      if (deleteMaintenanceRequest(request.id)) {
        deletedCount++;
      }
    });

    // Refresh data
    const loadData = () => {
      const realStats = getMaintenanceStats();
      const realRecentRequests = getRecentRequests();
      const realAllRequests = getMaintenanceRequests();

      setStats(realStats);
      setRecentRequests(realRecentRequests);
      setAllRequests(realAllRequests);
    };
    loadData();

    setShowDeleteOptionsModal(false);

    // Show success message (you could add a toast notification here)
    console.log(`Successfully deleted ${deletedCount} requests`);
  };

  // Auto-delete completed requests
  useEffect(() => {
    if (autoDeleteCompleted) {
      const completedRequests = allRequests.filter(
        (request) => request.status === "COMPLETED",
      );
      completedRequests.forEach((request) => {
        deleteMaintenanceRequest(request.id);
      });

      // Refresh data
      const loadData = () => {
        const realStats = getMaintenanceStats();
        const realRecentRequests = getRecentRequests();
        const realAllRequests = getMaintenanceRequests();

        setStats(realStats);
        setRecentRequests(realRecentRequests);
        setAllRequests(realAllRequests);
      };
      loadData();
    }
  }, [autoDeleteCompleted]);

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Calculate completion rate
  const completionRate =
    stats.totalRequests > 0
      ? Math.round((stats.completedRequests / stats.totalRequests) * 100)
      : 0;

  const getStatusColor = (status: string) => {
    const isDark = themeConfig.name === "dark";
    switch (status) {
      case "PENDING":
        return isDark
          ? "bg-amber-900/40 text-amber-200 border border-amber-700/60"
          : "bg-amber-50 text-amber-900 border border-amber-200";
      case "IN_PROGRESS":
        return isDark
          ? "bg-indigo-900/40 text-indigo-200 border border-indigo-700/60"
          : "bg-indigo-50 text-indigo-900 border border-indigo-200";
      case "COMPLETED":
        return isDark
          ? "bg-emerald-900/40 text-emerald-200 border border-emerald-700/60"
          : "bg-emerald-50 text-emerald-900 border border-emerald-200";
      case "CANCELLED":
        return isDark
          ? "bg-rose-900/40 text-rose-200 border border-rose-700/60"
          : "bg-rose-50 text-rose-900 border border-rose-200";
      default:
        return isDark
          ? "bg-slate-800/40 text-slate-300 border border-slate-700/60"
          : "bg-slate-50 text-slate-900 border border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    const isDark = themeConfig.name === "dark";
    switch (priority) {
      case "LOW":
        return isDark
          ? "bg-slate-800/40 text-slate-300 border border-slate-700/60"
          : "bg-slate-50 text-slate-900 border border-slate-200";
      case "MEDIUM":
        return isDark
          ? "bg-sky-900/40 text-sky-200 border border-sky-700/60"
          : "bg-sky-50 text-sky-900 border border-sky-200";
      case "HIGH":
        return isDark
          ? "bg-orange-900/40 text-orange-200 border border-orange-700/60"
          : "bg-orange-50 text-orange-900 border border-orange-200";
      case "URGENT":
        return isDark
          ? "bg-red-900/30 text-red-300 border border-red-700/50"
          : "bg-red-100 text-red-800 border border-red-200";
      default:
        return isDark
          ? "bg-gray-800/30 text-gray-300 border border-gray-700/50"
          : "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div
      className={`min-h-screen dashboard-theme`}
      style={{
        backgroundColor: themeConfig.colors.background,
        color: themeConfig.colors.text,
      }}
    >
      {/* Header */}
      <div
        className="shadow-sm border-b theme-card"
        style={{
          backgroundColor: themeConfig.colors.surface,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  <path d="M19 14l-2-2m0 0l-2 2m2-2v6" />
                </svg>
              </div>
              <h1
                className="text-xl font-bold"
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition-all duration-200"
                style={{
                  color: themeConfig.colors.textSecondary,
                  backgroundColor:
                    themeConfig.name === "dark" ? "transparent" : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    themeConfig.name === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Back to Home
              </button>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background:
                    themeConfig.name === "dark"
                      ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                      : "linear-gradient(135deg, #1B4332 0%, #2d5a47 100%)",
                }}
              >
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        className="border-b theme-card"
        style={{
          backgroundColor: themeConfig.colors.surface,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {["overview", "requests", "analytics", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                style={{
                  color:
                    activeTab === tab
                      ? themeConfig.colors.primary
                      : themeConfig.colors.textSecondary,
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div
                className="rounded-lg shadow p-6 theme-card transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 rounded-lg p-3 transition-all duration-200"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(27, 67, 50, 0.2)"
                          : "rgba(27, 67, 50, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: themeConfig.colors.primary }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: themeConfig.colors.textSecondary,
                      }}
                    >
                      Total Requests
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      {stats.totalRequests}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-lg shadow p-6 theme-card transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 rounded-lg p-3 transition-all duration-200"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(245, 158, 11, 0.2)"
                          : "rgba(245, 158, 11, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#F59E0B" : "#d97706",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: themeConfig.colors.textSecondary,
                      }}
                    >
                      Pending
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      {stats.pendingRequests}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-lg shadow p-6 theme-card transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 rounded-lg p-3 transition-all duration-200"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#60A5FA" : "#2563eb",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: themeConfig.colors.textSecondary,
                      }}
                    >
                      In Progress
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      {stats.inProgressRequests}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-lg shadow p-6 theme-card transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 rounded-lg p-3 transition-all duration-200"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(34, 197, 94, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#4ADE80" : "#16a34a",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: themeConfig.colors.textSecondary,
                      }}
                    >
                      Completed
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      {stats.completedRequests}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-lg shadow p-6 theme-card transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 rounded-lg p-3 transition-all duration-200"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(139, 92, 246, 0.2)"
                          : "rgba(139, 92, 246, 0.1)",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#A78BFA" : "#8b5cf6",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: themeConfig.colors.textSecondary,
                      }}
                    >
                      Completion Rate
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      {completionRate}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Requests */}
            <div
              className="rounded-lg shadow theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div
                className="px-6 py-4 border-b"
                style={{
                  borderColor: themeConfig.colors.border,
                }}
              >
                <h2
                  className="text-lg font-medium"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Recent Requests
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table
                  className="min-w-full"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                  }}
                >
                  <thead
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(0, 0, 0, 0.2)"
                          : "rgba(0, 0, 0, 0.05)",
                      borderColor: themeConfig.colors.border,
                    }}
                    className="border-b"
                  >
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        ID
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Title
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Location
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Category
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Priority
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Status
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y"
                    style={{
                      backgroundColor: themeConfig.colors.surface,
                      borderColor: themeConfig.colors.border,
                    }}
                  >
                    {recentRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="transition-colors duration-150"
                        style={{
                          backgroundColor: themeConfig.colors.surface,
                          borderColor: themeConfig.colors.border,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            themeConfig.name === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            themeConfig.colors.surface;
                        }}
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          style={{ color: themeConfig.colors.text }}
                        >
                          #{request.id}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.text }}
                        >
                          {request.title}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.location}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                              request.priority,
                            )}`}
                          >
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              request.status,
                            )}`}
                          >
                            {request.status.replace("_", " ")}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {formatDate(request.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-6">
            {/* Request Management Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  All Maintenance Requests
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Total: {allRequests.length} requests
                  </div>
                  <button
                    onClick={() => {
                      const loadData = () => {
                        const realStats = getMaintenanceStats();
                        const realRecentRequests = getRecentRequests();
                        const realAllRequests = getMaintenanceRequests();

                        setStats(realStats);
                        setRecentRequests(realRecentRequests);
                        setAllRequests(realAllRequests);
                      };
                      loadData();
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>

              {/* Status Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-amber-100 text-xs sm:text-sm">
                        Pending
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {stats.pendingRequests}
                      </p>
                      <p className="text-amber-100 text-xs mt-1 sm:mt-2">
                        Awaiting processing
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-indigo-100 text-xs sm:text-sm">
                        In Progress
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {stats.inProgressRequests}
                      </p>
                      <p className="text-indigo-100 text-xs mt-1 sm:mt-2">
                        Currently being processed
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-emerald-100 text-xs sm:text-sm">
                        Completed
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {stats.completedRequests}
                      </p>
                      <p className="text-emerald-100 text-xs mt-1 sm:mt-2">
                        Successfully resolved
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto Delete Toggle */}
              <div
                className="rounded-lg p-4 mb-6 border transition-all duration-200"
                style={{
                  backgroundColor:
                    themeConfig.name === "dark"
                      ? "rgba(239, 68, 68, 0.08)"
                      : "rgba(239, 68, 68, 0.04)",
                  borderColor:
                    themeConfig.name === "dark"
                      ? "rgba(239, 68, 68, 0.25)"
                      : "rgba(239, 68, 68, 0.15)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor:
                          themeConfig.name === "dark"
                            ? "rgba(239, 68, 68, 0.15)"
                            : "rgba(239, 68, 68, 0.1)",
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#EF4444" : "#dc2626",
                        }}
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
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#F87171" : "#991b1b",
                        }}
                      >
                        Auto Delete Completed Requests
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#FCA5A5" : "#7f1d1d",
                        }}
                      >
                        Automatically remove completed requests
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAutoDeleteCompleted(!autoDeleteCompleted)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      autoDeleteCompleted
                        ? themeConfig.name === "dark"
                          ? "bg-red-600"
                          : "bg-red-500"
                        : themeConfig.name === "dark"
                          ? "bg-gray-600"
                          : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        autoDeleteCompleted ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Search Bar and Fixed Action Bar */}
              <div
                className="sticky top-0 p-4 z-10 space-y-4 border-b"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                }}
              >
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5"
                      style={{ color: themeConfig.colors.textSecondary }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, title, requested by, location, category, or description..."
                    className="block w-full pl-10 pr-3 py-2 rounded-lg leading-5 focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = themeConfig.colors.primary;
                      e.target.style.boxShadow = `0 0 0 3px ${themeConfig.colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = themeConfig.colors.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5 transition-colors"
                        style={{ color: themeConfig.colors.textSecondary }}
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
                  )}
                </div>

                {/* Quick Actions Bar */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center space-x-2 text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    <span>
                      Showing {filteredRequests.length} of {allRequests.length}{" "}
                      requests
                    </span>
                    {searchQuery && (
                      <span
                        style={{ color: themeConfig.colors.primary }}
                        className="font-medium"
                      >
                        (filtered)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDeleteOptions}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-1 shadow-sm"
                      style={{
                        backgroundColor:
                          themeConfig.name === "dark" ? "#dc2626" : "#ef4444",
                        color: "#ffffff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark" ? "#b91c1c" : "#dc2626";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark" ? "#dc2626" : "#ef4444";
                      }}
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Bulk Delete</span>
                    </button>
                    <button
                      onClick={() => {
                        const loadData = () => {
                          const realStats = getMaintenanceStats();
                          const realRecentRequests = getRecentRequests();
                          const realAllRequests = getMaintenanceRequests();

                          setStats(realStats);
                          setRecentRequests(realRecentRequests);
                          setAllRequests(realAllRequests);
                        };
                        loadData();
                      }}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-1 shadow-sm"
                      style={{
                        backgroundColor: themeConfig.colors.accent,
                        color: "#ffffff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark" ? "#059669" : "#047857";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.colors.primary;
                      }}
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Requests Table */}
              <div className="overflow-x-auto">
                <table
                  className="min-w-full"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                    borderColor: themeConfig.colors.border,
                  }}
                >
                  <thead
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(0, 0, 0, 0.2)"
                          : "rgba(0, 0, 0, 0.05)",
                      borderColor: themeConfig.colors.border,
                    }}
                    className="border-b"
                  >
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        ID
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Title
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Location
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Category
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Priority
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Status
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Requested By
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Images
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Created
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y"
                    style={{
                      backgroundColor: themeConfig.colors.surface,
                      borderColor: themeConfig.colors.border,
                    }}
                  >
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="transition-colors duration-150"
                        style={{
                          backgroundColor: themeConfig.colors.surface,
                          borderColor: themeConfig.colors.border,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            themeConfig.name === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            themeConfig.colors.surface;
                        }}
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          style={{ color: themeConfig.colors.text }}
                        >
                          #{request.id}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.text }}
                        >
                          <div>
                            <div className="font-medium">{request.title}</div>
                            <div
                              className="text-xs mt-1"
                              style={{
                                color: themeConfig.colors.textSecondary,
                              }}
                            >
                              {request.description.substring(0, 50)}...
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.location}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}
                          >
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}
                          >
                            {request.status.replace("_", " ")}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.requestedBy}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.images && request.images.length > 0 ? (
                            <div className="flex items-center space-x-2">
                              <span
                                style={{
                                  color:
                                    themeConfig.name === "dark"
                                      ? "#4ade80"
                                      : "#16a34a",
                                }}
                                className="font-medium"
                              >
                                {request.images.length}{" "}
                                {request.images.length === 1
                                  ? "image"
                                  : "images"}
                              </span>
                              <button
                                onClick={() =>
                                  handleImageModal(request.images || [])
                                }
                                className="text-xs underline transition-colors duration-200"
                                style={{
                                  color:
                                    themeConfig.name === "dark"
                                      ? "#60a5fa"
                                      : "#2563eb",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#93c5fd"
                                      : "#1d4ed8";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#60a5fa"
                                      : "#2563eb";
                                }}
                              >
                                View
                              </button>
                            </div>
                          ) : (
                            <span
                              style={{
                                color: themeConfig.colors.textSecondary,
                              }}
                            >
                              No images
                            </span>
                          )}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {formatDate(request.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {request.status !== "PENDING" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(request.id, "PENDING")
                                }
                                className="text-xs transition-colors duration-200"
                                style={{
                                  color:
                                    themeConfig.name === "dark"
                                      ? "#fbbf24"
                                      : "#d97706",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#fcd34d"
                                      : "#b45309";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#fbbf24"
                                      : "#d97706";
                                }}
                                title="Mark as Pending"
                              >
                                Pending
                              </button>
                            )}
                            {request.status !== "IN_PROGRESS" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(request.id, "IN_PROGRESS")
                                }
                                className="text-xs transition-colors duration-200"
                                style={{
                                  color:
                                    themeConfig.name === "dark"
                                      ? "#60a5fa"
                                      : "#2563eb",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#93c5fd"
                                      : "#1d4ed8";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#60a5fa"
                                      : "#2563eb";
                                }}
                                title="Mark as In Progress"
                              >
                                In Progress
                              </button>
                            )}
                            {request.status !== "COMPLETED" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(request.id, "COMPLETED")
                                }
                                className="text-xs transition-colors duration-200"
                                style={{
                                  color:
                                    themeConfig.name === "dark"
                                      ? "#4ade80"
                                      : "#16a34a",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#86efac"
                                      : "#15803d";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color =
                                    themeConfig.name === "dark"
                                      ? "#4ade80"
                                      : "#16a34a";
                                }}
                                title="Mark as Completed"
                              >
                                Complete
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteRequest(request)}
                              className="text-xs font-medium px-2 py-1 rounded-md transition-all duration-200 flex items-center space-x-1"
                              style={{
                                color:
                                  themeConfig.name === "dark"
                                    ? "#f87171"
                                    : "#dc2626",
                                backgroundColor:
                                  themeConfig.name === "dark"
                                    ? "rgba(239, 68, 68, 0.1)"
                                    : "rgba(239, 68, 68, 0.05)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themeConfig.name === "dark"
                                    ? "rgba(239, 68, 68, 0.2)"
                                    : "rgba(239, 68, 68, 0.1)";
                                e.currentTarget.style.color =
                                  themeConfig.name === "dark"
                                    ? "#fca5a5"
                                    : "#b91c1c";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themeConfig.name === "dark"
                                    ? "rgba(239, 68, 68, 0.1)"
                                    : "rgba(239, 68, 68, 0.05)";
                                e.currentTarget.style.color =
                                  themeConfig.name === "dark"
                                    ? "#f87171"
                                    : "#dc2626";
                              }}
                              title="Delete Request"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* No Results Message */}
                {filteredRequests.length === 0 && (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 mb-4"
                      style={{ color: themeConfig.colors.textSecondary }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      No requests found
                    </h3>
                    <p
                      className="mb-4"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      {searchQuery
                        ? `No requests match "${searchQuery}"`
                        : "No requests available"}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="px-4 py-2 rounded-lg transition-colors duration-200"
                        style={{
                          backgroundColor: themeConfig.colors.primary,
                          color: "#ffffff",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            themeConfig.name === "dark" ? "#2d5a47" : "#14532d";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            themeConfig.colors.primary;
                        }}
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Analytics & Reports
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                  <button
                    onClick={() => {
                      const loadData = () => {
                        const realStats = getMaintenanceStats();
                        const realCategoryData = getRequestsByCategory();
                        const realPriorityData = getRequestsByPriority();

                        setStats(realStats);
                        setCategoryData(realCategoryData);
                        setPriorityData(realPriorityData);
                      };
                      loadData();
                    }}
                    className="px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#2d5a47] transition-colors"
                  >
                    Refresh Analytics
                  </button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-blue-100 text-xs sm:text-sm">
                        Total Requests
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {stats.totalRequests}
                      </p>
                      <p className="text-blue-100 text-xs mt-1 sm:mt-2">
                        All time
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-green-100 text-xs sm:text-sm">
                        Completion Rate
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {completionRate}%
                      </p>
                      <p className="text-green-100 text-xs mt-1 sm:mt-2">
                        {stats.completedRequests} of {stats.totalRequests}
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-yellow-100 text-xs sm:text-sm">
                        Pending Work
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {stats.pendingRequests}
                      </p>
                      <p className="text-yellow-100 text-xs mt-1 sm:mt-2">
                        {stats.inProgressRequests} in progress
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-purple-100 text-xs sm:text-sm">
                        Avg. Processing
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">2.5</p>
                      <p className="text-purple-100 text-xs mt-1 sm:mt-2">
                        Days per request
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Requests by Category */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Requests by Category
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(categoryData).map(([category, count]) => {
                      const percentage =
                        stats.totalRequests > 0
                          ? (count / stats.totalRequests) * 100
                          : 0;
                      const colors: Record<string, string> = {
                        PLUMBING: "bg-blue-500",
                        ELECTRICAL: "bg-yellow-500",
                        CARPENTRY: "bg-green-500",
                        HVAC: "bg-purple-500",
                      };
                      const bgColor = colors[category] || "bg-gray-500";

                      return (
                        <div
                          key={category}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {category}
                              </span>
                              <span className="text-sm text-gray-500">
                                {count} requests
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${bgColor} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="ml-4 text-sm font-semibold text-gray-900">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Requests by Priority */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Requests by Priority
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(priorityData).map(([priority, count]) => {
                      const percentage =
                        stats.totalRequests > 0
                          ? (count / stats.totalRequests) * 100
                          : 0;
                      const colors: Record<string, string> = {
                        LOW: "bg-gray-400",
                        MEDIUM: "bg-blue-500",
                        HIGH: "bg-orange-500",
                      };
                      const bgColor = colors[priority] || "bg-gray-500";

                      return (
                        <div
                          key={priority}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {priority}
                              </span>
                              <span className="text-sm text-gray-500">
                                {count} requests
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${bgColor} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="ml-4 text-sm font-semibold text-gray-900">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status Distribution */}
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Status Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Pending
                      </span>
                      <span className="text-lg font-bold text-yellow-600">
                        {stats.pendingRequests}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${stats.totalRequests > 0 ? (stats.pendingRequests / stats.totalRequests) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        In Progress
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {stats.inProgressRequests}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${stats.totalRequests > 0 ? (stats.inProgressRequests / stats.totalRequests) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Completed
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {stats.completedRequests}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${stats.totalRequests > 0 ? (stats.completedRequests / stats.totalRequests) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">
                        Most Active Category:
                      </span>
                      <span className="font-semibold text-gray-900">
                        {Object.entries(categoryData).sort(
                          (a, b) => b[1] - a[1],
                        )[0]?.[0] || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">Highest Priority:</span>
                      <span className="font-semibold text-gray-900">
                        {Object.entries(priorityData).filter(
                          ([p]) => p === "HIGH",
                        )[0]?.[1] || 0}{" "}
                        requests
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">
                        Avg. Daily Requests:
                      </span>
                      <span className="font-semibold text-gray-900">
                        {(stats.totalRequests / 7).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Settings Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Settings & Preferences
                </h2>
                <div className="text-sm text-gray-500">
                  Manage your admin dashboard preferences
                </div>
              </div>

              {/* Theme Selection */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Theme Selection
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Choose your preferred theme for the admin dashboard
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {availableThemes.map((themeOption) => (
                      <button
                        key={themeOption.name}
                        onClick={() => setTheme(themeOption.name as Theme)}
                        className={`relative p-6 rounded-lg border-2 transition-all duration-200 ${
                          theme === themeOption.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        {theme === themeOption.name && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col items-center space-y-4">
                          {/* Theme Preview */}
                          <div
                            className="w-full h-20 rounded-lg p-2 border"
                            style={{
                              backgroundColor: themeOption.colors.background,
                              borderColor: themeOption.colors.border,
                            }}
                          >
                            <div className="flex space-x-2 mb-2">
                              <div
                                className="w-4 h-4 rounded"
                                style={{
                                  backgroundColor: themeOption.colors.primary,
                                }}
                              ></div>
                              <div
                                className="w-4 h-4 rounded"
                                style={{
                                  backgroundColor: themeOption.colors.accent,
                                }}
                              ></div>
                              <div
                                className="w-4 h-4 rounded"
                                style={{
                                  backgroundColor: themeOption.colors.success,
                                }}
                              ></div>
                            </div>
                            <div className="flex space-x-1">
                              <div
                                className="flex-1 h-1 rounded"
                                style={{
                                  backgroundColor:
                                    themeOption.colors.textSecondary,
                                }}
                              ></div>
                              <div
                                className="flex-1 h-1 rounded"
                                style={{
                                  backgroundColor:
                                    themeOption.colors.textSecondary,
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Theme Info */}
                          <div className="text-center">
                            <h4 className="font-semibold text-gray-900">
                              {themeOption.displayName}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {themeOption.name === "standard" &&
                                "Default academic theme"}
                              {themeOption.name === "light" &&
                                "Clean and bright interface"}
                              {themeOption.name === "dark" &&
                                "Dark mode for low light"}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Theme Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Current Theme Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Theme:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {themeConfig.displayName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Primary:</span>
                      <span
                        className="ml-2 font-medium"
                        style={{
                          color: themeConfig.colors.primary,
                          backgroundColor:
                            theme === "dark"
                              ? themeConfig.colors.surface
                              : "transparent",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {themeConfig.colors.primary}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Background:</span>
                      <span
                        className="ml-2 font-medium"
                        style={{
                          color: themeConfig.colors.background,
                          backgroundColor:
                            theme === "dark"
                              ? themeConfig.colors.text
                              : "transparent",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {themeConfig.colors.background}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Text:</span>
                      <span
                        className="ml-2 font-medium"
                        style={{
                          color: themeConfig.colors.text,
                          backgroundColor:
                            theme === "dark"
                              ? themeConfig.colors.surface
                              : "transparent",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {themeConfig.colors.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Additional Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Auto-refresh Data
                        </h5>
                        <p className="text-sm text-gray-500">
                          Automatically refresh dashboard data every 30 seconds
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        Enabled
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Email Notifications
                        </h5>
                        <p className="text-sm text-gray-500">
                          Receive email alerts for new maintenance requests
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                        Disabled
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Data Export
                        </h5>
                        <p className="text-sm text-gray-500">
                          Export maintenance data as CSV or Excel
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Export
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Create Summary Request
                        </h5>
                        <p className="text-sm text-gray-500">
                          Summarize similar requests by category into one
                          comprehensive request
                        </p>
                      </div>
                      <button
                        onClick={() => router.push("/admin/summary-request")}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Create Summary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Attached Images ({selectedImages.length})
                </h3>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Attachment ${index + 1}`}
                        className="w-full h-auto rounded-lg border"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={image}
                          download={`attachment-${index + 1}.jpg`}
                          className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
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
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && requestToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Delete Request
                    </h3>
                    <p className="text-red-100 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete this maintenance request?
                  </p>

                  {/* Request Details */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Request ID:
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        #{requestToDelete.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Title:
                      </span>
                      <span className="text-sm font-bold text-gray-900 max-w-xs truncate">
                        {requestToDelete.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Location:
                      </span>
                      <span className="text-sm font-bold text-gray-900 max-w-xs truncate">
                        {requestToDelete.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Priority:
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(requestToDelete.priority)}`}
                      >
                        {requestToDelete.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Status:
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(requestToDelete.status)}`}
                      >
                        {requestToDelete.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-amber-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <p className="text-sm text-amber-800">
                      <strong>Warning:</strong> All associated data including
                      images and history will be permanently removed.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
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
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Delete Forever</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Options Modal */}
        {showDeleteOptionsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Delete Requests
                      </h3>
                      <p className="text-red-100 text-sm">
                        Filter and bulk delete requests
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeDeleteOptions}
                    className="text-white/80 hover:text-white transition-colors"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Filter Options */}
                <div className="space-y-6">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={deleteFilters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Statuses</option>
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={deleteFilters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="ELECTRICAL">Electrical</option>
                      <option value="PLUMBING">Plumbing</option>
                      <option value="HVAC">HVAC</option>
                      <option value="CARPENTRY">Carpentry</option>
                      <option value="PAINTING">Painting</option>
                      <option value="GENERAL">General</option>
                    </select>
                  </div>

                  {/* Priority Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={deleteFilters.priority}
                      onChange={(e) =>
                        handleFilterChange("priority", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Priorities</option>
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </label>
                    <select
                      value={deleteFilters.dateRange}
                      onChange={(e) =>
                        handleFilterChange("dateRange", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Time</option>
                      <option value="7days">Last 7 Days</option>
                      <option value="30days">Last 30 Days</option>
                      <option value="90days">Last 90 Days</option>
                    </select>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </h4>
                  <p className="text-sm text-gray-600">
                    {(() => {
                      const filteredCount = filteredRequests.filter(
                        (request) => {
                          let matches = true;

                          if (deleteFilters.status !== "all") {
                            matches =
                              matches &&
                              request.status === deleteFilters.status;
                          }

                          if (deleteFilters.category !== "all") {
                            matches =
                              matches &&
                              request.category === deleteFilters.category;
                          }

                          if (deleteFilters.priority !== "all") {
                            matches =
                              matches &&
                              request.priority === deleteFilters.priority;
                          }

                          if (deleteFilters.dateRange !== "all") {
                            const now = new Date();
                            const requestDate = new Date(request.createdAt);

                            switch (deleteFilters.dateRange) {
                              case "7days":
                                matches =
                                  matches &&
                                  now.getTime() - requestDate.getTime() <=
                                    7 * 24 * 60 * 60 * 1000;
                                break;
                              case "30days":
                                matches =
                                  matches &&
                                  now.getTime() - requestDate.getTime() <=
                                    30 * 24 * 60 * 60 * 1000;
                                break;
                              case "90days":
                                matches =
                                  matches &&
                                  now.getTime() - requestDate.getTime() <=
                                    90 * 24 * 60 * 60 * 1000;
                                break;
                            }
                          }

                          return matches;
                        },
                      ).length;

                      return `${filteredCount} request${filteredCount !== 1 ? "s" : ""} will be deleted`;
                    })()}
                  </p>
                </div>

                {/* Warning Message */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-amber-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <p className="text-sm text-amber-800">
                      <strong>Warning:</strong> This action cannot be undone.
                      All associated data will be permanently removed.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={closeDeleteOptions}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
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
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Delete Selected</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
