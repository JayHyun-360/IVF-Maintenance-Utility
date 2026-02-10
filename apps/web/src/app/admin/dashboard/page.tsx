"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import BackButton from "@/components/BackButton";
import AccountDropdown from "@/components/AccountDropdown";
import { motion } from "framer-motion";

// Types
interface DashboardStats {
  label: string;
  value: number;
  trend: string;
  status: string;
  icon: React.ReactNode;
  gradient: string;
}

interface MaintenanceRequest {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  requestedBy: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

// Default mock data for fallback
const defaultStats: DashboardStats[] = [
  {
    label: "Total Requests",
    value: 0,
    trend: "+0%",
    status: "Active",
    icon: (
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    label: "Pending",
    value: 0,
    trend: "+0%",
    status: "Stable",
    icon: (
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
  },
  {
    label: "In Progress",
    value: 0,
    trend: "+0%",
    status: "Processing",
    icon: (
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    label: "Completed",
    value: 0,
    trend: "+0%",
    status: "Online",
    icon: (
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-600",
  },
];

export default function AdminDashboard() {
  const { isMobile } = useMobileOptimizations();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<DashboardStats[]>(defaultStats);
  const [recentRequests, setRecentRequests] = useState<MaintenanceRequest[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      if (activeTab === "overview") {
        fetchDashboardData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch stats
      const statsResponse = await fetch("/api/admin/stats");
      if (!statsResponse.ok) {
        throw new Error("Failed to fetch stats");
      }
      const statsData = await statsResponse.json();

      // Transform API data to match our interface
      const transformedStats: DashboardStats[] = [
        {
          label: "Total Requests",
          value: statsData[0]?.value || 0,
          trend: statsData[0]?.trend || "+0%",
          status: "Active",
          icon: (
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          ),
          gradient: "from-teal-500 to-cyan-600",
        },
        {
          label: "Pending",
          value: statsData[1]?.value || 0,
          trend: statsData[1]?.trend || "+0%",
          status: "Stable",
          icon: (
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          gradient: "from-amber-500 to-orange-600",
        },
        {
          label: "In Progress",
          value: statsData[2]?.value || 0,
          trend: statsData[2]?.trend || "+0%",
          status: "Processing",
          icon: (
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
          gradient: "from-blue-500 to-indigo-600",
        },
        {
          label: "Completed",
          value: statsData[3]?.value || 0,
          trend: statsData[3]?.trend || "+0%",
          status: "Online",
          icon: (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          gradient: "from-green-500 to-emerald-600",
        },
      ];

      setStats(transformedStats);

      // Fetch recent requests
      const requestsResponse = await fetch("/api/requests?limit=5");
      if (!requestsResponse.ok) {
        throw new Error("Failed to fetch requests");
      }
      const requestsData = await requestsResponse.json();

      // Transform and format requests data
      const transformedRequests: MaintenanceRequest[] = requestsData.map(
        (req: any) => ({
          id: `REQ-${String(req.id).padStart(3, "0")}`,
          title: req.title,
          category: req.category,
          priority: req.priority,
          status: req.status
            .toLowerCase()
            .replace("_", " ")
            .replace("pending", "Pending")
            .replace("in progress", "In Progress")
            .replace("completed", "Completed")
            .replace("cancelled", "Cancelled"),
          requestedBy: req.user?.name || "Unknown User",
          createdAt: new Date(req.createdAt)
            .toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
            .replace(",", ""),
        }),
      );

      setRecentRequests(transformedRequests);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");

      // Keep default data on error
      setStats(defaultStats);
      setRecentRequests([]);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // All tabs now stay on the same dashboard page
  };

  const handleRequestClick = (requestId: string) => {
    router.push(`/admin/requests/${requestId.replace("REQ-", "")}`);
  };

  const handleViewAllRequests = () => {
    router.push("/admin/requests");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "online":
        return "text-lime-400";
      case "in progress":
      case "processing":
        return "text-cyan-400";
      case "pending":
        return "text-amber-400";
      case "stable":
        return "text-teal-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "text-purple-400";
      case "high":
        return "text-red-400";
      case "medium":
        return "text-amber-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  if (!mounted) {
    return (
      <AuthGuard requiredRole="ADMIN">
        <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="min-h-screen bg-[#0B0E11] relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <g fill="none" fillRule="evenodd">
              <g stroke="#14b8a6" strokeWidth="0.5" opacity="0.3">
                <path d="M0 0h40v40H0z M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" />
              </g>
            </g>
          </svg>
        </div>

        {/* Teal Mesh Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 blur-3xl"></div>

        {/* Main Header */}
        {/* Unified Header with Connected Navigation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        >
          <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between h-14 md:h-16 w-full">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 text-white"
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
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg md:text-xl font-bold text-gray-100">
                    IVF Admin
                  </h1>
                  <p className="text-xs text-gray-400">Control Panel</p>
                </div>
              </motion.div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4 ml-auto">
                {/* Settings Button - Standalone */}
                <motion.button
                  onClick={() => router.push("/admin/settings")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200"
                  title="Settings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                </motion.button>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <BackButton fallback="/" />
                  <AccountDropdown />
                </div>
              </div>
            </div>
          </div>
          {/* Connected Tab Navigation */}
          <div className="border-t border-white/5 bg-black/10 backdrop-blur-lg">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="flex items-center gap-2 md:gap-4 py-4 w-full">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "requests", label: "Maintenance" },
                  { id: "analytics", label: "Analytics" },
                  { id: "users", label: "Users" },
                  { id: "reports", label: "Reports" },
                ].map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    onClick={() => handleTabClick(item.id)}
                    className={`relative px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-teal-500/10 border border-teal-500/30"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Floating Refresh Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            onClick={fetchDashboardData}
            disabled={loading}
            className="group relative p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            title="Refresh dashboard"
          >
            {/* Button Icon */}
            <motion.div
              animate={{ rotate: loading ? 360 : 0 }}
              transition={{
                duration: loading ? 1 : 0,
                repeat: loading ? Infinity : 0,
              }}
              className="flex items-center justify-center"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl"
              >
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </motion.div>
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <main className="pt-40 md:pt-44 px-4 sm:px-6 lg:px-8 xl:px-12 pb-12">
          <div className="w-full max-w-screen-2xl mx-auto">
            {/* Content Container with stable layout */}
            <div className="min-h-[600px] relative w-full">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-8 md:space-y-12"
                >
                  {/* Last Updated Indicator */}
                  {lastUpdated && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      className="flex items-center justify-end text-xs text-gray-500"
                    >
                      <span>
                        Last updated: {lastUpdated.toLocaleTimeString()}
                      </span>
                      <span className="mx-2">•</span>
                      <span>Auto-refresh every 30s</span>
                    </motion.div>
                  )}

                  {/* Bento Grid - Stats Overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.05 * i,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="group relative"
                        whileHover={{ y: -5 }}
                      >
                        {/* Vercel-style hover spotlight */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("orange") ? "#ea580c" : "#059669"})`,
                          }}
                        />

                        {/* Enhanced Glassmorphic Card */}
                        <div
                          className="relative backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                          style={{
                            background: "rgba(255, 255, 255, 0.03) !important",
                            backdropFilter: "blur(25px) !important",
                            border:
                              "1px solid rgba(255, 255, 255, 0.1) !important",
                            boxShadow:
                              "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                          }}
                        >
                          <div className="flex items-start justify-between mb-6">
                            <div
                              className="p-3 rounded-xl bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("orange") ? "#ea580c" : "#059669"})`,
                              }}
                            >
                              <div className="text-white">{stat.icon}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-mono px-2 py-1 rounded-full ${stat.trend.startsWith("+") ? "bg-lime-500/20 text-lime-400" : "bg-red-500/20 text-red-400"}`}
                              >
                                {loading ? "..." : stat.trend}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wider">
                              {stat.label}
                            </h3>
                            <div className="flex items-baseline gap-2">
                              <motion.div
                                className="text-4xl md:text-5xl font-mono font-bold"
                                style={{
                                  background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("orange") ? "#ea580c" : "#059669"})`,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {loading ? "..." : stat.value}
                              </motion.div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${getStatusColor(stat.status)} ${!loading && "animate-pulse"}`}
                              />
                              <span
                                className={`text-xs font-mono ${getStatusColor(stat.status)}`}
                              >
                                {stat.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bento Grid - Recent Requests */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-100">
                        Recent Requests
                      </h2>
                      <button
                        onClick={handleViewAllRequests}
                        className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors duration-200"
                      >
                        View All →
                      </button>
                    </div>

                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4"
                          >
                            <div className="animate-pulse">
                              <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
                              <div className="h-3 bg-gray-600 rounded w-3/4 mb-1"></div>
                              <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : recentRequests.length > 0 ? (
                      <div className="space-y-4">
                        {recentRequests.map((request, i) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.05 * i,
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="group backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                            whileHover={{ x: 5 }}
                            onClick={() => handleRequestClick(request.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-xs font-mono text-teal-400">
                                    {request.id}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full font-mono ${getPriorityColor(request.priority)} bg-current/10`}
                                  >
                                    {request.priority}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full font-mono ${getStatusColor(request.status)} bg-current/10`}
                                  >
                                    {request.status}
                                  </span>
                                </div>

                                <h3 className="text-gray-100 font-medium mb-1 truncate">
                                  {request.title}
                                </h3>

                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                  <span className="font-mono">
                                    {request.category}
                                  </span>
                                  <span>•</span>
                                  <span>{request.requestedBy}</span>
                                  <span>•</span>
                                  <span className="font-mono">
                                    {request.createdAt}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center opacity-50">
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
                        <p className="text-gray-400">
                          No maintenance requests found
                        </p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {/* Maintenance Tab Content */}
              {activeTab === "requests" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-12"
                >
                  <div
                    className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-8"
                    style={{
                      background: "rgba(255, 255, 255, 0.03) !important",
                      backdropFilter: "blur(25px) !important",
                      border: "1px solid rgba(255, 255, 255, 0.1) !important",
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                    }}
                  >
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl md:text-4xl font-sans text-gray-100 leading-tight mb-8"
                      style={{
                        fontWeight: "800 !important",
                        letterSpacing: "-0.05em !important",
                      }}
                    >
                      Maintenance
                      <span className="text-teal-400"> Requests</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                      {[
                        {
                          title: "HVAC System",
                          status: "In Progress",
                          priority: "High",
                          id: "REQ-001",
                        },
                        {
                          title: "Lighting Repair",
                          status: "Pending",
                          priority: "Medium",
                          id: "REQ-002",
                        },
                        {
                          title: "Plumbing Maintenance",
                          status: "Completed",
                          priority: "Low",
                          id: "REQ-003",
                        },
                      ].map((request, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 * i,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="group relative"
                          whileHover={{ y: -5 }}
                        >
                          {/* Hover spotlight */}
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                          {/* Enhanced card */}
                          <div
                            className="relative backdrop-blur-md rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300"
                            style={{
                              background:
                                "rgba(255, 255, 255, 0.03) !important",
                              backdropFilter: "blur(25px) !important",
                              border:
                                "1px solid rgba(255, 255, 255, 0.1) !important",
                            }}
                          >
                            <div className="flex items-start justify-between mb-6">
                              <span className="text-sm font-mono text-teal-400 font-bold">
                                {request.id}
                              </span>
                              <span
                                className={`text-sm px-3 py-1 rounded-full font-mono font-bold ${
                                  request.priority === "High"
                                    ? "bg-red-500/20 text-red-400"
                                    : request.priority === "Medium"
                                      ? "bg-amber-500/20 text-amber-400"
                                      : "bg-green-500/20 text-green-400"
                                }`}
                              >
                                {request.priority}
                              </span>
                            </div>
                            <motion.h3
                              className="text-xl font-bold text-gray-100 mb-4"
                              whileHover={{ scale: 1.05 }}
                            >
                              {request.title}
                            </motion.h3>
                            <motion.span
                              className={`inline-block text-lg font-medium ${
                                request.status === "Completed"
                                  ? "text-lime-400"
                                  : request.status === "In Progress"
                                    ? "text-cyan-400"
                                    : "text-amber-400"
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {request.status}
                            </motion.span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Analytics Tab Content */}
              {activeTab === "analytics" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-12"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-sans text-gray-100 leading-tight mb-8"
                    style={{
                      fontWeight: "800 !important",
                      letterSpacing: "-0.05em !important",
                    }}
                  >
                    Analytics &<span className="text-teal-400"> Insights</span>
                  </motion.h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <div
                      className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-8"
                      style={{
                        background: "rgba(255, 255, 255, 0.03) !important",
                        backdropFilter: "blur(25px) !important",
                        border: "1px solid rgba(255, 255, 255, 0.1) !important",
                        boxShadow:
                          "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                      }}
                    >
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-gray-100 mb-8"
                      >
                        Request
                        <span className="text-teal-400"> Trends</span>
                      </motion.h3>
                      <div className="space-y-6">
                        {[
                          { month: "Jan", count: 45 },
                          { month: "Feb", count: 52 },
                          { month: "Mar", count: 38 },
                          { month: "Apr", count: 61 },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.05 * i,
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-300 font-medium">
                              {item.month}
                            </span>
                            <div className="flex items-center gap-4">
                              <div className="w-40 bg-gray-700 rounded-full h-3">
                                <motion.div
                                  className="bg-gradient-to-r from-teal-500 to-cyan-600 h-3 rounded-full"
                                  style={{
                                    width: `${(item.count / 61) * 100}%`,
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(item.count / 61) * 100}%`,
                                  }}
                                  transition={{
                                    delay: 0.3 + i * 0.1,
                                    duration: 0.8,
                                  }}
                                />
                              </div>
                              <motion.span
                                className="text-xl font-mono font-bold text-gray-100"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #14b8a6, #06b6d4)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                              >
                                {item.count}
                              </motion.span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-8"
                      style={{
                        background: "rgba(255, 255, 255, 0.03) !important",
                        backdropFilter: "blur(25px) !important",
                        border: "1px solid rgba(255, 255, 255, 0.1) !important",
                        boxShadow:
                          "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                      }}
                    >
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-gray-100 mb-8"
                      >
                        Performance
                        <span className="text-teal-400"> Metrics</span>
                      </motion.h3>
                      <div className="space-y-8">
                        {[
                          {
                            label: "Avg Response Time",
                            value: "2.4 hrs",
                            trend: "-15%",
                          },
                          {
                            label: "Completion Rate",
                            value: "94%",
                            trend: "+8%",
                          },
                          {
                            label: "Satisfaction Score",
                            value: "4.7/5",
                            trend: "+12%",
                          },
                        ].map((metric, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.05 * i,
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <div>
                              <p className="text-gray-400 text-sm font-medium">
                                {metric.label}
                              </p>
                              <motion.p
                                className="text-2xl font-mono font-bold text-gray-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                {metric.value}
                              </motion.p>
                            </div>
                            <motion.span
                              className={`text-lg font-mono font-bold ${
                                metric.trend.startsWith("+")
                                  ? "text-lime-400"
                                  : "text-red-400"
                              }`}
                              whileHover={{ scale: 1.2 }}
                            >
                              {metric.trend}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Users Tab Content */}
              {activeTab === "users" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  <div className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">
                      User Management
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="pb-4 text-gray-400 font-medium">
                              User
                            </th>
                            <th className="pb-4 text-gray-400 font-medium">
                              Role
                            </th>
                            <th className="pb-4 text-gray-400 font-medium">
                              Status
                            </th>
                            <th className="pb-4 text-gray-400 font-medium">
                              Last Active
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            {
                              name: "John Smith",
                              email: "john@ivf.edu",
                              role: "Admin",
                              status: "Active",
                              lastActive: "2 hours ago",
                            },
                            {
                              name: "Sarah Johnson",
                              email: "sarah@ivf.edu",
                              role: "Staff",
                              status: "Active",
                              lastActive: "1 day ago",
                            },
                            {
                              name: "Mike Davis",
                              email: "mike@ivf.edu",
                              role: "Student",
                              status: "Inactive",
                              lastActive: "3 days ago",
                            },
                          ].map((user, i) => (
                            <tr
                              key={i}
                              className="hover:bg-white/5 transition-colors"
                            >
                              <td className="py-4">
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                                >
                                  <div>
                                    <p className="text-gray-100 font-medium">
                                      {user.name}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                      {user.email}
                                    </p>
                                  </div>
                                </motion.div>
                              </td>
                              <td className="py-4">
                                <span
                                  className={`text-sm px-2 py-1 rounded-full font-mono ${
                                    user.role === "Admin"
                                      ? "bg-purple-500/20 text-purple-400"
                                      : user.role === "Staff"
                                        ? "bg-blue-500/20 text-blue-400"
                                        : "bg-gray-500/20 text-gray-400"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td className="py-4">
                                <span
                                  className={`text-sm ${
                                    user.status === "Active"
                                      ? "text-lime-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-4 text-gray-400 text-sm">
                                {user.lastActive}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Reports Tab Content */}
              {activeTab === "reports" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  <div className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">
                      System Reports
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {[
                        {
                          title: "Monthly Summary",
                          date: "2024-02-01",
                          type: "PDF",
                          size: "2.4 MB",
                        },
                        {
                          title: "Maintenance Analytics",
                          date: "2024-02-01",
                          type: "Excel",
                          size: "1.8 MB",
                        },
                        {
                          title: "User Activity Report",
                          date: "2024-01-31",
                          type: "PDF",
                          size: "956 KB",
                        },
                        {
                          title: "Performance Metrics",
                          date: "2024-01-30",
                          type: "PDF",
                          size: "1.2 MB",
                        },
                      ].map((report, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 * i,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="backdrop-blur-md rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-2 rounded-lg bg-teal-500/10">
                              <svg
                                className="w-5 h-5 text-teal-400"
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
                            <span className="text-xs font-mono text-gray-400">
                              {report.type}
                            </span>
                          </div>
                          <h3 className="text-gray-100 font-medium mb-2">
                            {report.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>{report.date}</span>
                            <span>{report.size}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
