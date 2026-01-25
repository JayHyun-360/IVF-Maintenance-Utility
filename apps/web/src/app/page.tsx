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
          <div className="grid grid-cols-3 gap-6">
            <button
              onClick={() => router.push("/student")}
              className="p-8 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              >
                <svg
                  className="w-8 h-8 text-blue-500"
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
                className="text-xl font-bold mb-3"
                style={{ color: themeConfig.colors.text }}
              >
                Submit Request
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Report maintenance issues and track resolution progress
              </p>
              <div
                className="inline-flex items-center text-sm font-medium"
                style={{ color: "#3B82F6" }}
              >
                Get Started
                <svg
                  className="w-4 h-4 ml-1"
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
              </div>
            </button>

            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-8 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
              >
                <svg
                  className="w-8 h-8 text-purple-500"
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
                className="text-xl font-bold mb-3"
                style={{ color: themeConfig.colors.text }}
              >
                Admin Dashboard
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Manage requests, view analytics, and coordinate responses
              </p>
              <div
                className="inline-flex items-center text-sm font-medium"
                style={{ color: "#8B5CF6" }}
              >
                Enter Dashboard
                <svg
                  className="w-4 h-4 ml-1"
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
              </div>
            </button>

            <button
              onClick={() => router.push("/emergency")}
              className="p-8 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.05)",
                borderColor: "#FCA5A5",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              >
                <svg
                  className="w-8 h-8 text-red-600"
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
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-600">
                Emergency Report
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Report critical maintenance emergencies requiring immediate
                attention
              </p>
              <div className="inline-flex items-center text-sm font-medium text-red-600">
                Emergency
                <svg
                  className="w-4 h-4 ml-1"
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
              </div>
            </button>
          </div>

          {/* Additional Functions */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <button
              onClick={() => router.push("/student/history")}
              className="p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Request History
              </h4>
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Track your submitted requests
              </p>
            </button>

            <button
              onClick={() => router.push("/admin/reports")}
              className="p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
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
                    d="M9 17v1a2 2 0 002 2h2a2 2 0 002-2v-1m-6 0h6m2 0h2a2 2 0 002-2v-1m-8 0V7a2 2 0 012-2h2a2 2 0 012 2v8m-6 0h6"
                  />
                </svg>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Reports
              </h4>
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Analytics and insights
              </p>
            </button>

            <button
              onClick={() => router.push("/admin/users")}
              className="p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
              >
                <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                User Management
              </h4>
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Manage system users
              </p>
            </button>

            <button
              onClick={() => router.push("/admin/physical-plant-request")}
              className="p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(236, 72, 153, 0.1)" }}
              >
                <svg
                  className="w-6 h-6 text-pink-500"
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
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Plant Request
              </h4>
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Physical plant requests
              </p>
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
