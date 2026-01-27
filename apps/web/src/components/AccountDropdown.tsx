"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Z_INDEX } from "@/lib/z-index";

export default function AccountDropdown() {
  const { data: session } = useSession();
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    await signOut({ redirect: false });
    router.push("/login");
    setIsOpen(false);
  };

  const handleSwitchAccount = () => {
    // For demo purposes, we'll just redirect to login
    // In a real app, you might show a modal to select different accounts
    router.push("/login");
    setIsOpen(false);
  };

  const handleRemoveAccount = () => {
    // For demo purposes, we'll just logout
    if (
      confirm(
        "Are you sure you want to remove your account? This action cannot be undone.",
      )
    ) {
      handleLogout();
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      // Check if dropdown would go off-screen when opening
      const buttonRect = dropdownRef.current?.getBoundingClientRect();
      if (buttonRect) {
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const estimatedDropdownHeight = 400;
        const buttonPositionRatio = buttonRect.top / window.innerHeight;

        // If button is in bottom 40% of screen or not enough space below, position on top
        if (
          spaceBelow < estimatedDropdownHeight + 20 ||
          buttonPositionRatio > 0.6
        ) {
          setDropdownPosition("top");
        } else {
          setDropdownPosition("bottom");
        }
      }
    }
    setIsOpen(!isOpen);
  };

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
        className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: themeConfig.colors.surface,
          color: themeConfig.colors.text,
          border: `1px solid ${themeConfig.colors.border}`,
        }}
      >
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{
              background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
            }}
          >
            {session.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="text-left">
            <div
              className="text-sm font-medium"
              style={{ color: themeConfig.colors.text }}
            >
              {session.user?.name || "User"}
            </div>
            <div
              className="text-xs"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              {session.user?.role || "User"}
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
          className={`absolute w-56 rounded-xl shadow-lg border max-h-80 overflow-y-auto ${
            dropdownPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
          } right-0`}
          style={{
            backgroundColor: themeConfig.colors.surface,
            borderColor: themeConfig.colors.border,
            zIndex: Z_INDEX.TOOLTIP, // Use higher z-index to avoid being covered
          }}
        >
          <div className="p-2">
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
              <div className="flex-1">
                <div className="text-sm font-medium">Account Settings</div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Manage your preferences
                </div>
              </div>
            </button>

            {session.user?.role === "ADMIN" && (
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <div className="flex-1">
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

            <div
              className="border-t my-1"
              style={{ borderColor: themeConfig.colors.border }}
            />

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
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4"
                />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium">Switch Account</div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Change user account
                </div>
              </div>
            </button>

            <button
              onClick={handleRemoveAccount}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-left"
              style={{
                color: themeConfig.colors.error,
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m0-6v6m0-6V3a2 2 0 012-2h6a2 2 0 012 2v6"
                />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium">Remove Account</div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Delete your account
                </div>
              </div>
            </button>

            <div
              className="border-t my-1"
              style={{ borderColor: themeConfig.colors.border }}
            />

            <button
              onClick={handleLogout}
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
                  d="M17 16l4-4m0 0l-4 4m4-4H3m4 4v-4m0 0v4"
                />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium">Log Out</div>
                <div
                  className="text-xs"
                  style={{ color: themeConfig.colors.textSecondary }}
                >
                  Sign out of your account
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
