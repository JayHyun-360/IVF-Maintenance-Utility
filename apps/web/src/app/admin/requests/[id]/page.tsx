"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import AuthGuard from "@/components/AuthGuard";
import WebHeader from "@/components/WebHeader";
import Button from "@/components/Button";

export default function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchRequestDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/requests/${id}`);
      if (response.ok) {
        const data = await response.json();
        setRequest(data);
      } else {
        router.push("/admin/requests");
      }
    } catch (error) {
      console.error("Error fetching request detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetail();
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      setUpdating(true);
      const response = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        await fetchRequestDetail();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold opacity-50">
        Loading details...
      </div>
    );
  if (!request) return null;

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        <WebHeader
          title={`Request #${id.slice(-4)}`}
          breadcrumbs={[
            { label: "Requests", href: "/admin/requests" },
            { label: "Details" },
          ]}
        />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div
            className="p-8 rounded-[2.5rem] border backdrop-blur-xl mb-8"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
              <div>
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-4 inline-block"
                  style={{
                    color: themeConfig.colors.primary,
                    borderColor: `${themeConfig.colors.primary}40`,
                    backgroundColor: `${themeConfig.colors.primary}05`,
                  }}
                >
                  {request.category}
                </span>
                <h1 className="text-3xl font-black mb-2">{request.title}</h1>
                <p className="opacity-60">{request.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className="px-4 py-2 rounded-2xl font-black text-sm border"
                  style={{
                    color: "white",
                    backgroundColor:
                      request.status === "COMPLETED" ? "#10b981" : "#f59e0b",
                    borderColor: "transparent",
                  }}
                >
                  {request.status}
                </span>
                <p className="text-xs opacity-50 font-bold">
                  Priority: {request.priority}
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y"
              style={{ borderColor: `${themeConfig.colors.border}40` }}
            >
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">
                  Requester
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {request.user?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-bold">{request.user?.name}</p>
                    <p className="text-xs opacity-60">{request.user?.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">
                  Location
                </h4>
                <p className="font-bold">{request.location}</p>
                <p className="text-xs opacity-60">
                  Submitted on {new Date(request.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {request.images && (
              <div className="mt-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">
                  Attached Images
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Handle images if they were stored as JSON string */}
                  {(typeof request.images === "string"
                    ? JSON.parse(request.images)
                    : request.images
                  ).map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img}
                      alt="Request attachment"
                      className="rounded-2xl border w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {request.status === "PENDING" && (
              <Button
                onClick={() => handleUpdateStatus("IN_PROGRESS")}
                loading={updating}
              >
                Start Working
              </Button>
            )}
            {request.status === "IN_PROGRESS" && (
              <Button
                onClick={() => handleUpdateStatus("COMPLETED")}
                loading={updating}
                style={{ backgroundColor: "#10b981" }}
              >
                Mark as Completed
              </Button>
            )}
            {request.status !== "CANCELLED" &&
              request.status !== "COMPLETED" && (
                <Button
                  variant="secondary"
                  onClick={() => handleUpdateStatus("CANCELLED")}
                  loading={updating}
                >
                  Cancel Request
                </Button>
              )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
