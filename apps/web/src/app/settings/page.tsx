"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";

export default function SettingsPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: themeConfig.colors.background,
        color: themeConfig.colors.text,
      }}
    >
      {/* Header */}
      <header
        className="px-8 py-6 border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/")}
              className="p-3 rounded-xl mr-4"
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
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <div style={{ zIndex: Z_INDEX.DROPDOWN }}>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Theme Settings */}
          <section
            className="rounded-2xl p-6"
            style={{
              backgroundColor: themeConfig.colors.surface,
              border: `1px solid ${themeConfig.colors.border}`,
            }}
          >
            <h2 className="text-xl font-bold mb-6">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Choose your preferred color theme
                  </p>
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section
            className="rounded-2xl p-6"
            style={{
              backgroundColor: themeConfig.colors.surface,
              border: `1px solid ${themeConfig.colors.border}`,
            }}
          >
            <h2 className="text-xl font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Receive updates about your maintenance requests via email
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      email: !prev.email,
                    }))
                  }
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications.email ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      notifications.email ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Get instant updates in your browser
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({ ...prev, push: !prev.push }))
                  }
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications.push ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      notifications.push ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p
                    className="text-sm"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Receive text messages for urgent requests
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({ ...prev, sms: !prev.sms }))
                  }
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications.sms ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      notifications.sms ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Account Settings */}
          <section
            className="rounded-2xl p-6"
            style={{
              backgroundColor: themeConfig.colors.surface,
              border: `1px solid ${themeConfig.colors.border}`,
            }}
          >
            <h2 className="text-xl font-bold mb-6">Account</h2>
            <div className="space-y-4">
              <button
                className="w-full text-left p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  border: `1px solid ${themeConfig.colors.border}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Change Password</h3>
                    <p
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Update your account password
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5"
                    style={{ color: themeConfig.colors.textSecondary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button
                className="w-full text-left p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  border: `1px solid ${themeConfig.colors.border}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Export Data</h3>
                    <p
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Download your maintenance request history
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5"
                    style={{ color: themeConfig.colors.textSecondary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={() => console.log("Settings saved")}>
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
