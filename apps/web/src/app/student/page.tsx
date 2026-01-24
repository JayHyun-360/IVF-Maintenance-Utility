"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import dynamic from "next/dynamic";

// Dynamically import mobile component to avoid SSR issues
const MobileStudentPage = dynamic(
  () => import("./mobile-page").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export default function StudentPage() {
  const router = useRouter();
  const { themeConfig, setTheme, availableThemes } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "PLUMBING",
    priority: "MEDIUM",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // LG breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // If mobile, render the mobile-specific component
  if (isMobile) {
    return <MobileStudentPage />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert images to base64 strings for storage
      const imageBase64Array: string[] = [];
      for (const file of attachedImages) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        imageBase64Array.push(base64);
      }

      // Create new request with images
      const newRequest = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority as "LOW" | "MEDIUM" | "HIGH",
        status: "PENDING" as const,
        location: formData.location,
        requestedBy: "Current Student", // In production, this would come from authentication
        images: imageBase64Array,
      };

      // Save to database
      addMaintenanceRequest(newRequest);

      alert("Maintenance request submitted successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "PLUMBING",
        priority: "MEDIUM",
        location: "",
      });
      setAttachedImages([]);
      setImagePreviews([]);

      router.push("/");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024, // 5MB limit
    );

    if (validFiles.length !== files.length) {
      alert("Some files were invalid. Please only upload images under 5MB.");
    }

    setAttachedImages((prev) => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm flex-shrink-0">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
              <div className="min-w-0">
                <h1
                  className="text-base sm:text-xl font-bold truncate"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  <span className="hidden sm:inline">
                    Maintenance Request Portal
                  </span>
                  <span className="sm:hidden">Maintenance</span>
                </h1>
                <p
                  className="text-xs sm:text-sm hidden sm:block"
                  style={{
                    color: themeConfig.colors.textSecondary,
                  }}
                >
                  Submit and track your maintenance requests
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                  style={{
                    color: themeConfig.colors.text,
                  }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>

                {showSettings && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg border theme-card z-50"
                    style={{
                      backgroundColor: themeConfig.colors.surface,
                      borderColor: themeConfig.colors.border,
                    }}
                  >
                    <div className="p-4">
                      <h3
                        className="text-sm font-semibold mb-3"
                        style={{
                          color: themeConfig.colors.text,
                        }}
                      >
                        Settings
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label
                            className="block text-xs font-medium mb-2"
                            style={{
                              color: themeConfig.colors.textSecondary,
                            }}
                          >
                            Theme
                          </label>
                          <div className="space-y-2">
                            {availableThemes.map((theme) => (
                              <button
                                key={theme.name}
                                onClick={() => {
                                  setTheme(theme.name as any);
                                  setShowSettings(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                  themeConfig.name === theme.name
                                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                                    : "hover:bg-gray-50 border border-transparent"
                                }`}
                                style={{
                                  color:
                                    themeConfig.name === theme.name
                                      ? undefined
                                      : themeConfig.colors.text,
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{theme.displayName}</span>
                                  {themeConfig.name === theme.name && (
                                    <svg
                                      className="w-4 h-4 text-purple-600"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div
                          className="pt-3 border-t"
                          style={{
                            borderColor: themeConfig.colors.border,
                          }}
                        >
                          <button
                            className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all duration-200"
                            style={{
                              color: themeConfig.colors.text,
                            }}
                          >
                            <div className="flex items-center space-x-2">
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
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>Help & Support</span>
                            </div>
                          </button>

                          <button
                            className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all duration-200"
                            style={{
                              color: themeConfig.colors.text,
                            }}
                          >
                            <div className="flex items-center space-x-2">
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
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span>Terms & Privacy</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => router.push("/")}
                className="px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 text-xs sm:text-base"
                style={{
                  color: themeConfig.colors.text,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <span className="hidden sm:inline">← Back to Home</span>
                <span className="sm:hidden">← Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div
            className="rounded-lg shadow-lg p-3 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs sm:text-sm font-medium truncate"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Active
                </p>
                <p
                  className="text-lg sm:text-2xl font-bold"
                  style={{ color: themeConfig.colors.text }}
                >
                  0
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
            </div>
          </div>

          <div
            className="rounded-lg shadow-lg p-3 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs sm:text-sm font-medium truncate"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Completed
                </p>
                <p
                  className="text-lg sm:text-2xl font-bold"
                  style={{ color: themeConfig.colors.text }}
                >
                  0
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg shadow-lg p-3 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs sm:text-sm font-medium truncate"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Pending
                </p>
                <p
                  className="text-lg sm:text-2xl font-bold"
                  style={{ color: themeConfig.colors.text }}
                >
                  0
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg shadow-lg p-3 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs sm:text-sm font-medium truncate"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Avg. Response
                </p>
                <p
                  className="text-lg sm:text-2xl font-bold"
                  style={{ color: themeConfig.colors.text }}
                >
                  24h
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Side - Main Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Quick Actions Bar */}
            <div
              className="rounded-lg shadow-lg p-3 sm:p-4 theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>New Request</span>
                  </button>
                  <button
                    className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                    style={{
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <span>My Requests</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs sm:text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Quick submit:
                  </span>
                  <button className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
                    🔧 Plumbing
                  </button>
                  <button className="px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium hover:bg-yellow-200 transition-colors">
                    ⚡ Electrical
                  </button>
                </div>
              </div>
            </div>

            {/* Main Form Card */}
            <div
              className="rounded-lg shadow-lg p-4 sm:p-6 theme-card transform transition-all duration-200 hover:shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
                  </div>
                  <div className="min-w-0">
                    <h2
                      className="text-lg sm:text-xl font-bold"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Submit New Request
                    </h2>
                    <p
                      className="text-xs sm:text-sm hidden sm:block"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Fill in the details below to report a maintenance issue
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    📷 Images Supported
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    ⚡ Fast Response
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      Request Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600 text-sm sm:text-base"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-600 text-sm sm:text-base"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                      placeholder="Building, room, or specific location"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{
                      color: themeConfig.colors.text,
                    }}
                  >
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-600 text-sm sm:text-base resize-none"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                    placeholder="Provide detailed information about the maintenance issue..."
                  />
                </div>

                {/* Image Attachment Section */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{
                      color: themeConfig.colors.text,
                    }}
                  >
                    📷 Attach Images (Optional)
                  </label>
                  <div
                    className="border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-all duration-200 hover:border-purple-400"
                    style={{
                      borderColor: themeConfig.colors.border,
                      backgroundColor: themeConfig.colors.background,
                    }}
                  >
                    <input
                      type="file"
                      id="images"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="images"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p
                          className="text-xs sm:text-sm font-medium"
                          style={{
                            color: themeConfig.colors.text,
                          }}
                        >
                          Click to upload images
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            color: themeConfig.colors.textSecondary,
                          }}
                        >
                          PNG, JPG, GIF up to 5MB each
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-3 sm:mt-4">
                      <p
                        className="text-xs sm:text-sm font-medium mb-2"
                        style={{
                          color: themeConfig.colors.text,
                        }}
                      >
                        Attached Images ({imagePreviews.length})
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-16 sm:h-20 md:h-24 object-cover rounded-lg border-2 transition-all duration-200 hover:shadow-lg"
                              style={{
                                borderColor: themeConfig.colors.border,
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 text-xs sm:text-sm"
                            >
                              <svg
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                              {attachedImages[index]?.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-600 text-sm sm:text-base"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                    >
                      <option
                        value="PLUMBING"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        🔧 Plumbing
                      </option>
                      <option
                        value="ELECTRICAL"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        ⚡ Electrical
                      </option>
                      <option
                        value="CARPENTRY"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        🔨 Carpentry
                      </option>
                      <option
                        value="PERSONNEL"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        👥 Personnel
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="priority"
                      className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                      style={{
                        color: themeConfig.colors.text,
                      }}
                    >
                      Priority Level *
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-600 text-sm sm:text-base"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                    >
                      <option
                        value="LOW"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        🟢 Low Priority
                      </option>
                      <option
                        value="MEDIUM"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        🟡 Medium Priority
                      </option>
                      <option
                        value="HIGH"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        🟠 High Priority
                      </option>
                      <option
                        value="URGENT"
                        style={{
                          backgroundColor: themeConfig.colors.background,
                          color:
                            themeConfig.name === "dark" ? "#e5e7eb" : "#374151",
                        }}
                      >
                        🔴 Urgent Priority
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t gap-3"
                  style={{
                    borderColor: themeConfig.colors.border,
                  }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
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
                        <span>Submit Request</span>
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                    style={{
                      color: themeConfig.colors.text,
                      borderColor: themeConfig.colors.border,
                      backgroundColor: themeConfig.colors.background,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        themeConfig.name === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        themeConfig.colors.background;
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Enhanced Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* User Profile Card */}
            <div
              className="rounded-lg shadow-lg p-4 sm:p-6 theme-card hidden xl:block"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-base sm:text-lg font-bold">
                    S
                  </span>
                </div>
                <div>
                  <h3
                    className="text-base sm:text-lg font-bold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Student User
                  </h3>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    student@campus.edu
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgb(239, 246, 255)",
                    border: `1px solid ${themeConfig.name === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(191, 219, 254)"}`,
                  }}
                >
                  <p
                    className="text-lg font-bold"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#60a5fa" : "#1e40af",
                    }}
                  >
                    0
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#93c5fd" : "#1e40af",
                    }}
                  >
                    Total
                  </p>
                </div>
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(250, 204, 21, 0.1)"
                        : "rgb(254, 252, 232)",
                    border: `1px solid ${themeConfig.name === "dark" ? "rgba(250, 204, 21, 0.3)" : "rgba(254, 249, 195)"}`,
                  }}
                >
                  <p
                    className="text-lg font-bold"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#facc15" : "#ca8a04",
                    }}
                  >
                    0
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#fde047" : "#eab308",
                    }}
                  >
                    Pending
                  </p>
                </div>
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgb(240, 253, 244)",
                    border: `1px solid ${themeConfig.name === "dark" ? "rgba(34, 197, 94, 0.3)" : "rgba(220, 252, 231)"}`,
                  }}
                >
                  <p
                    className="text-lg font-bold"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#4ade80" : "#16a34a",
                    }}
                  >
                    0
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#86efac" : "#22c55e",
                    }}
                  >
                    Done
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Tips Enhanced */}
            <div
              className="rounded-lg shadow-lg p-6 theme-card"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Quick Tips
                  </h3>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  PRO TIPS
                </span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">📷</span>
                    <p className="text-sm text-blue-800 font-medium">
                      NEW! Attach images to help maintenance staff identify
                      issues faster
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Be as specific as possible when describing the issue
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Include exact location details for faster response
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Set appropriate priority level based on urgency
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    You'll receive updates on your request status
                  </p>
                </div>
              </div>
            </div>

            {/* Service Expectations Enhanced */}
            <div
              className="rounded-lg shadow-lg p-6 theme-card border-2"
              style={{
                backgroundColor: themeConfig.colors.surface,
                borderColor:
                  themeConfig.name === "dark"
                    ? "rgba(251, 146, 60, 0.3)"
                    : themeConfig.colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Service Expectations
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Response times may vary based on workload
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                    PRIORITY LEVELS
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Urgent Priority */}
                <div
                  className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgb(254, 242, 242)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "rgba(254, 226, 226)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.15)"
                        : "rgb(254, 226, 226)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.5)"
                        : "rgba(252, 165, 165)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgb(254, 242, 242)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "rgba(254, 226, 226)";
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">🔴</span>
                      </div>
                      <div>
                        <h4
                          className="font-bold text-sm"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#f87171"
                                : "#dc2626",
                          }}
                        >
                          Urgent Priority
                        </h4>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fca5a5"
                                : "#ef4444",
                          }}
                        >
                          Critical emergencies
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#f87171" : "#dc2626",
                        }}
                      >
                        Same Day
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fca5a5"
                                : "#ef4444",
                          }}
                        >
                          Immediate
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#fca5a5" : "#991b1b",
                    }}
                  >
                    Critical issues affecting safety, security, or essential
                    operations. Requires immediate attention from maintenance
                    team.
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      24/7 Response
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      High Priority
                    </span>
                  </div>
                </div>

                {/* High Priority */}
                <div
                  className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(251, 146, 60, 0.1)"
                        : "rgb(255, 251, 235)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(251, 146, 60, 0.3)"
                        : "rgba(253, 230, 138)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(251, 146, 60, 0.15)"
                        : "rgb(253, 230, 138)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(251, 146, 60, 0.5)"
                        : "rgba(252, 211, 77)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(251, 146, 60, 0.1)"
                        : "rgb(255, 251, 235)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(251, 146, 60, 0.3)"
                        : "rgba(253, 230, 138)";
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">🟠</span>
                      </div>
                      <div>
                        <h4
                          className="font-bold text-sm"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fb923c"
                                : "#ea580c",
                          }}
                        >
                          High Priority
                        </h4>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fdba74"
                                : "#f97316",
                          }}
                        >
                          Significant disruptions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#fb923c" : "#ea580c",
                        }}
                      >
                        1-3 Days
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fdba74"
                                : "#f97316",
                          }}
                        >
                          Fast Track
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#fdba74" : "#9a3412",
                    }}
                  >
                    Significant disruptions affecting multiple users or
                    essential services. Requires prompt attention and
                    resolution.
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      Priority Queue
                    </span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      Escalated
                    </span>
                  </div>
                </div>

                {/* Medium Priority */}
                <div
                  className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(250, 204, 21, 0.1)"
                        : "rgb(254, 252, 232)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(250, 204, 21, 0.3)"
                        : "rgba(254, 249, 195)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(250, 204, 21, 0.15)"
                        : "rgb(254, 249, 195)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(250, 204, 21, 0.5)"
                        : "rgba(253, 224, 71)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(250, 204, 21, 0.1)"
                        : "rgb(254, 252, 232)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(250, 204, 21, 0.3)"
                        : "rgba(254, 249, 195)";
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">🟡</span>
                      </div>
                      <div>
                        <h4
                          className="font-bold text-sm"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#facc15"
                                : "#ca8a04",
                          }}
                        >
                          Medium Priority
                        </h4>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fde047"
                                : "#eab308",
                          }}
                        >
                          Routine maintenance
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#facc15" : "#ca8a04",
                        }}
                      >
                        3-7 Days
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fde047"
                                : "#eab308",
                          }}
                        >
                          Standard
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#fde047" : "#854d0e",
                    }}
                  >
                    Routine maintenance requests and non-urgent repairs. Normal
                    processing time with regular maintenance schedule.
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Scheduled
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Normal Queue
                    </span>
                  </div>
                </div>

                {/* Low Priority */}
                <div
                  className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group"
                  style={{
                    backgroundColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgb(240, 253, 244)",
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.3)"
                        : "rgba(220, 252, 231)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgb(220, 252, 231)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.5)"
                        : "rgba(134, 239, 172)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgb(240, 253, 244)";
                    e.currentTarget.style.borderColor =
                      themeConfig.name === "dark"
                        ? "rgba(34, 197, 94, 0.3)"
                        : "rgba(220, 252, 231)";
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">🟢</span>
                      </div>
                      <div>
                        <h4
                          className="font-bold text-sm"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#4ade80"
                                : "#16a34a",
                          }}
                        >
                          Low Priority
                        </h4>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#86efac"
                                : "#22c55e",
                          }}
                        >
                          Minor improvements
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#4ade80" : "#16a34a",
                        }}
                      >
                        1-2 Weeks
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span
                          className="text-xs"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#86efac"
                                : "#22c55e",
                          }}
                        >
                          Scheduled
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        themeConfig.name === "dark" ? "#86efac" : "#14532d",
                    }}
                  >
                    Minor issues and improvements scheduled during regular
                    maintenance periods. No immediate impact on operations.
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Planned
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Low Impact
                    </span>
                  </div>
                </div>
                {/* Emergency Contact Enhanced */}
                <div
                  className="rounded-lg shadow-lg p-6 theme-card border-2"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                    borderColor:
                      themeConfig.name === "dark"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "#ef4444",
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className="text-xl font-bold"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#f87171"
                                : "#dc2626",
                          }}
                        >
                          Emergency Contact
                        </h3>
                        <p
                          className="text-sm"
                          style={{
                            color:
                              themeConfig.name === "dark"
                                ? "#fca5a5"
                                : "#ef4444",
                          }}
                        >
                          For urgent maintenance issues
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        24/7 AVAILABLE
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        URGENT
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div
                      className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group"
                      style={{
                        backgroundColor:
                          themeConfig.name === "dark"
                            ? "rgba(239, 68, 68, 0.1)"
                            : "rgb(254, 242, 242)",
                        borderColor:
                          themeConfig.name === "dark"
                            ? "rgba(239, 68, 68, 0.3)"
                            : "rgba(254, 226, 226)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark"
                            ? "rgba(239, 68, 68, 0.15)"
                            : "rgb(254, 226, 226)";
                        e.currentTarget.style.borderColor =
                          themeConfig.name === "dark"
                            ? "rgba(239, 68, 68, 0.5)"
                            : "rgba(252, 165, 165)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark"
                            ? "rgba(239, 68, 68, 0.1)"
                            : "rgb(254, 242, 242)";
                        e.currentTarget.style.borderColor =
                          themeConfig.name === "dark"
                            ? "rgba(239, 68, 68, 0.3)"
                            : "rgba(254, 226, 226)";
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">📞</span>
                          </div>
                          <div>
                            <h4
                              className="font-bold text-sm"
                              style={{
                                color:
                                  themeConfig.name === "dark"
                                    ? "#f87171"
                                    : "#dc2626",
                              }}
                            >
                              24/7 Hotline
                            </h4>
                            <p
                              className="text-xs"
                              style={{
                                color:
                                  themeConfig.name === "dark"
                                    ? "#fca5a5"
                                    : "#ef4444",
                              }}
                            >
                              Immediate assistance available
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full font-medium">
                            ALWAYS ON
                          </span>
                        </div>
                      </div>
                      <p
                        className="text-2xl font-bold mb-2"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#f87171" : "#dc2626",
                        }}
                      >
                        123-456-7890
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#fca5a5" : "#ef4444",
                        }}
                      >
                        Call for immediate assistance with critical issues
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group"
                      style={{
                        backgroundColor:
                          themeConfig.name === "dark"
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgb(239, 246, 255)",
                        borderColor:
                          themeConfig.name === "dark"
                            ? "rgba(59, 130, 246, 0.3)"
                            : "rgba(191, 219, 254)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark"
                            ? "rgba(59, 130, 246, 0.15)"
                            : "rgb(219, 234, 254)";
                        e.currentTarget.style.borderColor =
                          themeConfig.name === "dark"
                            ? "rgba(59, 130, 246, 0.5)"
                            : "rgba(147, 197, 253)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark"
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgb(239, 246, 255)";
                        e.currentTarget.style.borderColor =
                          themeConfig.name === "dark"
                            ? "rgba(59, 130, 246, 0.3)"
                            : "rgba(191, 219, 254)";
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">📧</span>
                          </div>
                          <div>
                            <h4
                              className="font-bold text-sm"
                              style={{
                                color:
                                  themeConfig.name === "dark"
                                    ? "#60a5fa"
                                    : "#1e40af",
                              }}
                            >
                              Email Support
                            </h4>
                            <p
                              className="text-xs"
                              style={{
                                color:
                                  themeConfig.name === "dark"
                                    ? "#93c5fd"
                                    : "#3b82f6",
                              }}
                            >
                              Send detailed requests and documentation
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium">
                            FAST RESPONSE
                          </span>
                        </div>
                      </div>
                      <p
                        className="text-lg font-bold mb-2"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#60a5fa" : "#1e40af",
                        }}
                      >
                        maintenance@campus.edu
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#93c5fd" : "#3b82f6",
                        }}
                      >
                        Expected response within 24 hours
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group"
                      style={{
                        backgroundColor:
                          themeConfig.name === "dark"
                            ? "rgba(168, 85, 247, 0.1)"
                            : "rgb(250, 245, 255)",
                        borderColor:
                          themeConfig.name === "dark"
                            ? "rgba(168, 85, 247, 0.3)"
                            : "rgba(233, 213, 255)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark"
                            ? "rgba(168, 85, 247, 0.15)"
                            : "rgb(233, 213, 255)";
                        e.currentTarget.style.borderColor =
                          themeConfig.name === "dark"
                            ? "rgba(168, 85, 247, 0.5)"
                            : "rgba(196, 181, 253)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          themeConfig.name === "dark"
                            ? "rgba(168, 85, 247, 0.1)"
                            : "rgb(250, 245, 255)";
                        e.currentTarget.style.borderColor =
                          themeConfig.name === "dark"
                            ? "rgba(168, 85, 247, 0.3)"
                            : "rgba(233, 213, 255)";
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">📍</span>
                          </div>
                          <div>
                            <h4
                              className="font-bold text-sm"
                              style={{
                                color:
                                  themeConfig.name === "dark"
                                    ? "#c084fc"
                                    : "#7c3aed",
                              }}
                            >
                              On-site Support
                            </h4>
                            <p
                              className="text-xs"
                              style={{
                                color:
                                  themeConfig.name === "dark"
                                    ? "#e9d5ff"
                                    : "#6d28d9",
                              }}
                            >
                              Schedule on-site maintenance visits
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-medium">
                            BY APPOINTMENT
                          </span>
                        </div>
                      </div>
                      <p
                        className="text-lg font-bold mb-2"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#c084fc" : "#7c3aed",
                        }}
                      >
                        Available Mon-Fri, 8AM-5PM
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#e9d5ff" : "#6d28d9",
                        }}
                      >
                        For complex issues requiring on-site assessment
                      </p>
                    </div>
                  </div>

                  {/* Emergency Notice */}
                  <div
                    className="mt-4 p-3 rounded-lg border-2"
                    style={{
                      backgroundColor:
                        themeConfig.name === "dark"
                          ? "rgba(239, 68, 68, 0.1)"
                          : "rgb(254, 242, 242)",
                      borderColor:
                        themeConfig.name === "dark"
                          ? "rgba(239, 68, 68, 0.3)"
                          : "rgba(254, 226, 226)",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            themeConfig.name === "dark" ? "#fca5a5" : "#ef4444",
                        }}
                      >
                        For life-threatening emergencies, call 911 immediately
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div
        className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"
        style={{
          backgroundColor: themeConfig.colors.surface,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => router.push("/student")}
            className="flex flex-col items-center py-2 px-1 rounded-lg transition-colors"
            style={{ color: themeConfig.colors.text }}
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button
            className="flex flex-col items-center py-2 px-1 rounded-lg transition-colors"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            <svg
              className="w-5 h-5 mb-1"
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
            <span className="text-xs">Requests</span>
          </button>
          <button
            className="flex flex-col items-center py-2 px-1 rounded-lg transition-colors"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs">Messages</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex flex-col items-center py-2 px-1 rounded-lg transition-colors"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>

      {/* Add padding for mobile bottom nav */}
      <div className="xl:hidden h-16"></div>
    </div>
  );
}
