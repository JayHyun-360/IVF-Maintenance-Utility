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
      <div className="min-h-screen bg-[#F0EEE9] text-[#141414]">
        {/* Modern Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full w-72 bg-white border-r border-[#E5E7EB] z-40 shadow-xl"
        >
          <div className="p-6 h-full flex flex-col">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#316263] to-[#4A8586] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </motion.div>
              <div>
                <h1 className="font-bold text-xl text-[#141414]">
                  IVF Maintenance
                </h1>
                <p className="text-xs text-[#6B7280] font-medium">
                  Professional Facility Management
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="space-y-3 flex-1">
              {[
                { icon: "🏠", label: "Home", href: "/", active: true },
                { icon: "📊", label: "Dashboard", href: "/dashboard" },
                { icon: "📝", label: "Requests", href: "/student" },
                { icon: "📚", label: "History", href: "/student/history" },
                { icon: "⚙️", label: "Settings", href: "/settings" },
              ].map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    item.active
                      ? "bg-[#316263]/10 text-[#316263] border border-[#316263]/20 shadow-md"
                      : "text-[#6B7280] hover:bg-[#F8F6F3] hover:text-[#141414]"
                  }`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="font-semibold">{item.label}</span>
                  {item.active && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-[#316263] rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* User Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-t border-[#E5E7EB] pt-6"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F6F3] border border-[#E5E7EB]">
                <motion.div
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2B2F36] to-[#2B2F36]/80 flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                >
                  <span className="text-white font-bold text-sm">U</span>
                </motion.div>
                <div className="flex-1">
                  <div className="font-medium text-[#141414] text-sm">User</div>
                  <div className="text-xs text-[#6B7280] flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-[#10B981] rounded-full"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    Online
                  </div>
                </div>
                <ThemeSwitcher />
              </div>
            </motion.div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="ml-72">
          {/* Cinematic Hero Section */}
          <motion.header
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2B1538] via-[#5A4B8A] to-[#88A3D6] opacity-90" />

            {/* Content */}
            <div className="relative px-8 py-16 lg:px-16 lg:py-24">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="max-w-3xl"
                  >
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                      Modern Facility
                      <br />
                      <span className="bg-gradient-to-r from-[#BFD3E7] to-[#E7D8C6] bg-clip-text text-transparent">
                        Management
                      </span>
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
                      Streamline your workflows with our intelligent maintenance
                      utility. Experience seamless facility management with
                      real-time analytics and smart automation.
                    </p>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
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
                      className="px-8 py-4 bg-white text-[#316263] rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {session ? "Launch Dashboard" : "Get Started"}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Modern Bento Grid Content */}
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-12 gap-6 auto-rows-fr">
              {/* Stats Cards - Top Row */}
              {[
                {
                  label: "Total Requests",
                  value: stats.totalRequests,
                  icon: "📊",
                  color: "from-[#316263] to-[#4A8586]",
                  trend: "+12%",
                },
                {
                  label: "Pending",
                  value: stats.pendingRequests,
                  icon: "⏳",
                  color: "from-[#C36A4A] to-[#D87F5F]",
                  trend: "+5%",
                },
                {
                  label: "In Progress",
                  value: stats.inProgressRequests,
                  icon: "⚙️",
                  color: "from-[#5A4B8A] to-[#88A3D6]",
                  trend: "+8%",
                },
                {
                  label: "Completed",
                  value: stats.completedRequests,
                  icon: "✅",
                  color: "from-[#10B981] to-[#34D399]",
                  trend: "+18%",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="col-span-3 bg-white rounded-2xl p-6 shadow-lg border border-[#E5E7EB] cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-2xl shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-success">
                        {stat.trend}
                      </span>
                      <motion.svg
                        className="w-4 h-4 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </motion.svg>
                    </div>
                  </div>
                  <motion.div
                    className="text-3xl font-bold text-[#141414] mb-3"
                    key={stat.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-[#6B7280] font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}

              {/* Services Section - Large Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.01 }}
                className="col-span-8 bg-white rounded-3xl p-8 shadow-xl border border-[#E5E7EB]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#141414]">
                    Platform Services
                  </h2>
                  <motion.button
                    className="text-sm text-[#316263] hover:text-[#4A8586] font-semibold transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View all →
                  </motion.button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      title: "History & Archiving",
                      desc: "Access to all past maintenance records",
                      icon: "📜",
                      color: "from-[#BFD3E7]/20 to-[#BFD3E7]/10",
                      borderColor: "border-[#BFD3E7]/30",
                    },
                    {
                      title: "Live Reports",
                      desc: "Real-time analytics and metrics",
                      icon: "📈",
                      color: "from-[#E7D8C6]/20 to-[#E7D8C6]/10",
                      borderColor: "border-[#E7D8C6]/30",
                    },
                    {
                      title: "Smart Scheduling",
                      desc: "Automated prioritization",
                      icon: "📅",
                      color: "from-[#40E0FF]/20 to-[#40E0FF]/10",
                      borderColor: "border-[#40E0FF]/30",
                    },
                    {
                      title: "Settings & Profile",
                      desc: "Customize preferences",
                      icon: "🛡️",
                      color: "from-[#B6FF3B]/20 to-[#B6FF3B]/10",
                      borderColor: "border-[#B6FF3B]/30",
                    },
                  ].map((service, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + i * 0.05 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="p-6 bg-gradient-to-br from-[#F8F6F3] to-white border border-[#E5E7EB] rounded-2xl text-left hover:shadow-lg transition-all duration-300 group"
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} ${service.borderColor} border flex items-center justify-center text-2xl mb-4 shadow-sm`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="font-bold text-[#141414] mb-2 group-hover:text-[#316263] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#6B7280]">{service.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* System Health - Side Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                className="col-span-4 bg-white rounded-3xl p-6 shadow-xl border border-[#E5E7EB]"
              >
                <h2 className="text-xl font-bold text-[#141414] mb-6">
                  System Health
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      label: "Cloud API",
                      status: "Operational",
                      statusColor: "bg-success",
                    },
                    {
                      label: "Database",
                      status: "Optimal",
                      statusColor: "bg-success",
                    },
                    {
                      label: "Asset Tracker",
                      status: "Active",
                      statusColor: "bg-success",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-3 bg-[#F8F6F3] border border-[#E5E7EB] rounded-xl hover:bg-white transition-colors duration-200"
                    >
                      <span className="font-medium text-[#141414] text-sm">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <motion.div
                          className={`w-2 h-2 ${item.statusColor} rounded-full`}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <span className="text-xs text-[#10B981] font-medium">
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="mt-6 p-4 bg-gradient-to-br from-[#316263]/5 to-[#4A8586]/5 border border-[#316263]/20 rounded-2xl hover:shadow-md transition-all duration-200"
                >
                  <h4 className="font-bold text-[#141414] mb-2 text-sm">
                    Need Assistance?
                  </h4>
                  <p className="text-xs text-[#6B7280] mb-4">
                    Our support team is available 24/7
                  </p>
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-[#316263] to-[#4A8586] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Support
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </MobileNavigationWrapper>
  );
}
