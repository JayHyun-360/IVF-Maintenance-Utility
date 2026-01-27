"use client";

// IVF Maintenance Utility - Desktop Only Version
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { getMaintenanceStats } from "@/lib/data";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import { useSession } from "next-auth/react";
import AccountDropdown from "@/components/AccountDropdown";

export default function Home() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });

  useEffect(() => {
    const loadData = () => {
      const realStats = getMaintenanceStats();
      setStats(realStats);
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [session, status]);

  // Check if user is already authenticated and redirect to appropriate dashboard
  // Only redirect if explicitly coming from login or if user wants to go to dashboard
  useEffect(() => {
    if (status === "loading") return;

    console.log("Home page - Session status:", status);
    console.log("Home page - Session data:", session);
    console.log("Home page - User role:", session?.user?.role);

    // Remove automatic redirect - allow users to stay on homepage
    // Users can navigate to their dashboards using the UI buttons
    console.log("Allowing user to stay on homepage");
  }, [session, status, router]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: themeConfig.colors.background,
        color: themeConfig.colors.text,
        transition: "background-color 0.8s ease-in-out, color 0.8s ease-in-out",
      }}
    >
      {/* Header with Gradient Background */}
      <header
        className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 text-center relative overflow-hidden"
        style={{
          background: themeConfig.backgroundImage
            ? themeConfig.name === "light"
              ? `linear-gradient(rgba(14, 165, 233, 0.4), rgba(6, 182, 212, 0.4)), url("${themeConfig.backgroundImage}")`
              : themeConfig.name === "standard"
                ? `linear-gradient(rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.4)), url("${themeConfig.backgroundImage}")`
                : `linear-gradient(rgba(59, 130, 246, 0.4), rgba(29, 78, 216, 0.4)), url("${themeConfig.backgroundImage}")`
            : `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
          backgroundSize: themeConfig.backgroundImage ? "cover" : "auto",
          backgroundPosition: themeConfig.backgroundImage
            ? "center center"
            : "auto",
          backgroundRepeat: themeConfig.backgroundImage ? "no-repeat" : "auto",
          backgroundAttachment: themeConfig.backgroundImage ? "scroll" : "auto",
          transition:
            "background-image 2s ease-in-out, background 2s ease-in-out, background-color 2s ease-in-out, opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          minHeight: themeConfig.backgroundImage ? "50vh" : "auto",
          height: themeConfig.backgroundImage ? "50vh" : "auto",
        }}
      >
        {/* Desktop-specific background adjustments */}
        {themeConfig.backgroundImage && (
          <style jsx>{`
            @media (min-width: 1024px) {
              header {
                background-size: cover !important;
                background-position: center center !important;
                background-attachment: scroll !important;
                min-height: 45vh !important;
                height: 45vh !important;
              }
            }
            @media (min-width: 1280px) {
              header {
                background-size: cover !important;
                background-position: center center !important;
                background-attachment: scroll !important;
                min-height: 40vh !important;
                height: 40vh !important;
              }
            }
            @media (min-width: 1536px) {
              header {
                background-size: cover !important;
                background-position: center center !important;
                background-attachment: scroll !important;
                min-height: 35vh !important;
                height: 35vh !important;
              }
            }
          `}</style>
        )}
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div
            className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 w-16 sm:w-20 md:w-32 h-16 sm:h-20 md:h-32 rounded-full hidden sm:block"
            style={{ backgroundColor: themeConfig.colors.accent }}
          ></div>
          <div
            className="absolute bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 w-20 sm:w-32 md:w-48 h-20 sm:h-32 md:h-48 rounded-full hidden sm:block"
            style={{ backgroundColor: themeConfig.colors.accent }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 rounded-full hidden md:block"
            style={{ backgroundColor: themeConfig.colors.accent }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6">
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2 sm:space-x-4">
            <div style={{ zIndex: Z_INDEX.DROPDOWN }}>
              <AccountDropdown />
            </div>
            <div style={{ zIndex: Z_INDEX.DROPDOWN }}>
              <ThemeSwitcher />
            </div>
          </div>
          <div
            className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-2xl transform hover:scale-110 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.accent} 0%, ${themeConfig.colors.primary} 100%)`,
              boxShadow: `0 20px 40px ${themeConfig.colors.primary}30, 0 0 0 1px ${themeConfig.colors.primary}20`,
            }}
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 2L9.5 7.5L4 9l5 1.5L12 16l3-5.5L20 9l-5.5-1.5L12 2z"
              />
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth={1.5}
                fill="none"
                opacity="0.3"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h8M12 8v8"
                opacity="0.5"
              />
            </svg>
          </div>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3"
            style={{
              color: themeConfig.backgroundImage
                ? "#FFFFFF"
                : themeConfig.colors.text,
              textShadow: themeConfig.backgroundImage
                ? `0 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px ${themeConfig.colors.primary}40`
                : `0 1px 2px ${themeConfig.colors.primary}20`,
            }}
          >
            IVF Maintenance Utility
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg"
            style={{
              color: themeConfig.backgroundImage
                ? "rgba(255, 255, 255, 0.9)"
                : themeConfig.colors.textSecondary,
              textShadow: themeConfig.backgroundImage
                ? `0 1px 2px rgba(0, 0, 0, 0.5)`
                : "none",
            }}
          >
            Streamlined maintenance request management system
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12 mt-4 sm:mt-6 lg:mt-8">
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
              <div
                className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2"
                style={{
                  color: themeConfig.colors.text,
                  textShadow: `0 1px 2px ${themeConfig.colors.primary}20`,
                }}
              >
                {stats.totalRequests}
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  color: themeConfig.colors.textSecondary,
                  textShadow: `0 1px 1px ${themeConfig.colors.primary}10`,
                }}
              >
                Total Requests
              </div>
            </div>

            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.warning} 0%, ${themeConfig.colors.accent} 100%)`,
                }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div
                className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2"
                style={{
                  color: themeConfig.colors.text,
                  textShadow: `0 1px 2px ${themeConfig.colors.warning}20`,
                }}
              >
                {stats.pendingRequests}
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  color: themeConfig.colors.textSecondary,
                  textShadow: `0 1px 1px ${themeConfig.colors.warning}10`,
                }}
              >
                Pending
              </div>
            </div>

            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.accent} 100%)`,
                }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
              </div>
              <div
                className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2"
                style={{
                  color: themeConfig.colors.text,
                  textShadow: `0 1px 2px ${themeConfig.colors.primary}20`,
                }}
              >
                {stats.inProgressRequests}
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  color: themeConfig.colors.textSecondary,
                  textShadow: `0 1px 1px ${themeConfig.colors.primary}10`,
                }}
              >
                In Progress
              </div>
            </div>

            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}20`,
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.success} 0%, ${themeConfig.colors.secondary} 100%)`,
                }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div
                className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2"
                style={{
                  color: themeConfig.colors.text,
                  textShadow: `0 1px 2px ${themeConfig.colors.success}20`,
                }}
              >
                {stats.completedRequests}
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  color: themeConfig.colors.textSecondary,
                  textShadow: `0 1px 1px ${themeConfig.colors.success}10`,
                }}
              >
                Completed
              </div>
            </div>
          </div>

          {/* Enhanced Action Card */}
          <div className="flex justify-center px-4 sm:px-6">
            <button
              onClick={() => {
                if (session?.user?.role === "ADMIN") {
                  router.push("/admin/dashboard");
                } else if (
                  session?.user?.role === "USER" ||
                  session?.user?.role === "STUDENT"
                ) {
                  router.push("/student");
                } else {
                  router.push("/login");
                }
              }}
              className="p-8 sm:p-10 md:p-12 rounded-2xl text-center transition-all duration-800 transform hover:scale-105 hover:shadow-2xl group max-w-md w-full"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                border: `1px solid ${themeConfig.colors.border}`,
                boxShadow: `0 10px 30px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}20`,
                transition:
                  "all 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease-in-out",
              }}
            >
              <div
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto transform group-hover:scale-110 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.accent} 100%)`,
                  boxShadow: `0 8px 20px ${themeConfig.colors.primary}25`,
                }}
              >
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
                  />
                </svg>
              </div>
              <h3
                className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4"
                style={{
                  color: themeConfig.colors.text,
                  textShadow: `0 1px 2px ${themeConfig.colors.primary}20`,
                }}
              >
                {session
                  ? session.user?.role === "ADMIN"
                    ? "Go to Admin Dashboard"
                    : "Go to Student Portal"
                  : "Go to login section"}
              </h3>
              <p
                className="text-xs sm:text-sm mb-4 sm:mb-6"
                style={{
                  color: themeConfig.colors.textSecondary,
                  textShadow: `0 1px 1px ${themeConfig.colors.primary}10`,
                }}
              >
                {session
                  ? "Access your dashboard to manage requests or submit new ones"
                  : "Access your account to submit requests or manage the system"}
              </p>
              <div
                className="inline-flex items-center text-xs sm:text-sm font-medium transform group-hover:translate-x-1 transition-all duration-300"
                style={{
                  color: themeConfig.colors.primary,
                  textShadow: `0 1px 1px ${themeConfig.colors.primary}20`,
                }}
              >
                {session ? "Go to Dashboard" : "Login Now"}
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Additional Functions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mt-4 lg:mt-6">
            <button
              onClick={() => router.push("/student/history")}
              className="p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${themeConfig.colors.success}20` }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: themeConfig.colors.success }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 6v6l4 2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    fill="none"
                  />
                </svg>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Request History
              </h4>
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Track your submitted requests
              </p>
            </button>

            <button
              onClick={() => router.push("/admin/reports")}
              className="p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${themeConfig.colors.warning}20` }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: themeConfig.colors.warning }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 11V6a3 3 0 116 0v5m-6 0h6m-6 0v5a3 3 0 006 0v-5"
                  />
                </svg>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Reports
              </h4>
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Analytics and insights
              </p>
            </button>

            <button
              onClick={() => router.push("/settings")}
              className="p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: themeConfig.colors.surface,
                border: `1px solid ${themeConfig.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${themeConfig.colors.accent}20` }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: themeConfig.colors.accent }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    fill="none"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                  />
                </svg>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Settings
              </h4>
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Customize your experience
              </p>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-8 border-t"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p
            className="text-sm"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            © 2026 IVF Maintenance Utility. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
