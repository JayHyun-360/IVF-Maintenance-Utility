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
      <div className="min-h-screen flex bg-white">
        {/* Fixed Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-primary border-r border-border z-40">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
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
              <span className="font-bold text-xl text-secondary">
                IVF Maintenance
              </span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { icon: "🏠", label: "Home", href: "/" },
                { icon: "📊", label: "Dashboard", href: "/dashboard" },
                { icon: "📝", label: "Requests", href: "/student" },
                { icon: "📚", label: "History", href: "/student/history" },
                { icon: "⚙️", label: "Settings", href: "/settings" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-primary/80 transition-colors text-secondary"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* User Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-slate flex items-center justify-center">
                <span className="text-secondary font-bold">U</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-secondary">User</div>
                <div className="text-sm text-accent-slate">Online</div>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white border-b border-border px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Modern Facility Management
                </h1>
                <p className="text-accent-slate">
                  Streamline your workflows with our intelligent maintenance
                  utility
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
                className="px-6 py-3 bg-primary text-secondary rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {session ? "Launch Dashboard" : "Get Started"}
              </button>
            </div>
          </header>

          {/* Bento Grid Content */}
          <div className="p-8">
            <div className="grid grid-cols-12 gap-6 auto-rows-fr">
              {/* Stats Cards - Top Row */}
              {[
                {
                  label: "Total Requests",
                  value: stats.totalRequests,
                  icon: "📊",
                },
                { label: "Pending", value: stats.pendingRequests, icon: "⏳" },
                {
                  label: "In Progress",
                  value: stats.inProgressRequests,
                  icon: "⚙️",
                },
                {
                  label: "Completed",
                  value: stats.completedRequests,
                  icon: "✅",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="col-span-3 bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{stat.icon}</span>
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-accent-slate">{stat.label}</div>
                </div>
              ))}

              {/* Services Section - Large Card */}
              <div className="col-span-8 bg-surface border border-border rounded-lg p-8">
                <h2 className="text-xl font-bold text-primary mb-6">
                  Platform Services
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: "History & Archiving",
                      desc: "Access to all past maintenance records",
                      icon: "📜",
                    },
                    {
                      title: "Live Reports",
                      desc: "Real-time analytics and metrics",
                      icon: "📈",
                    },
                    {
                      title: "Smart Scheduling",
                      desc: "Automated prioritization",
                      icon: "📅",
                    },
                    {
                      title: "Settings & Profile",
                      desc: "Customize preferences",
                      icon: "🛡️",
                    },
                  ].map((service, i) => (
                    <button
                      key={i}
                      className="p-4 bg-white border border-border rounded-lg text-left hover:shadow-sm transition-shadow"
                    >
                      <div className="text-xl mb-2">{service.icon}</div>
                      <h3 className="font-medium text-primary mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-accent-slate">
                        {service.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* System Health - Side Card */}
              <div className="col-span-4 bg-surface border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-primary mb-4">
                  System Health
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Cloud API", status: "Operational" },
                    { label: "Database", status: "Optimal" },
                    { label: "Asset Tracker", status: "Active" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-white border border-border rounded"
                    >
                      <span className="text-sm font-medium text-primary">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        <span className="text-xs text-success">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">
                    Need Assistance?
                  </h4>
                  <p className="text-sm text-accent-slate mb-3">
                    Our support team is available 24/7
                  </p>
                  <button className="w-full py-2 bg-primary text-secondary rounded font-medium text-sm hover:bg-primary/90 transition-colors">
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
