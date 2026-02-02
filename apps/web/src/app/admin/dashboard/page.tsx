"use client";

// Admin Dashboard - Desktop Only Version
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getMaintenanceRequests,
  getMaintenanceStats,
  getRecentRequests,
  updateRequestStatus,
  deleteMaintenanceRequest,
  getRequestsByCategory,
  getRequestsByPriority,
  MaintenanceRequest,
} from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";
import {
  WebListGroup,
  WebListGroupItem,
  WebStatsList,
} from "@/components/WebListGroup";

export default function AdminDashboard() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with empty/lightweight state first
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
  const [priorityData, setPriorityData] = useState<Record<string, number>>({
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    URGENT: 0,
  });

  // Other state
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] =
    useState<MaintenanceRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [showTextModal, setShowTextModal] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);

  // Load all data - defer to prevent blocking
  const loadData = () => {
    try {
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
      setFilteredRequests(realAllRequests);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount - defer to prevent blocking
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 150); // Small delay to allow page to render first

    const interval = setInterval(loadData, 30000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Filter requests based on search
  useEffect(() => {
    const filtered = allRequests.filter(
      (request: MaintenanceRequest) =>
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredRequests(filtered);
  }, [searchQuery, allRequests]);

  // Calculate completion rate
  const completionRate =
    stats.totalRequests > 0
      ? Math.round((stats.completedRequests / stats.totalRequests) * 100)
      : 0;

  // Handle status update
  const handleStatusUpdate = (requestId: string, newStatus: string) => {
    updateRequestStatus(requestId, newStatus as any);
    loadData();
  };

  // Handle delete request
  const handleDeleteRequest = (request: MaintenanceRequest) => {
    setRequestToDelete(request);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      deleteMaintenanceRequest(requestToDelete.id);
      setShowDeleteModal(false);
      setRequestToDelete(null);
      loadData();
    }
  };

  // View images
  const viewImages = (images: string[]) => {
    setSelectedImages(images);
    setShowImageModal(true);
  };

  // View full request details
  const viewRequestDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setShowTextModal(true);
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Header */}
        <WebHeader
          title="Admin Dashboard"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Admin Dashboard" },
          ]}
          actions={
            <div className="flex items-center space-x-2">
              <div style={{ zIndex: Z_INDEX.MAX, position: "relative" }}>
                <ThemeSwitcher />
              </div>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50 active:scale-95"
                style={{
                  borderColor: "#E5E7EB",
                  color: themeConfig.colors.text,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Back to Home
              </button>
            </div>
          }
        />

        {/* Main Content */}
        <div
          className={`${isMobile ? "max-w-4xl" : "max-w-7xl"} mx-auto ${isMobile ? "px-4 py-4" : "px-8 py-8"}`}
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <WebStatsList
                stats={[
                  { label: "Total Requests", value: stats.totalRequests },
                  { label: "Pending", value: stats.pendingRequests },
                  { label: "In Progress", value: stats.inProgressRequests },
                  { label: "Completed", value: stats.completedRequests },
                  { label: "Completion Rate", value: `${completionRate}%` },
                ]}
                columns={isMobile ? 2 : 5}
                compact={isMobile}
              />

              {/* Quick Actions */}
              <WebListGroup title="Quick Actions">
                <WebListGroupItem
                  title="Generate Summary"
                  subtitle="Create summary reports from maintenance requests"
                  leftIcon={<span>📋</span>}
                  onClick={() => router.push("/admin/summary-request")}
                />
                <WebListGroupItem
                  title="View Reports"
                  subtitle="Access detailed analytics and reports"
                  leftIcon={<span>📊</span>}
                  onClick={() => router.push("/admin/reports")}
                />
                <WebListGroupItem
                  title="Manage Users"
                  subtitle="Add, edit, or remove user accounts"
                  leftIcon={<span>�</span>}
                  onClick={() => router.push("/admin/users")}
                />
                <WebListGroupItem
                  title="Physical Repair"
                  subtitle="Create physical plant repair forms"
                  leftIcon={<span>�</span>}
                  onClick={() => router.push("/admin/physical-plant-request")}
                />
              </WebListGroup>

              {/* Recent Requests */}
              <WebListGroup title="Recent Requests">
                {recentRequests.slice(0, isMobile ? 5 : 5).map((request) => (
                  <WebListGroupItem
                    key={request.id}
                    title={request.title}
                    subtitle={`${request.location} • ${request.category}`}
                    rightElement={
                      <div className="flex items-center space-x-2">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor:
                              request.status === "COMPLETED"
                                ? `${themeConfig.colors.success}20`
                                : request.status === "IN_PROGRESS"
                                  ? `${themeConfig.colors.primary}20`
                                  : `${themeConfig.colors.warning}20`,
                            color:
                              request.status === "COMPLETED"
                                ? themeConfig.colors.success
                                : request.status === "IN_PROGRESS"
                                  ? themeConfig.colors.primary
                                  : themeConfig.colors.warning,
                          }}
                        >
                          {request.status.replace("_", " ")}
                        </span>
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor:
                              request.priority === "HIGH"
                                ? `${themeConfig.colors.error}20`
                                : request.priority === "MEDIUM"
                                  ? `${themeConfig.colors.warning}20`
                                  : `${themeConfig.colors.textSecondary}20`,
                            color:
                              request.priority === "HIGH"
                                ? themeConfig.colors.error
                                : request.priority === "MEDIUM"
                                  ? themeConfig.colors.warning
                                  : themeConfig.colors.textSecondary,
                          }}
                        >
                          {request.priority}
                        </span>
                      </div>
                    }
                    onClick={() => viewRequestDetails(request)}
                  />
                ))}
              </WebListGroup>
            </div>
          )}

          {activeTab === "requests" && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div
                className="rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <input
                  type="text"
                  placeholder="🔍 Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:scale-[1.01] focus:shadow-lg"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                    border: "1px solid",
                  }}
                />
              </div>

              {/* Requests Table */}
              <div
                className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        borderBottom: "1px solid",
                      }}
                    >
                      <tr>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Request
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request, index) => (
                        <tr
                          key={request.id}
                          className="transition-all duration-150"
                          style={{
                            borderColor: themeConfig.colors.border,
                            borderBottom: "1px solid",
                            backgroundColor:
                              index % 2 === 0
                                ? "transparent"
                                : `${themeConfig.colors.background}30`,
                          }}
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div
                                className="text-sm font-medium"
                                style={{ color: themeConfig.colors.text }}
                              >
                                {request.title}
                              </div>
                              <div
                                className="text-sm"
                                style={{
                                  color: themeConfig.colors.textSecondary,
                                }}
                              >
                                {request.description.length > 50 ? (
                                  <div className="flex items-center space-x-2">
                                    <span>
                                      {request.description.substring(0, 50)}
                                      ...
                                    </span>
                                    <button
                                      onClick={() =>
                                        viewRequestDetails(request)
                                      }
                                      className="text-xs px-2 py-1 rounded-md font-medium transition-all duration-200 hover:scale-105"
                                      style={{
                                        color: themeConfig.colors.primary,
                                        backgroundColor: `${themeConfig.colors.primary}08`,
                                        border: `1px solid ${themeConfig.colors.primary}20`,
                                      }}
                                    >
                                      View
                                    </button>
                                  </div>
                                ) : (
                                  request.description
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className="text-sm"
                              style={{ color: themeConfig.colors.text }}
                            >
                              {request.location}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className="text-sm"
                              style={{ color: themeConfig.colors.text }}
                            >
                              {request.category}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200"
                              style={{
                                backgroundColor:
                                  request.priority === "HIGH"
                                    ? "rgba(239, 68, 68, 0.1)"
                                    : request.priority === "MEDIUM"
                                      ? "rgba(245, 158, 11, 0.1)"
                                      : "rgba(107, 114, 128, 0.1)",
                                color:
                                  request.priority === "HIGH"
                                    ? "#DC2626"
                                    : request.priority === "MEDIUM"
                                      ? "#D97706"
                                      : "#6B7280",
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mr-1.5"
                                style={{
                                  backgroundColor:
                                    request.priority === "HIGH"
                                      ? "#DC2626"
                                      : request.priority === "MEDIUM"
                                        ? "#D97706"
                                        : "#6B7280",
                                }}
                              />
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="relative">
                              <select
                                value={request.status}
                                onChange={(e) =>
                                  handleStatusUpdate(request.id, e.target.value)
                                }
                                className="text-sm px-3 py-1.5 rounded-md appearance-none bg-transparent border transition-all duration-200 hover:border-opacity-60 focus:outline-none focus:ring-2 focus:ring-opacity-30 cursor-pointer pr-8"
                                style={{
                                  borderColor:
                                    request.status === "COMPLETED"
                                      ? themeConfig.colors.success
                                      : request.status === "IN_PROGRESS"
                                        ? "#3B82F6"
                                        : themeConfig.colors.warning,
                                  color:
                                    request.status === "COMPLETED"
                                      ? themeConfig.colors.success
                                      : request.status === "IN_PROGRESS"
                                        ? "#3B82F6"
                                        : themeConfig.colors.warning,
                                  borderWidth: "1px",
                                  backgroundColor: `${
                                    request.status === "COMPLETED"
                                      ? themeConfig.colors.success
                                      : request.status === "IN_PROGRESS"
                                        ? "#3B82F6"
                                        : themeConfig.colors.warning
                                  }10`,
                                }}
                              >
                                <option
                                  value="PENDING"
                                  style={{
                                    color: themeConfig.colors.warning,
                                    backgroundColor:
                                      themeConfig.colors.background,
                                  }}
                                >
                                  Pending
                                </option>
                                <option
                                  value="IN_PROGRESS"
                                  style={{
                                    color: "#3B82F6",
                                    backgroundColor:
                                      themeConfig.colors.background,
                                  }}
                                >
                                  In Progress
                                </option>
                                <option
                                  value="COMPLETED"
                                  style={{
                                    color: themeConfig.colors.success,
                                    backgroundColor:
                                      themeConfig.colors.background,
                                  }}
                                >
                                  Completed
                                </option>
                              </select>
                              <div
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                style={{
                                  color:
                                    request.status === "COMPLETED"
                                      ? themeConfig.colors.success
                                      : request.status === "IN_PROGRESS"
                                        ? "#3B82F6"
                                        : themeConfig.colors.warning,
                                }}
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-1">
                              {request.images && request.images.length > 0 && (
                                <button
                                  onClick={() =>
                                    viewImages(request.images || [])
                                  }
                                  className="text-xs px-2.5 py-1.5 rounded-md font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1"
                                  style={{
                                    color: themeConfig.colors.primary,
                                    backgroundColor: `${themeConfig.colors.primary}08`,
                                    border: `1px solid ${themeConfig.colors.primary}20`,
                                  }}
                                >
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span>Images</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteRequest(request)}
                                className="text-xs px-2.5 py-1.5 rounded-md font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1"
                                style={{
                                  color: themeConfig.colors.error,
                                  backgroundColor: `${themeConfig.colors.error}08`,
                                  border: `1px solid ${themeConfig.colors.error}20`,
                                }}
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m0-6v6m0-6V3a2 2 0 012-2h6a2 2 0 012 2v6"
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
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-8">
              {/* Header with Reduced Glow but Maintained Hover Effects */}
              <div
                className="rounded-2xl p-8 transform hover:scale-[1.02] transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                  border: `1px solid ${themeConfig.colors.border}`,
                  boxShadow: `0 8px 20px rgba(0,0,0,0.08)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1
                      className="text-3xl font-bold mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      🎯 Analytics Dashboard
                    </h1>
                    <p
                      className="text-lg"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Comprehensive insights into maintenance requests
                    </p>
                  </div>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.primary}10 0%, ${themeConfig.colors.secondary}05 100%)`,
                      color: themeConfig.colors.primary,
                    }}
                  >
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards with Hover Effects but Reduced Glow */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div
                  className="rounded-2xl p-6 text-center transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                    border: `1px solid ${themeConfig.colors.border}`,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.06)`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.primary}10 0%, ${themeConfig.colors.primary}05 100%)`,
                      color: themeConfig.colors.primary,
                    }}
                  >
                    <span className="text-xl">📝</span>
                  </div>
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.totalRequests}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Total Requests
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6 text-center transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                    border: `1px solid ${themeConfig.colors.border}`,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.06)`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.warning}10 0%, ${themeConfig.colors.warning}05 100%)`,
                      color: themeConfig.colors.warning,
                    }}
                  >
                    <span className="text-xl">⏱️</span>
                  </div>
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.pendingRequests}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Pending
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6 text-center transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                    border: `1px solid ${themeConfig.colors.border}`,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.06)`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.success}10 0%, ${themeConfig.colors.success}05 100%)`,
                      color: themeConfig.colors.success,
                    }}
                  >
                    <span className="text-xl">✨</span>
                  </div>
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.completedRequests}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Completed
                  </div>
                </div>
              </div>

              {/* Category Chart with Hover Effects but Reduced Glow */}
              <div
                className="rounded-2xl p-8 transform hover:scale-[1.01] transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                  border: `1px solid ${themeConfig.colors.border}`,
                  boxShadow: `0 8px 20px rgba(0,0,0,0.08)`,
                }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 transform hover:rotate-12 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.primary}10 0%, ${themeConfig.colors.primary}05 100%)`,
                      color: themeConfig.colors.primary,
                    }}
                  >
                    <span className="text-lg">🎨</span>
                  </div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Requests by Category
                  </h2>
                </div>
                <div className="space-y-4">
                  {Object.entries(categoryData).map(
                    ([category, count], index) => (
                      <div
                        key={category}
                        className="flex items-center justify-between p-4 rounded-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${themeConfig.colors.background} 0%, ${themeConfig.colors.surface} 100%)`,
                          border: `1px solid ${themeConfig.colors.border}`,
                        }}
                      >
                        <div className="flex items-center">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center mr-4 transform hover:rotate-12 transition-all duration-300"
                            style={{
                              background:
                                index === 0
                                  ? `linear-gradient(135deg, ${themeConfig.colors.primary}10 0%, ${themeConfig.colors.primary}05 100%)`
                                  : index === 1
                                    ? `linear-gradient(135deg, ${themeConfig.colors.secondary}10 0%, ${themeConfig.colors.secondary}05 100%)`
                                    : index === 2
                                      ? `linear-gradient(135deg, ${themeConfig.colors.warning}10 0%, ${themeConfig.colors.warning}05 100%)`
                                      : `linear-gradient(135deg, ${themeConfig.colors.success}10 0%, ${themeConfig.colors.success}05 100%)`,
                              color:
                                index === 0
                                  ? themeConfig.colors.primary
                                  : index === 1
                                    ? themeConfig.colors.secondary
                                    : index === 2
                                      ? themeConfig.colors.warning
                                      : themeConfig.colors.success,
                            }}
                          >
                            <span className="text-sm">
                              {index === 0
                                ? "🔧"
                                : index === 1
                                  ? "💫"
                                  : index === 2
                                    ? "🌊"
                                    : "🎯"}
                            </span>
                          </div>
                          <span
                            className="text-sm font-medium"
                            style={{ color: themeConfig.colors.text }}
                          >
                            {category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-48 rounded-full h-2"
                            style={{
                              background: themeConfig.colors.border + "20",
                            }}
                          >
                            <div
                              className="h-2 rounded-full transform transition-all duration-700 ease-out"
                              style={{
                                width: `${(count / stats.totalRequests) * 100}%`,
                                background:
                                  index === 0
                                    ? themeConfig.colors.primary
                                    : index === 1
                                      ? themeConfig.colors.secondary
                                      : index === 2
                                        ? themeConfig.colors.warning
                                        : themeConfig.colors.success,
                              }}
                            ></div>
                          </div>
                          <div
                            className="px-3 py-1 rounded-full text-sm font-medium transform hover:scale-110 transition-all duration-300"
                            style={{
                              background:
                                index === 0
                                  ? `${themeConfig.colors.primary}10`
                                  : index === 1
                                    ? `${themeConfig.colors.secondary}10`
                                    : index === 2
                                      ? `${themeConfig.colors.warning}10`
                                      : `${themeConfig.colors.success}10`,
                              color:
                                index === 0
                                  ? themeConfig.colors.primary
                                  : index === 1
                                    ? themeConfig.colors.secondary
                                    : index === 2
                                      ? themeConfig.colors.warning
                                      : themeConfig.colors.success,
                            }}
                          >
                            {count}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Priority Chart with Hover Effects but Reduced Glow */}
              <div
                className="rounded-2xl p-8 transform hover:scale-[1.01] transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                  border: `1px solid ${themeConfig.colors.border}`,
                  boxShadow: `0 8px 20px rgba(0,0,0,0.08)`,
                }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 transform hover:rotate-12 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.warning}10 0%, ${themeConfig.colors.warning}05 100%)`,
                      color: themeConfig.colors.warning,
                    }}
                  >
                    <span className="text-lg">🚀</span>
                  </div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Requests by Priority
                  </h2>
                </div>
                <div className="space-y-4">
                  {Object.entries(priorityData).map(([priority, count]) => (
                    <div
                      key={priority}
                      className="flex items-center justify-between p-4 rounded-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${themeConfig.colors.background} 0%, ${themeConfig.colors.surface} 100%)`,
                        border: `1px solid ${themeConfig.colors.border}`,
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-4 transform hover:rotate-12 transition-all duration-300"
                          style={{
                            background:
                              priority === "HIGH"
                                ? `linear-gradient(135deg, ${themeConfig.colors.error}10 0%, ${themeConfig.colors.error}05 100%)`
                                : priority === "MEDIUM"
                                  ? `linear-gradient(135deg, ${themeConfig.colors.warning}10 0%, ${themeConfig.colors.warning}05 100%)`
                                  : `linear-gradient(135deg, ${themeConfig.colors.textSecondary}10 0%, ${themeConfig.colors.textSecondary}05 100%)`,
                            color:
                              priority === "HIGH"
                                ? themeConfig.colors.error
                                : priority === "MEDIUM"
                                  ? themeConfig.colors.warning
                                  : themeConfig.colors.textSecondary,
                          }}
                        >
                          <span className="text-sm">
                            {priority === "HIGH"
                              ? "🔥"
                              : priority === "MEDIUM"
                                ? "⭐"
                                : "🌟"}
                          </span>
                        </div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: themeConfig.colors.text }}
                        >
                          {priority}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-48 rounded-full h-2"
                          style={{
                            background: themeConfig.colors.border + "20",
                          }}
                        >
                          <div
                            className="h-2 rounded-full transform transition-all duration-700 ease-out"
                            style={{
                              width: `${(count / stats.totalRequests) * 100}%`,
                              background:
                                priority === "HIGH"
                                  ? themeConfig.colors.error
                                  : priority === "MEDIUM"
                                    ? themeConfig.colors.warning
                                    : themeConfig.colors.textSecondary,
                            }}
                          ></div>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-sm font-medium transform hover:scale-110 transition-all duration-300"
                          style={{
                            background:
                              priority === "HIGH"
                                ? `${themeConfig.colors.error}10`
                                : priority === "MEDIUM"
                                  ? `${themeConfig.colors.warning}10`
                                  : `${themeConfig.colors.textSecondary}10`,
                            color:
                              priority === "HIGH"
                                ? themeConfig.colors.error
                                : priority === "MEDIUM"
                                  ? themeConfig.colors.warning
                                  : themeConfig.colors.textSecondary,
                          }}
                        >
                          {count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image Modal */}
        {showImageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
          >
            <div
              className="rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-auto"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
                zIndex: Z_INDEX.MODAL,
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: themeConfig.colors.text }}
                >
                  Attached Images
                </h2>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Request image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Text View Modal */}
        {showTextModal && selectedRequest && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
          >
            <div
              className="rounded-xl p-6 max-w-2xl max-h-[80vh] overflow-auto"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
                zIndex: Z_INDEX.MODAL,
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: themeConfig.colors.text }}
                >
                  Request Details
                </h2>
                <button
                  onClick={() => setShowTextModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3
                    className="text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Title
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {selectedRequest.title}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Description
                  </h3>
                  <p
                    className="text-base whitespace-pre-wrap"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {selectedRequest.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3
                      className="text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Location
                    </h3>
                    <p
                      className="text-base"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {selectedRequest.location}
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Category
                    </h3>
                    <p
                      className="text-base"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {selectedRequest.category}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3
                      className="text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Priority
                    </h3>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor:
                          selectedRequest.priority === "HIGH"
                            ? "rgba(239, 68, 68, 0.1)"
                            : selectedRequest.priority === "MEDIUM"
                              ? "rgba(245, 158, 11, 0.1)"
                              : "rgba(107, 114, 128, 0.1)",
                        color:
                          selectedRequest.priority === "HIGH"
                            ? "#DC2626"
                            : selectedRequest.priority === "MEDIUM"
                              ? "#D97706"
                              : "#6B7280",
                      }}
                    >
                      {selectedRequest.priority}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Status
                    </h3>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor:
                          selectedRequest.status === "COMPLETED"
                            ? `${themeConfig.colors.success}20`
                            : selectedRequest.status === "IN_PROGRESS"
                              ? `${themeConfig.colors.primary}20`
                              : `${themeConfig.colors.warning}20`,
                        color:
                          selectedRequest.status === "COMPLETED"
                            ? themeConfig.colors.success
                            : selectedRequest.status === "IN_PROGRESS"
                              ? themeConfig.colors.primary
                              : themeConfig.colors.warning,
                      }}
                    >
                      {selectedRequest.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
          >
            <div
              className="rounded-xl p-6 max-w-md"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
                zIndex: Z_INDEX.MODAL,
              }}
            >
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                Confirm Delete
              </h2>
              <p
                className="mb-6"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Are you sure you want to delete this request? This action cannot
                be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    color: themeConfig.colors.text,
                    border: `1px solid ${themeConfig.colors.border}`,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
