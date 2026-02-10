"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getMaintenanceStats,
  getRequestsByCategory,
  getRequestsByPriority,
} from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

export default function AdminReportsPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const stats = getMaintenanceStats();
  const categoryData = getRequestsByCategory();
  const priorityData = getRequestsByPriority();
  const [timeRange, setTimeRange] = useState("30");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completionRate =
    stats.totalRequests > 0
      ? Math.round((stats.completedRequests / stats.totalRequests) * 100)
      : 0;

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{
          backgroundColor: themeConfig.colors.background,
          color: themeConfig.colors.text,
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
        </div>

        {/* Header */}
        <header
          className="sticky top-0 z-30 backdrop-blur-xl border-b px-4 sm:px-8 py-4"
          style={{
            backgroundColor: `${themeConfig.colors.background}aa`,
            borderColor: `${themeConfig.colors.border}40`,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  border: `1px solid ${themeConfig.colors.border}`,
                  backgroundColor: `${themeConfig.colors.text}08`,
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-black">Analytics Hub</h1>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="hidden sm:flex items-center gap-2 p-1 rounded-xl border"
                style={{
                  backgroundColor: `${themeConfig.colors.text}08`,
                  borderColor: `${themeConfig.colors.border}20`,
                }}
              >
                {["7", "30", "90"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === range ? "bg-white shadow-sm scale-105" : "opacity-40"}`}
                    style={{ color: timeRange === range ? "#000" : "inherit" }}
                  >
                    {range} Days
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <BackButton fallback="/admin/dashboard" />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Key Metrics & Distribution */}
            <div className="lg:col-span-2 space-y-8">
              {/* Executive Summary */}
              <div
                className="p-8 rounded-[3rem] border backdrop-blur-md overflow-hidden relative"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}80`,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-10 blur-3xl -mr-20 -mt-20"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                />

                <h2 className="text-2xl font-black mb-8">
                  Performance Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      Operational Efficiency
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black">
                        {completionRate}%
                      </span>
                      <span className="text-xs font-bold text-green-500">
                        ↑ 4.2%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000"
                        style={{
                          width: `${completionRate}%`,
                          backgroundColor: themeConfig.colors.success,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      Avg. Resolution Time
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black">4.8h</span>
                      <span className="text-xs font-bold text-green-500">
                        ↓ 1.2h
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 w-[65%]"
                        style={{ backgroundColor: themeConfig.colors.primary }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      Active Tasks
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black">
                        {stats.inProgressRequests}
                      </span>
                      <span className="text-xs font-bold opacity-40">
                        Stable
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 w-[40%]"
                        style={{ backgroundColor: themeConfig.colors.accent }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Visuals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category Breakdown */}
                <div
                  className="p-8 rounded-[2.5rem] border backdrop-blur-md"
                  style={{
                    backgroundColor: `${themeConfig.colors.surface}80`,
                    borderColor: themeConfig.colors.border,
                  }}
                >
                  <h3 className="text-lg font-black mb-6">
                    Request Distribution
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(categoryData).map(([cat, count], i) => (
                      <div key={cat} className="space-y-2">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
                          <span className="opacity-60">{cat}</span>
                          <span>{String(count)}</span>
                        </div>
                        <div
                          className="h-1.5 w-full rounded-full overflow-hidden"
                          style={{
                            backgroundColor: `${themeConfig.colors.text}10`,
                          }}
                        >
                          <div
                            className="h-full transition-all duration-1000"
                            style={{
                              width: `${Math.min(100, (Number(count) / stats.totalRequests) * 100)}%`,
                              backgroundColor: [
                                themeConfig.colors.primary,
                                themeConfig.colors.secondary,
                                themeConfig.colors.accent,
                              ][i % 3],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Heatmap (Simplified) */}
                <div
                  className="p-8 rounded-[2.5rem] border backdrop-blur-md"
                  style={{
                    backgroundColor: `${themeConfig.colors.surface}80`,
                    borderColor: themeConfig.colors.border,
                  }}
                >
                  <h3 className="text-lg font-black mb-6">Priority Spectrum</h3>
                  <div className="flex flex-col gap-4">
                    {Object.entries(priorityData).map(([priority, count]) => (
                      <div
                        key={priority}
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{
                          backgroundColor: `${themeConfig.colors.text}08`,
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              priority === "URGENT"
                                ? themeConfig.colors.error
                                : priority === "HIGH"
                                  ? themeConfig.colors.warning
                                  : themeConfig.colors.primary,
                          }}
                        />
                        <span className="flex-1 text-xs font-black uppercase tracking-widest">
                          {priority}
                        </span>
                        <span className="font-black text-lg">
                          {String(count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Actions & Export */}
            <div className="space-y-8">
              <div
                className="p-8 rounded-[3rem] border backdrop-blur-md sticky top-28"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}c0`,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <h2 className="text-xl font-black mb-6">Report Management</h2>

                <div className="grid grid-cols-1 gap-4 mb-8">
                  {[
                    { label: "Download PDF Report", icon: "📄" },
                    { label: "Export Data (Excel)", icon: "📊" },
                    { label: "Generate System Log", icon: "📝" },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl border transition-all group"
                      style={{
                        backgroundColor: `${themeConfig.colors.text}05`,
                        borderColor: `${themeConfig.colors.border}20`,
                      }}
                    >
                      <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shadow-inner">
                        {btn.icon}
                      </span>
                      <span className="font-bold text-xs uppercase tracking-widest">
                        {btn.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div
                  className="p-6 rounded-3xl"
                  style={{ backgroundColor: `${themeConfig.colors.primary}10` }}
                >
                  <h4
                    className="font-black text-xs mb-3"
                    style={{ color: themeConfig.colors.primary }}
                  >
                    AUTO-SCHEDULED REPORTS
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold opacity-60">
                        Weekly Digest
                      </span>
                      <span className="text-[10px] font-black uppercase text-green-500">
                        Enabled
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold opacity-60">
                        Monthly Report
                      </span>
                      <span className="text-[10px] font-black uppercase text-green-500">
                        Enabled
                      </span>
                    </div>
                  </div>
                  <button
                    className="w-full mt-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      color: themeConfig.colors.text,
                    }}
                  >
                    Manage Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

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
            animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    </AuthGuard>
  );
}
