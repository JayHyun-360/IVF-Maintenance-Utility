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

export default function AdminAnalytics() {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

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
                <BackButton fallback="/admin/dashboard" />
                <ThemeSwitcher />
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
                  <h2 className="text-xl font-bold text-gray-100 mb-4">Request Trends</h2>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
                  <h2 className="text-xl font-bold text-gray-100 mb-4">Performance Metrics</h2>
                  <div className="space-y-4">
                    {[
                      { label: "Average Response Time", value: "2.4 hours", trend: "-15%" },
                      { label: "Resolution Rate", value: "87%", trend: "+5%" },
                      { label: "User Satisfaction", value: "4.6/5", trend: "+8%" },
                      { label: "System Uptime", value: "99.9%", trend: "0%" },
                    ].map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-gray-300">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-100 font-mono">{metric.value}</span>
                          <span className={`text-xs font-mono px-2 py-1 rounded-full ${metric.trend.startsWith("+") ? "bg-lime-500/20 text-lime-400" : "bg-red-500/20 text-red-400"}`}>
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
      </div>
    </AuthGuard>
  );
}
