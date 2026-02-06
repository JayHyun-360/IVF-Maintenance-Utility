"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import Image from "next/image";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

export default function UserPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "PLUMBING",
    priority: "MEDIUM",
    location: "",
    otherCategory: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.category === "OTHERS" && !formData.otherCategory.trim()) {
      alert("Please specify the category when selecting 'Others'.");
      setIsSubmitting(false);
      return;
    }

    try {
      const imageBase64Array: string[] = [];
      for (const file of attachedImages) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        imageBase64Array.push(base64);
      }

      const newRequest = {
        title: formData.title,
        description: formData.description,
        category:
          formData.category === "OTHERS"
            ? formData.otherCategory
            : formData.category,
        priority: formData.priority as "LOW" | "MEDIUM" | "HIGH",
        status: "PENDING" as const,
        location: formData.location,
        requestedBy: "Current User",
        images: imageBase64Array,
      };

      addMaintenanceRequest(newRequest);

      // Success state and redirect
      setTimeout(() => {
        router.push("/student"); // Or to a success page/dashboard
      }, 1500);
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024,
    );

    if (validFiles.length !== files.length) {
      alert("Some files were too large or not images. Limit is 5MB.");
    }

    setAttachedImages((prev) => [...prev, ...validFiles]);

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

  const inputStyles = (fieldName: string) => ({
    backgroundColor: themeConfig.colors.background,
    borderColor:
      focusedField === fieldName
        ? themeConfig.colors.primary
        : themeConfig.colors.border,
    color: themeConfig.colors.text,
    boxShadow:
      focusedField === fieldName
        ? `0 0 0 3px ${themeConfig.colors.primary}20`
        : "none",
  });

  const labelStyles = (fieldName: string, value: string) => ({
    color:
      focusedField === fieldName
        ? themeConfig.colors.primary
        : themeConfig.colors.textSecondary,
    backgroundColor:
      focusedField === fieldName || value
        ? themeConfig.colors.surface
        : "transparent",
    transform:
      focusedField === fieldName || value
        ? "translateY(-1.4rem) scale(0.85)"
        : "translateY(0) scale(1)",
  });

  return (
    <AuthGuard>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute top-1/2 -right-40 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
          <div
            className="absolute -bottom-40 left-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: themeConfig.colors.accent }}
          />
        </div>

        {/* Navigation / Header */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
          style={{
            backgroundColor: `${themeConfig.colors.surface}cc`,
            borderColor: `${themeConfig.colors.border}50`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <span
                className="font-bold text-lg hidden sm:block"
                style={{ color: themeConfig.colors.text }}
              >
                Back to Home
              </span>
            </button>

            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <div
                className="w-10 h-10 rounded-full border-2 overflow-hidden"
                style={{ borderColor: themeConfig.colors.primary }}
              >
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                  U
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className={`pt-24 pb-12 ${isMobile ? "px-4" : "px-8"}`}>
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <div className="mb-8 text-center sm:text-left space-y-2">
              <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: themeConfig.colors.text }}
              >
                New Maintenance Request
              </h1>
              <p
                className="text-sm font-medium"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Fill out the details below to report a maintenance issue.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form Body */}
                <div className="lg:col-span-2 space-y-6">
                  <div
                    className="rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8"
                    style={{
                      backgroundColor: `${themeConfig.colors.surface}f0`,
                      border: `1px solid ${themeConfig.colors.border}`,
                      boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.1)`,
                    }}
                  >
                    <h2
                      className="text-xl font-bold flex items-center gap-3"
                      style={{ color: themeConfig.colors.text }}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: themeConfig.colors.primary }}
                      >
                        1
                      </span>
                      Request Details
                    </h2>

                    <div className="space-y-6">
                      {/* Title */}
                      <div className="relative">
                        <label
                          className="absolute left-4 top-3.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                          style={labelStyles("title", formData.title)}
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("title")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none font-medium"
                          style={inputStyles("title")}
                          placeholder=""
                        />
                      </div>

                      {/* Location */}
                      <div className="relative">
                        <label
                          className="absolute left-4 top-3.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                          style={labelStyles("location", formData.location)}
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("location")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none font-medium"
                          style={inputStyles("location")}
                          placeholder="e.g., Room 101, Lobby, Cafeteria"
                        />
                      </div>

                      {/* Description */}
                      <div className="relative">
                        <label
                          className="absolute left-4 top-3.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                          style={labelStyles(
                            "description",
                            formData.description,
                          )}
                        >
                          Detailed Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("description")}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={5}
                          className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none font-medium resize-none"
                          style={inputStyles("description")}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>

                  {/* Classification Section */}
                  <div
                    className="rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8"
                    style={{
                      backgroundColor: `${themeConfig.colors.surface}f0`,
                      border: `1px solid ${themeConfig.colors.border}`,
                      boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.1)`,
                    }}
                  >
                    <h2
                      className="text-xl font-bold flex items-center gap-3"
                      style={{ color: themeConfig.colors.text }}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                        style={{
                          backgroundColor: themeConfig.colors.secondary,
                        }}
                      >
                        2
                      </span>
                      Classification
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label
                          className="block text-sm font-bold ml-1"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Category
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: "PLUMBING", label: "Plumbing", icon: "🔧" },
                            {
                              id: "ELECTRICAL",
                              label: "Electrical",
                              icon: "⚡",
                            },
                            { id: "CARPENTRY", label: "Carpentry", icon: "🔨" },
                            { id: "PERSONNEL", label: "Personnel", icon: "👥" },
                            { id: "OTHERS", label: "Others", icon: "📝" },
                          ].map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  category: cat.id as any,
                                })
                              }
                              className="flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-sm font-bold"
                              style={{
                                backgroundColor:
                                  formData.category === cat.id
                                    ? `${themeConfig.colors.primary}10`
                                    : "transparent",
                                borderColor:
                                  formData.category === cat.id
                                    ? themeConfig.colors.primary
                                    : themeConfig.colors.border,
                                color:
                                  formData.category === cat.id
                                    ? themeConfig.colors.primary
                                    : themeConfig.colors.text,
                              }}
                            >
                              <span className="text-lg">{cat.icon}</span>
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label
                          className="block text-sm font-bold ml-1"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Priority
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            {
                              id: "LOW",
                              label: "Low",
                              color: themeConfig.colors.success,
                            },
                            {
                              id: "MEDIUM",
                              label: "Medium",
                              color: themeConfig.colors.warning || "#f59e0b",
                            },
                            {
                              id: "HIGH",
                              label: "High",
                              color: themeConfig.colors.error,
                            },
                          ].map((prio) => (
                            <button
                              key={prio.id}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  priority: prio.id as any,
                                })
                              }
                              className="flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 text-sm font-bold"
                              style={{
                                backgroundColor:
                                  formData.priority === prio.id
                                    ? `${prio.color}15`
                                    : "transparent",
                                borderColor:
                                  formData.priority === prio.id
                                    ? prio.color
                                    : themeConfig.colors.border,
                                color:
                                  formData.priority === prio.id
                                    ? prio.color
                                    : themeConfig.colors.text,
                              }}
                            >
                              {prio.label}
                              {formData.priority === prio.id && (
                                <div
                                  className="w-2 h-2 rounded-full animate-pulse"
                                  style={{ backgroundColor: prio.color }}
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {formData.category === "OTHERS" && (
                      <div className="relative pt-4 animate-slide-down">
                        <label
                          className="absolute left-4 top-7.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                          style={labelStyles(
                            "otherCategory",
                            formData.otherCategory,
                          )}
                        >
                          Specify Category
                        </label>
                        <input
                          type="text"
                          name="otherCategory"
                          value={formData.otherCategory}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("otherCategory")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none font-medium mt-4"
                          style={inputStyles("otherCategory")}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar - Photos & Help */}
                <div className="space-y-6">
                  <div
                    className="rounded-3xl p-6 backdrop-blur-xl border space-y-6"
                    style={{
                      backgroundColor: `${themeConfig.colors.surface}f0`,
                      borderColor: themeConfig.colors.border,
                      boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.1)`,
                    }}
                  >
                    <h3
                      className="text-lg font-bold flex items-center gap-2"
                      style={{ color: themeConfig.colors.text }}
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Photos
                    </h3>

                    <div className="space-y-4">
                      <label
                        htmlFor="photos-upload"
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:bg-black/5"
                        style={{ borderColor: themeConfig.colors.border }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform hover:scale-110"
                          style={{
                            backgroundColor: `${themeConfig.colors.primary}15`,
                            color: themeConfig.colors.primary,
                          }}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <span
                          className="text-sm font-bold"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Add Photos
                        </span>
                        <span
                          className="text-xs mt-1"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Up to 5MB, multiple allowed
                        </span>
                        <input
                          id="photos-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>

                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-4 animate-fade-in">
                          {imagePreviews.map((preview, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-xl overflow-hidden group"
                            >
                              <Image
                                src={preview}
                                alt="Upload preview"
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                                style={{
                                  backgroundColor: themeConfig.colors.error,
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info Card */}
                  <div
                    className="rounded-3xl p-6 backdrop-blur-xl border space-y-4 shadow-sm"
                    style={{
                      backgroundColor: `${themeConfig.colors.primary}08`,
                      borderColor: `${themeConfig.colors.primary}20`,
                    }}
                  >
                    <h3
                      className="text-sm font-bold flex items-center gap-2"
                      style={{ color: themeConfig.colors.primary }}
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Quick Tip
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Providing clear photos and a detailed description helps
                      our maintenance team resolve issues faster. Please specify
                      exact room numbers if possible.
                    </p>
                  </div>

                  {/* Final Action */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-3xl font-bold text-white transition-all transform hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 disabled:transform-none shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                      boxShadow: `0 12px 24px ${themeConfig.colors.primary}40`,
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Confirm & Submit"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </AuthGuard>
  );
}
