"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import BackButton from "@/components/BackButton";

export default function EmergencyPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [urgentRequests, setUrgentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
  });

  const fetchUrgentRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/requests?priority=URGENT");
      if (response.ok) {
        const data = await response.json();
        setUrgentRequests(
          data.filter((req: any) => req.status !== "COMPLETED"),
        );
      }
    } catch (error) {
      console.error("Error fetching urgent requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrgentRequests();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmergencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `EMERGENCY: ${formData.type.replace("_", " ")}`,
          description: formData.description,
          category: formData.type === "FIRE_SAFETY" ? "OTHERS" : formData.type,
          priority: "URGENT",
          location: formData.location,
        }),
      });

      if (response.ok) {
        alert(
          "Emergency notification sent to all maintenance staff and security!",
        );
        setFormData({ type: "", location: "", description: "" });
        fetchUrgentRequests();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to send emergency alert");
      }
    } catch (error) {
      console.error("Error submitting emergency:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: themeConfig.colors.background }}
      className="min-h-screen relative"
    >
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <BackButton fallback="/dashboard" />
      </div>

      {/* Alert Banner */}
      <div
        className="px-8 py-4"
        style={{
          backgroundColor: themeConfig.colors.error,
          color: "white",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center">
          <svg
            className="w-6 h-6 mr-3 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="font-semibold">EMERGENCY MAINTENANCE SYSTEM</span>
        </div>
      </div>

      <header
        className="px-8 py-6 border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/")}
              className="p-3 rounded-xl mr-4"
              style={{
                backgroundColor: themeConfig.colors.surface,
                color: themeConfig.colors.text,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              ←
            </button>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: themeConfig.colors.error }}
              >
                Emergency Requests
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Critical maintenance requiring immediate attention
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: themeConfig.colors.error }}
            ></div>
            <span
              className="text-sm font-medium"
              style={{ color: themeConfig.colors.text }}
            >
              {urgentRequests.length} Active Emergencies
            </span>
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Quick Emergency Actions */}
          <div
            className="rounded-xl p-6 border-2"
            style={{
              backgroundColor: `${themeConfig.colors.error}10`,
              borderColor: `${themeConfig.colors.error}30`,
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: themeConfig.colors.error }}
            >
              Quick Emergency Actions
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <button
                className="p-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  border: `1px solid ${themeConfig.colors.error}30`,
                }}
              >
                <div className="text-2xl mb-2">🚨</div>
                <div
                  className="text-sm font-medium"
                  style={{ color: themeConfig.colors.error }}
                >
                  Fire Safety
                </div>
              </button>
              <button
                className="p-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  border: `1px solid ${themeConfig.colors.error}30`,
                }}
              >
                <div className="text-2xl mb-2">⚡</div>
                <div
                  className="text-sm font-medium"
                  style={{ color: themeConfig.colors.error }}
                >
                  Power Outage
                </div>
              </button>
              <button
                className="p-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  border: `1px solid ${themeConfig.colors.error}30`,
                }}
              >
                <div className="text-2xl mb-2">💧</div>
                <div
                  className="text-sm font-medium"
                  style={{ color: themeConfig.colors.error }}
                >
                  Water Leak
                </div>
              </button>
              <button
                className="p-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  border: `1px solid ${themeConfig.colors.error}30`,
                }}
              >
                <div className="text-2xl mb-2">🔥</div>
                <div
                  className="text-sm font-medium"
                  style={{ color: themeConfig.colors.error }}
                >
                  Gas Leak
                </div>
              </button>
            </div>
          </div>

          {/* Emergency Form */}
          <div
            className="rounded-xl p-6 shadow-lg"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: themeConfig.colors.text }}
            >
              Report New Emergency
            </h3>
            <form onSubmit={handleEmergencySubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Emergency Type
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      color: themeConfig.colors.text,
                    }}
                  >
                    <option value="">Select emergency type...</option>
                    <option value="FIRE_SAFETY">🚨 Fire Safety</option>
                    <option value="ELECTRICAL">⚡ Electrical Emergency</option>
                    <option value="PLUMBING">💧 Water Emergency</option>
                    <option value="GAS">🔥 Gas Leak</option>
                    <option value="STRUCTURAL">🏢 Structural Issue</option>
                    <option value="SECURITY">🔒 Security Issue</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Building, floor, room..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      color: themeConfig.colors.text,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Emergency Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the emergency situation in detail..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 resize-none"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    color: themeConfig.colors.text,
                  }}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                  style={{
                    backgroundColor: themeConfig.colors.error,
                    color: "white",
                  }}
                >
                  {isSubmitting ? "Sending Alert..." : "Send Emergency Alert"}
                </button>
                <span
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  This will notify all maintenance staff and security
                  immediately
                </span>
              </div>
            </form>
          </div>

          {/* Active Emergency Requests */}
          <div
            className="rounded-xl shadow-lg overflow-hidden"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <div
              className="px-6 py-4"
              style={{
                backgroundColor: themeConfig.colors.error,
                color: "white",
              }}
            >
              <h3 className="text-lg font-semibold">
                Active Emergency Requests
              </h3>
            </div>

            {urgentRequests.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div
                  className="text-lg font-medium mb-2"
                  style={{ color: themeConfig.colors.success }}
                >
                  ✅ No Active Emergencies
                </div>
                <p style={{ color: themeConfig.colors.textSecondary }}>
                  All systems are currently operating normally
                </p>
              </div>
            ) : (
              <div
                className="divide-y"
                style={{ borderColor: themeConfig.colors.border }}
              >
                {urgentRequests.map((request) => (
                  <div key={request.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${themeConfig.colors.error}20`,
                              color: themeConfig.colors.error,
                            }}
                          >
                            URGENT
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: themeConfig.colors.textSecondary }}
                          >
                            {request.createdAt.toLocaleString()}
                          </span>
                        </div>
                        <h4
                          className="text-lg font-semibold mb-2"
                          style={{ color: themeConfig.colors.text }}
                        >
                          {request.title}
                        </h4>
                        <p
                          className="text-sm mb-3"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {request.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span style={{ color: themeConfig.colors.text }}>
                            📍 {request.location}
                          </span>
                          <span style={{ color: themeConfig.colors.text }}>
                            👤 {request.user?.name || "Unknown"}
                          </span>
                          <span
                            className="px-2 py-1 rounded-full text-xs"
                            style={{
                              backgroundColor:
                                request.status === "IN_PROGRESS"
                                  ? `${themeConfig.colors.primary}20`
                                  : `${themeConfig.colors.warning}20`,
                              color:
                                request.status === "IN_PROGRESS"
                                  ? themeConfig.colors.primary
                                  : themeConfig.colors.warning,
                            }}
                          >
                            {request.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                          style={{
                            backgroundColor: themeConfig.colors.primary,
                            color: "white",
                          }}
                        >
                          Assign Staff
                        </button>
                        <button
                          className="px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105"
                          style={{
                            backgroundColor: themeConfig.colors.success,
                            color: "white",
                          }}
                        >
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
