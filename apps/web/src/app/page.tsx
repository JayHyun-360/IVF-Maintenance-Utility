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
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{
          backgroundColor: themeConfig.colors.background,
          color: themeConfig.colors.text,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 animate-pulse"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 animate-pulse"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(${themeConfig.colors.text} 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Dynamic Header */}
        <header className="relative w-full transition-all duration-700">
          <div
            className="absolute inset-0 opacity-10 blur-sm"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transform hover:rotate-12 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                >
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <span className="font-bold text-xl tracking-tight hidden sm:block">
                  IVF Maintenance
                </span>
              </div>

              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <AccountDropdown />
              </div>
            </div>

            {/* Hero Section */}
            <div
              className={`text-center sm:text-left max-w-2xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
                Modern Facility{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                >
                  Management
                </span>
              </h1>
              <p
                className="text-lg opacity-80 mb-8 max-w-xl font-medium"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Streamline your workflows with our intelligent maintenance
                utility. Report issues, track progress, and maintain excellence
                in every corner of your facility.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const role = session?.user?.role;
                    if (role === "ADMIN") router.push("/admin/dashboard");
                    else if (role === "USER" || role === "STUDENT")
                      router.push("/student");
                    else router.push("/login");
                  }}
                  className="px-8 py-4 rounded-2xl font-bold text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                >
                  {session ? "Launch Dashboard" : "Get Started Now"}
                </button>
                <div className="flex -space-x-3 items-center px-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: `${themeConfig.colors.primary}${(i + 1) * 20}`,
                        borderColor: themeConfig.colors.background,
                      }}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <span className="ml-4 text-sm font-bold opacity-70">
                    Joined by 500+ users
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
            {[
              {
                label: "Total Requests",
                value: stats.totalRequests,
                icon: "📊",
                color: themeConfig.colors.primary,
              },
              {
                label: "Pending",
                value: stats.pendingRequests,
                icon: "⏳",
                color: themeConfig.colors.warning || "#f59e0b",
              },
              {
                label: "In Progress",
                value: stats.inProgressRequests,
                icon: "⚙️",
                color: themeConfig.colors.accent,
              },
              {
                label: "Completed",
                value: stats.completedRequests,
                icon: "✅",
                color: themeConfig.colors.success,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="group p-6 rounded-[2rem] backdrop-blur-xl border transition-all duration-500 hover:translate-y-[-8px]"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}80`,
                  borderColor: `${themeConfig.colors.border}50`,
                  boxShadow: `0 20px 40px -20px rgba(0,0,0,0.1)`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-black mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-bold opacity-70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions / Services Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <span
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: themeConfig.colors.primary }}
                />
                Platform Services
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "History & Archiving",
                    desc: "Instant access to all past maintenance records and resolution timelines.",
                    icon: "📜",
                    path: "/student/history",
                  },
                  {
                    title: "Live Reports",
                    desc: "Real-time analytics and performance metrics for your facility.",
                    icon: "📈",
                    path: "/admin/reports",
                  },
                  {
                    title: "Smart Scheduling",
                    desc: "Automated prioritization and resource allocation for urgent tasks.",
                    icon: "📅",
                    path: "/admin/dashboard",
                  },
                  {
                    title: "Settings & Profile",
                    desc: "Customize your notification preferences and account security.",
                    icon: "🛡️",
                    path: "/settings",
                  },
                ].map((service, i) => (
                  <button
                    key={i}
                    onClick={() => router.push(service.path)}
                    className="text-left group p-8 rounded-[2.5rem] backdrop-blur-xl border transition-all duration-300 hover:shadow-2xl"
                    style={{
                      backgroundColor: `${themeConfig.colors.surface}a0`,
                      borderColor: `${themeConfig.colors.border}40`,
                    }}
                  >
                    <div className="text-3xl mb-6 group-hover:scale-125 transition-transform origin-left">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-black mb-2">{service.title}</h3>
                    <p className="text-sm opacity-70 font-medium leading-relaxed">
                      {service.desc}
                    </p>
                    <div
                      className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      style={{ color: themeConfig.colors.primary }}
                    >
                      Learn More
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Side Card - Support/System Info */}
            <div className="space-y-6">
              <div
                className="sticky top-24 p-8 rounded-[3rem] border overflow-hidden relative"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}f0`,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -mr-16 -mt-16"
                  style={{ backgroundColor: themeConfig.colors.primary }}
                />

                <h2 className="text-2xl font-black mb-6">System Health</h2>
                <div className="space-y-6">
                  {[
                    {
                      label: "Cloud API",
                      status: "Operational",
                      color: themeConfig.colors.success,
                    },
                    {
                      label: "Database",
                      status: "Optimal",
                      color: themeConfig.colors.success,
                    },
                    {
                      label: "Asset Tracker",
                      status: "Active",
                      color: themeConfig.colors.success,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl"
                      style={{
                        backgroundColor: `${themeConfig.colors.text}08`,
                      }}
                    >
                      <span className="font-bold text-sm opacity-70">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                        <span
                          className="text-[10px] font-black uppercase"
                          style={{ color: item.color }}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div
                    className="pt-6 border-t"
                    style={{ borderColor: `${themeConfig.colors.border}40` }}
                  >
                    <div
                      className="p-6 rounded-3xl"
                      style={{
                        backgroundColor: `${themeConfig.colors.primary}10`,
                      }}
                    >
                      <h4
                        className="font-black text-sm mb-2"
                        style={{ color: themeConfig.colors.primary }}
                      >
                        Need Assistance?
                      </h4>
                      <p className="text-xs font-medium opacity-70 mb-4">
                        Our dedicated maintenance support team is available 24/7
                        for urgent inquiries.
                      </p>
                      <button className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-white text-black shadow-lg">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="mt-20 border-t py-12"
          style={{ borderColor: `${themeConfig.colors.border}40` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-6 h-6 rounded-lg bg-current" />
              <span className="font-bold">IVF Maintenance Utility © 2024</span>
            </div>
            <div className="flex gap-8 text-sm font-bold opacity-50">
              <a href="#" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Help Center
              </a>
            </div>
          </div>
        </footer>
      </div>
    </MobileNavigationWrapper>
  );
}
