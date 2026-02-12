"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Z_INDEX } from "@/lib/z-index";
import { useSessionDebug } from "@/hooks/useSessionDebug";
import {
  DEFAULT_CONFIG,
  clearSessionStorage,
  getUserDisplayName,
  getUserInitial,
  Icons,
} from "./utils";
import type { AccountDropdownConfig } from "./types";

// MenuItem type for internal use
interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  show: boolean;
}

interface AccountDropdownProps {
  /** Configuration object for customizing dropdown behavior */
  config?: AccountDropdownConfig;
}

export default function AccountDropdown({ config = {} }: AccountDropdownProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { themeConfig } = useTheme();
  const sessionDebug = useSessionDebug();

  // State - minimal and focused
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Merged configuration
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Log session issues in development
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      sessionDebug.isReady &&
      sessionDebug.issues.length > 0
    ) {
      console.warn("⚠️ AccountDropdown Session Issues:", sessionDebug.issues);
    }
  }, [sessionDebug]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener only when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Optimized logout handler
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    console.log("🚪 Starting logout process...");
    setIsOpen(false);
    setIsLoggingOut(true);

    try {
      // Clear storage first
      clearSessionStorage();

      // Sign out with explicit redirect: false
      const result = await signOut({
        redirect: false,
        callbackUrl: undefined,
      });
      console.log("✅ SignOut successful:", result);

      // Force immediate session invalidation
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Handle post-logout with minimal delay
      setTimeout(() => {
        if (finalConfig.redirectOnLogout) {
          console.log("🔄 Redirecting to login...");
          router.push("/login");
        } else {
          console.log("🏠 Staying on current page...");
          // Force multiple refresh attempts to ensure UI updates
          router.refresh();
          setTimeout(() => router.refresh(), 200);
          setTimeout(() => {
            console.log("🔄 Forcing page reload as last resort...");
            window.location.reload();
          }, 800);
        }

        // Reset loading state after a delay
        setTimeout(() => setIsLoggingOut(false), 100);

        // Custom callback
        finalConfig.onLogoutComplete?.();
      }, 200);
    } catch (error) {
      console.error("❌ Logout error:", error);
      setIsLoggingOut(false);

      // Fallback: force clear everything and reload
      clearSessionStorage();
      if (finalConfig.redirectOnLogout) {
        window.location.href = "/login";
      } else {
        window.location.reload();
      }
    }
  }, [finalConfig, router, isLoggingOut]);

  // Optimized navigation handler
  const handleNavigation = useCallback(
    (path: string) => {
      setIsOpen(false);
      router.push(path);
    },
    [router],
  );

  // Toggle dropdown with focus management
  const toggleDropdown = useCallback(() => {
    if (isLoggingOut) return;

    setIsOpen((prev) => !prev);

    // Focus management
    if (!isOpen) {
      setTimeout(() => {
        dropdownRef.current?.focus();
      }, 50);
    }
  }, [isOpen, isLoggingOut]);

  // Remove account handler
  const handleRemoveAccount = useCallback(async () => {
    if (isLoggingOut) return;

    const confirmed = confirm(
      "Are you sure you want to remove your account? This action cannot be undone.",
    );
    if (!confirmed) return;

    console.log("🗑️ Removing account...");
    setIsOpen(false);

    // In real app: Call API to delete account
    // For now: Just logout
    await handleLogout();
  }, [isLoggingOut, handleLogout]);

  // Loading state
  if (status === "loading") {
    return (
      <div
        className={`${finalConfig.avatarSize} rounded-full bg-gray-200 animate-pulse`}
      />
    );
  }

  // Not logged in state - clean Sign In button
  if (!session) {
    return (
      <button
        ref={buttonRef}
        onClick={() => handleNavigation("/login")}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 font-medium text-sm"
        style={{
          backgroundColor: themeConfig.colors.surface,
          color: themeConfig.colors.text,
          border: `1px solid ${themeConfig.colors.border}`,
        }}
      >
        <Icons.Login />
        <span>Sign In</span>
      </button>
    );
  }

  // Menu items configuration
  const menuItems: MenuItem[] = [
    {
      id: "settings",
      label: "Account Settings",
      description: "Manage your preferences",
      icon: <Icons.Settings />,
      action: () => handleNavigation("/settings"),
      show: finalConfig.showAccountSettings,
    },
    {
      id: "admin-dashboard",
      label: "Admin Dashboard",
      description: "Manage maintenance requests",
      icon: <Icons.AdminDashboard />,
      action: () => handleNavigation("/admin/dashboard"),
      show: finalConfig.showAdminDashboard && session.user?.role === "ADMIN",
    },
    {
      id: "user-portal",
      label: "Request Portal",
      description: "Submit maintenance requests",
      icon: <Icons.UserPortal />,
      action: () => handleNavigation("/student"),
      show: finalConfig.showUserPortal && session.user?.role !== "ADMIN",
    },
    {
      id: "switch-account",
      label: "Switch Account",
      description: "Change user account",
      icon: <Icons.SwitchAccount />,
      action: () => handleNavigation("/login"),
      show: finalConfig.showSwitchAccount,
    },
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        disabled={isLoggingOut}
        className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500"
        style={{
          backgroundColor: themeConfig.colors.surface,
          color: themeConfig.colors.text,
          border: `1px solid ${themeConfig.colors.border}`,
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div
          className={`${finalConfig.avatarSize} rounded-full flex items-center justify-center text-white font-semibold transition-transform duration-200 ${isOpen ? "scale-110" : ""}`}
          style={{
            background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
          }}
        >
          {getUserInitial(session)}
        </div>

        {/* User Info */}
        <div className="text-left">
          <div
            className="text-sm font-medium"
            style={{ color: themeConfig.colors.text }}
          >
            {getUserDisplayName(session)}
          </div>
          <div
            className="text-xs"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            {session.user?.role || "User"}
            {finalConfig.showDebugInfo && (
              <span className="ml-2 opacity-50">({session.user?.email})</span>
            )}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${finalConfig.dropdownWidth} rounded-xl shadow-xl border ${finalConfig.dropdownMaxHeight} overflow-y-auto backdrop-blur-xl top-full mt-2 right-0`}
          style={{
            backgroundColor: `${themeConfig.colors.surface}CC`,
            borderColor: themeConfig.colors.border,
            zIndex: Z_INDEX.MAX,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transform: "translateY(0)",
            opacity: "1",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          tabIndex={-1}
        >
          <div className="p-2">
            {/* Menu Items */}
            {menuItems
              .filter((item) => item.show)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left focus:outline-none focus:ring-2 focus:ring-teal-500"
                  style={{ color: themeConfig.colors.text }}
                >
                  {item.icon}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}

            {/* Separator */}
            <div
              className="border-t my-1"
              style={{ borderColor: themeConfig.colors.border }}
            />

            {/* Remove Account */}
            {finalConfig.showRemoveAccount && (
              <button
                onClick={handleRemoveAccount}
                disabled={isLoggingOut}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
                style={{ color: themeConfig.colors.error }}
              >
                {isLoggingOut ? (
                  <>
                    <Icons.LoadingSpinner />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Removing...</div>
                      <div
                        className="text-xs"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Please wait
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Icons.RemoveAccount />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Remove Account</div>
                      <div
                        className="text-xs"
                        style={{ color: themeConfig.colors.textSecondary }}
                      >
                        Delete your account
                      </div>
                    </div>
                  </>
                )}
              </button>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ color: themeConfig.colors.text }}
            >
              {isLoggingOut ? (
                <>
                  <Icons.LoadingSpinner />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Signing out...</div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Please wait
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Icons.Logout />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Log Out</div>
                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Sign out of your account
                    </div>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
