"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMaintenanceRequests, MaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

export default function StudentHistoryPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const allRequests = getMaintenanceRequests();
    const studentRequests = allRequests.filter((req) =>
      req.requestedBy.includes("Student"),
    );
    setRequests(studentRequests);
  }, []);

  return (
    <div
      style={{ backgroundColor: themeConfig.colors.background }}
      className="min-h-screen"
    >
      <header
        className="px-8 py-6 border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/student")}
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
                style={{ color: themeConfig.colors.text }}
              >
                My Request History
              </h1>
            </div>
          </div>
          <button
            onClick={() => router.push("/student")}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
              color: "#FFFFFF",
            }}
          >
            New Request
          </button>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-xl p-6 mb-8"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    border: "1px solid",
                  }}
                >
                  <option value="all">All Status</option>
                  <option
                    value="PENDING"
                    style={{
                      color: themeConfig.colors.warning,
                      fontWeight: "bold",
                    }}
                  >
                    ⬤ Pending
                  </option>
                  <option
                    value="IN_PROGRESS"
                    style={{
                      color: themeConfig.colors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    ⬤ In Progress
                  </option>
                  <option
                    value="COMPLETED"
                    style={{
                      color: themeConfig.colors.success,
                      fontWeight: "bold",
                    }}
                  >
                    ⬤ Completed
                  </option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="flex space-x-4 w-full">
                  <div
                    className="flex-1 p-3 rounded-xl text-center"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      border: `1px solid ${themeConfig.colors.border}`,
                    }}
                  >
                    <div
                      className="text-lg font-bold"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {requests.length}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Total Requests
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <table className="w-full">
              <thead
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderBottom: "1px solid",
                }}
              >
                <tr>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Request
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Location
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests
                  .filter(
                    (req) =>
                      statusFilter === "all" || req.status === statusFilter,
                  )
                  .map((request) => (
                    <tr
                      key={request.id}
                      style={{
                        borderBottom: `1px solid ${themeConfig.colors.border}`,
                      }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div
                            className="font-medium"
                            style={{ color: themeConfig.colors.text }}
                          >
                            {request.title}
                          </div>
                          <div
                            className="text-sm mt-1"
                            style={{ color: themeConfig.colors.textSecondary }}
                          >
                            {request.category}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="text-sm"
                          style={{ color: themeConfig.colors.text }}
                        >
                          {request.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium`}
                          style={{
                            background:
                              request.status === "COMPLETED"
                                ? `linear-gradient(135deg, ${themeConfig.colors.success}20 0%, ${themeConfig.colors.success}10 100%)`
                                : request.status === "IN_PROGRESS"
                                  ? `linear-gradient(135deg, ${themeConfig.colors.primary}20 0%, ${themeConfig.colors.primary}10 100%)`
                                  : `linear-gradient(135deg, ${themeConfig.colors.warning}20 0%, ${themeConfig.colors.warning}10 100%)`,
                            color:
                              request.status === "COMPLETED"
                                ? themeConfig.colors.success
                                : request.status === "IN_PROGRESS"
                                  ? themeConfig.colors.primary
                                  : themeConfig.colors.warning,
                            border: `1px solid ${
                              request.status === "COMPLETED"
                                ? themeConfig.colors.success
                                : request.status === "IN_PROGRESS"
                                  ? themeConfig.colors.primary
                                  : themeConfig.colors.warning
                            }30`,
                          }}
                        >
                          {request.status === "COMPLETED"
                            ? "🟢 "
                            : request.status === "IN_PROGRESS"
                              ? "🔵 "
                              : "🟡 "}
                          {request.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
