"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import {
  getMaintenanceRequests,
  getRequestsByCategory,
  MaintenanceRequest,
} from "@/lib/data";

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

export default function SummaryRequestPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [allRequests, setAllRequests] = useState<MaintenanceRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [categoryData, setCategoryData] = useState<Record<string, number>>({});

  useEffect(() => {
    const requests = getMaintenanceRequests();
    const categories = getRequestsByCategory();
    setAllRequests(requests);
    setCategoryData(categories);
  }, []);

  const generateSummary = async () => {
    if (!selectedCategory) return;

    setIsGenerating(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const categoryRequests = allRequests.filter(
      (req) => req.category === selectedCategory,
    );

    const locations = [...new Set(categoryRequests.map((req) => req.location))];
    const priorities = [
      ...new Set(categoryRequests.map((req) => req.priority)),
    ];
    const descriptions = categoryRequests.map((req) => req.description);
    const requesters = [
      ...new Set(categoryRequests.map((req) => req.requestedBy)),
    ];
    const dates = categoryRequests.map((req) => req.createdAt.toISOString());

    // Generate comprehensive summary description
    const summaryDescription = generateComprehensiveSummary(
      categoryRequests,
      selectedCategory,
    );

    setSummaryData({
      category: selectedCategory,
      totalRequests: categoryRequests.length,
      locations,
      priorities,
      descriptions,
      requesters,
      dates,
      summaryDescription,
    });

    setIsGenerating(false);
  };

  const generateComprehensiveSummary = (
    requests: MaintenanceRequest[],
    category: string,
  ): string => {
    const priorityCount = requests.reduce(
      (acc, req) => {
        acc[req.priority] = (acc[req.priority] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const locationCount = requests.reduce(
      (acc, req) => {
        acc[req.location] = (acc[req.location] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const highPriorityIssues = requests.filter(
      (req) => req.priority === "HIGH",
    );
    const commonKeywords = extractCommonKeywords(
      requests.map((req) => req.description),
    );

    let summary = `COMPREHENSIVE ${category.toUpperCase()} MAINTENANCE SUMMARY\n\n`;
    summary += `OVERVIEW:\n`;
    summary += `- Total Requests: ${requests.length}\n`;
    summary += `- Affected Locations: ${Object.keys(locationCount).length}\n`;
    summary += `- Priority Distribution: ${Object.entries(priorityCount)
      .map(([p, c]) => `${c} ${p}`)
      .join(", ")}\n\n`;

    summary += `PRIORITY ANALYSIS:\n`;
    if (highPriorityIssues.length > 0) {
      summary += `- High/Urgent Priority Issues: ${highPriorityIssues.length}\n`;
      summary += `- Immediate attention required for: ${highPriorityIssues.map((req) => req.location).join(", ")}\n`;
    } else {
      summary += `- No high-priority urgent issues identified\n`;
    }
    summary += `- Most affected area: ${Object.entries(locationCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"} (${Math.max(...Object.values(locationCount))} requests)\n\n`;

    summary += `LOCATION BREAKDOWN:\n`;
    Object.entries(locationCount).forEach(([location, count]) => {
      const percentage = ((count / requests.length) * 100).toFixed(1);
      summary += `- ${location}: ${count} requests (${percentage}%)\n`;
    });

    summary += `\nCOMMON ISSUES IDENTIFIED:\n`;
    commonKeywords.forEach((keyword, index) => {
      summary += `${index + 1}. ${keyword}\n`;
    });

    summary += `\nRECOMMENDED ACTIONS:\n`;
    if (highPriorityIssues.length > 0) {
      summary += `- Immediate inspection and repair of high-priority issues\n`;
    }
    summary += `- Schedule comprehensive ${category.toLowerCase()} maintenance for most affected areas\n`;
    summary += `- Implement preventive measures to reduce recurring issues\n`;
    summary += `- Consider system-wide upgrade if issues are widespread\n\n`;

    summary += `REQUEST DETAILS:\n`;
    requests.forEach((req, index) => {
      summary += `${index + 1}. ${req.location} - ${req.priority} - ${req.description.substring(0, 100)}...\n`;
    });

    return summary;
  };

  const extractCommonKeywords = (descriptions: string[]): string[] => {
    const allWords = descriptions
      .join(" ")
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3);

    const wordCount = allWords.reduce(
      (acc, word) => {
        if (
          ![
            "that",
            "this",
            "with",
            "from",
            "they",
            "have",
            "been",
            "will",
            "would",
            "could",
            "should",
          ].includes(word)
        ) {
          acc[word] = (acc[word] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
  };

  const createPhysicalPlantRequest = () => {
    if (!summaryData) return;

    // Store summary data for the physical plant page
    localStorage.setItem("summaryRequestData", JSON.stringify(summaryData));
    router.push("/admin/physical-plant-request");
  };

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
                onClick={() => router.push("/admin/dashboard")}
                className="mr-4 px-3 py-1 rounded-md text-sm hover:opacity-80 transition-opacity"
                style={{
                  color: themeConfig.colors.textSecondary,
                }}
              >
                ← Back to Dashboard
              </button>
              <h1
                className="text-xl font-bold"
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                Create Summary Request
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Category Selection */}
          <div
            className="rounded-lg shadow p-6 theme-card"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{
                color: themeConfig.colors.text,
              }}
            >
              Select Category to Summarize
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(categoryData).map(([category, count]) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedCategory === category
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {count}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {category}
                    </div>
                    <div className="text-xs text-gray-500">requests</div>
                  </div>
                </button>
              ))}
            </div>

            {selectedCategory && (
              <div className="flex justify-center">
                <button
                  onClick={generateSummary}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? "Generating Summary..." : "Generate Summary"}
                </button>
              </div>
            )}
          </div>

          {/* Summary Results */}
          {summaryData && (
            <div
              className="rounded-lg shadow p-6 theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-lg font-semibold"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  Summary Results: {summaryData.category}
                </h2>
                <button
                  onClick={createPhysicalPlantRequest}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Create Physical Plant Request
                </button>
              </div>

              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Total Requests</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {summaryData.totalRequests}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Locations</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {summaryData.locations.length}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Priority Levels</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {summaryData.priorities.length}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Requesters</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {summaryData.requesters.length}
                  </div>
                </div>
              </div>

              {/* Comprehensive Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Comprehensive Summary
                </h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-white p-4 rounded border border-gray-200">
                  {summaryData.summaryDescription}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
