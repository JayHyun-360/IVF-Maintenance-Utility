"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";

function RoleSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { themeConfig } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(
    null,
  );

  useEffect(() => {
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
      // Check if user exists in our system and get their actual role
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

      // Role-based access validation
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

      // If admin, redirect to PIN verification
      if (role === "admin") {
        router.push("/admin-pin-verification");
      } else {
        // If user, redirect directly to user page
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
          <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: themeConfig.colors.text }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: themeConfig.colors.primary }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: themeConfig.colors.secondary }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-10"
          style={{ backgroundColor: themeConfig.colors.accent }}
        />
      </div>

      {/* Theme Switcher */}
      <div
        className="absolute top-8 right-8"
        style={{ zIndex: Z_INDEX.DROPDOWN }}
      >
        <ThemeSwitcher />
      </div>

      {/* Role Selection Card */}
      <div
        className="w-full max-w-2xl relative z-10 rounded-2xl p-8"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
          border: `1px solid ${themeConfig.colors.border}`,
          boxShadow: `0 20px 40px ${themeConfig.colors.primary}20, 0 0 0 1px ${themeConfig.colors.border}20`,
        }}
      >
        {/* User Info */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform hover:scale-110 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
              boxShadow: `0 10px 30px ${themeConfig.colors.primary}30`,
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: themeConfig.colors.text }}
          >
            Welcome, {user.name || user.email}
          </h1>
          <p style={{ color: themeConfig.colors.textSecondary }}>
            Choose how you'd like to sign in
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-6 p-4 rounded-xl text-center"
            style={{
              backgroundColor: `${themeConfig.colors.error}10`,
              border: `1px solid ${themeConfig.colors.error}30`,
              color: themeConfig.colors.error,
            }}
          >
            {error}
          </div>
        )}

        {/* Role Selection Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Admin Option */}
          <Button
            onClick={() => handleRoleSelection("admin")}
            loading={isLoading && selectedRole === "admin"}
            disabled={isLoading}
            size="lg"
            className="p-8 flex flex-col items-center justify-center h-32"
          >
            <svg
              className="w-8 h-8 mb-3"
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
            <span className="text-lg font-semibold">Sign in as Admin</span>
            <span className="text-sm opacity-75 mt-1">Full system access</span>
          </Button>

          {/* User Option */}
          <Button
            onClick={() => handleRoleSelection("user")}
            loading={isLoading && selectedRole === "user"}
            disabled={isLoading}
            variant="secondary"
            size="lg"
            className="p-8 flex flex-col items-center justify-center h-32"
          >
            <svg
              className="w-8 h-8 mb-3"
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
            <span className="text-lg font-semibold">Sign in as User</span>
            <span className="text-sm opacity-75 mt-1">
              Submit maintenance requests
            </span>
          </Button>
        </div>

        {/* Sign Out */}
        <div className="text-center">
          <button
            onClick={handleSignOut}
            className="text-sm transition-colors duration-200 hover:scale-105"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            Not you? Sign out →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RoleSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RoleSelectionContent />
    </Suspense>
  );
}
