"use client";

// Student Maintenance Request Form - Desktop Only Version
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addMaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";

export default function StudentPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "PLUMBING",
    priority: "MEDIUM",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
        requestedBy: "Current Student",
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
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024,
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
    <AuthGuard>
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Enhanced Header with Gradient */}
        <header
          className="px-8 py-6 border-b relative overflow-hidden"
          style={{ borderColor: themeConfig.colors.border }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
            }}
          ></div>
          <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
            <div className="flex items-center flex-1">
              <button
                onClick={() => router.push("/")}
                className="p-3 rounded-xl mr-4 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
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
              <div className="text-center flex-1">
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{
                    color: themeConfig.colors.text,
                    textShadow: `0 1px 2px ${themeConfig.colors.primary}20`,
                  }}
                >
                  Submit Maintenance Request
                </h1>
                <p
                  className="text-base"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Report issues and track resolution progress
                </p>
              </div>
            </div>
            <div
              className="absolute top-4 right-4"
              style={{ zIndex: Z_INDEX.DROPDOWN }}
            >
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Enhanced Request Details */}
              <div
                className="rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                  boxShadow: `0 10px 30px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}20`,
                }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-white"
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
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Request Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                        border: "1px solid",
                      }}
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                        border: "1px solid",
                      }}
                      placeholder="Building, room, or area"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent resize-none"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
                      border: "1px solid",
                    }}
                    placeholder="Detailed description of the maintenance issue..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                        border: "1px solid",
                      }}
                    >
                      <option value="PLUMBING">🔧 Plumbing</option>
                      <option value="ELECTRICAL">⚡ Electrical</option>
                      <option value="CARPENTRY">🔨 Carpentry</option>
                      <option value="PERSONNEL">👥 Personnel</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
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
                    </select>
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div
                className="rounded-2xl p-8 shadow-lg"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  border: "1px solid",
                }}
              >
                <h2
                  className="text-xl font-semibold mb-6"
                  style={{ color: themeConfig.colors.text }}
                >
                  Photo Documentation
                </h2>

                <div
                  className="border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 hover:border-blue-400 cursor-pointer"
                  style={{
                    borderColor: themeConfig.colors.border,
                    backgroundColor: themeConfig.colors.background,
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photos"
                  />
                  <label
                    htmlFor="photos"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${themeConfig.colors.primary}10`,
                      }}
                    >
                      <svg
                        className="w-10 h-10"
                        style={{ color: themeConfig.colors.primary }}
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
                    <div>
                      <p
                        className="text-lg font-medium"
                        style={{ color: themeConfig.colors.text }}
                      >
                        Click to upload photos
                      </p>
                      <p
                        className="text-sm mt-1"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Up to 5MB per image, multiple files supported
                      </p>
                    </div>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <p
                      className="text-sm font-medium mb-4"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Uploaded Photos ({imagePreviews.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-xl transition-all duration-300 group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 text-white rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 shadow-lg"
                            style={{
                              backgroundColor: themeConfig.colors.error,
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  size="lg"
                  fullWidth
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
