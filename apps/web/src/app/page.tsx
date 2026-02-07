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
    setMounted(true);
    const loadData = () => {
      const realStats = getMaintenanceStats();
      setStats(realStats);
    };
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MobileNavigationWrapper>
      <div className="min-h-screen bg-white text-gray-900">
        {/* Modern Navigation Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 3 }}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    IVF Maintenance
                  </h1>
                  <p className="text-xs text-gray-500">Facility Management</p>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-8">
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
                        ? "text-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {session ? (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dashboard
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => router.push("/login")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                )}
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 border border-green-200 mb-6"
                >
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  <span className="text-sm font-medium text-green-800">
                    Smart Facility Management
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                >
                  Streamline Your
                  <span className="block text-green-600">
                    Maintenance Operations
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 mb-8 leading-relaxed"
                >
                  Transform your facility management with our intelligent
                  maintenance utility. Experience seamless operations, real-time
                  analytics, and automated workflows designed for modern
                  organizations.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    onClick={() => {
                      const role = session?.user?.role;
                      if (role === "ADMIN") router.push("/admin/dashboard");
                      else if (
                        role === "USER" ||
                        role === "STUDENT" ||
                        role === "STAFF"
                      )
                        router.push("/student");
                      else router.push("/login");
                    }}
                    className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {session ? "Launch Dashboard" : "Get Started"}
                  </motion.button>
                  <motion.button
                    onClick={() => router.push("#features")}
                    className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-8 mt-12"
                >
                  {[
                    { value: "98%", label: "Uptime" },
                    { value: "24/7", label: "Support" },
                    { value: "500+", label: "Users" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Hero Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-green-50 to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Total Requests",
                        value: stats.totalRequests,
                        icon: "📊",
                        color: "bg-blue-500",
                      },
                      {
                        label: "Pending",
                        value: stats.pendingRequests,
                        icon: "⏳",
                        color: "bg-yellow-500",
                      },
                      {
                        label: "In Progress",
                        value: stats.inProgressRequests,
                        icon: "⚙️",
                        color: "bg-purple-500",
                      },
                      {
                        label: "Completed",
                        value: stats.completedRequests,
                        icon: "✅",
                        color: "bg-green-500",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-white text-sm`}
                          >
                            {item.icon}
                          </div>
                          <span className="text-xs text-gray-600 font-medium">
                            {item.label}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for
                <span className="text-green-600"> Modern Facilities</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage, track, and optimize your
                maintenance operations in one comprehensive platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "📊",
                  title: "Real-time Analytics",
                  description:
                    "Monitor performance metrics and get insights into your maintenance operations with live dashboards.",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: "🤖",
                  title: "Smart Automation",
                  description:
                    "Automate routine tasks and prioritize requests based on urgency and resource availability.",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: "📱",
                  title: "Mobile Access",
                  description:
                    "Access your maintenance system from anywhere with our responsive mobile-first design.",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: "🔔",
                  title: "Instant Notifications",
                  description:
                    "Stay informed with real-time alerts and updates on maintenance requests and status changes.",
                  color: "from-yellow-500 to-yellow-600",
                },
                {
                  icon: "📈",
                  title: "Performance Tracking",
                  description:
                    "Track KPIs and generate detailed reports to optimize your maintenance strategies.",
                  color: "from-red-500 to-red-600",
                },
                {
                  icon: "🛡️",
                  title: "Secure Platform",
                  description:
                    "Enterprise-grade security with role-based access control and data encryption.",
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
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-green-600 to-green-700">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your
                <span className="block">Maintenance Operations?</span>
              </h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Join hundreds of organizations already using our platform to
                streamline their facility management and achieve operational
                excellence.
              </p>
              <motion.button
                onClick={() => {
                  const role = session?.user?.role;
                  if (role === "ADMIN") router.push("/admin/dashboard");
                  else if (
                    role === "USER" ||
                    role === "STUDENT" ||
                    role === "STAFF"
                  )
                    router.push("/student");
                  else router.push("/login");
                }}
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {session ? "Access Dashboard" : "Start Free Trial"}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
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
                    <h3 className="text-lg font-bold">IVF Maintenance</h3>
                    <p className="text-xs text-gray-400">Facility Management</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Modern facility management solution for organizations of all
                  sizes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <button className="hover:text-white transition-colors">
                      Features
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Security
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Roadmap
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <button className="hover:text-white transition-colors">
                      About
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Blog
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Careers
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <button className="hover:text-white transition-colors">
                      Help Center
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Documentation
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      API Reference
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Status
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2024 IVF Maintenance. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </MobileNavigationWrapper>
  );
}
