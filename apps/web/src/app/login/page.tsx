"use client";

// Login page component - Enhanced UI with Demo Accounts

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

// Demo accounts for testing
const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    email: "admin@test.com",
    password: "admin12345",
    description: "Full system access",
    icon: "🛡️",
    color: "#6366f1",
  },
  {
    role: "User",
    email: "user@test.com",
    password: "user12345",
    description: "Submit maintenance requests",
    icon: "👤",
    color: "#10b981",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/role-selection");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: themeConfig.colors.primary }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{
            backgroundColor: themeConfig.colors.secondary,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: themeConfig.colors.accent }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${themeConfig.colors.text} 1px, transparent 1px), linear-gradient(90deg, ${themeConfig.colors.text} 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
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

      {/* Main Content */}
      <div
        className={`min-h-screen flex items-center justify-center ${isMobile ? "px-4 py-8" : "px-6 py-12"}`}
      >
        <div
          className={`w-full ${isMobile ? "max-w-sm" : "max-w-md"} relative z-10`}
        >
          {/* Login Card */}
          <div
            className="rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
              background: `linear-gradient(145deg, ${themeConfig.colors.surface}f0 0%, ${themeConfig.colors.surface}e0 100%)`,
              border: `1px solid ${themeConfig.colors.border}`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px ${themeConfig.colors.border}30`,
            }}
          >
            {/* Header Section */}
            <div
              className="px-6 py-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primary}15 0%, ${themeConfig.colors.secondary}10 100%)`,
                borderBottom: `1px solid ${themeConfig.colors.border}50`,
              }}
            >
              {/* Logo */}
              <div
                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-5 shadow-2xl transform hover:scale-105 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                  boxShadow: `0 10px 40px ${themeConfig.colors.primary}40`,
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>

              <h1
                className="text-2xl font-bold mb-2 tracking-tight"
                style={{ color: themeConfig.colors.text }}
              >
                IVF Maintenance Utility
              </h1>
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Integrated Visual Feedback & Maintenance System
              </p>
            </div>

            {/* Form Section */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        style={{ color: themeConfig.colors.textSecondary }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-offset-1 focus:border-transparent outline-none"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        style={{ color: themeConfig.colors.textSecondary }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-offset-1 focus:border-transparent outline-none"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          style={{ color: themeConfig.colors.textSecondary }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          style={{ color: themeConfig.colors.textSecondary }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div
                    className="p-3 rounded-xl text-sm text-center flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: `${themeConfig.colors.error}15`,
                      color: themeConfig.colors.error,
                      border: `1px solid ${themeConfig.colors.error}30`,
                    }}
                  >
                    <svg
                      className="w-4 h-4"
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
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                    boxShadow: `0 4px 15px ${themeConfig.colors.primary}40`,
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Demo Accounts Section */}
            <div
              className="px-6 py-5"
              style={{
                background: `linear-gradient(180deg, ${themeConfig.colors.background}50 0%, ${themeConfig.colors.background}80 100%)`,
                borderTop: `1px solid ${themeConfig.colors.border}50`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    style={{ color: themeConfig.colors.primary }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: themeConfig.colors.text }}
                >
                  Demo Accounts
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${themeConfig.colors.success}20`,
                    color: themeConfig.colors.success,
                  }}
                >
                  Click to autofill
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() =>
                      fillDemoCredentials(account.email, account.password)
                    }
                    className="w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                    style={{
                      backgroundColor: themeConfig.colors.surface,
                      borderColor:
                        email === account.email
                          ? account.color
                          : themeConfig.colors.border,
                      boxShadow:
                        email === account.email
                          ? `0 0 0 3px ${account.color}20`
                          : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${account.color}15` }}
                      >
                        {account.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-semibold text-sm"
                            style={{ color: themeConfig.colors.text }}
                          >
                            {account.role}
                          </span>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${account.color}15`,
                              color: account.color,
                            }}
                          >
                            {account.description}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <code
                            className="text-xs truncate"
                            style={{ color: themeConfig.colors.textSecondary }}
                          >
                            {account.email}
                          </code>
                          <span
                            className="text-xs"
                            style={{ color: themeConfig.colors.textSecondary }}
                          >
                            •
                          </span>
                          <code
                            className="text-xs"
                            style={{ color: themeConfig.colors.textSecondary }}
                          >
                            {account.password}
                          </code>
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: account.color }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 text-center"
              style={{ borderTop: `1px solid ${themeConfig.colors.border}30` }}
            >
              <p
                className="text-xs"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Need an account?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="font-semibold hover:underline transition-colors"
                  style={{ color: themeConfig.colors.primary }}
                >
                  Register here
                </button>
              </p>
            </div>
          </div>

          {/* Bottom Branding */}
          <p
            className="text-center text-xs mt-6"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            © {new Date().getFullYear()} IVF Maintenance Utility. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
