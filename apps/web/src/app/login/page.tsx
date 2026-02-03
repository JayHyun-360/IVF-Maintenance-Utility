"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";
import { WebForm, WebFormField, WebFormSection } from "@/components/WebForm";

export default function LoginPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError("");
    try {
      // Check if Google OAuth is properly configured
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        setError(
          "Google OAuth is not configured. Please use email/password login.",
        );
        return;
      }

      await signIn("google", {
        callbackUrl: "/role-selection",
        redirect: true,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(
        "Google sign-in failed. Please try again or use email/password.",
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Successfully authenticated, redirect to role selection
        router.push("/role-selection");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="min-h-screen mobile-scroll"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Background Decorative Elements - Conditional based on device */}
      {isMobile ? (
        /* Mobile Background */
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-8 sm:top-10 md:top-12 lg:top-16 left-8 sm:left-10 md:left-12 lg:left-16 w-24 sm:w-32 md:w-40 lg:w-48 h-24 sm:h-32 md:h-40 lg:h-48 rounded-full opacity-5 sm:opacity-8 md:opacity-10"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 right-8 sm:right-10 md:right-12 lg:right-16 w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 rounded-full opacity-5 sm:opacity-8 md:opacity-10"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
          <div
            className="absolute top-1/3 sm:top-1/2 left-1/4 sm:left-1/3 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 rounded-full opacity-5 sm:opacity-8 md:opacity-10"
            style={{ backgroundColor: themeConfig.colors.accent }}
          />
        </div>
      ) : (
        /* Desktop Background - Original */
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-8 sm:top-10 md:top-12 lg:top-16 left-8 sm:left-10 md:left-12 lg:left-16 w-24 sm:w-32 md:w-40 lg:w-48 h-24 sm:h-32 md:h-40 lg:h-48 rounded-full opacity-5 sm:opacity-8 md:opacity-10"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 right-8 sm:right-10 md:right-12 lg:right-16 w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 rounded-full opacity-5 sm:opacity-8 md:opacity-10"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
          <div
            className="absolute top-1/3 sm:top-1/2 left-1/4 sm:left-1/3 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 rounded-full opacity-5 sm:opacity-8 md:opacity-10"
            style={{ backgroundColor: themeConfig.colors.accent }}
          />
        </div>
      )}

      {/* Theme Switcher - Conditional based on device */}
      {isMobile ? (
        <div
          className="fixed top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 mobile-safe-padding-top"
          style={{ zIndex: Z_INDEX.DROPDOWN }}
        >
          <ThemeSwitcher />
        </div>
      ) : (
        <div
          className="fixed top-4 right-4"
          style={{ zIndex: Z_INDEX.MAX, position: "relative" }}
        >
          <ThemeSwitcher />
        </div>
      )}

      {/* Main Content - Conditional based on device */}
      {isMobile ? (
        /* Mobile Login Form */
        <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 mobile-safe-padding">
          <div
            className="w-full max-w-sm sm:max-w-md relative z-10 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
              border: `1px solid ${themeConfig.colors.border}`,
              boxShadow: `0 12px 24px ${themeConfig.colors.primary}15, 0 0 0 1px ${themeConfig.colors.border}15`,
            }}
          >
            {/* Mobile Logo */}
            <div className="text-center mb-4 sm:mb-6">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-18 lg:w-18 lg:h-20 mx-auto rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg sm:shadow-xl md:shadow-2xl transform hover:scale-105 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                  boxShadow: `0 6px 16px ${themeConfig.colors.primary}25`,
                }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1
                className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                IVF Maintenance Utility
              </h1>
              <p
                className="text-sm sm:text-base"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Sign in to access the maintenance system
              </p>
            </div>

            {/* Mobile Form */}
            <WebForm
              title="Sign In"
              subtitle="Enter your credentials to continue"
              onSubmit={handleSubmit}
              loading={isLoading}
              submitText="Sign In"
            >
              <WebFormField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />
              <WebFormField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </WebForm>

            {/* Mobile Error Display */}
            {error && (
              <div
                className="mt-4 p-3 rounded-lg text-sm text-center"
                style={{
                  backgroundColor: `${themeConfig.colors.error}20`,
                  color: themeConfig.colors.error,
                  border: `1px solid ${themeConfig.colors.error}50`,
                }}
              >
                {error}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isGoogleLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          {/* Mobile-Optimized Create Account Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={() => router.push("/register")}
              className="text-xs sm:text-sm transition-colors duration-200 hover:scale-105"
              style={{ color: themeConfig.colors.primary }}
            >
              Don't have an account? Create one →
            </button>
          </div>

          {/* Mobile-Optimized Demo Accounts Info */}
          <div
            className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg sm:rounded-xl"
            style={{ backgroundColor: themeConfig.colors.background }}
          >
            <h3
              className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3"
              style={{ color: themeConfig.colors.text }}
            >
              Demo Accounts:
            </h3>
            <div className="space-y-1 sm:space-y-2 text-xs">
              <div style={{ color: themeConfig.colors.textSecondary }}>
                <strong>Admin:</strong> admin@test.com / admin12345
              </div>
              <div style={{ color: themeConfig.colors.textSecondary }}>
                <strong>User:</strong> user@test.com / user12345
              </div>
            </div>
            <div
              className="mt-2 sm:mt-3 text-xs"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              <strong>Note:</strong> Google sign-in requires OAuth
              configuration. Use demo accounts for testing.
            </div>
          </div>

          {/* Mobile-Optimized Back to Home */}
          <div className="mt-3 sm:mt-4 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-xs sm:text-sm transition-colors duration-200 hover:scale-105"
              style={{ color: themeConfig.colors.primary }}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
