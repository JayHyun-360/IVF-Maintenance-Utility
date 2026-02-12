"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Redirect logged-in users away from login page
  useEffect(() => {
    setMounted(true);

    if (status === "loading") return;

    if (session) {
      console.log("User already logged in, redirecting based on role...");
      if (session.user?.role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else if (session.user?.role === "STAFF") {
        router.replace("/staff");
      } else {
        router.replace("/student");
      }
      return;
    }
  }, [session, status, router]);

  const handleAdminDemo = async () => {
    setEmail("admin@test.com");
    setPassword("admin123");

    // Auto-submit after a brief delay to show the filled fields
    setTimeout(async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await signIn("credentials", {
          email: "admin@test.com",
          password: "admin123",
          redirect: false,
        });

        if (result?.error) {
          setError("Admin demo login failed");
        } else if (result?.ok) {
          console.log("Admin demo login successful, redirecting...");
          router.push("/admin/dashboard");
        }
      } catch {
        setError("Admin demo login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleUserDemo = async () => {
    setEmail("user@test.com");
    setPassword("user123");

    // Auto-submit after a brief delay to show the filled fields
    setTimeout(async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await signIn("credentials", {
          email: "user@test.com",
          password: "user123",
          redirect: false,
        });

        if (result?.error) {
          setError("User demo login failed");
        } else if (result?.ok) {
          console.log("User demo login successful, redirecting...");
          router.push("/student");
        }
      } catch {
        setError("User demo login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Disable automatic redirect to handle it manually
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        // Successful login - redirect based on user role
        console.log("Login successful, checking user role...");

        // Get the session to determine user role
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session?.user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (session?.user?.role === "STAFF") {
          router.push("/staff");
        } else if (session?.user?.role === "STUDENT") {
          router.push("/student");
        } else {
          // Default fallback for unknown roles
          router.push("/dashboard");
        }
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state only while checking session initially
  if (status === "loading" && !mounted) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-100">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in and mounted, redirect immediately without showing loading
  if (session && mounted) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] relative overflow-hidden">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <g fill="none" fillRule="evenodd">
            <g stroke="#14b8a6" strokeWidth="0.5" opacity="0.3">
              <path d="M0 0h40v40H0z M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" />
            </g>
          </g>
        </svg>
      </div>

      {/* Teal Mesh Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 blur-3xl"></div>

      {/* Theme Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <BackButton fallback="/" />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphic Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-md mx-auto"
            style={{
              background: "rgba(255, 255, 255, 0.03) !important",
              backdropFilter: "blur(25px) !important",
              border: "1px solid rgba(255, 255, 255, 0.1) !important",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5) !important",
            }}
          >
            {/* Logo Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-teal-500/30 flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="text-left sm:text-center">
                <h1 className="text-xl sm:text-2xl font-sans font-bold text-gray-100 leading-tight">
                  IVF Maintenance
                  <span className="block text-teal-400">Utility</span>
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  School Facility Management System
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-100 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    style={{
                      backdropFilter: "blur(10px)",
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-100 mb-2"
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
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    style={{
                      backdropFilter: "blur(10px)",
                    }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? (
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-100 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-gray-900 font-semibold text-base hover:from-teal-400 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
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
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    Sign In
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </>
                )}
              </motion.button>

              {/* Demo Login Buttons */}
              <div className="space-y-3">
                <motion.button
                  type="button"
                  onClick={handleAdminDemo}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold text-base hover:from-red-400 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Admin Demo (admin@test.com)
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleUserDemo}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-base hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  User Demo (user@test.com)
                </motion.button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="text-center mt-6">
                <p className="text-sm text-gray-400">Don't have an account? </p>
                <motion.a
                  href="/register"
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  Register here
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
