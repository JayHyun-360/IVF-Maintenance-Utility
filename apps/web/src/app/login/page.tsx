"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";

export default function LoginPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
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
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Login Form */}
      <div
        className="w-full max-w-md relative z-10 rounded-2xl p-8"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
          border: `1px solid ${themeConfig.colors.border}`,
          boxShadow: `0 20px 40px ${themeConfig.colors.primary}20, 0 0 0 1px ${themeConfig.colors.border}20`,
        }}
      >
        {/* Logo/Icon */}
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: themeConfig.colors.text }}
          >
            Welcome Back
          </h1>
          <p style={{ color: themeConfig.colors.textSecondary }}>
            Sign in to access the maintenance portal
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: themeConfig.colors.text }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
              style={{
                backgroundColor: themeConfig.colors.background,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: themeConfig.colors.text }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
              style={{
                backgroundColor: themeConfig.colors.background,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
              }}
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            size="lg"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div
            className="absolute inset-0 flex items-center"
            style={{ borderColor: themeConfig.colors.border }}
          >
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className="px-4 bg-transparent"
              style={{
                backgroundColor: themeConfig.colors.surface,
                color: themeConfig.colors.textSecondary,
              }}
            >
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign-In */}
        <Button
          onClick={handleGoogleSignIn}
          loading={isGoogleLoading}
          disabled={isGoogleLoading}
          fullWidth
          size="md"
          variant="secondary"
          className="flex items-center justify-center gap-3 py-3"
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

        {/* Create Account Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/register")}
            className="text-sm transition-colors duration-200 hover:scale-105"
            style={{ color: themeConfig.colors.primary }}
          >
            Don't have an account? Create one →
          </button>
        </div>

        {/* Demo Accounts Info */}
        <div
          className="mt-6 p-4 rounded-xl"
          style={{ backgroundColor: themeConfig.colors.background }}
        >
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: themeConfig.colors.text }}
          >
            Demo Accounts:
          </h3>
          <div className="space-y-2 text-xs">
            <div style={{ color: themeConfig.colors.textSecondary }}>
              <strong>Admin:</strong> admin@test.com / admin12345
            </div>
            <div style={{ color: themeConfig.colors.textSecondary }}>
              <strong>User:</strong> user@test.com / user12345
            </div>
          </div>
          <div
            className="mt-3 text-xs"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            <strong>Note:</strong> Google sign-in requires OAuth configuration.
            Use demo accounts for testing.
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm transition-colors duration-200 hover:scale-105"
            style={{ color: themeConfig.colors.primary }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
