"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import Image from "next/image";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { motion } from "framer-motion";

export default function UserPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "PLUMBING",
    priority: "MEDIUM",
    building: "",
    roomNumber: "",
    floor: "",
    location: "",
    otherCategory: "",
    contactPhone: "",
    department: "",
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

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category:
            formData.category === "OTHERS"
              ? formData.otherCategory.toUpperCase()
              : formData.category,
          priority: formData.priority,
          building: formData.building,
          roomNumber: formData.roomNumber,
          floor: formData.floor,
          location:
            formData.location ||
            `${formData.building} - Room ${formData.roomNumber}${formData.floor ? `, Floor ${formData.floor}` : ""}`,
          contactPhone: formData.contactPhone,
          department: formData.department,
          images: imageBase64Array,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      // Success state and redirect
      setTimeout(() => {
        router.push("/student/history");
      }, 1500);
    } catch {
      alert("Failed to submit request. Please try again.");
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

  return (
    <AuthGuard>
      <div className="min-h-screen relative">
        {/* Background Effects */}
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
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

        {/* Navigation */}
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
                User Portal
              </span>
            </button>

            <div className="flex items-center gap-4">
              <BackButton fallback="/dashboard" />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                >
                  <svg
                    className="w-8 h-8"
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
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: themeConfig.colors.text }}
              >
                User Portal
              </h1>
              <p
                className="text-lg md:text-xl max-w-2xl mx-auto"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Submit maintenance requests quickly and efficiently
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Main Form Card */}
              <motion.div
                className="rounded-2xl backdrop-blur-xl border shadow-xl overflow-hidden"
                style={{
                  backgroundColor: `${themeConfig.colors.surface}f0`,
                  borderColor: `${themeConfig.colors.border}30`,
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Form Header */}
                <div
                  className="px-8 py-6 border-b"
                  style={{ borderColor: `${themeConfig.colors.border}20` }}
                >
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Maintenance Request Details
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Please provide detailed information about the maintenance
                    issue
                  </p>
                </div>

                {/* Form Body */}
                <div className="p-8 space-y-6">
                  {/* Title */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Request Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("title")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={inputStyles("title")}
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Building *
                      </label>
                      <select
                        name="building"
                        value={formData.building}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none appearance-none cursor-pointer"
                        style={inputStyles("building")}
                      >
                        <option value="">Select Building</option>
                        <option value="Main Building">Main Building</option>
                        <option value="Science Building">
                          Science Building
                        </option>
                        <option value="Library">Library</option>
                        <option value="Cafeteria">Cafeteria</option>
                        <option value="Gymnasium">Gymnasium</option>
                        <option value="Admin Building">Admin Building</option>
                        <option value="Dormitory">Dormitory</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Room Number *
                      </label>
                      <input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none"
                        style={inputStyles("roomNumber")}
                        placeholder="e.g., 101, A-205"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Detailed Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none resize-none"
                      style={inputStyles("description")}
                      placeholder="Please describe the maintenance issue in detail..."
                    />
                  </div>

                  {/* Category and Priority */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-medium mb-3"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Category
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "PLUMBING", label: "Plumbing", icon: "🔧" },
                          { id: "ELECTRICAL", label: "Electrical", icon: "⚡" },
                          { id: "HVAC", label: "HVAC", icon: "❄️" },
                          { id: "CARPENTRY", label: "Carpentry", icon: "🔨" },
                          { id: "CLEANING", label: "Cleaning", icon: "🧹" },
                          { id: "OTHERS", label: "Other", icon: "📝" },
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
                            className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium"
                            style={{
                              backgroundColor:
                                formData.category === cat.id
                                  ? `${themeConfig.colors.primary}15`
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
                            <span>{cat.icon}</span>
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-3"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Priority Level
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: "LOW", label: "Low", color: "#10b981" },
                          { id: "MEDIUM", label: "Medium", color: "#f59e0b" },
                          { id: "HIGH", label: "High", color: "#ef4444" },
                          { id: "URGENT", label: "Urgent", color: "#dc2626" },
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
                            className="w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium"
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
                            <span>{prio.label}</span>
                            {formData.priority === prio.id && (
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: prio.color }}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none"
                        style={inputStyles("contactPhone")}
                        placeholder="0912-345-6789"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none appearance-none cursor-pointer"
                        style={inputStyles("department")}
                      >
                        <option value="">Select Department</option>
                        <option value="Academic">Academic</option>
                        <option value="Administrative">Administrative</option>
                        <option value="IT Department">IT Department</option>
                        <option value="Library">Library</option>
                        <option value="Cafeteria">Cafeteria</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Security">Security</option>
                        <option value="Student Affairs">Student Affairs</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-3"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Photo Documentation (Optional)
                    </label>
                    <div
                      className="border-2 border-dashed rounded-xl p-6 text-center transition-colors hover:border-opacity-50"
                      style={{ borderColor: themeConfig.colors.border }}
                    >
                      <input
                        id="photos-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="photos-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
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
                          className="text-sm font-medium"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Click to upload photos
                        </span>
                        <span
                          className="text-xs mt-1"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Up to 5MB per file
                        </span>
                      </label>
                    </div>

                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        {imagePreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden group"
                          >
                            <Image
                              src={preview}
                              alt="Upload preview"
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-2xl font-bold text-white transition-all shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                    boxShadow: `0 12px 24px ${themeConfig.colors.primary}40`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                      Submitting Request...
                    </div>
                  ) : (
                    "Submit User Maintenance Request"
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
