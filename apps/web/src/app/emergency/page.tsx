"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMaintenanceRequests, MaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

export default function EmergencyPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [urgentRequests, setUrgentRequests] = useState<MaintenanceRequest[]>(
    [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const allRequests = getMaintenanceRequests();
    const urgent = allRequests.filter(
      (req) => req.priority === "URGENT" && req.status !== "COMPLETED",
    );
    setUrgentRequests(urgent);
  }, []);

  const handleEmergencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate emergency notification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Emergency notification sent to all maintenance staff and security!");
    setIsSubmitting(false);
  };

  return (
    <div
      style={{ backgroundColor: themeConfig.colors.background }}
      className="min-h-screen"
    >
      {/* Alert Banner */}
      <div className="bg-red-600 text-white px-8 py-4">
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
              <h1 className="text-2xl font-bold text-red-600">
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
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
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
            className="rounded-xl p-6 border-2 border-red-200 bg-red-50"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.05)",
              borderColor: "#FCA5A5",
            }}
          >
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              Quick Emergency Actions
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <button className="p-4 rounded-xl bg-white border border-red-200 hover:bg-red-100 transition-all duration-300">
                <div className="text-2xl mb-2">🚨</div>
                <div className="text-sm font-medium text-red-800">
                  Fire Safety
                </div>
              </button>
              <button className="p-4 rounded-xl bg-white border border-red-200 hover:bg-red-100 transition-all duration-300">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-medium text-red-800">
                  Power Outage
                </div>
              </button>
              <button className="p-4 rounded-xl bg-white border border-red-200 hover:bg-red-100 transition-all duration-300">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-sm font-medium text-red-800">
                  Water Leak
                </div>
              </button>
              <button className="p-4 rounded-xl bg-white border border-red-200 hover:bg-red-100 transition-all duration-300">
                <div className="text-2xl mb-2">🔥</div>
                <div className="text-sm font-medium text-red-800">Gas Leak</div>
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
                  className="px-8 py-3 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Sending Alert..."
                    : "🚨 Send Emergency Alert"}
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
            <div className="px-6 py-4 bg-red-600 text-white">
              <h3 className="text-lg font-semibold">
                Active Emergency Requests
              </h3>
            </div>

            {urgentRequests.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-green-600 text-lg font-medium mb-2">
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
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
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
                            👤 {request.requestedBy}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              request.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {request.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700">
                          Assign Staff
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700">
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
