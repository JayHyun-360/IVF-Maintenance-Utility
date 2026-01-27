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
        // Check user role and redirect accordingly
        const session = await getSession();
        if (session?.user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/student");
        }
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

        {/* Demo Accounts Info */}
        <div
          className="mt-8 p-4 rounded-xl"
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
