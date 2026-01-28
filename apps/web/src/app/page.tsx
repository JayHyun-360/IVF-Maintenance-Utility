"use client";

// IVF Maintenance Utility - Mobile-Optimized Version
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { getMaintenanceStats } from "@/lib/data";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import { useSession } from "next-auth/react";
import AccountDropdown from "@/components/AccountDropdown";
import { MobileNavigationWrapper } from "@/components/MobileNavigation";
import MobileCard, { MobileCardGrid } from "@/components/MobileCard";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

export default function Home() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { data: session, status } = useSession();
  const { isMobile } = useMobileOptimizations();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
  });

  // Add click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close any open dropdowns when clicking outside
      const target = event.target as Element;
      if (!target.closest("[data-dropdown]")) {
        // This will be handled by individual dropdown components
        // but we ensure the event can bubble up properly
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
    <MobileNavigationWrapper>
      <div
        className="min-h-screen mobile-scroll"
        style={{
          backgroundColor: themeConfig.colors.background,
          color: themeConfig.colors.text,
          transition:
            "background-color 0.8s ease-in-out, color 0.8s ease-in-out",
        }}
      >
        {/* Header with Background Image - Desktop Only */}
        <header
          className="mobile-safe-padding-top px-4 py-8 text-center relative"
          style={{
            background:
              !isMobile && themeConfig.backgroundImage
                ? `url("${themeConfig.backgroundImage}")`
                : `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
            backgroundSize:
              !isMobile && themeConfig.backgroundImage ? "cover" : "auto",
            backgroundPosition:
              !isMobile && themeConfig.backgroundImage
                ? "center center"
                : "auto",
            backgroundRepeat:
              !isMobile && themeConfig.backgroundImage ? "no-repeat" : "auto",
            backgroundAttachment:
              !isMobile && themeConfig.backgroundImage ? "scroll" : "scroll",
            transition: "background-color 0.8s ease-in-out",
            minHeight:
              !isMobile && themeConfig.backgroundImage ? "50vh" : "auto",
            maxHeight:
              !isMobile && themeConfig.backgroundImage ? "50vh" : "none",
            height: !isMobile && themeConfig.backgroundImage ? "50vh" : "auto",
          }}
        >
          {/* Subtle overlay for text readability - Desktop Only */}
          {!isMobile && themeConfig.backgroundImage && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  themeConfig.name === "light"
                    ? "rgba(0, 0, 0, 0.15)"
                    : themeConfig.name === "standard"
                      ? "rgba(0, 0, 0, 0.1)" // Very subtle overlay for Nature theme
                      : "rgba(0, 0, 0, 0.25)",
                zIndex: 1,
                transition: "background 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: "none", // Prevent overlay from blocking clicks
              }}
            />
          )}

          {/* Desktop-specific background adjustments */}
          {!isMobile && themeConfig.backgroundImage && (
            <style jsx>{`
              @media (min-width: 1024px) {
                header {
                  background-size: cover !important;
                  background-position: center center !important;
                  background-repeat: no-repeat !important;
                  background-attachment: scroll !important;
                  min-height: 50vh !important;
                  max-height: 50vh !important;
                  height: 50vh !important;
                  padding-top: 20px !important;
                  overflow: hidden !important;
                }
              }
              @media (min-width: 1280px) {
                header {
                  background-size: cover !important;
                  background-position: center center !important;
                  background-repeat: no-repeat !important;
                  background-attachment: scroll !important;
                  min-height: 50vh !important;
                  max-height: 50vh !important;
                  height: 50vh !important;
                  padding-top: 20px !important;
                  overflow: hidden !important;
                }
              }
              @media (min-width: 1536px) {
                header {
                  background-size: cover !important;
                  background-position: center center !important;
                  background-repeat: no-repeat !important;
                  background-attachment: scroll !important;
                  min-height: 50vh !important;
                  max-height: 50vh !important;
                  height: 50vh !important;
                  padding-top: 20px !important;
                  overflow: hidden !important;
                }
              }
            `}</style>
          )}
          <div
            className="flex items-center justify-between mb-6"
            style={{ zIndex: Z_INDEX.MAX + 2, position: "relative" }}
            data-dropdown
          >
            <div>
              <AccountDropdown />
            </div>
            <div>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Professional Logo & Title */}
          <div
            className="flex flex-col items-center"
            style={{ zIndex: Z_INDEX.MAX, position: "relative" }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.accent} 0%, ${themeConfig.colors.primary} 100%)`,
                boxShadow: `0 8px 32px ${themeConfig.colors.primary}25`,
              }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{
                color:
                  !isMobile && themeConfig.backgroundImage
                    ? "#FFFFFF"
                    : "#FFFFFF",
                textShadow:
                  !isMobile && themeConfig.backgroundImage
                    ? "0 2px 4px rgba(0, 0, 0, 0.5)"
                    : "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              IVF Maintenance
            </h1>
            <p
              className="text-sm opacity-90"
              style={{
                color:
                  !isMobile && themeConfig.backgroundImage
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.9)",
              }}
            >
              Professional Maintenance Management
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main
          className="px-4 py-6 mobile-scroll"
          style={{ zIndex: Z_INDEX.BASE, position: "relative" }}
        >
          <div className={`${isMobile ? "max-w-4xl" : "max-w-6xl"} mx-auto`}>
            {/* Professional Stats Section */}
            <div className="mb-8">
              <h2
                className={`${isMobile ? "text-lg" : "text-2xl"} font-semibold mb-4`}
                style={{ color: themeConfig.colors.text }}
              >
                Overview
              </h2>

              {/* Desktop: Use regular grid, Mobile: Use MobileCardGrid */}
              {!isMobile ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div
                    className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `1px solid ${themeConfig.colors.border}`,
                      boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {stats.totalRequests}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Total Requests
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `1px solid ${themeConfig.colors.warning}30`,
                      boxShadow: `0 4px 12px ${themeConfig.colors.warning}10`,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {stats.pendingRequests}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Pending
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `1px solid ${themeConfig.colors.border}`,
                      boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {stats.inProgressRequests}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      In Progress
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `1px solid ${themeConfig.colors.success}30`,
                      boxShadow: `0 4px 12px ${themeConfig.colors.success}10`,
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      {stats.completedRequests}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Completed
                    </div>
                  </div>
                </div>
              ) : (
                <MobileCardGrid columns={2} className="mb-6">
                  <MobileCard variant="compact">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {stats.totalRequests}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Total Requests
                      </div>
                    </div>
                  </MobileCard>

                  <MobileCard variant="compact" status="warning">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {stats.pendingRequests}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Pending
                      </div>
                    </div>
                  </MobileCard>

                  <MobileCard variant="compact" status="default">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {stats.inProgressRequests}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        In Progress
                      </div>
                    </div>
                  </MobileCard>

                  <MobileCard variant="compact" status="success">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {stats.completedRequests}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Completed
                      </div>
                    </div>
                  </MobileCard>
                </MobileCardGrid>
              )}
            </div>

            {/* Professional Actions Section */}
            <div className="mb-8">
              <h2
                className={`${isMobile ? "text-lg" : "text-2xl"} font-semibold mb-4`}
                style={{ color: themeConfig.colors.text }}
              >
                Quick Actions
              </h2>

              {/* Desktop: Use regular card, Mobile: Use MobileCard */}
              {!isMobile ? (
                <div
                  className="p-8 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                    border: `1px solid ${themeConfig.colors.border}`,
                    boxShadow: `0 6px 16px ${themeConfig.colors.primary}10`,
                  }}
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
                >
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                        boxShadow: `0 4px 12px ${themeConfig.colors.primary}20`,
                      }}
                    >
                      <svg
                        className="w-8 h-8 text-white"
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
                    <div className="flex-1">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {session
                          ? session.user?.role === "ADMIN"
                            ? "Admin Dashboard"
                            : "Request Portal"
                          : "Get Started"}
                      </h3>
                      <p
                        className="text-base"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        {session
                          ? "Manage maintenance requests and operations"
                          : "Sign in to access the maintenance system"}
                      </p>
                    </div>
                    <svg
                      className="w-6 h-6 flex-shrink-0"
                      style={{ color: themeConfig.colors.primary }}
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
                </div>
              ) : (
                <MobileCard
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
                  className="mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                      }}
                    >
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: themeConfig.colors.text }}
                      >
                        {session
                          ? session.user?.role === "ADMIN"
                            ? "Admin Dashboard"
                            : "Request Portal"
                          : "Get Started"}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        {session
                          ? "Manage maintenance requests and operations"
                          : "Sign in to access the maintenance system"}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: themeConfig.colors.primary }}
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
                </MobileCard>
              )}
            </div>

            {/* Professional Services Section */}
            <div>
              <h2
                className={`${isMobile ? "text-lg" : "text-2xl"} font-semibold mb-4`}
                style={{ color: themeConfig.colors.text }}
              >
                Services
              </h2>

              {/* Desktop: Use regular grid, Mobile: Use MobileCardGrid */}
              {!isMobile ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `1px solid ${themeConfig.colors.border}`,
                      boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`,
                    }}
                    onClick={() => router.push("/student/history")}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${themeConfig.colors.success}20`,
                        }}
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
                            strokeWidth={2}
                            d="M12 6v6l4 2"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-semibold text-base mb-1"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Request History
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          View and track your maintenance requests
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `1px solid ${themeConfig.colors.border}`,
                      boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`,
                    }}
                    onClick={() => router.push("/admin/reports")}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${themeConfig.colors.warning}20`,
                        }}
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
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-semibold text-base mb-1"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Reports & Analytics
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Comprehensive insights and reporting
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `1px solid ${themeConfig.colors.border}`,
                      boxShadow: `0 4px 12px ${themeConfig.colors.primary}10`,
                    }}
                    onClick={() => router.push("/settings")}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${themeConfig.colors.accent}20`,
                        }}
                      >
                        <svg
                          className="w-6 h-6"
                          style={{ color: themeConfig.colors.accent }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-semibold text-base mb-1"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Settings
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Manage your account and preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <MobileCardGrid columns={1} className="gap-3">
                  <MobileCard
                    onClick={() => router.push("/student/history")}
                    variant="compact"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${themeConfig.colors.success}20`,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: themeConfig.colors.success }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6l4 2"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-medium text-sm"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Request History
                        </h4>
                        <p
                          className="text-xs"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          View and track your maintenance requests
                        </p>
                      </div>
                    </div>
                  </MobileCard>

                  <MobileCard
                    onClick={() => router.push("/admin/reports")}
                    variant="compact"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${themeConfig.colors.warning}20`,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: themeConfig.colors.warning }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-medium text-sm"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Reports & Analytics
                        </h4>
                        <p
                          className="text-xs"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Comprehensive insights and reporting
                        </p>
                      </div>
                    </div>
                  </MobileCard>

                  <MobileCard
                    onClick={() => router.push("/settings")}
                    variant="compact"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${themeConfig.colors.accent}20`,
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: themeConfig.colors.accent }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-medium text-sm"
                          style={{ color: themeConfig.colors.text }}
                        >
                          Settings
                        </h4>
                        <p
                          className="text-xs"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          Manage your account and preferences
                        </p>
                      </div>
                    </div>
                  </MobileCard>
                </MobileCardGrid>
              )}
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
              2026 IVF Maintenance. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </MobileNavigationWrapper>
  );
}
