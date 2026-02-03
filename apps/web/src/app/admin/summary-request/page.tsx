"use client";

// Summary Request - Mobile/Desktop Conditional Version
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import { getMaintenanceRequests } from "@/lib/data";
import AuthGuard from "@/components/AuthGuard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";
import { WebForm, WebFormField, WebFormSection } from "@/components/WebForm";

interface SummaryData {
  category: string;
  totalRequests: number;
  locations: string[];
  priorities: ("LOW" | "MEDIUM" | "HIGH" | "URGENT")[];
  descriptions: string[];
  requesters: string[];
  dates: Date[];
  summaryDescription: string;
}

export default function SummaryRequestPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ["PLUMBING", "ELECTRICAL", "CARPENTRY", "PERSONNEL"];

  const generateSummary = async () => {
    if (!selectedCategory) return;

    setIsGenerating(true);
    try {
      // Simulate API call to generate summary
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const allRequests = getMaintenanceRequests();
      const categoryRequests = allRequests.filter(
        (req) => req.category === selectedCategory,
      );

      const summary = {
        category: selectedCategory,
        totalRequests: categoryRequests.length,
        locations: [...new Set(categoryRequests.map((req) => req.location))],
        priorities: [...new Set(categoryRequests.map((req) => req.priority))],
        descriptions: categoryRequests.map((req) => req.description),
        requesters: [
          ...new Set(categoryRequests.map((req) => req.requestedBy)),
        ],
        dates: categoryRequests.map((req) => req.createdAt),
        summaryDescription: `Summary of ${categoryRequests.length} ${selectedCategory.toLowerCase()} maintenance requests.`,
      };

      setSummaryData(summary);
    } catch {
      alert("Failed to generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Header - Conditional based on device */}
        {isMobile ? (
          <WebHeader
            title="Generate Summary Report"
            breadcrumbs={[
              { label: "Admin Dashboard", href: "/admin/dashboard" },
              { label: "Summary Report" },
            ]}
            actions={
              <div style={{ zIndex: Z_INDEX.MAX, position: "relative" }}>
                <ThemeSwitcher />
              </div>
            }
          />
        ) : (
          /* Original Desktop Header */
          <header
            className="border-b"
            style={{ borderColor: themeConfig.colors.border }}
          >
            <div className="max-w-7xl mx-auto px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <button
                    onClick={() => router.push("/admin/dashboard")}
                    className="p-2 rounded-xl mr-4 transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: themeConfig.colors.surface,
                      color: themeConfig.colors.text,
                      border: `1px solid ${themeConfig.colors.border}`,
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h1
                    className="text-xl font-bold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Generate Summary Report
                  </h1>
                </div>
                <div className="flex items-center">
                  <div style={{ zIndex: Z_INDEX.MAX, position: "relative" }}>
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content - Conditional based on device */}
        {isMobile ? (
          <div className="px-4 py-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <WebForm
                title="Generate Summary Report"
                subtitle="Select a category to generate a comprehensive summary report"
                onSubmit={(e) => {
                  e.preventDefault();
                  generateSummary();
                }}
                loading={isGenerating}
                submitText="Generate Summary"
              >
                <WebFormSection title="Category Selection">
                  <WebFormField
                    name="category"
                    label="Select Category"
                    type="select"
                    options={[
                      { label: 'Select a category...', value: '' },
                      { label: '🔧 Plumbing', value: 'PLUMBING' },
                      { label: '⚡ Electrical', value: 'ELECTRICAL' },
                      { label: '🔨 Carpentry', value: 'CARPENTRY' },
                      { label: '👥 Personnel', value: 'PERSONNEL' }
                    ]}
                    value={selectedCategory}
                    onChange={(e: any) => setSelectedCategory(e.target.value)}
                    required
                  />
                </WebFormSection>
              </WebForm>

              {/* Summary Results */}
              {summaryData && (
                <div className="bg-white rounded-lg border p-4" style={{ borderColor: '#E5E7EB' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: themeConfig.colors.text }}>
                    Summary Report - {summaryData.category}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                        Total Requests:
                      </span>
                      <span className="text-sm font-bold" style={{ color: themeConfig.colors.primary }}>
                        {summaryData.totalRequests}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                        Locations:
                      </span>
                      <div className="mt-1">
                        {summaryData.locations.map((location, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-gray-100 rounded text-xs mr-2 mb-2">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium" style={{ color: themeConfig.colors.textSecondary }}>
                        Summary:
                      </span>
                      <p className="mt-1 text-sm" style={{ color: themeConfig.colors.text }}>
                        {summaryData.summaryDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Original Desktop Layout */
          <div className="max-w-4xl mx-auto px-8 py-8">
            <div className="space-y-8">
            {/* Category Selection */}
            <div
              className="rounded-xl p-6 shadow-lg"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
                border: "1px solid",
              }}
            >
              <h2
                className="text-lg font-semibold mb-6"
                style={{ color: themeConfig.colors.text }}
              >
                Select Category
              </h2>

              <div className="grid grid-cols-4 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === category
                          ? "#3B82F6"
                          : themeConfig.colors.background,
                      color:
                        selectedCategory === category
                          ? "#FFFFFF"
                          : themeConfig.colors.text,
                      border: `1px solid ${themeConfig.colors.border}`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {category === "PLUMBING" && "🔧"}
                        {category === "ELECTRICAL" && "⚡"}
                        {category === "CARPENTRY" && "🔨"}
                        {category === "PERSONNEL" && "👥"}
                      </div>
                      <div className="font-medium">{category}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={generateSummary}
                  disabled={!selectedCategory || isGenerating}
                  className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50"
                  style={{
                    background:
                      "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
                    color: "#FFFFFF",
                    boxShadow:
                      "0 8px 24px 0 rgba(27, 67, 50, 0.4), 0 4px 12px 0 rgba(27, 67, 50, 0.3)",
                  }}
                >
                  <span className="flex items-center space-x-3">
                    {isGenerating ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 12v8a8 8 0 008 0a8 8 0 008 0 4 8 0 008 0-4 8 0 008 0-8 0 0 0-8 0z"
                          />
                        </svg>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
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
                            d="M9 17v1a2 2 0 002 2h2a2 2 0 002-2v-1m-6 0h6m2 0h2a2 2 0 002-2v-1m-8 0V7a2 2 0 012-2h2a2 2 0 012 2v8m-6 0h6"
                          />
                        </svg>
                        <span>Generate Summary</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Summary Results */}
            {summaryData && (
              <div
                className="rounded-xl p-6 shadow-lg"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <h2
                  className="text-lg font-semibold mb-6"
                  style={{ color: themeConfig.colors.text }}
                >
                  Summary Report
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div
                      className="p-4 rounded-xl text-center"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        border: `1px solid ${themeConfig.colors.border}`,
                      }}
                    >
                      <div
                        className="text-2xl font-bold"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {summaryData.totalRequests}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Total Requests
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-xl text-center"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        border: `1px solid ${themeConfig.colors.border}`,
                      }}
                    >
                      <div
                        className="text-2xl font-bold"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {summaryData.locations.length}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Locations
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-xl text-center"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        border: `1px solid ${themeConfig.colors.border}`,
                      }}
                    >
                      <div
                        className="text-2xl font-bold"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {summaryData.priorities.length}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Priority Levels
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-xl text-center"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        border: `1px solid ${themeConfig.colors.border}`,
                      }}
                    >
                      <div
                        className="text-2xl font-bold"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {summaryData.requesters.length}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Requesters
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      className="font-medium mb-3"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Affected Locations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {summaryData.locations.map(
                        (location: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              backgroundColor: themeConfig.colors.background,
                              color: themeConfig.colors.text,
                              border: `1px solid ${themeConfig.colors.border}`,
                            }}
                          >
                            {location}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="font-medium mb-3"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Priority Distribution
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {summaryData.priorities.map(
                        (priority: string, index: number) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm ${
                              priority === "HIGH"
                                ? "bg-red-100 text-red-800"
                                : priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {priority}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="font-medium mb-3"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Summary Description
                    </h3>
                    <p
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        color: themeConfig.colors.textSecondary,
                        border: `1px solid ${themeConfig.colors.border}`,
                      }}
                    >
                      {summaryData.summaryDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
