"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    backgroundColor: "rgba(255, 255, 255, 0.05) !important",
    backdropFilter: "blur(10px) !important",
    border:
      focusedField === fieldName
        ? "2px solid rgba(20, 184, 166, 0.5) !important"
        : "1px solid rgba(255, 255, 255, 0.1) !important",
    color: "#f3f4f6",
    boxShadow:
      focusedField === fieldName
        ? "0 0 20px rgba(20, 184, 166, 0.3), inset 0 0 0 1px rgba(20, 184, 166, 0.1) !important"
        : "inset 0 0 0 1px rgba(255, 255, 255, 0.05) !important",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important",
  });

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0B0E11] relative overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <g fill="none" fillRule="evenodd">
              <g stroke="#14b8a6" strokeWidth="0.5" opacity="0.3">
                <path d="M0 0h40v40H0z M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" />
              </g>
            </g>
          </svg>
        </div>

        {/* Teal Mesh Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 blur-3xl"></div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-teal-400 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-2 h-2 bg-teal-300 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Modern Navigation Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div
              className="flex items-center justify-between h-14 md:h-16"
              style={{ maxWidth: "1400px", margin: "0 auto" }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 text-white"
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
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg md:text-xl font-bold text-gray-100">
                    User Portal
                  </h1>
                  <p className="text-xs text-gray-400">Maintenance Request</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-gray-100">
                    User Portal
                  </h1>
                </div>
              </motion.div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-4 ml-auto">
                <BackButton fallback="/" />
                <ThemeSwitcher />
                <div
                  className="w-10 h-10 rounded-full border-2 overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/25"
                  style={{ borderColor: "rgba(20, 184, 166, 0.3)" }}
                >
                  U
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className={`pt-24 pb-12 ${isMobile ? "px-4" : "px-8"}`}>
          <div className="max-w-4xl mx-auto">
            {/* Floating Action Button */}
            <motion.div
              className="fixed bottom-8 right-8 z-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-2xl shadow-teal-500/25 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                title="Back to top"
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
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.button>
            </motion.div>
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Glassmorphic Hero Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-xl mx-auto mb-8"
                style={{
                  background: "rgba(255, 255, 255, 0.03) !important",
                  backdropFilter: "blur(25px) !important",
                  border: "1px solid rgba(255, 255, 255, 0.1) !important",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30 flex-shrink-0">
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-white"
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
                  <div className="text-left sm:text-center lg:text-left">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-sans font-bold text-gray-100 leading-tight">
                      Maintenance Request
                    </h1>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      Submit your service request
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-sans text-gray-100 leading-tight mb-8 !important"
                style={{
                  fontWeight: "800 !important",
                  letterSpacing: "-0.05em !important",
                  marginBottom: "2rem !important",
                }}
              >
                Submit Your
                <span className="block text-teal-400">Maintenance Request</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed px-4 !important"
                style={{
                  maxWidth: "550px !important",
                  margin: "0 auto 3rem auto !important",
                  lineHeight: "2 !important",
                }}
              >
                Report maintenance issues quickly and efficiently. Our team will
                respond promptly to ensure your facility remains in optimal
                condition.
              </motion.p>
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
                  background: "rgba(255, 255, 255, 0.03) !important",
                  backdropFilter: "blur(25px) !important",
                  border: "1px solid rgba(255, 255, 255, 0.1) !important",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
              >
                {/* Form Header */}
                <div
                  className="px-8 py-6 border-b"
                  style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-100 mb-1">
                        Request Details
                      </h2>
                      <p className="text-sm text-gray-400">
                        Please provide detailed information about the
                        maintenance issue
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-8 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Request Title *
                    </label>
                    <motion.input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("title")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                      style={inputStyles("title")}
                      placeholder="Brief description of the issue"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Building *
                      </label>
                      <motion.select
                        name="building"
                        value={formData.building}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none appearance-none cursor-pointer"
                        style={inputStyles("building")}
                        whileFocus={{ scale: 1.01 }}
                      >
                        <option value="" className="bg-[#0B0E11]">
                          Select Building
                        </option>
                        <option value="Main Building" className="bg-[#0B0E11]">
                          Main Building
                        </option>
                        <option
                          value="Science Building"
                          className="bg-[#0B0E11]"
                        >
                          Science Building
                        </option>
                        <option value="Library" className="bg-[#0B0E11]">
                          Library
                        </option>
                        <option value="Cafeteria" className="bg-[#0B0E11]">
                          Cafeteria
                        </option>
                        <option value="Gymnasium" className="bg-[#0B0E11]">
                          Gymnasium
                        </option>
                        <option value="Admin Building" className="bg-[#0B0E11]">
                          Admin Building
                        </option>
                        <option value="Dormitory" className="bg-[#0B0E11]">
                          Dormitory
                        </option>
                      </motion.select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Room Number *
                      </label>
                      <motion.input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                        style={inputStyles("roomNumber")}
                        placeholder="e.g., 101, A-205"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Detailed Description *
                    </label>
                    <motion.textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none resize-none"
                      style={inputStyles("description")}
                      placeholder="Please describe the maintenance issue in detail..."
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Category and Priority */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300">
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
                          <motion.button
                            key={cat.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                category: cat.id as
                                  | "PLUMBING"
                                  | "ELECTRICAL"
                                  | "HVAC"
                                  | "CARPENTRY"
                                  | "PAINTING"
                                  | "CLEANING"
                                  | "SECURITY"
                                  | "OTHER",
                              })
                            }
                            className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium"
                            style={{
                              backgroundColor:
                                formData.category === cat.id
                                  ? "rgba(20, 184, 166, 0.2)"
                                  : "rgba(255, 255, 255, 0.05)",
                              backdropFilter: "blur(10px)",
                              borderColor:
                                formData.category === cat.id
                                  ? "rgba(20, 184, 166, 0.5)"
                                  : "rgba(255, 255, 255, 0.1)",
                              color:
                                formData.category === cat.id
                                  ? "#14b8a6"
                                  : "#f3f4f6",
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>{cat.icon}</span>
                            {cat.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300">
                        Priority Level
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: "LOW", label: "Low", color: "#10b981" },
                          { id: "MEDIUM", label: "Medium", color: "#f59e0b" },
                          { id: "HIGH", label: "High", color: "#ef4444" },
                          { id: "URGENT", label: "Urgent", color: "#dc2626" },
                        ].map((prio) => (
                          <motion.button
                            key={prio.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                priority: prio.id as
                                  | "LOW"
                                  | "MEDIUM"
                                  | "HIGH"
                                  | "URGENT",
                              })
                            }
                            className="w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium"
                            style={{
                              backgroundColor:
                                formData.priority === prio.id
                                  ? `${prio.color}20`
                                  : "rgba(255, 255, 255, 0.05)",
                              backdropFilter: "blur(10px)",
                              borderColor:
                                formData.priority === prio.id
                                  ? prio.color
                                  : "rgba(255, 255, 255, 0.1)",
                              color:
                                formData.priority === prio.id
                                  ? prio.color
                                  : "#f3f4f6",
                            }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{prio.label}</span>
                            {formData.priority === prio.id && (
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: prio.color }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Contact Phone
                      </label>
                      <motion.input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                        style={inputStyles("contactPhone")}
                        placeholder="0912-345-6789"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Department
                      </label>
                      <motion.select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none appearance-none cursor-pointer"
                        style={inputStyles("department")}
                        whileFocus={{ scale: 1.01 }}
                      >
                        <option value="" className="bg-[#0B0E11]">
                          Select Department
                        </option>
                        <option value="Academic" className="bg-[#0B0E11]">
                          Academic
                        </option>
                        <option value="Administrative" className="bg-[#0B0E11]">
                          Administrative
                        </option>
                        <option value="IT Department" className="bg-[#0B0E11]">
                          IT Department
                        </option>
                        <option value="Library" className="bg-[#0B0E11]">
                          Library
                        </option>
                        <option value="Cafeteria" className="bg-[#0B0E11]">
                          Cafeteria
                        </option>
                        <option value="Maintenance" className="bg-[#0B0E11]">
                          Maintenance
                        </option>
                        <option value="Security" className="bg-[#0B0E11]">
                          Security
                        </option>
                        <option
                          value="Student Affairs"
                          className="bg-[#0B0E11]"
                        >
                          Student Affairs
                        </option>
                      </motion.select>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-300">
                      Photo Documentation (Optional)
                    </label>
                    <motion.div
                      className="border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300"
                      style={{
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(10px)",
                      }}
                      whileHover={{
                        borderColor: "rgba(20, 184, 166, 0.3)",
                        backgroundColor: "rgba(20, 184, 166, 0.05)",
                      }}
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
                            backgroundColor: "rgba(20, 184, 166, 0.2)",
                            color: "#14b8a6",
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
                        <span className="text-sm font-medium text-gray-300">
                          Click to upload photos
                        </span>
                        <span className="text-xs mt-1 text-gray-400">
                          Up to 5MB per file
                        </span>
                      </label>
                    </motion.div>

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
                  className="px-8 py-4 rounded-2xl font-bold text-white transition-all shadow-xl relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    boxShadow: "0 12px 24px rgba(20, 184, 166, 0.4)",
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
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
                      </motion.svg>
                      Submitting Request...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Submit Maintenance Request
                    </div>
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
