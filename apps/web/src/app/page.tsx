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
      {/* Header with Gradient Background */}
      <header
        className="px-8 py-16 text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-10 left-10 w-32 h-32 rounded-full"
            style={{ backgroundColor: themeConfig.colors.accent }}
          ></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 rounded-full"
            style={{ backgroundColor: themeConfig.colors.accent }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full"
            style={{ backgroundColor: themeConfig.colors.accent }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-8 shadow-2xl transform hover:scale-110 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.accent} 0%, ${themeConfig.colors.primary} 100%)`,
              boxShadow: `0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)`,
            }}
          >
            <svg
              className="w-12 h-12 text-white"
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
            className="text-5xl font-bold mb-4 text-white"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          >
            Maintenance Portal
          </h1>
          <p
            className="text-xl text-white opacity-90"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
          >
            Integrated Visual Feedback & Maintenance Utility
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-12 -mt-8">
            <div
              className="rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                }}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div
                className="text-3xl font-bold mb-2"
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
              className="rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.warning} 0%, ${themeConfig.colors.accent} 100%)`,
                }}
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div
                className="text-3xl font-bold mb-2"
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
              className="rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.accent} 100%)`,
                }}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                {stats.inProgressRequests}
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                In Progress
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.success} 0%, ${themeConfig.colors.secondary} 100%)`,
                }}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div
                className="text-3xl font-bold mb-2"
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

          {/* Enhanced Action Cards */}
          <div className="grid grid-cols-3 gap-6">
            <button
              onClick={() => router.push("/student")}
              className="p-8 rounded-2xl text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                  boxShadow: `0 8px 20px rgba(0,0,0,0.15)`,
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
                className="inline-flex items-center text-sm font-medium transform group-hover:translate-x-1 transition-all duration-300"
                style={{ color: themeConfig.colors.primary }}
              >
                Get Started
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-all duration-300"
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
              className="p-8 rounded-2xl text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.accent} 0%, ${themeConfig.colors.primary} 100%)`,
                  boxShadow: `0 8px 20px rgba(0,0,0,0.15)`,
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6m2 0h2a2 2 0 002-2v-1m-8 0V7a2 2 0 012-2h2a2 2 0 012 2v8m-6 0h6"
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
                className="inline-flex items-center text-sm font-medium transform group-hover:translate-x-1 transition-all duration-300"
                style={{ color: themeConfig.colors.accent }}
              >
                Enter Dashboard
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-all duration-300"
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
              className="p-8 rounded-2xl text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group border-2"
              style={{
                background: `linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(252, 165, 165, 0.1) 100%)`,
                borderColor: "#FCA5A5",
                boxShadow: `0 10px 30px rgba(239, 68, 68, 0.15), 0 0 0 1px rgba(252, 165, 165, 0.2)`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-300 animate-pulse"
                style={{
                  background: `linear-gradient(135deg, #EF4444 0%, #DC2626 100%)`,
                  boxShadow: `0 8px 20px rgba(239, 68, 68, 0.25)`,
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
              <div className="inline-flex items-center text-sm font-medium text-red-600 transform group-hover:translate-x-1 transition-all duration-300">
                Emergency
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-all duration-300"
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
