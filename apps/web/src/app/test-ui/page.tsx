"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import AuthGuard from "@/components/AuthGuard";
import WebHeader from "@/components/WebHeader";
import { WebForm, WebFormField, WebFormSection } from "@/components/WebForm";
import { WebListGroup, WebListGroupItem, WebStatsList } from "@/components/WebListGroup";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";

export default function UITestPage() {
  const router = useRouter();
  const { themeConfig, theme } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    priority: "medium",
  });

  const stats = [
    { label: "Total Tests", value: "12" },
    { label: "Passed", value: "10" },
    { label: "Failed", value: "2" },
    { label: "Success Rate", value: "83%" },
  ];

  return (
    <AuthGuard requiredRole="ADMIN">
      <div
        className="min-h-screen"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        {/* Header */}
        <WebHeader
          title="UI Layout Test"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "UI Test" },
          ]}
          actions={
            <div className="flex items-center space-x-2">
              <ThemeSwitcher />
              <Button
                onClick={() => router.push("/admin/dashboard")}
                size="sm"
                variant="secondary"
              >
                Back to Dashboard
              </Button>
            </div>
          }
        />

        {/* Main Content */}
        <div className={`${isMobile ? "px-4 py-4" : "px-8 py-8"}`}>
          <div className={`${isMobile ? "max-w-4xl" : "max-w-7xl"} mx-auto space-y-8`}>
            
            {/* Test Header */}
            <div className="text-center">
              <h1
                className={`font-bold mb-4 ${isMobile ? "text-2xl" : "text-3xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                UI Layout Comprehensive Test
              </h1>
              <p
                className={`${isMobile ? "text-sm" : "text-base"}`}
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Testing all UI components and layouts
              </p>
            </div>

            {/* Device Info */}
            <div
              className="p-4 rounded-lg border"
              style={{ borderColor: themeConfig.colors.border }}
            >
              <h2
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Device Information
              </h2>
              <div className="space-y-1">
                <p style={{ color: themeConfig.colors.textSecondary }}>
                  <strong>Device Type:</strong> {isMobile ? "Mobile" : "Desktop"}
                </p>
                <p style={{ color: themeConfig.colors.textSecondary }}>
                  <strong>Current Theme:</strong> {themeConfig.displayName}
                </p>
                <p style={{ color: themeConfig.colors.textSecondary }}>
                  <strong>Screen Size:</strong> {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : "Loading..."}
                </p>
              </div>
            </div>

            {/* Stats Test */}
            <div>
              <h2
                className={`font-semibold mb-4 ${isMobile ? "text-lg" : "text-xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                Stats Component Test
              </h2>
              <WebStatsList
                stats={stats}
                columns={isMobile ? 2 : 4}
                compact={isMobile}
              />
            </div>

            {/* Form Test */}
            <div>
              <h2
                className={`font-semibold mb-4 ${isMobile ? "text-lg" : "text-xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                Form Component Test
              </h2>
              <WebForm
                title="Test Form"
                subtitle="Testing form layout and fields"
                onSubmit={(data) => console.log("Form submitted:", data)}
                onCancel={() => console.log("Form cancelled")}
              >
                <WebFormSection title="Basic Information">
                  <WebFormField
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    required
                  />
                  <WebFormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                  <WebFormField
                    name="priority"
                    label="Priority"
                    type="select"
                    options={[
                      { value: "low", label: "Low" },
                      { value: "medium", label: "Medium" },
                      { value: "high", label: "High" },
                    ]}
                  />
                </WebFormSection>
                <WebFormSection title="Additional Details">
                  <WebFormField
                    name="message"
                    label="Message"
                    type="textarea"
                    placeholder="Enter your message"
                  />
                </WebFormSection>
              </WebForm>
            </div>

            {/* List Component Test */}
            <div>
              <h2
                className={`font-semibold mb-4 ${isMobile ? "text-lg" : "text-xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                List Component Test
              </h2>
              <WebListGroup title="Test Items">
                <WebListGroupItem
                  title="Test Item 1"
                  subtitle="This is a test item with subtitle"
                  leftIcon="📋"
                  onClick={() => console.log("Item 1 clicked")}
                  badge="Active"
                />
                <WebListGroupItem
                  title="Test Item 2"
                  subtitle="Another test item"
                  leftIcon="🔧"
                  onClick={() => console.log("Item 2 clicked")}
                  badge="Pending"
                />
                <WebListGroupItem
                  title="Test Item 3"
                  subtitle="Third test item"
                  leftIcon="📊"
                  onClick={() => console.log("Item 3 clicked")}
                  badge="Completed"
                />
              </WebListGroup>
            </div>

            {/* Button Test */}
            <div>
              <h2
                className={`font-semibold mb-4 ${isMobile ? "text-lg" : "text-xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                Button Component Test
              </h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">
                    Primary Small
                  </Button>
                  <Button variant="secondary" size="md">
                    Secondary Medium
                  </Button>
                  <Button variant="danger" size="lg">
                    Danger Large
                  </Button>
                  <Button variant="ghost" size="mobile">
                    Ghost Mobile
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button loading>
                    Loading Button
                  </Button>
                  <Button disabled>
                    Disabled Button
                  </Button>
                  <Button fullWidth>
                    Full Width Button
                  </Button>
                </div>
              </div>
            </div>

            {/* Layout Grid Test */}
            <div>
              <h2
                className={`font-semibold mb-4 ${isMobile ? "text-lg" : "text-xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                Layout Grid Test
              </h2>
              <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-4`}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    className="p-4 rounded-lg border text-center"
                    style={{ borderColor: themeConfig.colors.border }}
                  >
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {num}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Grid Item {num}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Palette Test */}
            <div>
              <h2
                className={`font-semibold mb-4 ${isMobile ? "text-lg" : "text-xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                Color Palette Test
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(themeConfig.colors).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg border text-center"
                    style={{ borderColor: themeConfig.colors.border }}
                  >
                    <div
                      className="w-full h-8 rounded mb-2"
                      style={{ backgroundColor: value }}
                    />
                    <div
                      className="text-xs font-medium"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {key}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Test */}
            <div>
              <h2
                className={`font-semibold mb-4 ${isMobile ? "text-lg" : "text-xl"}`}
                style={{ color: themeConfig.colors.text }}
              >
                Navigation Test
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/admin/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/admin/users")}
                >
                  Users
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/admin/reports")}
                >
                  Reports
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/")}
                >
                  Home
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
