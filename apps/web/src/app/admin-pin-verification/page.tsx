"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@/components/Button";
import { Z_INDEX } from "@/lib/z-index";

export default function AdminPinVerificationPage() {
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  // Demo admin PIN - in production, this should be stored securely
  const ADMIN_PIN = "1234";

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      setUser(session.user);
    };
    checkSession();
  }, [router]);

  // Show minimal loading only while checking session
  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p style={{ color: themeConfig.colors.text, fontSize: "14px" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (pin !== ADMIN_PIN) {
        setError("Invalid PIN. Please try again.");
        setPin("");
        return;
      }

      // PIN is correct, redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setPin(value);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {/* PIN Verification Card */}
      <div
        className="w-full max-w-md relative z-10 rounded-2xl p-8"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.colors.surface} 0%, ${themeConfig.colors.background} 100%)`,
          border: `1px solid ${themeConfig.colors.border}`,
          boxShadow: `0 20px 40px ${themeConfig.colors.primary}20, 0 0 0 1px ${themeConfig.colors.border}20`,
        }}
      >
        {/* Security Icon */}
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
            Admin Security Check
          </h1>
          <p style={{ color: themeConfig.colors.textSecondary }}>
            Enter your admin PIN to continue
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

        {/* PIN Input Form */}
        <form onSubmit={handlePinSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: themeConfig.colors.text }}
            >
              Admin PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              maxLength={4}
              required
              className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:scale-[1.02] focus:border-transparent text-center text-2xl tracking-widest"
              style={{
                backgroundColor: themeConfig.colors.background,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                border: "1px solid",
                letterSpacing: "0.5em",
              }}
              placeholder="****"
              inputMode="numeric"
              pattern="[0-9]{4}"
            />
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading || pin.length !== 4}
            fullWidth
            size="lg"
          >
            {isLoading ? "Verifying..." : "Verify PIN"}
          </Button>
        </form>

        {/* Demo PIN Info */}
        <div
          className="mt-6 p-4 rounded-xl text-center"
          style={{ backgroundColor: themeConfig.colors.background }}
        >
          <p
            className="text-xs font-medium"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            Demo PIN: 1234
          </p>
        </div>

        {/* Back to Role Selection */}
        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => router.push("/role-selection")}
            className="text-sm transition-colors duration-200 hover:scale-105 block"
            style={{ color: themeConfig.colors.primary }}
          >
            ← Back to role selection
          </button>
          <button
            onClick={handleSignOut}
            className="text-sm transition-colors duration-200 hover:scale-105 block"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            Not you? Sign out →
          </button>
        </div>
      </div>
    </div>
  );
}
