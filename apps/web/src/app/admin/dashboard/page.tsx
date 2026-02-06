"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import WebHeader from "@/components/WebHeader";
import { WebForm, WebFormField } from "@/components/WebForm";
import { WebListGroup, WebListGroupItem } from "@/components/WebListGroup";
import { WebStatsList } from "@/components/WebListGroup";
import ThemeSwitcher from "@/components/ThemeSwitcher";

// Constants
const Z_INDEX = {
  MAX: 9999,
  DROPDOWN: 1000,
  MODAL: 2000,
  TOOLTIP: 3000,
};

// Mock data for demonstration
const mockStats = {
  totalRequests: 156,
  pendingRequests: 23,
  completedRequests: 133,
  completionRate: 85.3,
};

const mockRecentRequests = [
  {
    id: 1,
    title: "HVAC System Maintenance",
    category: "HVAC",
    priority: "High",
    status: "Pending",
    submittedBy: "John Doe",
    submittedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Electrical Panel Inspection",
    category: "Electrical",
    priority: "Medium",
    status: "In Progress",
    submittedBy: "Jane Smith",
    submittedDate: "2024-01-14",
  },
  {
    id: 3,
    title: "Plumbing Leak Repair",
    category: "Plumbing",
    priority: "High",
    status: "Completed",
    submittedBy: "Bob Johnson",
    submittedDate: "2024-01-13",
  },
];

const mockRequests = [
  ...mockRecentRequests,
  {
    id: 4,
    title: "Lighting Fixture Replacement",
    category: "Electrical",
    priority: "Low",
    status: "Pending",
    submittedBy: "Alice Brown",
    submittedDate: "2024-01-12",
  },
  {
    id: 5,
    title: "Fire Extinguisher Inspection",
    category: "Safety",
    priority: "High",
    status: "Completed",
    submittedBy: "Charlie Wilson",
    submittedDate: "2024-01-11",
  },
];

export default function AdminDashboard() {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats] = useState(mockStats);
  const [recentRequests] = useState(mockRecentRequests);
  const [requests] = useState(mockRequests);
  const [filteredRequests, setFilteredRequests] = useState(requests);

  // Filter requests based on search query
  useEffect(() => {
    const filtered = requests.filter(
      (request) =>
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredRequests(filtered);
  }, [searchQuery, requests]);

  const handleStatusUpdate = (requestId: number, newStatus: string) => {
    console.log(`Updating request ${requestId} to status: ${newStatus}`);
  };

  const handleDeleteRequest = (requestId: number) => {
    console.log(`Deleting request: ${requestId}`);
  };

  const viewRequestDetails = (request: any) => {
    console.log("Viewing request details:", request);
  };

  const completionRate = stats.completionRate;

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Header - Conditional based on device */}
        {isMobile ? (
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
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  Back to Home
                </button>
              </div>
            }
          />
        ) : (
          /* Original Desktop Header */
          <header
            className="px-8 py-6 border-b"
            style={{ borderColor: themeConfig.colors.border }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: themeConfig.colors.text }}
                >
                  Admin Dashboard
                </h1>
                <p
                  className="mt-2"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Manage maintenance requests and monitor system performance
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div style={{ zIndex: Z_INDEX.MAX, position: "relative" }}>
                  <ThemeSwitcher />
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50 active:scale-95"
                  style={{
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Navigation Tabs - Conditional based on device */}
        {isMobile ? (
          /* Mobile Navigation */
          <div className="px-4 py-3">
            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: "📊" },
                { id: "requests", label: "Requests", icon: "📋" },
                { id: "analytics", label: "Analytics", icon: "📈" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id ? "scale-105" : "hover:scale-102"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === tab.id
                        ? themeConfig.colors.primary
                        : "transparent",
                    color:
                      activeTab === tab.id
                        ? "white"
                        : themeConfig.colors.textSecondary,
                    border: `1px solid ${themeConfig.colors.border}`,
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Navigation */
          <div
            className="px-8 py-6 border-b"
            style={{ borderColor: themeConfig.colors.border }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex space-x-1">
                {[
                  { id: "overview", label: "Overview", icon: "📊" },
                  { id: "requests", label: "Requests", icon: "📋" },
                  { id: "analytics", label: "Analytics", icon: "📈" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id ? "scale-105" : "hover:scale-102"
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === tab.id
                          ? themeConfig.colors.primary
                          : themeConfig.colors.surface,
                      color:
                        activeTab === tab.id
                          ? "white"
                          : themeConfig.colors.text,
                      border: `1px solid ${themeConfig.colors.border}`,
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className={`${isMobile ? "max-w-4xl" : "max-w-7xl"} mx-auto ${isMobile ? "px-4 py-4" : "px-8 py-8"}`}
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Cards - Conditional based on device */}
              {isMobile ? (
                <WebStatsList
                  stats={[
                    { label: "Total Requests", value: stats.totalRequests },
                    { label: "Pending", value: stats.pendingRequests },
                    { label: "Completed", value: stats.completedRequests },
                    { label: "Completion Rate", value: `${completionRate}%` },
                  ]}
                  columns={2}
                  compact={true}
                />
              ) : (
                /* Desktop Stats Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div
                    className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{
                      borderColor: themeConfig.colors.border,
                      backgroundColor: themeConfig.colors.surface,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-3"
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
                    className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{
                      borderColor: themeConfig.colors.border,
                      backgroundColor: themeConfig.colors.surface,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-3"
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
                    className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{
                      borderColor: themeConfig.colors.border,
                      backgroundColor: themeConfig.colors.surface,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-3"
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
                  <div
                    className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{
                      borderColor: themeConfig.colors.border,
                      backgroundColor: themeConfig.colors.surface,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-3"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {completionRate}%
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Completion Rate
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions - Conditional based on device */}
              {isMobile ? (
                <WebListGroup title="Quick Actions">
                  <WebListGroupItem
                    title="Generate Summary"
                    subtitle="Create maintenance summary report"
                    leftIcon="📄"
                    onClick={() => router.push("/admin/summary-request")}
                  />
                  <WebListGroupItem
                    title="Physical Plant Request"
                    subtitle="Submit new maintenance request"
                    leftIcon="🔧"
                    onClick={() => router.push("/admin/physical-plant-request")}
                  />
                  <WebListGroupItem
                    title="User Management"
                    subtitle="Manage system users"
                    leftIcon="👥"
                    onClick={() => router.push("/admin/users")}
                  />
                  <WebListGroupItem
                    title="View Reports"
                    subtitle="Access detailed reports"
                    leftIcon="📊"
                    onClick={() => router.push("/admin/reports")}
                  />
                </WebListGroup>
              ) : (
                /* Desktop Quick Actions */
                <div>
                  <h2
                    className="text-xl font-semibold mb-6"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => router.push("/admin/summary-request")}
                      className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        borderColor: themeConfig.colors.border,
                        backgroundColor: themeConfig.colors.surface,
                      }}
                    >
                      <div className="text-3xl mb-3">📄</div>
                      <div
                        className="font-semibold mb-2"
                        style={{ color: themeConfig.colors.text }}
                      >
                        Generate Summary
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Create maintenance summary report
                      </div>
                    </button>
                    <button
                      onClick={() =>
                        router.push("/admin/physical-plant-request")
                      }
                      className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        borderColor: themeConfig.colors.border,
                        backgroundColor: themeConfig.colors.surface,
                      }}
                    >
                      <div className="text-3xl mb-3">🔧</div>
                      <div
                        className="font-semibold mb-2"
                        style={{ color: themeConfig.colors.text }}
                      >
                        Physical Plant Request
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Submit new maintenance request
                      </div>
                    </button>
                    <button
                      onClick={() => router.push("/admin/users")}
                      className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        borderColor: themeConfig.colors.border,
                        backgroundColor: themeConfig.colors.surface,
                      }}
                    >
                      <div className="text-3xl mb-3">👥</div>
                      <div
                        className="font-semibold mb-2"
                        style={{ color: themeConfig.colors.text }}
                      >
                        User Management
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Manage system users
                      </div>
                    </button>
                    <button
                      onClick={() => router.push("/admin/reports")}
                      className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        borderColor: themeConfig.colors.border,
                        backgroundColor: themeConfig.colors.surface,
                      }}
                    >
                      <div className="text-3xl mb-3">📊</div>
                      <div
                        className="font-semibold mb-2"
                        style={{ color: themeConfig.colors.text }}
                      >
                        View Reports
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Access detailed reports
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Recent Requests - Conditional based on device */}
              {isMobile ? (
                <WebListGroup title="Recent Requests">
                  {recentRequests.slice(0, 5).map((request) => (
                    <WebListGroupItem
                      key={request.id}
                      title={request.title}
                      subtitle={`${request.category} • ${request.priority} • ${request.status}`}
                      leftIcon="📋"
                      onClick={() => viewRequestDetails(request)}
                      badge={request.status}
                    />
                  ))}
                </WebListGroup>
              ) : (
                /* Desktop Recent Requests Table */
                <div>
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Recent Requests
                  </h2>
                  <div
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: themeConfig.colors.border }}
                  >
                    <table className="w-full">
                      <thead
                        style={{ backgroundColor: themeConfig.colors.surface }}
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
                            Submitted By
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
                        {recentRequests.slice(0, 5).map((request) => (
                          <tr
                            key={request.id}
                            className="border-t"
                            style={{ borderColor: themeConfig.colors.border }}
                          >
                            <td className="px-6 py-4">
                              <div
                                className="font-medium"
                                style={{ color: themeConfig.colors.text }}
                              >
                                {request.title}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div
                                style={{
                                  color: themeConfig.colors.textSecondary,
                                }}
                              >
                                {request.category}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  request.priority === "High"
                                    ? "text-white"
                                    : request.priority === "Medium"
                                      ? "text-white"
                                      : "text-white"
                                }`}
                                style={{
                                  backgroundColor:
                                    request.priority === "High"
                                      ? themeConfig.colors.error
                                      : request.priority === "Medium"
                                        ? themeConfig.colors.warning
                                        : themeConfig.colors.primary,
                                }}
                              >
                                {request.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className="px-2 py-1 text-xs font-medium rounded-full text-white"
                                style={{
                                  backgroundColor:
                                    request.status === "Completed"
                                      ? themeConfig.colors.success
                                      : request.status === "In Progress"
                                        ? themeConfig.colors.primary
                                        : themeConfig.colors.warning,
                                }}
                              >
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div
                                style={{
                                  color: themeConfig.colors.textSecondary,
                                }}
                              >
                                {request.submittedBy}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => viewRequestDetails(request)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="space-y-6">
              {/* Search Bar - Conditional based on device */}
              {isMobile ? (
                <div
                  className="rounded-lg border p-3"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                    borderColor: themeConfig.colors.border,
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    style={{
                      borderColor: themeConfig.colors.border,
                      backgroundColor: themeConfig.colors.background,
                      color: themeConfig.colors.text,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  />
                </div>
              ) : (
                /* Desktop Search Bar */
                <div className="flex items-center justify-between">
                  <div className="flex-1 max-w-lg">
                    <input
                      type="text"
                      placeholder="Search requests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{
                        borderColor: themeConfig.colors.border,
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Requests Table - Conditional based on device */}
              {isMobile ? (
                <WebListGroup title="All Requests">
                  {filteredRequests.slice(0, 10).map((request) => (
                    <WebListGroupItem
                      key={request.id}
                      title={request.title}
                      subtitle={`${request.category} • ${request.priority} • ${request.status}`}
                      leftIcon="📋"
                      onClick={() => viewRequestDetails(request)}
                      badge={request.status}
                    />
                  ))}
                </WebListGroup>
              ) : (
                /* Desktop Requests Table */
                <div
                  className="rounded-lg border overflow-hidden"
                  style={{ borderColor: themeConfig.colors.border }}
                >
                  <table className="w-full">
                    <thead
                      style={{ backgroundColor: themeConfig.colors.surface }}
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
                          Submitted By
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Date
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
                          className={`border-t ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                          style={{ borderColor: themeConfig.colors.border }}
                        >
                          <td className="px-6 py-4">
                            <div
                              className="font-medium"
                              style={{ color: themeConfig.colors.text }}
                            >
                              {request.title}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              style={{
                                color: themeConfig.colors.textSecondary,
                              }}
                            >
                              {request.category}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                request.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : request.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                request.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : request.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              style={{
                                color: themeConfig.colors.textSecondary,
                              }}
                            >
                              {request.submittedBy}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              style={{
                                color: themeConfig.colors.textSecondary,
                              }}
                            >
                              {request.submittedDate}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => viewRequestDetails(request)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(request.id, "Completed")
                                }
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleDeleteRequest(request.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
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
              )}
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-8">
              {isMobile ? (
                /* Mobile Analytics */
                <div className="space-y-6">
                  <WebListGroup title="Analytics Overview">
                    <WebListGroupItem
                      title="Request Trends"
                      subtitle="Monthly request patterns"
                      leftIcon="📈"
                    />
                    <WebListGroupItem
                      title="Category Distribution"
                      subtitle="Requests by category"
                      leftIcon="📊"
                    />
                    <WebListGroupItem
                      title="Completion Rates"
                      subtitle="Performance metrics"
                      leftIcon="✅"
                    />
                    <WebListGroupItem
                      title="Response Times"
                      subtitle="Average resolution time"
                      leftIcon="⏱️"
                    />
                  </WebListGroup>

                  <WebListGroup title="Key Metrics">
                    <WebListGroupItem
                      title="Average Response Time"
                      subtitle="2.3 days"
                      leftIcon="⏱️"
                    />
                    <WebListGroupItem
                      title="Most Active Category"
                      subtitle="HVAC (45 requests)"
                      leftIcon="🔧"
                    />
                    <WebListGroupItem
                      title="Top Performer"
                      subtitle="John Doe (12 completed)"
                      leftIcon="🏆"
                    />
                  </WebListGroup>
                </div>
              ) : (
                /* Desktop Analytics */
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div
                      className="p-6 rounded-lg border"
                      style={{ borderColor: themeConfig.colors.border }}
                    >
                      <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: themeConfig.colors.text }}
                      >
                        Request Trends
                      </h3>
                      <div
                        className="h-64 flex items-center justify-center"
                        style={{
                          backgroundColor: themeConfig.colors.surface,
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          📊 Chart placeholder - Request trends over time
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-6 rounded-lg border"
                      style={{ borderColor: themeConfig.colors.border }}
                    >
                      <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: themeConfig.colors.text }}
                      >
                        Category Distribution
                      </h3>
                      <div
                        className="h-64 flex items-center justify-center"
                        style={{
                          backgroundColor: themeConfig.colors.surface,
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          📈 Chart placeholder - Category breakdown
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-lg border"
                    style={{ borderColor: themeConfig.colors.border }}
                  >
                    <h3
                      className="text-lg font-semibold mb-4"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div
                          className="text-2xl font-bold mb-2"
                          style={{ color: themeConfig.colors.text }}
                        >
                          2.3 days
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Average Response Time
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-2xl font-bold mb-2"
                          style={{ color: themeConfig.colors.text }}
                        >
                          HVAC
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Most Active Category (45 requests)
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-2xl font-bold mb-2"
                          style={{ color: themeConfig.colors.text }}
                        >
                          John Doe
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Top Performer (12 completed)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
