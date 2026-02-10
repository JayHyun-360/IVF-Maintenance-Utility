"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import ThemeSwitcher from "@/components/ThemeSwitcher";
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
  const { themeConfig } = useTheme();
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

    // Navigate to specific pages for different tabs
    switch (tabId) {
      case "requests":
        router.push("/admin/requests");
        break;
      case "analytics":
        router.push("/admin/analytics");
        break;
      case "users":
        router.push("/admin/users");
        break;
      case "reports":
        router.push("/admin/reports");
        break;
      case "settings":
        router.push("/admin/settings");
        break;
      // Overview stays on current page
    }
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
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div
              className="flex items-center justify-between h-14 md:h-16"
              style={{ maxWidth: "1400px", margin: "0 auto" }}
            >
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
                <button
                  onClick={fetchDashboardData}
                  disabled={loading}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Refresh dashboard"
                >
                  <svg
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
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
                </button>
                {error && (
                  <button
                    onClick={fetchDashboardData}
                    className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-colors"
                  >
                    Retry
                  </button>
                )}
                <BackButton fallback="/" />
                <ThemeSwitcher />
                <AccountDropdown />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Secondary Navigation - Horizontal */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-black/10 backdrop-blur-lg border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div
              className="flex items-center justify-center gap-2 md:gap-4 py-4"
              style={{ maxWidth: "1400px", margin: "0 auto" }}
            >
              {[
                { id: "overview", label: "Overview" },
                { id: "requests", label: "Maintenance" },
                { id: "analytics", label: "Analytics" },
                { id: "users", label: "Users" },
                { id: "reports", label: "Reports" },
                { id: "settings", label: "Settings" },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
        </motion.nav>

        {/* Main Content */}
        <main className="pt-32 md:pt-36 px-4 sm:px-6 lg:px-12 pb-12">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: "1400px" }}>
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="backdrop-blur-xl rounded-2xl border border-red-500/20 bg-red-500/5 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-red-400">{error}</span>
                      </div>
                      <button
                        onClick={fetchDashboardData}
                        className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Last Updated Indicator */}
                {lastUpdated && !error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="group relative"
                      whileHover={{ y: -5 }}
                    >
                      {/* Vercel-style hover spotlight */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                      {/* Glassmorphic Card */}
                      <div className="relative backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="p-3 rounded-xl bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b" : stat.gradient.includes("blue") ? "#3b82f6" : "#10b981"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("orange") ? "#ea580c" : stat.gradient.includes("indigo") ? "#6366f1" : "#059669"})`,
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

                        <div className="space-y-2">
                          <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wider">
                            {stat.label}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-mono font-bold text-gray-100">
                              {loading ? "..." : stat.value}
                            </span>
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
                  transition={{ delay: 0.8 }}
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
                          transition={{ delay: 0.9 + i * 0.1 }}
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

            {/* Placeholder content for other tabs */}
            {activeTab !== "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-12 text-center"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100 mb-2 capitalize">
                    {activeTab}
                  </h2>
                  <p className="text-gray-400">
                    {activeTab === "requests" &&
                      "Manage all maintenance requests and work orders"}
                    {activeTab === "analytics" &&
                      "View detailed analytics and performance metrics"}
                    {activeTab === "users" &&
                      "Manage user accounts and permissions"}
                    {activeTab === "reports" &&
                      "Generate and view system reports"}
                    {activeTab === "settings" &&
                      "Configure system settings and preferences"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
