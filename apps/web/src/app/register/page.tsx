"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

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
    otherRole: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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

  const inputStyles = (fieldName: string) => ({
    backgroundColor: themeConfig.colors.background,
    borderColor:
      focusedField === fieldName
        ? themeConfig.colors.primary
        : themeConfig.colors.border,
    color: themeConfig.colors.text,
    boxShadow:
      focusedField === fieldName
        ? `0 0 0 3px ${themeConfig.colors.primary}20`
        : "none",
  });

  const labelStyles = (fieldName: string, value: string) => ({
    color:
      focusedField === fieldName
        ? themeConfig.colors.primary
        : themeConfig.colors.textSecondary,
    backgroundColor:
      focusedField === fieldName || value
        ? themeConfig.colors.surface
        : "transparent",
    transform:
      focusedField === fieldName || value
        ? "translateY(-1.4rem) scale(0.85)"
        : "translateY(0) scale(1)",
  });

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: themeConfig.colors.primary }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-72 h-72 md:w-[32rem] md:h-[32rem] rounded-full blur-3xl opacity-15"
          style={{
            backgroundColor: themeConfig.colors.secondary,
            animation: "pulse 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: themeConfig.colors.accent }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${themeConfig.colors.text} 1px, transparent 1px), linear-gradient(90deg, ${themeConfig.colors.text} 1px, transparent 1px)`,
            backgroundSize: isMobile ? "30px 30px" : "50px 50px",
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

      {/* Back Button */}
      <div
        className={`fixed ${isMobile ? "top-4 left-4" : "top-6 left-6"}`}
        style={{ zIndex: Z_INDEX.DROPDOWN }}
      >
        <BackButton fallback="/" />
      </div>

      {/* Main Content */}
      <div
        className={`w-full ${isMobile ? "max-w-sm px-4 py-8" : "max-w-xl px-6 py-12"} relative z-10 transition-all duration-700`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >
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
          {/* Accent bar */}
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary}, ${themeConfig.colors.accent})`,
            }}
          />

          <div className={`${isMobile ? "p-6" : "p-10"} space-y-8`}>
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="relative inline-block mb-4">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-40 scale-125"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                />
                <div
                  className="relative w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  }}
                >
                  <svg
                    className="w-8 h-8"
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
              </div>
              <h1
                className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold tracking-tight`}
                style={{ color: themeConfig.colors.text }}
              >
                Create Account
              </h1>
              <p
                className="text-sm"
                style={{ color: themeConfig.colors.textSecondary }}
              >
                Join the IVF Maintenance Utility
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6`}
              >
                {/* Full Name */}
                <div className="relative">
                  <label
                    className="absolute left-4 top-3.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                    style={labelStyles("name", formData.name)}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none"
                    style={inputStyles("name")}
                    placeholder=""
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    className="absolute left-4 top-3.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                    style={labelStyles("email", formData.email)}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none"
                    style={inputStyles("email")}
                    placeholder=""
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label
                    className="absolute left-4 top-3.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                    style={labelStyles("password", formData.password)}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none"
                    style={inputStyles("password")}
                    placeholder=""
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label
                    className="absolute left-4 top-3.5 transition-all duration-200 pointer-events-none text-sm z-10 px-1"
                    style={labelStyles(
                      "confirmPassword",
                      formData.confirmPassword,
                    )}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none"
                    style={inputStyles("confirmPassword")}
                    placeholder=""
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="relative">
                <label
                  className="block text-xs font-semibold mb-2 ml-1"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Account Role
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["STUDENT", "STAFF", "TEACHER", "OTHERS"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, role: role as any })
                      }
                      className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all duration-300 transform active:scale-95 ${formData.role === role ? "shadow-lg" : "hover:scale-[1.02]"}`}
                      style={{
                        backgroundColor:
                          formData.role === role
                            ? themeConfig.colors.primary
                            : themeConfig.colors.background,
                        borderColor:
                          formData.role === role
                            ? themeConfig.colors.primary
                            : themeConfig.colors.border,
                        color:
                          formData.role === role
                            ? "#fff"
                            : themeConfig.colors.text,
                        boxShadow:
                          formData.role === role
                            ? `0 8px 16px ${themeConfig.colors.primary}30`
                            : "none",
                      }}
                    >
                      {role.charAt(0) + role.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              {error && (
                <div
                  className="p-4 rounded-xl text-sm flex items-center gap-3 animate-shake"
                  style={{
                    backgroundColor: `${themeConfig.colors.error}15`,
                    color: themeConfig.colors.error,
                    border: `1px solid ${themeConfig.colors.error}30`,
                  }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
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
              {success && (
                <div
                  className="p-4 rounded-xl text-sm flex items-center gap-3 animate-pulse"
                  style={{
                    backgroundColor: `${themeConfig.colors.success}15`,
                    color: themeConfig.colors.success,
                    border: `1px solid ${themeConfig.colors.success}30`,
                  }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:transform-none shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
                  boxShadow: `0 12px 24px ${themeConfig.colors.primary}40`,
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
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
                    Creating Account...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </button>

              <div className="text-center pt-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="font-bold hover:underline transition-all duration-200 transform hover:scale-105"
                    style={{ color: themeConfig.colors.primary }}
                  >
                    Sign In here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Branding */}
        <p
          className="text-center text-xs mt-8 font-medium"
          style={{ color: themeConfig.colors.textSecondary }}
        >
          © {new Date().getFullYear()} IVF Maintenance Utility. Professional
          Maintenance Management.
        </p>
      </div>

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
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
