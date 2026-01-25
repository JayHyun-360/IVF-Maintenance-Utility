"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addMaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

export default function MobileStudentPage() {
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
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Clean Header */}
      <header className="px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-xl transition-all duration-300 hover:bg-gray-100"
            style={{ color: themeConfig.colors.text }}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1
            className="text-lg font-semibold"
            style={{ color: themeConfig.colors.text }}
          >
            New Request
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content - Centered Card Design */}
      <main className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                What needs fixing?
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
                placeholder="e.g., Leaky faucet"
              />
            </div>

            {/* Location Input */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Where is it?
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
                placeholder="e.g., Dorm 2, Room 301"
              />
            </div>

            {/* Description */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Describe the problem
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                style={{
                  backgroundColor: themeConfig.colors.surface,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
                placeholder="What's wrong? Please provide details..."
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeConfig.colors.text }}
                >
                  Type
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="PLUMBING">Plumbing</option>
                  <option value="ELECTRICAL">Electrical</option>
                  <option value="CARPENTRY">Carpentry</option>
                  <option value="PERSONNEL">Personnel</option>
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
                  className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.text,
                  }}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label
                className="block text-sm font-medium mb-3"
                style={{ color: themeConfig.colors.text }}
              >
                Add photos
              </label>
              <div
                className="border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 hover:border-blue-400 cursor-pointer"
                style={{
                  borderColor: themeConfig.colors.border,
                  backgroundColor: themeConfig.colors.surface,
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
                  className="cursor-pointer flex flex-col items-center space-y-3"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <svg
                      className="w-6 h-6 text-blue-500"
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
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Tap to add photos
                  </p>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-xl transition-all duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 shadow-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 text-base shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
                color: "#FFFFFF",
                boxShadow:
                  "0 8px 24px 0 rgba(27, 67, 50, 0.4), 0 4px 12px 0 rgba(27, 67, 50, 0.3)",
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                {isSubmitting ? (
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
                      d="M4 12v8a8 8 0 018 0a8 8 0 018 0 4 8 0 018 0-4 8 0 018 0-8 0 0 0-8 0z"
                    />
                  </svg>
                ) : (
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
                )}
                <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
              </span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
