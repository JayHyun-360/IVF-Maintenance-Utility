"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

function RoleSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);
    };
    checkSession();
  }, [router]);

  const handleRoleSelection = async (role: "admin" | "user") => {
    if (!user) return;

    setSelectedRole(role);
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/check-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "User not found") {
          setError("User not found in system. Please register first.");
          return;
        }
        throw new Error(data.error || "Failed to verify role");
      }

      const userRole = data.role;

      if (role === "admin" && userRole !== "ADMIN") {
        setError(
          "You are not authorized to access as Admin. Your role is User.",
        );
        return;
      }

      if (role === "user" && userRole === "ADMIN") {
        setError("You are registered as an Admin. Please sign in as Admin.");
        return;
      }

      if (role === "admin") {
        router.push("/admin-pin-verification");
      } else {
        router.push("/student");
      }
    } catch (error) {
      setError("Failed to verify role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center animate-pulse"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.primary}40 0%, ${themeConfig.colors.secondary}40 100%)`,
            }}
          >
            <div
              className="w-8 h-8 border-3 border-current border-t-transparent rounded-full animate-spin"
              style={{
                borderColor: themeConfig.colors.primary,
                borderTopColor: "transparent",
              }}
            />
          </div>
          <p
            className="text-lg font-medium"
            style={{ color: themeConfig.colors.text }}
          >
            Loading your profile...
          </p>
          <p
            className="text-sm mt-2"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary floating orb */}
        <div
          className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            backgroundColor: themeConfig.colors.primary,
            top: "-10%",
            right: "-10%",
            animationDuration: "4s",
          }}
        />
        {/* Secondary floating orb */}
        <div
          className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl opacity-15"
          style={{
            backgroundColor: themeConfig.colors.secondary,
            bottom: "-5%",
            left: "-10%",
            animation: "pulse 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        {/* Accent floating orb */}
        <div
          className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl opacity-10"
          style={{
            backgroundColor: themeConfig.colors.accent,
            top: "40%",
            left: "30%",
            animation: "pulse 6s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${themeConfig.colors.text} 1px, transparent 1px), linear-gradient(90deg, ${themeConfig.colors.text} 1px, transparent 1px)`,
            backgroundSize: isMobile ? "30px 30px" : "50px 50px",
          }}
        />
      </div>

      {/* Theme Switcher */}
      <div
        className={`fixed ${isMobile ? "top-4 right-4" : "top-6 right-6"}`}
        style={{ zIndex: Z_INDEX.DROPDOWN }}
      >
        <ThemeSwitcher />
      </div>

      {/* Role Selection Card */}
      <div
        className={`w-full ${isMobile ? "max-w-sm" : "max-w-2xl"} relative z-10 rounded-3xl ${isMobile ? "p-6" : "p-10"} backdrop-blur-xl`}
        style={{
          background: `linear-gradient(145deg, ${themeConfig.colors.surface}f5 0%, ${themeConfig.colors.surface}e0 50%, ${themeConfig.colors.background}f0 100%)`,
          border: `1px solid ${themeConfig.colors.border}80`,
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px ${themeConfig.colors.border}20,
            inset 0 1px 0 ${themeConfig.colors.surface}80
          `,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* Decorative top gradient line */}
        <div
          className="absolute top-0 left-8 right-8 h-1 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary}, ${themeConfig.colors.accent})`,
          }}
        />

        {/* User Info */}
        <div className="text-center mb-8">
          {/* Avatar with glow effect */}
          <div className="relative inline-block mb-6">
            <div
              className="absolute inset-0 rounded-3xl blur-xl opacity-50"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                transform: "scale(1.2)",
              }}
            />
            <div
              className={`relative ${isMobile ? "w-16 h-16" : "w-24 h-24"} rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500`}
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
              }}
            >
              <svg
                className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} text-white`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <h1
            className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold mb-3 tracking-tight`}
            style={{ color: themeConfig.colors.text }}
          >
            Welcome back!
          </h1>
          <p
            className={`${isMobile ? "text-base" : "text-lg"} font-medium mb-1`}
            style={{ color: themeConfig.colors.text }}
          >
            {user.name || user.email}
          </p>
          <p
            className="text-sm"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            Select your role to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={`mb-6 ${isMobile ? "p-3" : "p-4"} rounded-xl text-center flex items-center justify-center gap-2`}
            style={{
              backgroundColor: `${themeConfig.colors.error}15`,
              border: `1px solid ${themeConfig.colors.error}30`,
              color: themeConfig.colors.error,
              animation: "shake 0.5s ease-in-out",
            }}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className={isMobile ? "text-sm" : "text-base"}>{error}</span>
          </div>
        )}

        {/* Role Selection Options */}
        <div
          className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-6"} mb-8`}
        >
          {/* Admin Option */}
          <button
            onClick={() => handleRoleSelection("admin")}
            disabled={isLoading}
            className={`group relative ${isMobile ? "p-5" : "p-8"} rounded-2xl text-center transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden`}
            style={{
              background:
                selectedRole === "admin"
                  ? `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`
                  : `linear-gradient(145deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
              border: `2px solid ${selectedRole === "admin" ? themeConfig.colors.primary : themeConfig.colors.border}`,
              boxShadow:
                selectedRole === "admin"
                  ? `0 20px 40px ${themeConfig.colors.primary}30`
                  : `0 4px 15px rgba(0, 0, 0, 0.05)`,
            }}
          >
            {/* Hover glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primary}15 0%, ${themeConfig.colors.secondary}15 100%)`,
              }}
            />

            {/* Loading spinner */}
            {isLoading && selectedRole === "admin" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`${isMobile ? "w-14 h-14 mb-3" : "w-16 h-16 mb-4"} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                style={{
                  background:
                    selectedRole === "admin"
                      ? "rgba(255,255,255,0.2)"
                      : `linear-gradient(135deg, ${themeConfig.colors.primary}20 0%, ${themeConfig.colors.secondary}20 100%)`,
                }}
              >
                <svg
                  className={`${isMobile ? "w-7 h-7" : "w-8 h-8"}`}
                  style={{
                    color:
                      selectedRole === "admin"
                        ? "#FFFFFF"
                        : themeConfig.colors.primary,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span
                className={`${isMobile ? "text-base" : "text-lg"} font-bold mb-1`}
                style={{
                  color:
                    selectedRole === "admin"
                      ? "#FFFFFF"
                      : themeConfig.colors.text,
                }}
              >
                Administrator
              </span>
              <span
                className={`${isMobile ? "text-xs" : "text-sm"}`}
                style={{
                  color:
                    selectedRole === "admin"
                      ? "rgba(255,255,255,0.8)"
                      : themeConfig.colors.textSecondary,
                }}
              >
                Manage system & requests
              </span>
            </div>
          </button>

          {/* User Option */}
          <button
            onClick={() => handleRoleSelection("user")}
            disabled={isLoading}
            className={`group relative ${isMobile ? "p-5" : "p-8"} rounded-2xl text-center transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden`}
            style={{
              background:
                selectedRole === "user"
                  ? `linear-gradient(135deg, ${themeConfig.colors.success} 0%, ${themeConfig.colors.accent} 100%)`
                  : `linear-gradient(145deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
              border: `2px solid ${selectedRole === "user" ? themeConfig.colors.success : themeConfig.colors.border}`,
              boxShadow:
                selectedRole === "user"
                  ? `0 20px 40px ${themeConfig.colors.success}30`
                  : `0 4px 15px rgba(0, 0, 0, 0.05)`,
            }}
          >
            {/* Hover glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.success}15 0%, ${themeConfig.colors.accent}15 100%)`,
              }}
            />

            {/* Loading spinner */}
            {isLoading && selectedRole === "user" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`${isMobile ? "w-14 h-14 mb-3" : "w-16 h-16 mb-4"} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                style={{
                  background:
                    selectedRole === "user"
                      ? "rgba(255,255,255,0.2)"
                      : `linear-gradient(135deg, ${themeConfig.colors.success}20 0%, ${themeConfig.colors.accent}20 100%)`,
                }}
              >
                <svg
                  className={`${isMobile ? "w-7 h-7" : "w-8 h-8"}`}
                  style={{
                    color:
                      selectedRole === "user"
                        ? "#FFFFFF"
                        : themeConfig.colors.success,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span
                className={`${isMobile ? "text-base" : "text-lg"} font-bold mb-1`}
                style={{
                  color:
                    selectedRole === "user"
                      ? "#FFFFFF"
                      : themeConfig.colors.text,
                }}
              >
                User
              </span>
              <span
                className={`${isMobile ? "text-xs" : "text-sm"}`}
                style={{
                  color:
                    selectedRole === "user"
                      ? "rgba(255,255,255,0.8)"
                      : themeConfig.colors.textSecondary,
                }}
              >
                Submit maintenance requests
              </span>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: themeConfig.colors.border }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            or
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: themeConfig.colors.border }}
          />
        </div>

        {/* Sign Out */}
        <div className="text-center">
          <button
            onClick={handleSignOut}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-opacity-10"
            style={{
              color: themeConfig.colors.textSecondary,
              backgroundColor: "transparent",
            }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Not you? Sign out</span>
          </button>
        </div>
      </div>

      {/* Bottom branding */}
      <p
        className="absolute bottom-4 left-0 right-0 text-center text-xs"
        style={{ color: themeConfig.colors.textSecondary }}
      >
        © {new Date().getFullYear()} IVF Maintenance Utility
      </p>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

export default function RoleSelectionPage() {
  const { themeConfig } = useTheme();

  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#0F172A" }}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-white/80 text-lg font-medium">Loading...</p>
          </div>
        </div>
      }
    >
      <RoleSelectionContent />
    </Suspense>
  );
}
