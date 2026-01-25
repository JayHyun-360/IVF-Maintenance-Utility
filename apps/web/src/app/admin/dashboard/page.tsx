"use client";

// Admin Dashboard - Desktop Only Version
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
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function AdminDashboard() {
  const router = useRouter();
  const { themeConfig } = useTheme();
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState<
    MaintenanceRequest[]
  >([]);

  // Load data on component mount
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load all data
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
    setFilteredRequests(realAllRequests);
  };

  // Filter requests based on search
  useEffect(() => {
    const filtered = allRequests.filter(
      (request) =>
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

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
                }}
              >
                <svg
                  className="w-4 h-4 text-white"
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
              <h1
                className="text-xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  color: themeConfig.colors.text,
                  border: `1px solid ${themeConfig.colors.border}`,
                }}
              >
                Back to Portal
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div
        className="border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex space-x-8">
            {["overview", "requests", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent"
                }`}
                style={{
                  color:
                    activeTab === tab
                      ? "#3B82F6"
                      : themeConfig.colors.textSecondary,
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-5 gap-6">
              <div
                className="rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.totalRequests}
                </div>
                <div
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Total Requests
                </div>
              </div>
              <div
                className="rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.pendingRequests}
                </div>
                <div
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Pending
                </div>
              </div>
              <div
                className="rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.inProgressRequests}
                </div>
                <div
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  In Progress
                </div>
              </div>
              <div
                className="rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  {stats.completedRequests}
                </div>
                <div
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Completed
                </div>
              </div>
              <div
                className="rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#10B981" }}
                >
                  {completionRate}%
                </div>
                <div
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Completion Rate
                </div>
              </div>
            </div>

            {/* Recent Requests */}
            <div
              className="rounded-xl shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: themeConfig.colors.border }}
              >
                <h2
                  className="text-lg font-semibold"
                  style={{ color: themeConfig.colors.text }}
                >
                  Recent Requests
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentRequests.slice(0, 5).map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        border: "1px solid",
                      }}
                    >
                      <div className="flex-1">
                        <h3
                          className="font-medium"
                          style={{ color: themeConfig.colors.text }}
                        >
                          {request.title}
                        </h3>
                        <p
                          className="text-sm mt-1"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.location} • {request.category}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === "COMPLETED"
                              ? ""
                              : request.status === "IN_PROGRESS"
                                ? ""
                                : ""
                          }`}
                          style={{
                            background:
                              request.status === "COMPLETED"
                                ? `linear-gradient(135deg, ${themeConfig.colors.success}20 0%, ${themeConfig.colors.success}10 100%)`
                                : request.status === "IN_PROGRESS"
                                  ? `linear-gradient(135deg, ${themeConfig.colors.primary}20 0%, ${themeConfig.colors.primary}10 100%)`
                                  : `linear-gradient(135deg, ${themeConfig.colors.warning}20 0%, ${themeConfig.colors.warning}10 100%)`,
                            color:
                              request.status === "COMPLETED"
                                ? themeConfig.colors.success
                                : request.status === "IN_PROGRESS"
                                  ? themeConfig.colors.primary
                                  : themeConfig.colors.warning,
                            border: `1px solid ${
                              request.status === "COMPLETED"
                                ? themeConfig.colors.success
                                : request.status === "IN_PROGRESS"
                                  ? themeConfig.colors.primary
                                  : themeConfig.colors.warning
                            }30`,
                          }}
                        >
                          {request.status === "COMPLETED"
                            ? "🟢 "
                            : request.status === "IN_PROGRESS"
                              ? "🔵 "
                              : "🟡 "}
                          {request.status.replace("_", " ")}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.priority === "HIGH"
                              ? "bg-red-100 text-red-800"
                              : request.priority === "MEDIUM"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {request.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div
              className="rounded-xl p-4 shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-xl"
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
              className="rounded-xl shadow-lg overflow-hidden"
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
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        style={{
                          borderColor: themeConfig.colors.border,
                          borderBottom: "1px solid",
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
                              {request.description.substring(0, 50)}...
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
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.priority === "HIGH"
                                ? "bg-red-100 text-red-800"
                                : request.priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={request.status}
                            onChange={(e) =>
                              handleStatusUpdate(request.id, e.target.value)
                            }
                            className="text-sm rounded-lg px-2 py-1"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              borderColor: themeConfig.colors.border,
                              color: themeConfig.colors.text,
                              border: "1px solid",
                            }}
                          >
                            <option
                              value="PENDING"
                              style={{
                                color: themeConfig.colors.warning,
                                fontWeight: "bold",
                              }}
                            >
                              ⬤ Pending
                            </option>
                            <option
                              value="IN_PROGRESS"
                              style={{
                                color: themeConfig.colors.primary,
                                fontWeight: "bold",
                              }}
                            >
                              ⬤ In Progress
                            </option>
                            <option
                              value="COMPLETED"
                              style={{
                                color: themeConfig.colors.success,
                                fontWeight: "bold",
                              }}
                            >
                              ⬤ Completed
                            </option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {request.images && request.images.length > 0 && (
                              <button
                                onClick={() => viewImages(request.images || [])}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                View Images
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteRequest(request)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-auto"
            style={{
              backgroundColor: themeConfig.colors.surface,
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-xl p-6 max-w-md"
            style={{
              backgroundColor: themeConfig.colors.surface,
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
  );
}
