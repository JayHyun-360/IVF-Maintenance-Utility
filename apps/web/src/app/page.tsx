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
            <div className="flex items-center justify-between h-14 md:h-16">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
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
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() =>
                      item.href.startsWith("#") ? null : router.push(item.href)
                    }
                    className={`text-sm font-medium transition-colors ${
                      item.active
                        ? "text-teal-400"
                        : "text-gray-400 hover:text-gray-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4">
                {session ? (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => router.push("/dashboard")}
                    className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium text-sm hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden sm:inline">Dashboard</span>
                    <span className="sm:hidden">📊</span>
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => router.push("/login")}
                    className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium text-sm hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5"
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
        <section className="relative min-h-screen flex items-center justify-center bg-[#0B0E11] pt-14 md:pt-16">
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
                className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/50 inner-glow"
              >
                <div className="inline-flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-14 h-14 md:w-18 md:h-18 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-teal-500/25">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h1 className="text-xl md:text-3xl font-sans font-bold text-gray-100">
                      Integrated Visual Feedback
                    </h1>
                    <p className="text-sm md:text-base text-gray-400">
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-gray-100 mb-6 leading-tight"
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
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto px-4"
              >
                Transform your maintenance operations with intelligent
                automation, real-time visual feedback, and seamless workflow
                management designed for modern facilities.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 px-4"
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
              >
                {[
                  {
                    value: stats.totalRequests.toString(),
                    label: "Total Requests",
                  },
                  {
                    value: stats.completedRequests.toString(),
                    label: "Completed",
                  },
                  { value: stats.pendingRequests.toString(), label: "Pending" },
                  {
                    value: stats.inProgressRequests.toString(),
                    label: "In Progress",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-xl backdrop-blur-sm bg-black/20 border border-white/10 hover:bg-black/30 transition-all"
                  >
                    <div className="text-2xl md:text-3xl font-mono font-bold text-teal-400 mb-2 counter">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 font-medium">
                      {stat.label}
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
              className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for
                <span className="text-green-600"> Modern Maintenance</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Everything you need to manage, track, and optimize your
                maintenance operations with visual feedback in one comprehensive
                platform.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: "📊",
                  title: "Real-time Analytics",
                  description: "Live dashboards for performance insights.",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: "🤖",
                  title: "Smart Automation",
                  description: "Automate tasks and prioritize by urgency.",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: "📱",
                  title: "Mobile Access",
                  description: "Access your system from any device.",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: "🔔",
                  title: "Instant Notifications",
                  description: "Real-time alerts for request updates.",
                  color: "from-yellow-500 to-yellow-600",
                },
                {
                  icon: "📈",
                  title: "Performance Tracking",
                  description: "Track KPIs and generate reports.",
                  color: "from-red-500 to-red-600",
                },
                {
                  icon: "🛡️",
                  title: "Secure Platform",
                  description: "Enterprise security with role access.",
                  color: "from-indigo-500 to-indigo-600",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
                >
                  <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-lg md:text-xl mb-3 md:mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-green-600 to-green-700">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Making Maintenance
                <span className="block">Simple & Stress-Free</span>
              </h2>
              <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed">
                Our intuitive system helps you manage maintenance requests
                effortlessly. Track progress, visualize workflows, and
                coordinate with your team - all in one place. Say goodbye to
                paperwork and hello to streamlined operations that save you time
                and reduce headaches.
              </p>
              <motion.button
                onClick={() => router.push("/login")}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-green-600 rounded-xl font-semibold text-base md:text-lg hover:bg-gray-50 transition-colors shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Simplifying Today
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 md:py-12 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
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

            <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm">
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
