"use client";

// User Maintenance Request Form - Desktop Only Version
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addMaintenanceRequest } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";
import AuthGuard from "@/components/AuthGuard";
import Image from "next/image";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";
import { WebForm, WebFormField, WebFormSection } from "@/components/WebForm";

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
    otherCategory: "", // For custom category when "Others" is selected
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation for Others category
    if (formData.category === "OTHERS" && !formData.otherCategory.trim()) {
      alert("Please specify the category when selecting 'Others'.");
      setIsSubmitting(false);
      return;
    }

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

      // Save to database
      addMaintenanceRequest(newRequest);

      alert("Maintenance request submitted successfully!");

      // Reset form
      setFormData({
        title: "",
        category: "PLUMBING",
        location: "",
        description: "",
        priority: "MEDIUM",
        otherCategory: "",
      });
      setAttachedImages([]);
      setImagePreviews([]);

      // Show success message and redirect to student dashboard
      router.push("/student");
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
        {/* Header */}
        <WebHeader
          title="Submit Maintenance Request"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Submit Request" },
          ]}
          actions={
            <div style={{ zIndex: Z_INDEX.MAX, position: "relative" }}>
              <ThemeSwitcher />
            </div>
          }
        />

        {/* Main Content */}
        <div className={`${isMobile ? "px-4 py-4" : "px-6 py-6"}`}>
          <div className={`${isMobile ? "max-w-4xl" : "max-w-4xl"} mx-auto`}>
            <WebForm
              title="Request Details"
              subtitle="Report issues and track resolution progress"
              onSubmit={handleSubmit}
              loading={isSubmitting}
              submitText="Submit Request"
            >
              <WebFormSection title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WebFormField
                    name="title"
                    label="Title"
                    placeholder="Brief description of the issue"
                    required
                  />
                  <WebFormField
                    name="location"
                    label="Location"
                    placeholder="Building, room, or area"
                    required
                  />
                </div>
                <WebFormField
                  name="description"
                  label="Description"
                  type="textarea"
                  placeholder="Detailed description of the maintenance issue..."
                  required
                />
              </WebFormSection>

              <WebFormSection title="Classification">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WebFormField
                    name="category"
                    label="Category"
                    type="select"
                    options={[
                      { label: "🔧 Plumbing", value: "PLUMBING" },
                      { label: "⚡ Electrical", value: "ELECTRICAL" },
                      { label: "🔨 Carpentry", value: "CARPENTRY" },
                      { label: "👥 Personnel", value: "PERSONNEL" },
                      { label: "📝 Others", value: "OTHERS" },
                    ]}
                  />
                  <WebFormField
                    name="priority"
                    label="Priority"
                    type="select"
                    options={[
                      { label: "🟢 Low", value: "LOW" },
                      { label: "🟡 Medium", value: "MEDIUM" },
                      { label: "🔴 High", value: "HIGH" },
                    ]}
                  />
                </div>
                {formData.category === "OTHERS" && (
                  <WebFormField
                    name="otherCategory"
                    label="Specify Category"
                    placeholder="Please specify the category..."
                    required
                  />
                )}
              </WebFormSection>
            </WebForm>

            {/* Photo Upload Section */}
            <div
              className="mt-6 bg-white rounded-lg border p-4"
              style={{ borderColor: "#E5E7EB" }}
            >
              <h3
                className="text-base font-semibold mb-4"
                style={{
                  color: themeConfig.colors.text,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Photo Documentation
              </h3>

              <div
                className="border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 hover:border-blue-400 cursor-pointer"
                style={{
                  borderColor: "#E5E7EB",
                  backgroundColor: "#F9FAFB",
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
                    style={{
                      backgroundColor: `${themeConfig.colors.primary}10`,
                    }}
                  >
                    <svg
                      className="w-6 h-6"
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
                      className="text-sm font-medium"
                      style={{
                        color: themeConfig.colors.text,
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      Click to upload photos
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{
                        color: themeConfig.colors.textSecondary,
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      Up to 5MB per image, multiple files supported
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <p
                    className="text-sm font-medium mb-3"
                    style={{
                      color: themeConfig.colors.text,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    Uploaded Photos ({imagePreviews.length})
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={128}
                          className="w-full h-20 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 text-white rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 shadow-lg"
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
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
