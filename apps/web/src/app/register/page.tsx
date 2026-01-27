"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";

export default function RegisterPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER" as "USER" | "ADMIN",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const checkResponse = await fetch("/api/auth/check-user-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const checkData = await checkResponse.json();

      if (checkData.exists) {
        const userRole = checkData.role;
        if (userRole === "ADMIN") {
          setError("Admin already has an account. Please sign in instead.");
        } else {
          setError("User already has an account. Please sign in instead.");
        }
        return;
      }

      // Create new user
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.error || "Registration failed");
      }

      setSuccess("Account created successfully! Redirecting to login...");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

      {/* Registration Form */}
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: themeConfig.colors.text }}
          >
            Create Account
          </h1>
          <p style={{ color: themeConfig.colors.textSecondary }}>
            Join the maintenance portal
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div
            className="mb-6 p-4 rounded-xl text-center"
            style={{
              backgroundColor: `${themeConfig.colors.primary}10`,
              border: `1px solid ${themeConfig.colors.primary}30`,
              color: themeConfig.colors.primary,
            }}
          >
            {success}
          </div>
        )}

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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: themeConfig.colors.text }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
              style={{
                backgroundColor: themeConfig.colors.background,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
              }}
              placeholder="Enter your full name"
            />
          </div>

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
              Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
              style={{
                backgroundColor: themeConfig.colors.background,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
              }}
            >
              <option value="USER">User (Submit maintenance requests)</option>
              <option value="ADMIN">Admin (Manage requests)</option>
            </select>
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
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
              style={{
                backgroundColor: themeConfig.colors.background,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
              }}
              placeholder="Create a password (min 6 chars)"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: themeConfig.colors.text }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent"
              style={{
                backgroundColor: themeConfig.colors.background,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
              }}
              placeholder="Confirm your password"
            />
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            size="lg"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-sm transition-colors duration-200 hover:scale-105"
            style={{ color: themeConfig.colors.primary }}
          >
            Already have an account? Sign in →
          </button>
        </div>
      </div>
    </div>
  );
}
