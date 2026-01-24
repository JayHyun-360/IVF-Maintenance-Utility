"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

interface SummaryData {
  category: string;
  totalRequests: number;
  locations: string[];
  priorities: string[];
  descriptions: string[];
  requesters: string[];
  dates: string[];
  summaryDescription: string;
}

export default function PhysicalPlantRequestPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    urgency: "MEDIUM",
    estimatedCost: "",
    timeline: "",
    additionalNotes: "",
  });

  useEffect(() => {
    // Retrieve summary data from localStorage
    const storedData = localStorage.getItem("summaryRequestData");
    if (storedData) {
      const data = JSON.parse(storedData) as SummaryData;
      setSummaryData(data);
      setFormData((prev) => ({
        ...prev,
        title: `Comprehensive ${data.category} Maintenance - ${data.totalRequests} Requests`,
      }));
    } else {
      // Redirect back if no data found
      router.push("/admin/summary-request");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear localStorage and redirect
    localStorage.removeItem("summaryRequestData");

    // Show success message and redirect
    alert("Physical Plant Request submitted successfully!");
    router.push("/admin/dashboard");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!summaryData) {
    return (
      <div
        className={`min-h-screen dashboard-theme`}
        style={{
          backgroundColor: themeConfig.colors.background,
          color: themeConfig.colors.text,
        }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading summary data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen dashboard-theme`}
      style={{
        backgroundColor: themeConfig.colors.background,
        color: themeConfig.colors.text,
      }}
    >
      {/* Header */}
      <div
        className="shadow-sm border-b theme-card"
        style={{
          backgroundColor: themeConfig.colors.surface,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push("/admin/summary-request")}
                className="mr-4 px-3 py-1 rounded-md text-sm hover:opacity-80 transition-opacity"
                style={{
                  color: themeConfig.colors.textSecondary,
                }}
              >
                ← Back to Summary
              </button>
              <h1
                className="text-xl font-bold"
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                Physical Plant/Facilities Request
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <div className="w-16 h-1 bg-purple-500"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <div className="w-16 h-1 bg-purple-500"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                3
              </div>
            </div>
            <span
              className="text-sm font-medium"
              style={{
                color: themeConfig.colors.textSecondary,
              }}
            >
              Step 3 of 3: Submit Request
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Enhanced Request Header */}
          <div
            className="rounded-lg shadow-lg p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    <path d="M19 14l-2-2m0 0l-2 2m2-2v6" />
                  </svg>
                </div>
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{
                      color: themeConfig.colors.text,
                    }}
                  >
                    Request Details
                  </h2>
                  <p
                    className="text-sm"
                    style={{
                      color: themeConfig.colors.textSecondary,
                    }}
                  >
                    Fill in the Physical Plant request information
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                {summaryData.category} Summary
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Request Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Urgency Level *
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange("urgency", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                  required
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Estimated Cost
                </label>
                <input
                  type="text"
                  value={formData.estimatedCost}
                  onChange={(e) =>
                    handleInputChange("estimatedCost", e.target.value)
                  }
                  placeholder="e.g., ₱5,000 - ₱10,000"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Expected Timeline
                </label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) =>
                    handleInputChange("timeline", e.target.value)
                  }
                  placeholder="e.g., 2-3 weeks"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                Additional Notes
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) =>
                  handleInputChange("additionalNotes", e.target.value)
                }
                rows={4}
                placeholder="Any additional information or special requirements..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
              />
            </div>
          </div>

          {/* Enhanced Summary Statistics */}
          <div
            className="rounded-lg shadow-lg p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Summary Statistics
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: themeConfig.colors.textSecondary,
                  }}
                >
                  Overview of consolidated requests
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 transform transition-all duration-200 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-purple-700">
                  {summaryData.totalRequests}
                </div>
                <div className="text-sm text-purple-600">Total Requests</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 transform transition-all duration-200 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-white"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-blue-700">
                  {summaryData.locations.length}
                </div>
                <div className="text-sm text-blue-600">Locations</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 transform transition-all duration-200 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-green-700">
                  {summaryData.requesters.length}
                </div>
                <div className="text-sm text-green-600">Requesters</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 transform transition-all duration-200 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-orange-700">
                  {summaryData.priorities.length}
                </div>
                <div className="text-sm text-orange-600">Priority Levels</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Affected Locations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {summaryData.locations.map((location, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Priority Distribution
                </h4>
                <div className="flex flex-wrap gap-2">
                  {summaryData.priorities.map((priority, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs ${
                        priority === "HIGH"
                          ? "bg-red-100 text-red-800"
                          : priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {priority}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Comprehensive Summary */}
          <div
            className="rounded-lg shadow-lg p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Comprehensive Summary Description
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: themeConfig.colors.textSecondary,
                  }}
                >
                  AI-generated analysis and recommendations
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                {summaryData.summaryDescription}
              </pre>
            </div>
          </div>

          {/* Enhanced Original Requests */}
          <div
            className="rounded-lg shadow-lg p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: themeConfig.colors.text,
                    }}
                  >
                    Original Requests
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: themeConfig.colors.textSecondary,
                    }}
                  >
                    Source requests consolidated into this summary
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {summaryData.descriptions.length} requests
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {summaryData.descriptions.map((description, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 transform transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 mb-2 leading-relaxed">
                        {description}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span>{summaryData.requesters[index]}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            {new Date(
                              summaryData.dates[index],
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Submit Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/summary-request")}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              style={{
                color: themeConfig.colors.text,
                borderColor: themeConfig.colors.border,
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Summary</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span>Submit Physical Plant Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
