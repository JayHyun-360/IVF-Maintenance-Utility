"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import BackButton from "@/components/BackButton";
import { Z_INDEX } from "@/lib/z-index";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { motion } from "framer-motion";

// Component to handle search params with Suspense
function SearchParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get dynamic origin and callback URL
  const getOrigin = useCallback(() => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <SearchParamsHandler>
        {(searchParams) => {
          const getCallbackUrl = useCallback(() => {
            const callbackParam = searchParams?.get("callbackUrl");
            if (callbackParam) {
              // Validate callback URL to prevent open redirects
              try {
                const url = new URL(callbackParam, getOrigin());
                if (url.origin === getOrigin()) {
                  return callbackParam;
                }
              } catch {
                // Invalid URL, ignore
              }
            }
            return null;
          }, [searchParams, getOrigin]);

          // Redirect logged-in users away from login page
          useEffect(() => {
            setMounted(true);

            if (status === "loading") return;

            if (session) {
              console.log(
                "User already logged in, redirecting based on role...",
              );

              // Use callback URL if valid and user is logged in
              const callbackUrl = getCallbackUrl();
              if (callbackUrl) {
                router.replace(callbackUrl);
                return;
              }

              // Default role-based redirects
              if (session.user?.role === "ADMIN") {
                router.replace("/admin/dashboard");
              } else if (session.user?.role === "STAFF") {
                router.replace("/staff");
              } else {
                router.replace("/student");
              }
              return;
            }
          }, [session, status, router, getCallbackUrl]);

          // Real authentication only - no demo accounts

          // Optimized form submission handler
          const handleSubmit = useCallback(
            async (e: React.FormEvent) => {
              e.preventDefault();

              if (!email || !password) {
                setError("Please enter both email and password");
                return;
              }

              setIsLoading(true);
              setError("");

              try {
                // Sign in without automatic redirect to handle it manually
                const result = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });

                if (result?.error) {
                  setError("Invalid email or password");
                  return;
                }

                if (result?.ok) {
                  console.log("Login successful, checking user role...");

                  // Brief delay to ensure session is updated
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  // Use callback URL if valid
                  const callbackUrl = getCallbackUrl();
                  if (callbackUrl) {
                    router.push(callbackUrl);
                    return;
                  }

                  // Default role-based redirects
                  if (session?.user?.role === "ADMIN") {
                    router.push("/admin/dashboard");
                  } else if (session?.user?.role === "STAFF") {
                    router.push("/staff");
                  } else if (session?.user?.role === "STUDENT") {
                    router.push("/student");
                  } else {
                    // Fallback - get fresh session data
                    try {
                      const response = await fetch("/api/auth/session");
                      const freshSession = await response.json();

                      if (freshSession?.user?.role === "ADMIN") {
                        router.push("/admin/dashboard");
                      } else if (freshSession?.user?.role === "STAFF") {
                        router.push("/staff");
                      } else {
                        router.push("/student");
                      }
                    } catch {
                      // Ultimate fallback
                      router.push("/dashboard");
                    }
                  }
                }
              } catch (err) {
                console.error("Login error:", err);
                setError("Login failed. Please try again.");
              } finally {
                setIsLoading(false);
              }
            },
            [email, password, session, getCallbackUrl, router],
          );

          // Show loading state only while checking session initially
          if (status === "loading" && !mounted) {
            return (
              <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading...</p>
                </div>
              </div>
            );
          }

          return (
            <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-4">
              <BackButton />
              <ThemeSwitcher />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <div
                  className="rounded-2xl p-8 shadow-2xl"
                  style={{
                    backgroundColor: themeConfig.colors.surface,
                    border: `1px solid ${themeConfig.colors.border}`,
                  }}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1
                      className="text-3xl font-bold mb-2"
                      style={{ color: themeConfig.colors.text }}
                    >
                      Welcome Back
                    </h1>
                    <p
                      className="text-sm"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Sign in to your IVF Maintenance account
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 rounded-lg text-sm text-center"
                      style={{
                        backgroundColor: `${themeConfig.colors.error}20`,
                        color: themeConfig.colors.error,
                        border: `1px solid ${themeConfig.colors.error}40`,
                      }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Login Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    autoComplete="on"
                  >
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
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        style={{
                          backdropFilter: "blur(10px)",
                        }}
                        placeholder="Enter your email"
                        disabled={isLoading}
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
                          autoComplete="current-password"
                          className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                          style={{
                            backdropFilter: "blur(10px)",
                          }}
                          placeholder="Enter your password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                          disabled={isLoading}
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
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29-3.29"
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7a1 1 0 11-1.842 0C18.268 7.943 14.478 5 10 5 5.523 5 1.732 7.943.418 12a1 1 0 101.842 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      style={{
                        backgroundColor: themeConfig.colors.primary,
                        color: themeConfig.colors.secondary,
                      }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>

                  {/* No demo accounts - removed for clean authentication */}
                </div>
              </motion.div>
            </div>
          );
        }}
      </SearchParamsHandler>
    </Suspense>
  );
}
