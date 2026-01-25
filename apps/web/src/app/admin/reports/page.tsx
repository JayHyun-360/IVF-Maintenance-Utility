"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getMaintenanceRequests,
  getMaintenanceStats,
  getRequestsByCategory,
  getRequestsByPriority,
} from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function AdminReportsPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [stats, setStats] = useState<any>({});
  const [categoryData, setCategoryData] = useState<any>({});
  const [priorityData, setPriorityData] = useState<any>({});
  const [timeRange, setTimeRange] = useState("30");

  useEffect(() => {
    setStats(getMaintenanceStats());
    setCategoryData(getRequestsByCategory());
    setPriorityData(getRequestsByPriority());
  }, []);

  const completionRate =
    stats.totalRequests > 0
      ? Math.round((stats.completedRequests / stats.totalRequests) * 100)
      : 0;

  return (
    <div
      style={{ backgroundColor: themeConfig.colors.background }}
      className="min-h-screen"
    >
      <header
        className="px-8 py-6 border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-3 rounded-xl mr-4"
              style={{
                backgroundColor: themeConfig.colors.surface,
                color: themeConfig.colors.text,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              ←
            </button>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                Reports & Analytics
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
              }}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6 text-blue-500"
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
                <span
                  className="text-xs font-medium"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  +12%
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                {stats.totalRequests}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Total Requests
              </div>
            </div>

            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6 text-green-500"
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
                <span
                  className="text-xs font-medium"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  +8%
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                {stats.completedRequests}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Completed
              </div>
            </div>

            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6 text-yellow-500"
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
                <span
                  className="text-xs font-medium"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  -5%
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                {stats.pendingRequests}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Pending
              </div>
            </div>

            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6 text-purple-500"
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
                <span className="text-xs font-medium text-green-600">
                  +{completionRate}%
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.text }}
              >
                {completionRate}%
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Completion Rate
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Category Distribution */}
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                Requests by Category
              </h3>
              <div className="space-y-3">
                {Object.entries(categoryData).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{
                          backgroundColor:
                            category === "PLUMBING"
                              ? "#3B82F6"
                              : category === "ELECTRICAL"
                                ? "#10B981"
                                : category === "HVAC"
                                  ? "#F59E0B"
                                  : category === "CARPENTRY"
                                    ? "#8B5CF6"
                                    : "#EF4444",
                        }}
                      ></div>
                      <span
                        className="text-sm"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {category}
                      </span>
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {count as number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Distribution */}
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                Requests by Priority
              </h3>
              <div className="space-y-3">
                {Object.entries(priorityData).map(([priority, count]) => (
                  <div
                    key={priority}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{
                          backgroundColor:
                            priority === "URGENT"
                              ? "#EF4444"
                              : priority === "HIGH"
                                ? "#F97316"
                                : priority === "MEDIUM"
                                  ? "#F59E0B"
                                  : "#6B7280",
                        }}
                      ></div>
                      <span
                        className="text-sm"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {priority}
                      </span>
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {count as number}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div
            className="p-6 rounded-xl shadow-lg"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: themeConfig.colors.text }}
            >
              Export Reports
            </h3>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                  border: "1px solid",
                }}
              >
                Export as PDF
              </button>
              <button
                className="px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                  border: "1px solid",
                }}
              >
                Export as Excel
              </button>
              <button
                className="px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                  border: "1px solid",
                }}
              >
                Export as CSV
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
