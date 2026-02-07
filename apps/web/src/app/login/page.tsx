"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

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

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(${themeConfig.colors.primary} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
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
            className="rounded-lg border bg-white shadow-sm"
            style={{
              borderColor: themeConfig.colors.border,
            }}
          >
            {/* Header Section */}
            <div
              className={`${isMobile ? "px-6 py-6" : "px-8 py-8"} text-center border-b`}
              style={{
                borderColor: themeConfig.colors.border,
              }}
            >
              {/* Logo */}
              <div className="inline-block mb-4">
                <div
                  className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} rounded-lg flex items-center justify-center`}
                  style={{
                    backgroundColor: themeConfig.colors.primary,
                  }}
                >
                  <svg
                    className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-white`}
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
                className={`${isMobile ? "text-lg" : "text-xl"} font-semibold mb-2`}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: themeConfig.colors.text }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-md border transition-colors duration-200 outline-none"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.text,
                    }}
                    placeholder="Enter your email"
                  />
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
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 pr-10 rounded-md border transition-colors duration-200 outline-none"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.text,
                      }}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div
                    className="p-3 rounded-md text-sm text-center"
                    style={{
                      backgroundColor: `${themeConfig.colors.error}10`,
                      color: themeConfig.colors.error,
                      border: `1px solid ${themeConfig.colors.error}30`,
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-md font-medium text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: themeConfig.colors.primary,
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div
              className={`${isMobile ? "px-6 py-4" : "px-8 py-5"} text-center border-t`}
              style={{ borderColor: themeConfig.colors.border }}
            >
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Need an account?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="font-semibold transition-colors duration-200 hover:underline"
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
            © {new Date().getFullYear()} IVF Maintenance Utility. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
