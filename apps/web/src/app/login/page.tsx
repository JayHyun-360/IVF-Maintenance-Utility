"use client";

// Login page component - Enhanced UI with Demo Accounts

import { useState, useEffect } from "react";
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
    gradient: "from-indigo-500 to-purple-600",
    color: "#6366f1",
  },
  {
    role: "User",
    email: "user@test.com",
    password: "user12345",
    description: "Submit maintenance requests",
    icon: "👤",
    gradient: "from-emerald-500 to-teal-600",
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
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {/* Primary Gradient Orb */}
        <div
          className="absolute -top-32 -right-32 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-25 animate-pulse"
          style={{
            backgroundColor: themeConfig.colors.primary,
            animationDuration: "4s",
          }}
        />
        {/* Secondary Gradient Orb */}
        <div
          className="absolute -bottom-32 -left-32 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full blur-3xl opacity-20"
          style={{
            backgroundColor: themeConfig.colors.secondary,
            animation: "pulse 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        {/* Floating accent orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl opacity-15"
          style={{
            backgroundColor: themeConfig.colors.accent,
            animation: "pulse 6s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${themeConfig.colors.text} 1px, transparent 1px), linear-gradient(90deg, ${themeConfig.colors.text} 1px, transparent 1px)`,
            backgroundSize: isMobile ? "30px 30px" : "50px 50px",
          }}
        />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 0%, ${themeConfig.colors.background}80 100%)`,
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
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          {/* Login Card */}
          <div
            className="rounded-3xl overflow-hidden backdrop-blur-xl"
            style={{
              background: `linear-gradient(145deg, ${themeConfig.colors.surface}f8 0%, ${themeConfig.colors.surface}e8 50%, ${themeConfig.colors.background}f5 100%)`,
              border: `1px solid ${themeConfig.colors.border}80`,
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px ${themeConfig.colors.border}20,
                inset 0 1px 0 ${themeConfig.colors.surface}60
              `,
            }}
          >
            {/* Color accent bar */}
            <div
              className="h-1"
              style={{
                background: `linear-gradient(90deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary}, ${themeConfig.colors.accent})`,
              }}
            />

            {/* Header Section */}
            <div
              className={`${isMobile ? "px-6 py-6" : "px-8 py-8"} text-center`}
              style={{
                background: `linear-gradient(180deg, ${themeConfig.colors.primary}08 0%, transparent 100%)`,
              }}
            >
              {/* Logo with glow */}
              <div className="relative inline-block mb-5">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                    transform: "scale(1.3)",
                  }}
                />
                <div
                  className={`relative ${isMobile ? "w-16 h-16" : "w-20 h-20"} rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500`}
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                  }}
                >
                  <svg
                    className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} text-white`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${isMobile ? "text-xl" : "text-2xl"} font-bold mb-2 tracking-tight`}
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
            <div className={`${isMobile ? "px-6 py-4" : "px-8 py-6"}`}>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${
                      focusedField === "email" || email
                        ? "-top-2.5 text-xs px-1 bg-inherit"
                        : "top-3.5 text-sm"
                    }`}
                    style={{
                      color:
                        focusedField === "email"
                          ? themeConfig.colors.primary
                          : themeConfig.colors.textSecondary,
                      backgroundColor:
                        focusedField === "email" || email
                          ? themeConfig.colors.surface
                          : "transparent",
                    }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        style={{
                          color:
                            focusedField === "email"
                              ? themeConfig.colors.primary
                              : themeConfig.colors.textSecondary,
                        }}
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
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none text-base"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor:
                          focusedField === "email"
                            ? themeConfig.colors.primary
                            : themeConfig.colors.border,
                        color: themeConfig.colors.text,
                        boxShadow:
                          focusedField === "email"
                            ? `0 0 0 3px ${themeConfig.colors.primary}20`
                            : "none",
                      }}
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${
                      focusedField === "password" || password
                        ? "-top-2.5 text-xs px-1 bg-inherit"
                        : "top-3.5 text-sm"
                    }`}
                    style={{
                      color:
                        focusedField === "password"
                          ? themeConfig.colors.primary
                          : themeConfig.colors.textSecondary,
                      backgroundColor:
                        focusedField === "password" || password
                          ? themeConfig.colors.surface
                          : "transparent",
                    }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        style={{
                          color:
                            focusedField === "password"
                              ? themeConfig.colors.primary
                              : themeConfig.colors.textSecondary,
                        }}
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
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-10 pr-12 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none text-base"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor:
                          focusedField === "password"
                            ? themeConfig.colors.primary
                            : themeConfig.colors.border,
                        color: themeConfig.colors.text,
                        boxShadow:
                          focusedField === "password"
                            ? `0 0 0 3px ${themeConfig.colors.primary}20`
                            : "none",
                      }}
                      placeholder=""
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 hover:opacity-70"
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
                      backgroundColor: `${themeConfig.colors.error}12`,
                      color: themeConfig.colors.error,
                      border: `1px solid ${themeConfig.colors.error}25`,
                      animation: "shake 0.5s ease-in-out",
                    }}
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
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
                  className="w-full py-4 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-base"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                    boxShadow: `0 8px 20px ${themeConfig.colors.primary}35`,
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
                        className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
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
              className={`${isMobile ? "px-6 py-5" : "px-8 py-6"}`}
              style={{
                background: `linear-gradient(180deg, ${themeConfig.colors.background}40 0%, ${themeConfig.colors.background}80 100%)`,
                borderTop: `1px solid ${themeConfig.colors.border}40`,
              }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${themeConfig.colors.success}15` }}
                >
                  <svg
                    className="w-4 h-4"
                    style={{ color: themeConfig.colors.success }}
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
                <div className="flex-1">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Quick Access
                  </span>
                  <span
                    className="block text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Tap to auto-fill demo credentials
                  </span>
                </div>
              </div>

              {/* Demo Account Cards */}
              <div
                className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-3`}
              >
                {DEMO_ACCOUNTS.map((account, index) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() =>
                      fillDemoCredentials(account.email, account.password)
                    }
                    className="group relative p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                    style={{
                      background: `linear-gradient(145deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
                      border: `2px solid ${
                        email === account.email
                          ? account.color
                          : themeConfig.colors.border
                      }`,
                      boxShadow:
                        email === account.email
                          ? `0 8px 25px ${account.color}25, 0 0 0 1px ${account.color}30`
                          : `0 2px 8px rgba(0,0,0,0.04)`,
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${account.color}08 0%, ${account.color}04 100%)`,
                      }}
                    />

                    <div className="relative flex items-center gap-3">
                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${account.color}20 0%, ${account.color}10 100%)`,
                        }}
                      >
                        {account.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="font-bold text-sm"
                            style={{ color: themeConfig.colors.text }}
                          >
                            {account.role}
                          </span>
                          {email === account.email && (
                            <svg
                              className="w-4 h-4"
                              style={{ color: account.color }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <p
                          className="text-xs truncate"
                          style={{ color: themeConfig.colors.textSecondary }}
                        >
                          {account.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1"
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
              className={`${isMobile ? "px-6 py-4" : "px-8 py-5"} text-center`}
              style={{ borderTop: `1px solid ${themeConfig.colors.border}30` }}
            >
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Need an account?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="font-semibold transition-all duration-200 hover:underline"
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
      `}</style>
    </div>
  );
}
