"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { getMaintenanceRequests, MaintenanceRequest } from "@/lib/data";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";

export default function UserHistoryPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    const allRequests = getMaintenanceRequests();
    // In a real app, we'd filter by current user ID
    setRequests(allRequests);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return themeConfig.colors.success;
      case "IN_PROGRESS":
        return themeConfig.colors.primary;
      case "PENDING":
        return themeConfig.colors.warning || "#f59e0b";
      default:
        return themeConfig.colors.textSecondary;
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesSearch =
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AuthGuard>
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
            className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
        </div>

        {/* Header */}
        <header
          className="sticky top-0 z-30 backdrop-blur-xl border-b"
          style={{
            backgroundColor: `${themeConfig.colors.background}aa`,
            borderColor: `${themeConfig.colors.border}40`,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/student")}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-black/5"
                style={{ border: `1px solid ${themeConfig.colors.border}` }}
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
              <h1 className="text-xl font-black hidden sm:block">
                Request History
              </h1>
              <h1 className="text-lg font-black sm:hidden">History</h1>
            </div>

            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <button
                onClick={() => router.push("/student")}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                }}
              >
                New Request
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 relative z-10">
          {/* Controls Hook */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border transition-all outline-none focus:ring-4"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}80`,
                  borderColor: themeConfig.colors.border,
                  boxShadow: `0 0 0 0 ${themeConfig.colors.primary}20`,
                }}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
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
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {["all", "PENDING", "IN_PROGRESS", "COMPLETED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap border transition-all"
                  style={{
                    backgroundColor:
                      statusFilter === status
                        ? themeConfig.colors.primary
                        : `${themeConfig.colors.surface}80`,
                    color:
                      statusFilter === status
                        ? "#fff"
                        : themeConfig.colors.text,
                    borderColor:
                      statusFilter === status
                        ? themeConfig.colors.primary
                        : themeConfig.colors.border,
                  }}
                >
                  {status === "all" ? "All Requests" : status.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Requests List */}
          <div className="grid grid-cols-1 gap-4 animate-fade-in">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, i) => (
                <div
                  key={request.id}
                  className="group relative p-6 rounded-[2rem] border backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px]"
                  style={{
                    backgroundColor: `${themeConfig.colors.surface}80`,
                    borderColor: themeConfig.colors.border,
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{
                          backgroundColor: `${getStatusColor(request.status)}15`,
                        }}
                      >
                        {request.category === "Electrical"
                          ? "⚡"
                          : request.category === "Plumbing"
                            ? "💧"
                            : "🛠️"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-black truncate">
                            {request.title}
                          </h3>
                          <span
                            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg"
                            style={{
                              backgroundColor: `${themeConfig.colors.primary}10`,
                              color: themeConfig.colors.primary,
                            }}
                          >
                            #{request.id}
                          </span>
                        </div>
                        <p className="text-sm font-medium opacity-50 flex items-center gap-2">
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          </svg>
                          {request.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">
                          Last Update
                        </p>
                        <p className="text-xs font-bold">
                          {request.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span
                            className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
                            style={{
                              color: getStatusColor(request.status),
                              borderColor: `${getStatusColor(request.status)}40`,
                              backgroundColor: `${getStatusColor(request.status)}10`,
                            }}
                          >
                            {request.status.replace("_", " ")}
                          </span>
                        </div>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-all">
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="text-center py-20 px-8 rounded-[3rem] border border-dashed"
                style={{ borderColor: themeConfig.colors.border }}
              >
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-black mb-2">No Requests Found</h3>
                <p className="text-sm opacity-50 font-medium">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
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
            animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </AuthGuard>
  );
}
