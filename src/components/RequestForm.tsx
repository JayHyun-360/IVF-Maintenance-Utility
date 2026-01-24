"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Category, Priority } from "@/types/database";

export default function RequestForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    customCategory: "",
    priority: "",
    location: "",
    description: "",
    images: [] as File[],
    documents: [] as File[],
  });

  const categories = [...Object.values(Category), "Others"];
  const priorities = Object.values(Priority);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "text-red-700 bg-red-50 hover:bg-red-100";
      case "high":
        return "text-orange-600 bg-orange-50 hover:bg-orange-100";
      case "medium":
        return "text-yellow-600 bg-yellow-50 hover:bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-50 hover:bg-green-100";
      default:
        return "text-gray-600 bg-gray-50 hover:bg-gray-100";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "electrical":
        return "text-blue-600 bg-blue-50 hover:bg-blue-100";
      case "plumbing":
        return "text-cyan-600 bg-cyan-50 hover:bg-cyan-100";
      case "carpentry":
        return "text-amber-700 bg-amber-50 hover:bg-amber-100";
      case "personnel":
        return "text-purple-600 bg-purple-50 hover:bg-purple-100";
      case "others":
        return "text-gray-600 bg-gray-50 hover:bg-gray-100";
      default:
        return "text-gray-600 bg-gray-50 hover:bg-gray-100";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title || "Maintenance Request");
      formDataToSend.append(
        "category",
        formData.category === "Others"
          ? formData.customCategory
          : formData.category,
      );
      formDataToSend.append("priority", formData.priority || Priority.MEDIUM);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);

      // Append images
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image_${index}`, image);
      });

      const response = await fetch("/api/maintenance-requests", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: "",
          category: "",
          customCategory: "",
          priority: "",
          location: "",
          description: "",
          images: [],
          documents: [],
        });
      } else {
        const error = await response.json();
        setError(error.error || "Failed to submit request");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Request Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your maintenance request has been submitted and will be reviewed
            shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#2d5a47] transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 py-8 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-900 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-700 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-2xl mb-4 shadow-xl border border-emerald-200/20 transform hover:scale-105 transition-all duration-300">
            <span className="text-white text-2xl font-bold">IVF</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Maintenance Request Form
          </h1>
          <p className="text-gray-600">
            Integrated Visual Feedback & Maintenance Utility
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-[0_4px_12px_rgba(239,68,68,0.15)]">
            {error}
          </div>
        )}

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-lg mr-3 flex items-center justify-center">
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
              Request Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Brief title for your request"
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 shadow-sm focus:shadow-md transition-all duration-200 bg-white/80"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      const dropdown =
                        document.getElementById("category-dropdown");
                      dropdown?.classList.toggle("hidden");
                    }}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white/80 text-left flex items-center justify-between shadow-sm focus:shadow-md transition-all duration-200"
                  >
                    <span
                      className={
                        formData.category
                          ? getCategoryColor(formData.category)
                          : "text-gray-500"
                      }
                    >
                      {formData.category === "Others" && formData.customCategory
                        ? formData.customCategory
                        : formData.category || "Select a category"}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    id="category-dropdown"
                    className="absolute z-10 w-full mt-1 bg-white/95 backdrop-blur-sm border border-emerald-200 rounded-lg shadow-lg hidden"
                  >
                    <div className="max-h-60 overflow-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            handleInputChange("category", category);
                            const dropdown =
                              document.getElementById("category-dropdown");
                            dropdown?.classList.add("hidden");
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-emerald-50 border-b border-emerald-100 last:border-b-0 transition-colors duration-150 ${getCategoryColor(category)}`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {formData.category === "Others" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={formData.customCategory}
                      onChange={(e) =>
                        handleInputChange("customCategory", e.target.value)
                      }
                      placeholder="Please specify the category or problem"
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 shadow-sm focus:shadow-md transition-all duration-200 bg-white/80"
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      const dropdown =
                        document.getElementById("priority-dropdown");
                      dropdown?.classList.toggle("hidden");
                    }}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white/80 text-left flex items-center justify-between shadow-sm focus:shadow-md transition-all duration-200"
                  >
                    <span
                      className={
                        formData.priority
                          ? getPriorityColor(formData.priority)
                          : "text-gray-500"
                      }
                    >
                      {formData.priority || "Select priority"}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    id="priority-dropdown"
                    className="absolute z-10 w-full mt-1 bg-white/95 backdrop-blur-sm border border-emerald-200 rounded-lg shadow-lg hidden"
                  >
                    <div className="max-h-60 overflow-auto">
                      {priorities.map((priority) => (
                        <button
                          key={priority}
                          type="button"
                          onClick={() => {
                            handleInputChange("priority", priority);
                            const dropdown =
                              document.getElementById("priority-dropdown");
                            dropdown?.classList.add("hidden");
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-emerald-50 border-b border-emerald-100 last:border-b-0 transition-colors duration-150 ${getPriorityColor(priority)}`}
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="Specify the exact location (e.g., Building A, Room 201)"
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 shadow-sm focus:shadow-md transition-all duration-200 bg-white/80"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the issue in detail"
                  rows={4}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-gray-900 placeholder-gray-500 shadow-sm focus:shadow-md transition-all duration-200 bg-white/80"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-lg mr-3 flex items-center justify-center">
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              Attach Images
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-emerald-700 file:to-emerald-600 file:text-white hover:file:from-emerald-800 hover:file:to-emerald-700 shadow-sm focus:shadow-md transition-all duration-200 bg-white/80"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can upload multiple images to help describe the issue
                </p>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm hover:shadow-md"
                        >
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <div className="mt-1 text-xs text-gray-500 truncate">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-[#1B4332] to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-[#1B4332] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting Request...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
