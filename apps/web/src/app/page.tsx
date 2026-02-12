"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { getMaintenanceStats } from "@/lib/data";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useSession } from "next-auth/react";
import AccountDropdown from "@/components/AccountDropdown";
import { MobileNavigationWrapper } from "@/components/MobileNavigation";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { data: session, status } = useSession();
  const { isMobile } = useMobileOptimizations();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });

  useEffect(() => {
    const loadData = () => {
      const realStats = getMaintenanceStats();
      setStats(realStats);
    };

    // Set mounted after a tiny delay to avoid synchronous setState
    const timer = setTimeout(() => setMounted(true), 0);
    loadData();
    const interval = setInterval(loadData, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <MobileNavigationWrapper>
      <div className="min-h-screen bg-[#0B0E11] text-gray-100 relative overflow-hidden">
        {/* Modern Navigation Header */}
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
                    Integrated Visual Feedback
                  </h1>
                  <p className="text-xs text-gray-400">Maintenance Utility</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-gray-100">
                    IVF Utility
                  </h1>
                </div>
              </motion.div>

              {/* Navigation Links - Desktop */}
              <nav className="hidden md:flex items-center justify-center gap-4 !important flex-1">
                {[
                  { label: "Home", href: "/", active: true },
                  { label: "Features", href: "#features" },
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "About", href: "#about" },
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                    onClick={() => {
                      if (item.href.startsWith("#")) {
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      } else {
                        router.push(item.href);
                      }
                    }}
                    className={`relative text-sm font-medium transition-all duration-300 px-2 py-2 rounded-lg overflow-hidden group ${
                      item.active
                        ? "text-teal-400 bg-white/10"
                        : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.1 },
                    }}
                  >
                    {/* Vercel-style background hover effect */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Sliding underline effect */}
                    <motion.div className="absolute bottom-0 left-0 h-0.5 bg-teal-400 w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4 ml-auto">
                {session ? (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => router.push("/student")}
                      className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium text-sm hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="hidden sm:inline">User Portal</span>
                      <span className="sm:hidden">�</span>
                    </motion.button>
                    <AccountDropdown />
                  </>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => router.push("/login")}
                    className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium text-sm hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden sm:inline">Sign In</span>
                    <span className="sm:hidden">👤</span>
                  </motion.button>
                )}
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-[#0B0E11] pt-32 !important">
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Glassmorphic Hero Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-xl mx-auto"
                style={{
                  background: "rgba(255, 255, 255, 0.03) !important",
                  backdropFilter: "blur(25px) !important",
                  border: "1px solid rgba(255, 255, 255, 0.1) !important",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30 flex-shrink-0">
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-white"
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
                  <div className="text-left sm:text-center lg:text-left">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-sans font-bold text-gray-100 leading-tight">
                      Integrated Visual Feedback
                    </h1>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      Maintenance Utility
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans text-gray-100 leading-tight mb-8 !important"
                style={{
                  fontWeight: "800 !important",
                  letterSpacing: "-0.05em !important",
                  marginBottom: "2rem !important",
                }}
              >
                Streamline Your
                <span className="block text-teal-400">
                  Maintenance Operations
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed px-4 !important"
                style={{
                  maxWidth: "550px !important",
                  margin: "0 auto 3rem auto !important",
                  lineHeight: "2 !important",
                }}
              >
                Simplify your maintenance work with smart tools and easy
                workflows. Track, manage, and complete tasks efficiently - all
                in one place.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 px-4"
              >
                <motion.button
                  onClick={() => router.push("/login")}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-lime-400 to-teal-500 text-gray-900 rounded-xl font-semibold text-base md:text-lg hover:from-lime-300 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-lime-400/25 hover:shadow-lime-400/40 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <svg
                    className="inline-block w-4 h-4 md:w-5 md:h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Trust Indicators - Real Data */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto"
              >
                {[
                  {
                    value: stats.totalRequests.toString(),
                    label: "Total Requests",
                    gradient: "from-teal-500 to-cyan-600",
                  },
                  {
                    value: stats.completedRequests.toString(),
                    label: "Completed",
                    gradient: "from-green-500 to-emerald-600",
                  },
                  {
                    value: stats.pendingRequests.toString(),
                    label: "Pending",
                    gradient: "from-amber-500 to-orange-600",
                  },
                  {
                    value: stats.inProgressRequests.toString(),
                    label: "In Progress",
                    gradient: "from-blue-500 to-indigo-600",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    className="relative group"
                  >
                    {/* Glassmorphic card with gradient border */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${stat.gradient.replace("from-", "").replace(" to-", ", ")})`,
                      }}
                    />
                    <div className="relative text-center p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      {/* Animated number display */}
                      <motion.div
                        className="text-3xl md:text-4xl font-mono font-bold mb-2"
                        style={{
                          background: `linear-gradient(135deg, ${stat.gradient.includes("teal") ? "#14b8a6" : stat.gradient.includes("green") ? "#10b981" : stat.gradient.includes("amber") ? "#f59e0b" : "#3b82f6"}, ${stat.gradient.includes("cyan") ? "#06b6d4" : stat.gradient.includes("emerald") ? "#059669" : stat.gradient.includes("orange") ? "#ea580c" : "#6366f1"})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs md:text-sm text-gray-300 font-medium uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-teal-400 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#0B0E11] relative"
        >
          {/* Technical Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <g fill="none" fillRule="evenodd">
                <g stroke="#14b8a6" strokeWidth="0.5" opacity="0.2">
                  <path d="M0 0h40v40H0z M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" />
                </g>
              </g>
            </svg>
          </div>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-100 mb-4">
                Powerful Features for
                <span className="text-teal-400"> Modern Maintenance</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Everything you need to manage, track, and optimize your
                maintenance operations with visual feedback in one comprehensive
                platform.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
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
                  title: "Real-time Analytics",
                  description: "Live dashboards for performance insights.",
                  color: "from-teal-500 to-cyan-600",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
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
                  title: "Smart Automation",
                  description: "Automate tasks and prioritize by urgency.",
                  color: "from-lime-400 to-green-500",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "Mobile Access",
                  description: "Access your system from any device.",
                  color: "from-blue-400 to-indigo-500",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  ),
                  title: "Instant Notifications",
                  description: "Real-time alerts for request updates.",
                  color: "from-amber-400 to-orange-500",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
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
                  title: "Performance Tracking",
                  description: "Track KPIs and generate reports.",
                  color: "from-purple-400 to-pink-500",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  ),
                  title: "Secure Platform",
                  description: "Enterprise security with role access.",
                  color: "from-rose-400 to-red-500",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 shadow-2xl shadow-black/50 hover:bg-black/40 transition-all duration-300 h-full inner-glow"
                >
                  <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-lg md:text-xl mb-3 md:mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-base md:text-lg font-sans font-bold text-gray-100 mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#0B0E11] relative">
          {/* Teal Mesh Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 blur-3xl"></div>

          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-100 mb-6">
                Streamline Facility
                <span className="block text-teal-400">Management Today</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Our system makes maintenance management simple and efficient.
                Easily track repairs, schedule work orders, and coordinate with
                your team. Reduce paperwork and keep your facilities running
                smoothly with our easy-to-use platform.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 px-4"
              >
                <motion.button
                  onClick={() => router.push("/login")}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-lime-400 to-teal-500 text-gray-900 rounded-xl font-semibold text-base md:text-lg hover:from-lime-300 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-lime-400/25 hover:shadow-lime-400/40 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Now
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#0B0E11] relative"
        >
          {/* Technical Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <g fill="none" fillRule="evenodd">
                <g stroke="#14b8a6" strokeWidth="0.5" opacity="0.2">
                  <path d="M0 0h40v40H0z M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" />
                </g>
              </g>
            </svg>
          </div>

          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-100 mb-6">
                About IVF
                <span className="block text-teal-400">Maintenance Utility</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Integrated Visual Feedback Maintenance Utility is a
                comprehensive solution designed specifically for educational
                institutions. Our platform combines cutting-edge technology with
                intuitive design to streamline facility management, enhance
                operational efficiency, and create optimal learning environments
                for users and staff alike.
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
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
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    Mission
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Empowering educational institutions with intelligent
                    maintenance solutions
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
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
                        d="M9 12l2 2 4-4m6 0a9 9 0 019 0 9 9 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    Vision
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Creating seamless, efficient maintenance experiences for
                    schools
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
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
                        d="M12 6.253v1m0 0-6.037c0-1.758 1.425-3.203 3.203-3.203 0 1.758 1.425 3.203 3.203 0 1.758-1.425L12 6.253z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    Values
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Innovation, reliability, and educational excellence
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0B0E11] text-gray-100 py-8 md:py-12 px-4 sm:px-6 lg:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                  <svg
                    className="w-7 h-7 md:w-10 md:h-10 text-white"
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
                  <h3 className="text-lg font-sans font-bold text-gray-100">
                    Integrated Visual Feedback
                  </h3>
                  <p className="text-xs text-gray-400">Maintenance Utility</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Modern maintenance solution with visual feedback for
                organizations of all sizes.
              </p>
            </div>

            <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm">
              <p>
                &copy; 2024 Integrated Visual Feedback & Maintenance Utility.
                All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </MobileNavigationWrapper>
  );
}
