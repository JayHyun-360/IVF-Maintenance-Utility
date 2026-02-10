"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
import { Z_INDEX } from "@/lib/z-index";

// Mock data for demonstration
const mockStats = [
  {
    label: "Total Requests",
    value: 156,
    icon: "📊",
    trend: "+12%",
    color: "#6366f1",
  },
  { label: "Pending", value: 23, icon: "⏳", trend: "-5%", color: "#f59e0b" },
  {
    label: "In Progress",
    value: 18,
    icon: "⚙️",
    trend: "+2%",
    color: "#3b82f6",
  },
  {
    label: "Completed",
    value: 133,
    icon: "✅",
    trend: "+18%",
    color: "#10b981",
  },
];

const mockRecentRequests = [
  {
    id: 1,
    title: "HVAC System Maintenance",
    category: "HVAC",
    priority: "High",
    status: "Pending",
    submittedBy: "John Doe",
    date: "2h ago",
  },
  {
    id: 2,
    title: "Electrical Panel Inspection",
    category: "Electrical",
    priority: "Medium",
    status: "In Progress",
    submittedBy: "Jane Smith",
    date: "5h ago",
  },
  {
    id: 3,
    title: "Plumbing Leak Repair",
    category: "Plumbing",
    priority: "High",
    status: "Completed",
    submittedBy: "Bob Johnson",
    date: "1d ago",
  },
  {
    id: 4,
    title: "Lighting Fixture Replacement",
    category: "Electrical",
    priority: "Low",
    status: "Pending",
    submittedBy: "Alice Brown",
    date: "1d ago",
  },
];

export default function AdminDashboard() {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<any[]>([]);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, requestsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/requests?limit=5"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (requestsRes.ok) {
        const requestsData = await requestsRes.json();
        setRecentRequests(requestsData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return themeConfig.colors.success;
      case "in progress":
        return themeConfig.colors.primary;
      case "pending":
        return themeConfig.colors.warning || "#f59e0b";
      default:
        return themeConfig.colors.textSecondary;
    }
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-10"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-10"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
        </div>

        {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
        {!isMobile && (
          <aside
            className="fixed left-0 top-0 bottom-0 w-72 backdrop-blur-2xl border-r z-40 transition-all duration-500"
            style={{
              backgroundColor: `${themeConfig.colors.surface}cc`,
              borderColor: `${themeConfig.colors.border}50`,
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-12">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
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
                <span className="font-black text-xl tracking-tight">
                  ivf.admin
                </span>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Overview", icon: "📊" },
                  { id: "requests", label: "All Requests", icon: "📋" },
                  { id: "users", label: "User Management", icon: "👥" },
                  { id: "reports", label: "Reports", icon: "📈" },
                  { id: "settings", label: "Settings", icon: "⚙️" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all"
                    style={{
                      backgroundColor:
                        activeTab === item.id
                          ? `${themeConfig.colors.primary}15`
                          : "transparent",
                      color:
                        activeTab === item.id
                          ? themeConfig.colors.primary
                          : themeConfig.colors.textSecondary,
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <div
                className="p-4 rounded-3xl backdrop-blur-md border"
                style={{
                  backgroundColor: `${themeConfig.colors.text}10`,
                  borderColor: `${themeConfig.colors.border}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                    AD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">Admin User</p>
                    <p className="text-[10px] opacity-50 truncate">
                      admin@ivf.system
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  style={{
                    backgroundColor: `${themeConfig.colors.background}40`,
                    color: themeConfig.colors.text,
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main
          className={`transition-all duration-500 ${!isMobile ? "pl-72" : "pb-24"}`}
        >
          {/* Top Bar */}
          <div
            className="sticky top-0 z-30 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between border-b"
            style={{
              backgroundColor: `${themeConfig.colors.background}aa`,
              borderColor: `${themeConfig.colors.border}30`,
            }}
          >
            <div className="flex items-center gap-4">
              {isMobile && (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              )}
              <h1 className="text-lg sm:text-2xl font-black capitalize">
                {activeTab}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="hidden sm:flex items-center rounded-full px-4 py-2 border"
                style={{
                  backgroundColor: `${themeConfig.colors.text}08`,
                  borderColor: `${themeConfig.colors.border}20`,
                }}
              >
                <svg
                  className="w-4 h-4 opacity-30 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  className="bg-transparent border-none outline-none text-xs font-bold w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <BackButton fallback="/dashboard" />
                <ThemeSwitcher />
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {(stats.length > 0 ? stats : mockStats).map((stat, i) => (
                    <div
                      key={i}
                      className="group p-6 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 hover:translate-y-[-4px]"
                      style={{
                        backgroundColor: `${themeConfig.colors.surface}90`,
                        borderColor: `${themeConfig.colors.border}40`,
                        boxShadow: `0 15px 30px -15px rgba(0,0,0,0.05)`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${stat.color}15` }}
                        >
                          {stat.icon}
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.trend.startsWith("+") ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}
                        >
                          {stat.trend}
                        </span>
                      </div>
                      <div className="text-3xl font-black mb-1">
                        {loading ? "..." : stat.value}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black">Recent Requests</h2>
                      <button
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color: themeConfig.colors.primary }}
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {loading ? (
                        <div className="text-center py-10 opacity-50 font-bold">
                          Loading requests...
                        </div>
                      ) : recentRequests.length === 0 ? (
                        <div className="text-center py-10 opacity-50 font-bold">
                          No requests found.
                        </div>
                      ) : (
                        recentRequests.map((req) => (
                          <div
                            key={req.id}
                            className="group p-5 rounded-3xl border backdrop-blur-xl transition-all hover:shadow-lg"
                            style={{
                              backgroundColor: `${themeConfig.colors.surface}70`,
                              borderColor: `${themeConfig.colors.border}30`,
                            }}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div
                                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                                  style={{
                                    backgroundColor: `${getStatusColor(req.status)}10`,
                                  }}
                                >
                                  {req.category === "PLUMBING"
                                    ? "💧"
                                    : req.category === "ELECTRICAL"
                                      ? "⚡"
                                      : req.category === "CARPENTRY"
                                        ? "🔨"
                                        : "👥"}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-sm truncate">
                                    {req.title}
                                  </h3>
                                  <p className="text-[10px] font-medium opacity-70">
                                    {req.user?.name || "Unknown"} •{" "}
                                    {new Date(
                                      req.createdAt,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span
                                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border"
                                  style={{
                                    color: getStatusColor(req.status),
                                    borderColor: `${getStatusColor(req.status)}30`,
                                    backgroundColor: `${getStatusColor(req.status)}05`,
                                  }}
                                >
                                  {req.status}
                                </span>
                                <button
                                  onClick={() =>
                                    router.push(`/admin/requests/${req.id}`)
                                  }
                                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                                  style={{
                                    backgroundColor: `${themeConfig.colors.text}08`,
                                  }}
                                >
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
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* System Insights */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-black">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          label: "Generate Summary",
                          icon: "📄",
                          color: themeConfig.colors.primary,
                        },
                        {
                          label: "Physical Plant Request",
                          icon: "🔧",
                          color: themeConfig.colors.secondary,
                        },
                        {
                          label: "User Management",
                          icon: "👥",
                          color: themeConfig.colors.accent,
                        },
                        {
                          label: "System Reports",
                          icon: "📈",
                          color: themeConfig.colors.primary,
                        },
                      ].map((action, i) => (
                        <button
                          key={i}
                          className="flex items-center gap-4 p-4 rounded-3xl border transition-all hover:shadow-xl hover:translate-x-2"
                          style={{
                            backgroundColor: `${themeConfig.colors.surface}e0`,
                            borderColor: themeConfig.colors.border,
                          }}
                        >
                          <span
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                            style={{ backgroundColor: `${action.color}15` }}
                          >
                            {action.icon}
                          </span>
                          <span className="font-bold text-sm">
                            {action.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div
                      className="p-6 rounded-[2.5rem] border mt-8"
                      style={{
                        backgroundColor: `${themeConfig.colors.text}05`,
                        borderColor: `${themeConfig.colors.border}20`,
                      }}
                    >
                      <h3 className="text-sm font-black mb-4">
                        Urgent Attention
                      </h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                          <p className="text-[10px] font-bold text-red-500 mb-1 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />{" "}
                            Urgent Fault
                          </p>
                          <p className="text-[10px] opacity-80 leading-relaxed font-medium">
                            Main generator cooling system reported failure in
                            Block B.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Mobile Navigation Bar */}
        {isMobile && (
          <nav
            className="fixed bottom-0 left-0 right-0 h-20 backdrop-blur-2xl border-t z-50 flex items-center justify-around px-4"
            style={{
              backgroundColor: `${themeConfig.colors.surface}cc`,
              borderColor: `${themeConfig.colors.border}50`,
            }}
          >
            {[
              { id: "overview", icon: "📊" },
              { id: "requests", icon: "📋" },
              { id: "analytics", icon: "📈" },
              { id: "settings", icon: "⚙️" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor:
                    activeTab === item.id
                      ? `${themeConfig.colors.primary}15`
                      : "transparent",
                  transform:
                    activeTab === item.id ? "translateY(-8px)" : "none",
                }}
              >
                <span
                  className={`text-xl transition-all ${activeTab === item.id ? "grayscale-0" : "grayscale opacity-50"}`}
                >
                  {item.icon}
                </span>
              </button>
            ))}
          </nav>
        )}

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    </AuthGuard>
  );
}
