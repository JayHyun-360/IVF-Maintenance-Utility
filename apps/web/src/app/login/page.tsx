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
        <div className="fixed top-6 right-6" style={{ zIndex: 1000 }}>
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
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg sm:shadow-xl md:shadow-2xl transform hover:scale-105 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                  boxShadow: `0 6px 16px ${themeConfig.colors.primary}25`,
                }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
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
              </div>
            )}

            {/* Mobile Links */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/register")}
                className="text-sm"
                style={{ color: themeConfig.colors.primary }}
              >
                Don't have an account? Create one →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Login Form - Improved Layout */
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div
            className="w-full max-w-lg"
            style={{
              backgroundColor: themeConfig.colors.surface,
              border: `1px solid ${themeConfig.colors.border}`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)`,
              borderRadius: "1rem",
            }}
          >
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                  boxShadow: `0 4px 15px ${themeConfig.colors.primary}20`,
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <WebForm
              title="Sign In"
              subtitle="Access your maintenance dashboard"
              onSubmit={handleSubmit}
              loading={isLoading}
              submitText={isLoading ? "Signing in..." : "Sign in"}
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
                    style={{ accentColor: themeConfig.colors.primary }}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm hover:underline"
                  style={{ color: themeConfig.colors.primary }}
                >
                  Forgot password?
                </a>
              </div>
            </WebForm>
          </div>
        </div>
      )}
    </div>
  );
}
