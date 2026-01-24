"use client";

// IVF Maintenance Utility - Deployed to Vercel
// Trigger Vercel deployment - New project
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { getMaintenanceStats } from "@/lib/data";
import { Theme } from "@/lib/theme";

export default function Home() {
  const router = useRouter();
  const { themeConfig, setTheme, availableThemes } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

    // Set up interval to refresh data every 30 seconds
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
      className={`min-h-screen dashboard-theme`}
      style={{
        backgroundColor: themeConfig.colors.background,
        color: themeConfig.colors.text,
      }}
    >
      {/* Enhanced Header */}
      <div
        className="shadow-sm border-b theme-card"
        style={{
          backgroundColor: themeConfig.colors.surface,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <svg
                  className="w-5 h-5 sm:w-7 sm:h-7 text-white"
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
              <div className="hidden sm:block">
                <h1
                  className="text-lg sm:text-xl font-bold"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Maintenance Portal
                </h1>
                <p
                  className="text-xs sm:text-sm"
                  style={{
                    color: themeConfig.colors.textSecondary,
                  }}
                >
                  Integrated Visual Feedback & Maintenance Utility
                </p>
              </div>
              {/* Mobile-only title */}
              <div className="sm:hidden">
                <h1
                  className="text-lg font-bold"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  IVF Portal
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                  style={{
                    color: themeConfig.colors.text,
                  }}
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
                </button>

                {showSettings && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg border theme-card z-50"
                    style={{
                      backgroundColor: themeConfig.colors.surface,
                      borderColor: themeConfig.colors.border,
                    }}
                  >
                    <div className="p-4">
                      <h3
                        className="text-sm font-semibold mb-3"
                        style={{
                          color: themeConfig.colors.text,
                        }}
                      >
                        Settings
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label
                            className="block text-xs font-medium mb-2"
                            style={{
                              color: themeConfig.colors.textSecondary,
                            }}
                          >
                            Theme
                          </label>
                          <div className="space-y-2">
                            {availableThemes.map((theme) => (
                              <button
                                key={theme.name}
                                onClick={() => {
                                  setTheme(theme.name as Theme);
                                  setShowSettings(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  themeConfig.name === theme.name
                                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                                    : "hover:bg-gray-50 border border-transparent"
                                }`}
                                style={{
                                  color:
                                    themeConfig.name === theme.name
                                      ? undefined
                                      : themeConfig.colors.text,
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{theme.displayName}</span>
                                  {themeConfig.name === theme.name && (
                                    <svg
                                      className="w-4 h-4 text-purple-600"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showMobileMenu ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div
              className="sm:hidden border-t pt-4 pb-3"
              style={{
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="space-y-3">
                {/* Mobile Settings */}
                <div className="px-3">
                  <button
                    onClick={() => {
                      setShowSettings(!showSettings);
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3"
                    style={{
                      color: themeConfig.colors.text,
                    }}
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
                    <span className="text-sm">Settings</span>
                  </button>

                  {showSettings && (
                    <div
                      className="mt-2 p-3 rounded-lg border"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                      }}
                    >
                      <h4
                        className="text-xs font-semibold mb-2"
                        style={{
                          color: themeConfig.colors.textSecondary,
                        }}
                      >
                        Theme
                      </h4>
                      <div className="space-y-2">
                        {availableThemes.map((theme) => (
                          <button
                            key={theme.name}
                            onClick={() => {
                              setTheme(theme.name as Theme);
                              setShowSettings(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              themeConfig.name === theme.name
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : "hover:bg-gray-50 border border-transparent"
                            }`}
                            style={{
                              color:
                                themeConfig.name === theme.name
                                  ? undefined
                                  : themeConfig.colors.text,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{theme.displayName}</span>
                              {themeConfig.name === theme.name && (
                                <svg
                                  className="w-4 h-4 text-purple-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="mb-8">
          {/* Mobile and Desktop Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="rounded-lg shadow-lg p-4 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Total Requests
                  </p>
                  <p
                    className="text-2xl sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.totalRequests}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-2"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#60a5fa" : "#3b82f6",
                    }}
                  >
                    {stats.pendingRequests > 0
                      ? `${stats.pendingRequests} pending`
                      : "All resolved"}
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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

            <div
              className="rounded-lg shadow-lg p-4 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    In Progress
                  </p>
                  <p
                    className="text-2xl sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.inProgressRequests}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-2"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#f59e0b" : "#d97706",
                    }}
                  >
                    {stats.inProgressRequests > 0
                      ? "Being handled"
                      : "None active"}
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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

            <div
              className="rounded-lg shadow-lg p-4 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Pending
                  </p>
                  <p
                    className="text-2xl sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.pendingRequests}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-2"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#ef4444" : "#dc2626",
                    }}
                  >
                    {stats.pendingRequests > 0 ? "Awaiting action" : "No queue"}
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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

            <div
              className="rounded-lg shadow-lg p-4 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Completion Rate
                  </p>
                  <p
                    className="text-2xl sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {completionRate}%
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-2"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#4ade80" : "#22c55e",
                    }}
                  >
                    {stats.completedRequests} of {stats.totalRequests} completed
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div
              className="rounded-lg shadow-lg p-6 theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
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
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Quick Actions
                    </h2>
                    <p
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Get started with maintenance operations
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <button
                  onClick={() => router.push("/auth")}
                  className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 text-left"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">
                      Submit Request
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg opacity-90 leading-relaxed mb-3">
                    Report maintenance issues with image support
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                      Fast Response
                    </span>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                      Photo Upload
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => router.push("/auth")}
                  className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 text-left"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">
                      Admin Dashboard
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg opacity-90 leading-relaxed mb-3">
                    Manage requests and analytics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                      Analytics
                    </span>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                      Management
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Features Section */}
            <div
              className="rounded-lg shadow-lg p-6 theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Key Features
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Powerful tools for efficient maintenance management
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div
                  className="p-6 rounded-lg border transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgb(239, 246, 255)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.3)"
                        : "rgb(191, 219, 254)",
                  }}
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
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
                  <h3
                    className="font-semibold mb-2 text-lg"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#60a5fa" : "#1e40af",
                    }}
                  >
                    Real-time Updates
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#93c5fd" : "#1e40af",
                    }}
                  >
                    Instant notifications on request status
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgb(240, 253, 244)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.3)"
                        : "rgb(187, 247, 208)",
                  }}
                >
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-semibold mb-2 text-lg"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#4ade80" : "#166534",
                    }}
                  >
                    Image Support
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#86efac" : "#166534",
                    }}
                  >
                    Attach photos to maintenance requests
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(168, 85, 247, 0.1)"
                        : "rgb(250, 245, 255)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(168, 85, 247, 0.3)"
                        : "rgb(233, 213, 255)",
                  }}
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-semibold mb-2 text-lg"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#c084fc" : "#7c3aed",
                    }}
                  >
                    Priority Management
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#e9d5ff" : "#7c3aed",
                    }}
                  >
                    Urgent requests get immediate attention
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(245, 158, 11, 0.1)"
                        : "rgb(255, 251, 235)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(245, 158, 11, 0.3)"
                        : "rgb(252, 211, 77)",
                  }}
                >
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
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
                  <h3
                    className="font-semibold mb-2 text-lg"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#fbbf24" : "#d97706",
                    }}
                  >
                    Quick Response
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#fde68a" : "#d97706",
                    }}
                  >
                    Fast processing of maintenance requests
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgb(254, 242, 242)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "rgb(254, 226, 226)",
                  }}
                >
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-semibold mb-2 text-lg"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#f87171" : "#dc2626",
                    }}
                  >
                    Status Tracking
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#fca5a5" : "#dc2626",
                    }}
                  >
                    Track request progress in real-time
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(14, 165, 233, 0.1)"
                        : "rgb(240, 249, 255)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(14, 165, 233, 0.3)"
                        : "rgb(186, 230, 253)",
                  }}
                >
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center mb-4">
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
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-semibold mb-2 text-lg"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#38bdf8" : "#0284c7",
                    }}
                  >
                    Cloud Storage
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#7dd3fc" : "#0284c7",
                    }}
                  >
                    Secure cloud-based data storage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Status & Info */}
          <div className="space-y-6">
            {/* System Status */}
            <div
              className="rounded-lg shadow-lg p-6 theme-card border-2"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor:
                  themeConfig.name === "dark"
                    ? "rgba(34, 197, 94, 0.3)"
                    : "#22c55e",
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
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
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#4ade80" : "#166534",
                    }}
                  >
                    System Status
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#86efac" : "#166534",
                    }}
                  >
                    All systems operational
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div
                  className="flex items-center justify-between p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgb(240, 253, 244)",
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#4ade80" : "#166534",
                      }}
                    >
                      Application
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                    Online
                  </span>
                </div>
                <div
                  className="flex items-center justify-between p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgb(240, 253, 244)",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#4ade80" : "#166534",
                    }}
                  >
                    Database
                  </span>
                  <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                    Connected
                  </span>
                </div>
                <div
                  className="flex items-center justify-between p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgb(239, 246, 255)",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#60a5fa" : "#1e40af",
                    }}
                  >
                    Deployment
                  </span>
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                    Vercel
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="rounded-lg shadow-lg p-6 theme-card border-2"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor:
                  themeConfig.name === "dark"
                    ? "rgba(99, 102, 241, 0.3)"
                    : themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Quick Links
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Fast access to key features
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                    POPULAR
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push("/auth")}
                  className="w-full p-4 text-left rounded-xl transition-all duration-300 flex items-center space-x-4 group hover:shadow-lg transform hover:scale-[1.02]"
                  style={{
                    color: themeConfig.colors.text,
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.05)"
                        : "rgba(59, 130, 246, 0.02)",
                    border: `1px solid ${themeConfig.name === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.15)"
                        : "rgba(59, 130, 246, 0.08)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.4)"
                        : "rgba(59, 130, 246, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.05)"
                        : "rgba(59, 130, 246, 0.02)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(59, 130, 246, 0.1)";
                  }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">🔧</span>
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-semibold text-sm"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Submit Maintenance Request
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Report issues with image support
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      NEW
                    </span>
                    <svg
                      className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ color: themeConfig.colors.textSecondary }}
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
                  onClick={() => router.push("/auth")}
                  className="w-full p-4 text-left rounded-xl transition-all duration-300 flex items-center space-x-4 group hover:shadow-lg transform hover:scale-[1.02]"
                  style={{
                    color: themeConfig.colors.text,
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.05)"
                        : "rgba(34, 197, 94, 0.02)",
                    border: `1px solid ${themeConfig.name === "dark" ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.1)"}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(34, 197, 94, 0.08)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.4)"
                        : "rgba(34, 197, 94, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.05)"
                        : "rgba(34, 197, 94, 0.02)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(34, 197, 94, 0.1)";
                  }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-semibold text-sm"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Admin Dashboard
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Manage requests and analytics
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      ADMIN
                    </span>
                    <svg
                      className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ color: themeConfig.colors.textSecondary }}
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
                  onClick={() => router.push("/request/guest")}
                  className="w-full p-4 text-left rounded-xl transition-all duration-300 flex items-center space-x-4 group hover:shadow-lg transform hover:scale-[1.02]"
                  style={{
                    color: themeConfig.colors.text,
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(168, 85, 247, 0.05)"
                        : "rgba(168, 85, 247, 0.02)",
                    border: `1px solid ${themeConfig.name === "dark" ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.1)"}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(168, 85, 247, 0.15)"
                        : "rgba(168, 85, 247, 0.08)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(168, 85, 247, 0.4)"
                        : "rgba(168, 85, 247, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(168, 85, 247, 0.05)"
                        : "rgba(168, 85, 247, 0.02)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(168, 85, 247, 0.2)"
                        : "rgba(168, 85, 247, 0.1)";
                  }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">👤</span>
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-semibold text-sm"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Guest Request
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Quick submission without login
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      GUEST
                    </span>
                    <svg
                      className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ color: themeConfig.colors.textSecondary }}
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

              {/* Additional Quick Actions */}
              <div
                className="mt-6 pt-4 border-t"
                style={{ borderColor: themeConfig.colors.border }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-medium"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Quick Actions
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    ⚡ Fast access
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => router.push("/student")}
                    className="p-2 text-center rounded-lg transition-all duration-200 hover:bg-gray-100 text-xs"
                    style={{
                      color: themeConfig.colors.text,
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        themeConfig.name === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        themeConfig.name === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)";
                    }}
                  >
                    🎓 Student Portal
                  </button>
                  <button
                    onClick={() => router.push("/admin/dashboard")}
                    className="p-2 text-center rounded-lg transition-all duration-200 hover:bg-gray-100 text-xs"
                    style={{
                      color: themeConfig.colors.text,
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        themeConfig.name === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        themeConfig.name === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)";
                    }}
                  >
                    ⚙️ Admin Panel
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div
              className="rounded-lg shadow-lg p-6 theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="text-center">
                <p
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  © 2026 IVF Maintenance Utility
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Version 1.0.0 • Deployed on Vercel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
