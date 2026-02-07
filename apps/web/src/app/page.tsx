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
      <div className="min-h-screen bg-background text-text-primary">
        {/* Modern Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full w-80 bg-surface border-r border-border/20 z-40 shadow-2xl"
        >
          <div className="p-8 h-full flex flex-col">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 mb-12"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-8 h-8 text-secondary"
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
                <h1 className="font-bold text-2xl text-text-primary">
                  IVF Maintenance
                </h1>
                <p className="text-sm text-text-secondary font-medium">
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
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 ${
                    item.active
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-lg"
                      : "text-text-secondary hover:bg-surface hover:text-text-primary hover:shadow-md"
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
                      className="ml-auto w-3 h-3 bg-primary rounded-full"
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
              className="border-t border-border/20 pt-8"
            >
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-secondary border border-border/50">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-slate to-accent-slate/80 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-secondary font-bold">U</span>
                </motion.div>
                <div className="flex-1">
                  <div className="font-semibold text-text-primary">User</div>
                  <div className="text-xs text-text-secondary flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-success rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
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
        <main className="ml-80">
          {/* Enhanced Header */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-surface to-surface-secondary border-b border-border/50 px-12 py-12 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-slate bg-clip-text text-transparent">
                  Modern Facility Management
                </h1>
                <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
                  Streamline your workflows with our intelligent maintenance
                  utility. Experience seamless facility management with
                  real-time analytics and smart automation.
                </p>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
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
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-secondary rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {session ? "Launch Dashboard" : "Get Started"}
              </motion.button>
            </div>
          </motion.header>

          {/* Modern Bento Grid Content */}
          <div className="p-12">
            <div className="grid grid-cols-12 gap-8 auto-rows-fr">
              {/* Stats Cards - Top Row */}
              {[
                {
                  label: "Total Requests",
                  value: stats.totalRequests,
                  icon: "📊",
                  color: "from-blue-500 to-blue-600",
                  trend: "+12%",
                },
                {
                  label: "Pending",
                  value: stats.pendingRequests,
                  icon: "⏳",
                  color: "from-amber-500 to-amber-600",
                  trend: "+5%",
                },
                {
                  label: "In Progress",
                  value: stats.inProgressRequests,
                  icon: "⚙️",
                  color: "from-indigo-500 to-indigo-600",
                  trend: "+8%",
                },
                {
                  label: "Completed",
                  value: stats.completedRequests,
                  icon: "✅",
                  color: "from-emerald-500 to-emerald-600",
                  trend: "+18%",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="col-span-3 bg-gradient-to-br from-surface to-surface-secondary border border-border/50 rounded-3xl p-8 shadow-lg cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-2xl shadow-lg`}
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
                    className="text-4xl font-bold text-text-primary mb-3"
                    key={stat.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-text-secondary font-medium">
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
                className="col-span-8 bg-gradient-to-br from-surface to-surface-secondary border border-border/50 rounded-3xl p-10 shadow-xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-text-primary">
                    Platform Services
                  </h2>
                  <motion.button
                    className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
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
                      color: "from-blue-500/10 to-blue-600/10",
                      borderColor: "border-blue-200",
                    },
                    {
                      title: "Live Reports",
                      desc: "Real-time analytics and metrics",
                      icon: "📈",
                      color: "from-emerald-500/10 to-emerald-600/10",
                      borderColor: "border-emerald-200",
                    },
                    {
                      title: "Smart Scheduling",
                      desc: "Automated prioritization",
                      icon: "📅",
                      color: "from-indigo-500/10 to-indigo-600/10",
                      borderColor: "border-indigo-200",
                    },
                    {
                      title: "Settings & Profile",
                      desc: "Customize preferences",
                      icon: "🛡️",
                      color: "from-amber-500/10 to-amber-600/10",
                      borderColor: "border-amber-200",
                    },
                  ].map((service, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + i * 0.05 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="p-6 bg-gradient-to-br from-surface-secondary to-surface border border-border/50 rounded-2xl text-left hover:shadow-lg transition-all duration-300 group"
                    >
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} ${service.borderColor} border flex items-center justify-center text-2xl mb-4 shadow-sm`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {service.desc}
                      </p>
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
                className="col-span-4 bg-gradient-to-br from-surface to-surface-secondary border border-border/50 rounded-3xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-text-primary mb-8">
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
                      className="flex items-center justify-between p-4 bg-surface-secondary border border-border/50 rounded-xl hover:bg-surface transition-colors duration-200"
                    >
                      <span className="font-semibold text-text-primary">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`w-3 h-3 ${item.statusColor} rounded-full`}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <span className="text-sm text-success font-medium">
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
                  className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl hover:shadow-lg transition-all duration-200"
                >
                  <h4 className="font-bold text-text-primary mb-3">
                    Need Assistance?
                  </h4>
                  <p className="text-sm text-text-secondary mb-6">
                    Our support team is available 24/7
                  </p>
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-primary to-primary/80 text-secondary rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-200"
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
