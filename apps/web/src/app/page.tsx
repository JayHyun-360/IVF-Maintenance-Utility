"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { getMaintenanceStats } from "@/lib/data";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import { useSession } from "next-auth/react";
import AccountDropdown from "@/components/AccountDropdown";
import { MobileNavigationWrapper } from "@/components/MobileNavigation";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

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
      <div className="min-h-screen flex bg-background">
        {/* Enhanced Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-primary to-primary-dark border-r border-border/20 z-40 shadow-2xl backdrop-blur-xl">
          <div className="p-6 h-full flex flex-col">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
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
              </div>
              <div>
                <span className="font-bold text-xl text-white">
                  IVF Maintenance
                </span>
                <div className="text-xs text-white/70 font-medium">
                  Professional Facility Management
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {[
                { icon: "🏠", label: "Home", href: "/", active: true },
                { icon: "📊", label: "Dashboard", href: "/dashboard" },
                { icon: "📝", label: "Requests", href: "/student" },
                { icon: "📚", label: "History", href: "/student/history" },
                { icon: "⚙️", label: "Settings", href: "/settings" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                    item.active
                      ? "bg-white/10 text-white border border-white/20 shadow-lg"
                      : "text-white/80 hover:bg-white/5 hover:text-white hover:shadow-md"
                  }`}
                >
                  <span className="text-xl transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {item.active && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* User Section */}
            <div className="border-t border-white/20 pt-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-indigo to-accent-indigo/80 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">U</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">User</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Online
                  </div>
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72">
          {/* Enhanced Header */}
          <header className="bg-gradient-to-r from-surface to-surface-secondary border-b border-border/50 px-8 py-8 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in">
                <h1 className="heading-1 mb-3 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Modern Facility Management
                </h1>
                <p className="body-large text-text-secondary max-w-2xl">
                  Streamline your workflows with our intelligent maintenance
                  utility. Experience seamless facility management with
                  real-time analytics and smart automation.
                </p>
              </div>
              <button
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
                className="btn-primary animate-slide-up shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {session ? "Launch Dashboard" : "Get Started"}
              </button>
            </div>
          </header>

          {/* Enhanced Bento Grid Content */}
          <div className="p-8">
            <div className="grid grid-cols-12 gap-6 auto-rows-fr">
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
                <div
                  key={i}
                  className="col-span-3 card-gradient card-hover p-6 animate-slide-up group cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-200`}
                    >
                      {stat.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-success">
                        {stat.trend}
                      </span>
                      <svg
                        className="w-3 h-3 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-text-primary mb-2 counter">
                    {stat.value}
                  </div>
                  <div className="body-small text-text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}

              {/* Services Section - Large Card */}
              <div
                className="col-span-8 card-elevated p-8 animate-slide-up"
                style={{ animationDelay: "400ms" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-3">Platform Services</h2>
                  <button className="text-sm text-primary hover:text-primary-light font-medium transition-colors hover:underline">
                    View all →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                    <button
                      key={i}
                      className="p-5 bg-gradient-to-br from-surface to-surface-secondary border border-border/50 rounded-xl text-left hover:shadow-lg transition-all duration-300 hover:border-primary/30 group hover:scale-105"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} ${service.borderColor} border flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="body-small text-text-secondary">
                        {service.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* System Health - Side Card */}
              <div
                className="col-span-4 card-elevated p-6 animate-slide-up"
                style={{ animationDelay: "500ms" }}
              >
                <h2 className="heading-3 mb-6">System Health</h2>
                <div className="space-y-3">
                  {[
                    {
                      label: "Cloud API",
                      status: "Operational",
                      statusColor: "status-online",
                    },
                    {
                      label: "Database",
                      status: "Optimal",
                      statusColor: "status-online",
                    },
                    {
                      label: "Asset Tracker",
                      status: "Active",
                      statusColor: "status-online",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-surface-secondary border border-border/50 rounded-lg hover:bg-surface transition-colors duration-200"
                    >
                      <span className="body-medium text-text-primary">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`status-dot ${item.statusColor} animate-pulse`}
                        ></div>
                        <span className="body-small text-success">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-primary-light/5 border border-primary/20 rounded-xl hover:shadow-md transition-all duration-200">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Need Assistance?
                  </h4>
                  <p className="body-small text-text-secondary mb-4">
                    Our support team is available 24/7
                  </p>
                  <button className="w-full py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MobileNavigationWrapper>
  );
}
