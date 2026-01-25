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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    // In a real app, you'd show a confirmation modal and call an API
    if (
      confirm(
        "Are you sure you want to remove your account? This action cannot be undone.",
      )
    ) {
      handleLogout();
    }
    setIsOpen(false);
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-56 rounded-xl shadow-lg border z-50"
          style={{
            backgroundColor: themeConfig.colors.surface,
            borderColor: themeConfig.colors.border,
            zIndex: Z_INDEX.DROPDOWN,
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-1.756.426-1.756 2.924 0 3.35a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c.94-1.543.826-3.31 2.37-2.37.1.724 1.724 0 002.573-1.066z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
                  strokeWidth={2}
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
                  strokeWidth={2}
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
                  strokeWidth={2}
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
