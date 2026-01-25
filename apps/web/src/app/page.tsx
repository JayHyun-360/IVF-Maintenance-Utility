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
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <svg
                  className="w-3 h-3 sm:w-7 sm:h-7 text-white"
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
                  className="text-sm sm:text-xl font-bold"
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
                  className="text-sm font-bold"
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
                className="p-1 rounded-lg hover:bg-gray-100 transition-all duration-200"
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                <svg
                  className="w-4 h-4"
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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="mb-4 sm:mb-8">
          {/* Mobile and Desktop Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <div
              className="rounded-lg shadow-lg p-2 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
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
                    className="text-lg sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.totalRequests}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-1"
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
                <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-7 sm:h-7 text-white"
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
              className="rounded-lg shadow-lg p-2 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
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
                    className="text-lg sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.inProgressRequests}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-1"
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
                <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-7 sm:h-7 text-white"
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
              className="rounded-lg shadow-lg p-2 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
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
                    className="text-lg sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {stats.pendingRequests}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-1"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#ef4444" : "#dc2626",
                    }}
                  >
                    {stats.pendingRequests > 0 ? "Awaiting action" : "No queue"}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-7 sm:h-7 text-white"
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
              className="rounded-lg shadow-lg p-2 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
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
                    className="text-lg sm:text-3xl font-bold mt-1"
                    style={{ color: themeConfig.colors.text }}
                  >
                    {completionRate}%
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-1"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#4ade80" : "#22c55e",
                    }}
                  >
                    {stats.completedRequests} of {stats.totalRequests} completed
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 sm:w-7 sm:h-7 text-white"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Side - Main Actions */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-6">
            {/* Quick Actions */}
            <div
              className="rounded-lg shadow-lg p-3 sm:p-6 theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-6 sm:h-6 text-white"
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
                      className="text-sm sm:text-xl font-bold"
                      style={{ color: themeConfig.colors.text }}
                    >
                      <span className="hidden sm:inline">Quick Actions</span>
                      <span className="sm:hidden">Actions</span>
                    </h2>
                    <p
                      className="text-xs hidden sm:block"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Get started with maintenance operations
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:gap-6">
                <button
                  onClick={() => router.push("/auth")}
                  className="p-3 sm:p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 text-left"
                >
                  <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-6 sm:h-6 text-white"
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
                    <h3 className="text-sm sm:text-lg sm:text-xl font-bold">
                      <span className="hidden sm:inline">Submit Request</span>
                      <span className="sm:hidden">Request</span>
                    </h3>
                  </div>
                  <p className="text-xs sm:text-base sm:text-lg opacity-90 leading-relaxed mb-2 hidden sm:block">
                    Report maintenance issues with image support
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs">
                      Fast Response
                    </span>
                    <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs hidden sm:inline">
                      Photo Upload
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => router.push("/auth")}
                  className="p-3 sm:p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 text-left"
                >
                  <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-6 sm:h-6 text-white"
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
                    <h3 className="text-sm sm:text-lg sm:text-xl font-bold">
                      <span className="hidden sm:inline">Admin Dashboard</span>
                      <span className="sm:hidden">Admin</span>
                    </h3>
                  </div>
                  <p className="text-xs sm:text-base sm:text-lg opacity-90 leading-relaxed mb-2 hidden sm:block">
                    Manage requests and analytics
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs">
                      Analytics
                    </span>
                    <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs hidden sm:inline">
                      Management
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Section: Features (Left) and Status (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Features Section - Left */}
              <div
                className="rounded-lg shadow-lg p-3 sm:p-6 theme-card"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-6">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-6 sm:h-6 text-white"
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
                      className="text-sm sm:text-xl font-bold"
                      style={{ color: themeConfig.colors.text }}
                    >
                      <span className="hidden sm:inline">Key Features</span>
                      <span className="sm:hidden">Features</span>
                    </h2>
                    <p
                      className="text-xs hidden sm:block"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Powerful tools for efficient maintenance
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-3">
                  <div
                    className="p-2 sm:p-3 rounded-lg border transition-all duration-200 hover:shadow-md"
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
                    <div className="w-4 h-4 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                      <svg
                        className="w-2 h-2 sm:w-4 sm:h-4 text-white"
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
                      className="font-semibold text-xs sm:text-sm mb-0.5"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#60a5fa" : "#1e40af",
                      }}
                    >
                      <span className="hidden sm:inline">Real-time</span>
                      <span className="sm:hidden">Live</span>
                    </h3>
                    <p
                      className="text-xs leading-relaxed hidden sm:block"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#93c5fd" : "#1e40af",
                      }}
                    >
                      Instant updates
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Section - Right */}
              <div
                className="rounded-lg shadow-lg p-2 sm:p-6 theme-card border-2"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor:
                    themeConfig.name === "dark"
                      ? "rgba(34, 197, 94, 0.3)"
                      : "#22c55e",
                }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
                  <div className="w-4 h-4 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-2 h-2 sm:w-6 sm:h-6 text-white"
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
                      className="text-xs sm:text-lg font-bold"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#4ade80" : "#166534",
                      }}
                    >
                      <span className="hidden sm:inline">System Status</span>
                      <span className="sm:hidden">Status</span>
                    </h3>
                    <p
                      className="text-xs hidden sm:block"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#86efac" : "#166534",
                      }}
                    >
                      All systems operational
                    </p>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-3">
                  <div
                    className="flex items-center justify-between p-1 sm:p-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgb(240, 253, 244)",
                    }}
                  >
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#4ade80" : "#166534",
                        }}
                      >
                        <span className="hidden sm:inline">Application</span>
                        <span className="sm:hidden">App</span>
                      </span>
                    </div>
                    <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-green-600 text-white text-xs rounded-full">
                      <span className="hidden sm:inline">Online</span>
                      <span className="sm:hidden">✓</span>
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between p-1 sm:p-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgb(240, 253, 244)",
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#4ade80" : "#166534",
                      }}
                    >
                      <span className="hidden sm:inline">Database</span>
                      <span className="sm:hidden">DB</span>
                    </span>
                    <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-green-600 text-white text-xs rounded-full">
                      <span className="hidden sm:inline">Connected</span>
                      <span className="sm:hidden">✓</span>
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between p-1 sm:p-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(59, 130, 246, 0.1)"
                          : "rgb(239, 246, 255)",
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{
                        color:
                          themeConfig.name === "dark" ? "#60a5fa" : "#1e40af",
                      }}
                    >
                      <span className="hidden sm:inline">Deployment</span>
                      <span className="sm:hidden">Deploy</span>
                    </span>
                    <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-blue-600 text-white text-xs rounded-full">
                      <span className="hidden sm:inline">Vercel</span>
                      <span className="sm:hidden">V</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="mt-12 py-6 border-t"
          style={{ borderColor: themeConfig.colors.border }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                © 2024 IVF Maintenance Utility. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <a
                  href="#"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
