"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import AuthGuard from "@/components/AuthGuard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";

export default function AdminRequestsPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const url =
        filterStatus === "ALL"
          ? "/api/requests"
          : `/api/requests?status=${filterStatus}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "#f59e0b";
      case "IN_PROGRESS":
        return "#3b82f6";
      case "COMPLETED":
        return "#10b981";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        <WebHeader
          title="Maintenance Requests"
          breadcrumbs={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Requests" },
          ]}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border focus:ring-2 outline-none transition-all"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              {["ALL", "PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${filterStatus === status ? "shadow-lg scale-105" : "opacity-60 hover:opacity-100"}`}
                    style={{
                      backgroundColor:
                        filterStatus === status
                          ? themeConfig.colors.primary
                          : themeConfig.colors.surface,
                      color:
                        filterStatus === status
                          ? "white"
                          : themeConfig.colors.text,
                      border: `1px solid ${themeConfig.colors.border}`,
                    }}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 opacity-50 font-bold">
              Loading requests...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-20 opacity-50 font-bold">
              No requests found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  onClick={() => router.push(`/admin/requests/${req.id}`)}
                  className="group p-6 rounded-[2rem] border backdrop-blur-xl transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
                  style={{
                    backgroundColor: `${themeConfig.colors.surface}80`,
                    borderColor: `${themeConfig.colors.border}40`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                        style={{
                          backgroundColor: `${getStatusColor(req.status)}15`,
                        }}
                      >
                        {req.category === "PLUMBING"
                          ? "💧"
                          : req.category === "ELECTRICAL"
                            ? "⚡"
                            : "🛠️"}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{req.title}</h3>
                        <p className="text-sm opacity-60">
                          {req.user?.name} • {req.location} •{" "}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span
                        className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border"
                        style={{
                          color: getStatusColor(req.status),
                          borderColor: `${getStatusColor(req.status)}40`,
                          backgroundColor: `${getStatusColor(req.status)}05`,
                        }}
                      >
                        {req.status}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1"
                        style={{
                          backgroundColor: `${themeConfig.colors.text}08`,
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
