"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import WebHeader from "@/components/WebHeader";
import { WebForm, WebFormField, WebFormSection } from "@/components/WebForm";

export default function RegisterPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT" as "STUDENT" | "STAFF" | "TEACHER" | "OTHERS",
    otherRole: "", // For custom role when "Others" is selected
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setError("Failed to create account. Please try again.");
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
      {/* Background Decorative Elements - Conditional based on device */}
      {isMobile ? (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-8"
            style={{ backgroundColor: themeConfig.colors.primary }}
          />
          <div
            className="absolute bottom-10 right-10 w-40 h-40 rounded-full opacity-8"
            style={{ backgroundColor: themeConfig.colors.secondary }}
          />
          <div
            className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full opacity-8"
            style={{ backgroundColor: themeConfig.colors.accent }}
          />
        </div>
      ) : (
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
      )}

      {/* Theme Switcher - Conditional based on device */}
      {isMobile ? (
        <div
          className="fixed top-3 right-3 mobile-safe-padding-top"
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
        /* Mobile Registration Form */
        <div className="w-full max-w-sm relative z-10 rounded-xl p-6">
          <div className="text-center mb-6">
            <div
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                boxShadow: `0 8px 24px ${themeConfig.colors.primary}25`,
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: themeConfig.colors.text }}
            >
              Create Account
            </h1>
            <p
              className="text-sm"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              Join the IVF Maintenance System
            </p>
          </div>

          <WebForm
            title="Register"
            subtitle="Fill in your details to create an account"
            onSubmit={handleSubmit}
            loading={isLoading}
            submitText="Create Account"
          >
            <WebFormField
              name="name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              required
            />
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
              placeholder="Create a password"
              required
            />
            <WebFormField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              required
            />
            <WebFormField
              name="role"
              label="Role"
              type="select"
              options={[
                { label: "Student", value: "STUDENT" },
                { label: "Staff", value: "STAFF" },
                { label: "Teacher", value: "TEACHER" },
                { label: "Other", value: "OTHERS" },
              ]}
              required
            />
          </WebForm>

          {/* Mobile Error/Success Display */}
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
          {success && (
            <div
              className="mt-4 p-3 rounded-lg text-sm text-center"
              style={{
                backgroundColor: `${themeConfig.colors.success}20`,
                color: themeConfig.colors.success,
                border: `1px solid ${themeConfig.colors.success}50`,
              }}
            >
              {success}
            </div>
          )}

          {/* Mobile Links */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/login")}
              className="text-sm"
              style={{ color: themeConfig.colors.primary }}
            >
              Already have an account? Sign in →
            </button>
          </div>
        </div>
      ) : (
        /* Desktop Registration Form - Improved Layout */
        <div
          className="w-full max-w-lg relative z-10 rounded-2xl p-8"
          style={{
            background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
            border: `1px solid ${themeConfig.colors.border}`,
            boxShadow: `0 25px 50px -12px ${themeConfig.colors.primary}25, 0 20px 25px -5px rgba(0, 0, 0, 0.1)`,
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
            <p
              className="text-lg"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              Join the IVF Maintenance System
            </p>
          </div>

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
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
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
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
                placeholder="Create a password"
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
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: themeConfig.colors.text }}
              >
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  backgroundColor: themeConfig.colors.background,
                  borderColor: themeConfig.colors.border,
                  color: themeConfig.colors.text,
                }}
              >
                <option value="STUDENT">Student</option>
                <option value="STAFF">Staff</option>
                <option value="TEACHER">Teacher</option>
                <option value="OTHERS">Other</option>
              </select>
            </div>

            {error && (
              <div
                className="p-4 rounded-lg text-sm text-red-600"
                style={{
                  backgroundColor: `${themeConfig.colors.error}10`,
                  border: `1px solid ${themeConfig.colors.error}30`,
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="p-4 rounded-lg text-sm text-green-600"
                style={{
                  backgroundColor: `${themeConfig.colors.success}10`,
                  border: `1px solid ${themeConfig.colors.success}30`,
                }}
              >
                {success}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                style={{
                  backgroundColor: themeConfig.colors.primary,
                  borderColor: themeConfig.colors.primary,
                }}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <div className="text-center">
              <p
                className="text-sm text-gray-600"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  style={{ color: themeConfig.colors.primary }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
