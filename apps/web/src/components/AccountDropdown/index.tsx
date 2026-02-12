"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Z_INDEX } from "@/lib/z-index";
import {
  DEFAULT_CONFIG,
  clearSessionStorage,
  getUserDisplayName,
  getUserInitial,
  calculateDropdownPosition,
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

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(
    config.position || "bottom",
  );
  const [dropdownAlignment, setDropdownAlignment] = useState(
    config.alignment || "right",
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Merged configuration
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Debug effect
  useEffect(() => {
    if (session && finalConfig.showDebugInfo) {
      console.log("👤 AccountDropdown Session:", {
        user: session.user,
        name: session.user?.name,
        email: session.user?.email,
        role: session.user?.role,
      });
    }
  }, [session, finalConfig.showDebugInfo]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    console.log("🚪 Starting logout process...");
    setIsOpen(false);
    setIsLoggingOut(true);

    try {
      // Clear storage
      clearSessionStorage();

      // Sign out
      const result = await signOut({ redirect: false });
      console.log("✅ SignOut successful:", result);

      // Handle post-logout
      if (finalConfig.redirectOnLogout) {
        console.log("🔄 Redirecting to login...");
        setTimeout(() => router.push("/login"), 200);
      } else {
        console.log("🏠 Staying on current page...");
        setTimeout(() => {
          router.refresh();
          setTimeout(() => {
            console.log("🔄 Forcing page reload...");
            window.location.reload();
          }, 500);
        }, 100);
      }

      // Reset loading state
      setTimeout(() => setIsLoggingOut(false), 100);

      // Custom callback
      finalConfig.onLogoutComplete?.();
    } catch (error) {
      console.error("❌ Logout error:", error);
      setIsLoggingOut(false);

      if (finalConfig.redirectOnLogout) {
        window.location.href = "/login";
      }
    }
  }, [finalConfig, router, isLoggingOut]);

  // Navigation handlers
  const handleNavigation = useCallback(
    (path: string) => {
      setIsOpen(false);
      router.push(path);
    },
    [router],
  );

  const handleSwitchAccount = useCallback(() => {
    console.log("🔄 Switching account...");
    handleNavigation("/login");
  }, [handleNavigation]);

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

  // Dropdown position calculator
  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    const buttonRect = dropdownRef.current?.getBoundingClientRect();
    if (!buttonRect) return;

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const { position, alignment } = calculateDropdownPosition(
      buttonRect,
      viewport,
    );
    setDropdownPosition(position);
    setDropdownAlignment(alignment);
    setIsOpen(true);
  }, [isOpen]);

  // Loading state
  if (status === "loading") {
    return (
      <div
        className={`${finalConfig.avatarSize} rounded-full bg-gray-200 animate-pulse`}
      />
    );
  }

  // Not logged in state
  if (!session) {
    return (
      <button
        onClick={() => handleNavigation("/login")}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 font-medium"
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
      action: handleSwitchAccount,
      show: finalConfig.showSwitchAccount,
    },
  ];

  // Render
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        disabled={isLoggingOut}
        className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: themeConfig.colors.surface,
          color: themeConfig.colors.text,
          border: `1px solid ${themeConfig.colors.border}`,
        }}
      >
        {/* Avatar */}
        <div
          className={`${finalConfig.avatarSize} rounded-full flex items-center justify-center text-white font-semibold`}
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
          className={`absolute ${finalConfig.dropdownWidth} rounded-xl shadow-xl border ${finalConfig.dropdownMaxHeight} overflow-y-auto backdrop-blur-xl ${
            dropdownPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
          } ${dropdownAlignment === "left" ? "left-0" : "right-0"}`}
          style={{
            backgroundColor: `${themeConfig.colors.surface}CC`,
            borderColor: themeConfig.colors.border,
            zIndex: Z_INDEX.MAX,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="p-2">
            {/* Menu Items */}
            {menuItems
              .filter((item) => item.show)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left"
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
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left disabled:opacity-50 disabled:cursor-not-allowed"
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
