"use client";

// Physical Plant Request - Desktop Only Version
import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Physical plant request submitted successfully!");
      router.push("/admin/dashboard");
    } catch (error) {
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Header */}
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
                Physical Plant Request
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Request Information */}
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
              Request Information
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Request Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                    border: "1px solid",
                  }}
                  placeholder="Brief description of the request"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Urgency Level
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                    border: "1px solid",
                  }}
                >
                  <option value="LOW">🟢 Low</option>
                  <option value="MEDIUM">🟡 Medium</option>
                  <option value="HIGH">🔴 High</option>
                  <option value="CRITICAL">🚨 Critical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Estimated Cost
                </label>
                <input
                  type="text"
                  name="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                    border: "1px solid",
                  }}
                  placeholder="$0.00"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Expected Timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                    border: "1px solid",
                  }}
                  placeholder="e.g., 2-3 weeks"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Additional Notes
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl resize-none"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                  border: "1px solid",
                }}
                placeholder="Any additional information or special requirements..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
                color: "#FFFFFF",
                boxShadow:
                  "0 8px 24px 0 rgba(27, 67, 50, 0.4), 0 4px 12px 0 rgba(27, 67, 50, 0.3)",
              }}
            >
              <span className="flex items-center space-x-3">
                {isSubmitting ? (
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
                    <span>Submitting...</span>
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Submit Request</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
