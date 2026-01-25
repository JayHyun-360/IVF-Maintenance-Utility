"use client";

// IVF Maintenance Utility - Desktop Only Version
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { getMaintenanceStats } from "@/lib/data";

export default function Home() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });

  // Load real data on component mount
  useEffect(() => {
    const loadData = () => {
      const realStats = getMaintenanceStats();
      setStats(realStats);
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate completion rate
  const completionRate =
    stats.totalRequests > 0
      ? Math.round((stats.completedRequests / stats.totalRequests) * 100)
      : 0;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: themeConfig.colors.background,
        color: themeConfig.colors.text,
      }}
    >
      {/* Header */}
      <header className="px-8 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div
            className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-xl"
            style={{
              background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
            }}
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: themeConfig.colors.text }}
          >
            Maintenance Portal
          </h1>
          <p
            className="text-lg"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            Integrated Visual Feedback & Maintenance Utility
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <div
              className="rounded-2xl p-6 shadow-lg text-center"
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
              className="rounded-2xl p-6 shadow-lg text-center"
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
              className="rounded-2xl p-6 shadow-lg text-center"
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
              className="rounded-2xl p-6 shadow-lg text-center"
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
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-3 gap-8">
            <button
              onClick={() => router.push("/student")}
              className="rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-left group"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
                }}
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: themeConfig.colors.text }}
              >
                Submit Request
              </h3>
              <p
                className="text-base"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Report maintenance issues with photo support and real-time
                tracking
              </p>
            </button>

            <button
              onClick={() => router.push("/admin/dashboard")}
              className="rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-left group"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                }}
              >
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: themeConfig.colors.text }}
              >
                Admin Dashboard
              </h3>
              <p
                className="text-base"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Manage requests, view analytics, and monitor system performance
              </p>
            </button>

            <button
              className="rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-left group"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                }}
              >
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: themeConfig.colors.text }}
              >
                System Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Completion Rate
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#10B981" }}
                  >
                    {completionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${completionRate}%`,
                      backgroundColor: "#10B981",
                    }}
                  ></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-8 border-t"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p
            className="text-sm"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            © 2024 IVF Maintenance Utility. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
