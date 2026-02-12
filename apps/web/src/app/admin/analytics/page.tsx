"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import BackButton from "@/components/BackButton";
import AccountDropdown from "@/components/AccountDropdown";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminAnalytics() {
  const { isMobile } = useMobileOptimizations();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Analytics Report Generated",
      message: "Weekly analytics report has been generated successfully",
      type: "success",
      time: "2 minutes ago",
      read: false,
      requestId: null,
    },
    {
      id: 2,
      title: "Performance Alert",
      message: "System performance has degraded by 15% this week",
      type: "high",
      time: "1 hour ago",
      read: false,
      requestId: null,
    },
    {
      id: 3,
      title: "Data Sync Complete",
      message: "Analytics data has been synchronized with latest metrics",
      type: "info",
      time: "3 hours ago",
      read: true,
      requestId: null,
    },
  ]);

  useEffect(() => {
    setMounted(true);
    // Simulate loading analytics data
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!mounted) {
    return (
      <AuthGuard requiredRole="ADMIN">
        <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </AuthGuard>
    );
  }

  // Notification functions
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732L13.732 4c-.77-1.333-2.694-1.732 3.464 0L3.34 16c-.77 1.333-2.694 1.732 3z"
            />
          </svg>
        );
      case "success":
        return (
          <svg
            className="w-4 h-4"
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
        );
      case "high":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732L13.732 4c-.77-1.333-2.694-1.732 3.464 0L3.34 16c-.77 1.333-2.694 1.732 3z"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0z"
            />
          </svg>
        );
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      case "success":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "high":
        return "text-amber-400 bg-amber-500/20 border-amber-500/30";
      case "info":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
                  <p className="text-xs text-gray-400">Analytics Dashboard</p>
                </div>
              </motion.div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4 ml-auto">
                {/* Notifications Button */}
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
                  title="Notifications"
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-2-2H5a2 2 0 002-2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012-2v10m-6 0a2 2 0 002-2h2a2 2 0 012-2v14a2 2 0 01-2-2z"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>

                <BackButton fallback="/admin/dashboard" />
                <AccountDropdown />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-12 pb-12">
          <div className="max-w-7xl mx-auto" style={{ maxWidth: "1400px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                  Analytics
                </h1>
                <p className="text-gray-400 text-lg">
                  Detailed analytics and performance metrics
                </p>
              </div>

              {/* Analytics Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-100 mb-4">
                    Request Trends
                  </h2>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 opacity-50"
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
                      <p>Chart visualization coming soon</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="backdrop-blur-xl rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-100 mb-4">
                    Performance Metrics
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Average Response Time",
                        value: "2.4 hours",
                        trend: "-15%",
                      },
                      { label: "Resolution Rate", value: "87%", trend: "+5%" },
                      {
                        label: "User Satisfaction",
                        value: "4.6/5",
                        trend: "+8%",
                      },
                      { label: "System Uptime", value: "99.9%", trend: "0%" },
                    ].map((metric, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <span className="text-gray-300">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-100 font-mono">
                            {metric.value}
                          </span>
                          <span
                            className={`text-xs font-mono px-2 py-1 rounded-full ${metric.trend.startsWith("+") ? "bg-lime-500/20 text-lime-400" : "bg-red-500/20 text-red-400"}`}
                          >
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <>
              {/* Backdrop */}
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />

              {/* Notifications Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="fixed top-16 right-4 w-80 rounded-xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.08) !important",
                  backdropFilter:
                    "blur(25px) saturate(200%) brightness(1.1) !important",
                  WebkitBackdropFilter:
                    "blur(25px) saturate(200%) brightness(1.1) !important",
                  border: "1px solid rgba(255, 255, 255, 0.15) !important",
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(255, 255, 255, 0.05) !important",
                }}
              >
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Notifications
                  </h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6v12M18 6l-6-6"
                      />
                    </svg>
                  </button>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto max-h-96">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 0a6 6 0 016 6m0 6M6 6v6a2 2 0 002-2h2a2 2 0 002-2m0 0V8a2 2 0 012-2h2a2 2 0 012-2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-sm">No notifications</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                            notification.read
                              ? "bg-gray-800/30 hover:bg-gray-800/50"
                              : "bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(
                                notification.type,
                              )}`}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    notification.read
                                      ? "text-gray-300"
                                      : "text-gray-100"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p
                                className={`text-xs text-gray-400 line-clamp-2 ${
                                  notification.read
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 p-3 bg-gray-800/50">
                  <button
                    onClick={markAllAsRead}
                    className="w-full text-center text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200"
                  >
                    Mark All as Read
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  );
}
