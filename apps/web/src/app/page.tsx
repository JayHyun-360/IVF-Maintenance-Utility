"use client";

// IVF Maintenance Utility - Deployed to Vercel
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { getMaintenanceStats } from "@/lib/data";

export default function Home() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });

  // Detect mobile and show welcome screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Show welcome screen on mobile first visit
      if (mobile && !sessionStorage.getItem("welcomeShown")) {
        setShowWelcome(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load real data on component mount
  useEffect(() => {
    const loadData = () => {
      const realStats = getMaintenanceStats();
      setStats(realStats);
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle continue button on welcome screen
  const handleContinue = () => {
    sessionStorage.setItem("welcomeShown", "true");
    setShowWelcome(false);
  };

  // Show welcome screen for mobile first-time visitors
  if (isMobile && showWelcome) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{
          backgroundColor: themeConfig.colors.background,
          color: themeConfig.colors.text,
        }}
      >
        <div className="max-w-sm w-full">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
              }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: themeConfig.colors.text }}
            >
              Welcome
            </h1>
            <p
              className="text-sm mb-1"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              IVF Maintenance Utility
            </p>
          </div>

          {/* Address */}
          <div className="mb-8 text-center">
            <p
              className="text-sm font-medium mb-3"
              style={{ color: themeConfig.colors.text }}
            >
              Maintenance Portal
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              Streamlined maintenance request management for IVF facilities.
              Submit, track, and manage maintenance requests efficiently.
            </p>
          </div>

          {/* Info */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#1B4332" }}
              ></div>
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Fast request submission
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#1B4332" }}
              ></div>
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Real-time status tracking
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#1B4332" }}
              ></div>
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Photo attachment support
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl font-semibold transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-xl"
            style={{
              background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
              color: "#FFFFFF",
              boxShadow:
                "0 8px 24px 0 rgba(27, 67, 50, 0.4), 0 4px 12px 0 rgba(27, 67, 50, 0.3)",
            }}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Continue</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Calculate completion rate
  const completionRate =
    stats.totalRequests > 0
      ? Math.round((stats.completedRequests / stats.totalRequests) * 100)
      : 0;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: themeConfig.colors.background,
        color: themeConfig.colors.text,
      }}
    >
      <div className="max-w-sm w-full">
        {/* Main Action Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/student")}
            className="w-full py-4 rounded-2xl font-semibold transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-xl"
            style={{
              background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
              color: "#FFFFFF",
              boxShadow:
                "0 8px 24px 0 rgba(27, 67, 50, 0.4), 0 4px 12px 0 rgba(27, 67, 50, 0.3)",
            }}
          >
            <span className="flex items-center justify-center space-x-3">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-base">Submit Maintenance Request</span>
            </span>
          </button>
        </div>

        {/* Landscape Section */}
        <div className="mb-8">
          <div
            className="rounded-2xl p-6 shadow-lg"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-lg font-semibold"
                style={{ color: themeConfig.colors.text }}
              >
                Recent Activity
              </h2>
              <button
                className="text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ color: "#1B4332" }}
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                >
                  <span className="text-lg" style={{ color: "#3B82F6" }}>
                    🔧
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Leaky faucet in Dorm 2
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    2 hours ago • Pending
                  </p>
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#F59E0B" }}
                ></div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
                >
                  <span className="text-lg" style={{ color: "#22C55E" }}>
                    ✅
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Electrical issue fixed
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    5 hours ago • Completed
                  </p>
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#22C55E" }}
                ></div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(245, 158, 11, 0.15)" }}
                >
                  <span className="text-lg" style={{ color: "#F59E0B" }}>
                    ⏳
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Window repair in progress
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    1 day ago • In Progress
                  </p>
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#F59E0B" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/student")}
            className="w-full p-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 text-left group"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
              >
                <span className="text-xl" style={{ color: "#3B82F6" }}>
                  🔧
                </span>
              </div>
              <div className="flex-1">
                <h3
                  className="font-semibold text-base"
                  style={{ color: themeConfig.colors.text }}
                >
                  New Request
                </h3>
                <p
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Report maintenance issues quickly
                </p>
              </div>
            </div>
          </button>

          <button
            className="w-full p-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 text-left group"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
              >
                <span className="text-xl" style={{ color: "#22C55E" }}>
                  📈
                </span>
              </div>
              <div className="flex-1">
                <h3
                  className="font-semibold text-base"
                  style={{ color: themeConfig.colors.text }}
                >
                  Analytics
                </h3>
                <p
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  View detailed statistics
                </p>
              </div>
            </div>
          </button>

          <button
            className="w-full p-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 text-left group"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              border: "1px solid",
            }}
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(168, 85, 247, 0.15)" }}
              >
                <span className="text-xl" style={{ color: "#A855F7" }}>
                  ⚙️
                </span>
              </div>
              <div className="flex-1">
                <h3
                  className="font-semibold text-base"
                  style={{ color: themeConfig.colors.text }}
                >
                  Management
                </h3>
                <p
                  className="text-sm"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Admin control panel
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="mt-12 py-6 border-t"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p
              className="text-sm"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              © 2024 IVF Maintenance Utility. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
