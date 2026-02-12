"use client";

import { useState, useRef, useEffect } from "react";

import { useSession, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useTheme } from "@/components/ThemeProvider";

import { Z_INDEX } from "@/lib/z-index";

/**

 * Configuration interface for AccountDropdown component

 * Allows customization of dropdown behavior and appearance

 */

interface AccountDropdownConfig {
  /** Show Account Settings button (default: true) */

  showAccountSettings?: boolean;

  /** Show Admin Dashboard button for ADMIN users (default: true) */

  showAdminDashboard?: boolean;

  /** Show User Portal button for non-ADMIN users (default: true) */

  showUserPortal?: boolean;

  /** Show Switch Account button (default: true) */

  showSwitchAccount?: boolean;

  /** Show Remove Account button (default: true) */

  showRemoveAccount?: boolean;

  /** Dropdown width using Tailwind classes (default: "w-48") */

  dropdownWidth?: string;

  /** Dropdown max height using Tailwind classes (default: "max-h-60") */

  dropdownMaxHeight?: string;

  /** Show debug information like email in dropdown (default: false) */

  showDebugInfo?: boolean;

  /** Avatar size using Tailwind classes (default: "w-8 h-8") */

  avatarSize?: string;

  /** Preferred dropdown position (default: "bottom") */

  position?: "bottom" | "top";

  /** Preferred dropdown alignment (default: "right") */

  alignment?: "left" | "right";

  /** Whether to redirect to login page after logout (default: true) */

  redirectOnLogout?: boolean;

  /** Custom logout callback function (optional) */

  onLogoutComplete?: () => void;
}

interface AccountDropdownProps {
  /** Configuration object for customizing dropdown behavior */

  config?: AccountDropdownConfig;
}

export default function AccountDropdown({
  config = {},
}: AccountDropdownProps = {}) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { themeConfig } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    config.position || "bottom",
  );

  const [dropdownAlignment, setDropdownAlignment] = useState<"left" | "right">(
    config.alignment || "right",
  );

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Default configuration values

  const dropdownConfig = {
    showAccountSettings: config.showAccountSettings ?? true,

    showAdminDashboard: config.showAdminDashboard ?? true,

    showUserPortal: config.showUserPortal ?? true,

    showSwitchAccount: config.showSwitchAccount ?? true,

    showRemoveAccount: config.showRemoveAccount ?? true,

    dropdownWidth: config.dropdownWidth ?? "w-48",

    dropdownMaxHeight: config.dropdownMaxHeight ?? "max-h-60",

    showDebugInfo: config.showDebugInfo ?? false,

    avatarSize: config.avatarSize ?? "w-8 h-8",

    redirectOnLogout: config.redirectOnLogout ?? true,
  };

  // Debug session data

  useEffect(() => {
    if (session) {
      console.log("AccountDropdown - Session data:", {
        user: session.user,

        name: session.user?.name,

        email: session.user?.email,

        role: session.user?.role,
      });
    }
  }, [session]);

  useEffect(() => {
    // Only run on client-side

    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

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

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple logout attempts

    console.log(
      "Logging out... redirectOnLogout:",

      dropdownConfig.redirectOnLogout,
    );

    setIsOpen(false); // Close dropdown immediately

    setIsLoggingOut(true); // Set loading state

    try {
      // Clear any potential session storage first

      if (typeof window !== "undefined") {
        console.log("Clearing session storage...");

        localStorage.removeItem("next-auth.session-token");

        sessionStorage.removeItem("next-auth.session-token");

        // Clear any additional auth-related storage

        localStorage.removeItem("next-auth.callback-url");

        sessionStorage.removeItem("next-auth.callback-url");
      }

      // Sign out with redirect false to handle manually

      const result = await signOut({
        redirect: false,
      });

      console.log("SignOut successful:", result);

      // Handle post-logout actions based on configuration

      if (dropdownConfig.redirectOnLogout) {
        console.log("Redirecting to login page...");

        // Force a small delay to ensure session is cleared

        setTimeout(() => {
          router.push("/login");
        }, 200);
      } else {
        // Stay on current page, just clear the session

        console.log("Logout complete, staying on current page");

        // Force a re-render to update the UI

        setTimeout(() => {
          console.log("Refreshing page to update session state...");

          router.refresh(); // Refresh the current page to update session state
        }, 100);
      }

      // Reset loading state after a short delay

      setTimeout(() => {
        setIsLoggingOut(false);

        console.log("Loading state reset");
      }, 100);

      // Call custom logout callback if provided

      if (config.onLogoutComplete) {
        console.log("Calling custom logout callback...");

        config.onLogoutComplete();
      }
    } catch (error) {
      console.error("Logout error:", error);

      setIsLoggingOut(false); // Reset loading state on error

      // Fallback redirect only if redirect is enabled

      if (dropdownConfig.redirectOnLogout) {
        console.log("Fallback redirect to login...");

        window.location.href = "/login";
      }
    }
  };

  const handleSwitchAccount = () => {
    console.log("Switching account...");

    setIsOpen(false); // Close dropdown before redirect

    // For demo purposes, we'll just redirect to login

    // In a real app, you might show a modal to select different accounts

    router.push("/login");
  };

  const handleRemoveAccount = async () => {
    // Prevent multiple attempts

    if (isLoggingOut) return;

    // For demo purposes, we'll just logout after confirmation

    if (
      confirm(
        "Are you sure you want to remove your account? This action cannot be undone.",
      )
    ) {
      console.log("Removing account...");

      setIsOpen(false); // Close dropdown immediately

      // In a real application, you would:

      // 1. Call an API to delete the user account from the database

      // 2. Handle any cleanup (files, data, etc.)

      // 3. Then logout

      // For now, we'll just logout

      await handleLogout();
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      // Check if there's enough space below the button

      const buttonRect = dropdownRef.current?.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const viewportWidth = window.innerWidth;

      const dropdownHeight = 300; // Estimated dropdown height with safety margin

      const dropdownWidth = 192; // w-48 = 12rem = 192px

      const safetyMargin = 20; // 20px safety margin from viewport edges

      if (buttonRect) {
        // Check vertical position

        if (
          buttonRect.bottom + dropdownHeight + safetyMargin >
          viewportHeight
        ) {
          // Not enough space below, position above

          setDropdownPosition("top");
        } else {
          // Enough space below, position below

          setDropdownPosition("bottom");
        }

        // Check horizontal position

        if (buttonRect.left - dropdownWidth < safetyMargin) {
          // Not enough space on the left, align to left

          setDropdownAlignment("left");
        } else {
          // Enough space on the left, align to right (default behavior)

          setDropdownAlignment("right");
        }
      }
    }

    setIsOpen(!isOpen);
  };

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!session) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="p-2 rounded-xl transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: themeConfig.colors.surface,

          color: themeConfig.colors.text,

          border: `1px solid ${themeConfig.colors.border}`,
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth={2.5}
            fill="none"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M16 19a4 4 0 00-8 0"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
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
        <div className="flex items-center space-x-2">
          <div
            className={`${dropdownConfig.avatarSize} rounded-full flex items-center justify-center text-white font-semibold`}
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
            }}
          >
            {(() => {
              // Enhanced user display logic with debugging
              console.log("🔍 AccountDropdown - User data check:", {
                session: session,
                user: session?.user,
                name: session?.user?.name,
                email: session?.user?.email,
                role: session?.user?.role,
              });

              const displayName =
                session?.user?.name ||
                (session?.user?.email && session.user.email.includes("@")
                  ? session.user.email.split("@")[0]
                  : null) ||
                (session?.user?.id
                  ? `User ${session.user.id.toString().slice(0, 8)}`
                  : "User");

              console.log("✅ Final display name:", displayName);
              return displayName;
            })()
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="text-left">
            <div
              className="text-sm font-medium"
              style={{ color: themeConfig.colors.text }}
            >
              {(() => {
                const displayName =
                  session?.user?.name ||
                  (session?.user?.email && session.user.email.includes("@")
                    ? session.user.email.split("@")[0]
                    : null) ||
                  (session?.user?.id
                    ? `User ${session.user.id.toString().slice(0, 8)}`
                    : "User");
                return displayName;
              })()}
            </div>

            <div
              className="text-xs"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              {session.user?.role || "User"}

              {dropdownConfig.showDebugInfo && (
                <span className="ml-2 text-xs opacity-50">
                  ({session.user?.email})
                </span>
              )}
            </div>
          </div>
        </div>

        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute ${dropdownConfig.dropdownWidth} rounded-xl shadow-xl border ${dropdownConfig.dropdownMaxHeight} overflow-y-auto backdrop-blur-xl ${
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
            {dropdownConfig.showAccountSettings && (
              <button
                onClick={() => router.push("/settings")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left"
                style={{
                  color: themeConfig.colors.text,
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    fill="none"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                  />
                </svg>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">Account Settings</div>

                  <div
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Manage your preferences
                  </div>
                </div>
              </button>
            )}

            {dropdownConfig.showAdminDashboard &&
              session.user?.role === "ADMIN" && (
                <button
                  onClick={() => router.push("/admin/dashboard")}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left"
                  style={{
                    color: themeConfig.colors.text,
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
                      strokeWidth={2.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2v6m0 0V9a2 2 0 012-2h6a2 2 0 012 2v10m-6 0a2 2 0 00-2 2h2a2 2 0 002 2v6m0 0V5a2 2 0 012-2h6a2 2 0 012 2v6"
                    />
                  </svg>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Admin Dashboard</div>

                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Manage maintenance requests
                    </div>
                  </div>
                </button>
              )}

            {dropdownConfig.showUserPortal &&
              session.user?.role !== "ADMIN" && (
                <button
                  onClick={() => router.push("/student")}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left"
                  style={{
                    color: themeConfig.colors.text,
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
                      strokeWidth={2.5}
                      d="M12 6v6m0 0v6m0-6H6"
                    />
                  </svg>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Request Portal</div>

                    <div
                      className="text-xs"
                      style={{ color: themeConfig.colors.textSecondary }}
                    >
                      Submit maintenance requests
                    </div>
                  </div>
                </button>
              )}

            {dropdownConfig.showSwitchAccount && (
              <button
                onClick={handleSwitchAccount}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left"
                style={{
                  color: themeConfig.colors.text,
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
                    strokeWidth={2.5}
                    d="M8 7h12m0 0l-4 4m4 4H4"
                  />
                </svg>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">Switch Account</div>

                  <div
                    className="text-xs"
                    style={{ color: themeConfig.colors.textSecondary }}
                  >
                    Change user account
                  </div>
                </div>
              </button>
            )}

            {dropdownConfig.showRemoveAccount && (
              <button
                onClick={handleRemoveAccount}
                disabled={isLoggingOut}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  color: themeConfig.colors.error,
                }}
              >
                {isLoggingOut ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m0-6v6m0-6V3a2 2 0 012-2h6a2 2 0 012 2v6"
                      />
                    </svg>

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

            <div
              className="border-t my-1"
              style={{ borderColor: themeConfig.colors.border }}
            />

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: themeConfig.colors.text,
              }}
            >
              {isLoggingOut ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 16l4-4m0 0l-4 4m4-4H3m4 4v-4m0 0v4"
                    />
                  </svg>

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
