import React from "react";
import type { DropdownPosition, DropdownAlignment } from "./types";

// Configuration constants
export const DEFAULT_CONFIG = {
  showAccountSettings: true,
  showAdminDashboard: true,
  showUserPortal: true,
  showSwitchAccount: true,
  showRemoveAccount: true,
  dropdownWidth: "w-48",
  dropdownMaxHeight: "max-h-60",
  showDebugInfo: false,
  avatarSize: "w-8 h-8",
  position: "bottom" as DropdownPosition,
  alignment: "right" as DropdownAlignment,
  redirectOnLogout: true,
} as const;

// Session utilities
export const clearSessionStorage = (): void => {
  if (typeof window === "undefined") return;

  console.log("🧹 Clearing session storage...");

  // Clear all NextAuth related storage items
  const storageItems = [
    "next-auth.session-token",
    "next-auth.callback-url",
    "next-auth.csrf-token",
    "next-auth.pkce.code_verifier",
  ];

  // Clear localStorage
  storageItems.forEach((item) => {
    try {
      localStorage.removeItem(item);
      console.log(`✅ Cleared localStorage: ${item}`);
    } catch (error) {
      console.warn(`⚠️ Failed to clear localStorage ${item}:`, error);
    }
  });

  // Clear sessionStorage
  storageItems.forEach((item) => {
    try {
      sessionStorage.removeItem(item);
      console.log(`✅ Cleared sessionStorage: ${item}`);
    } catch (error) {
      console.warn(`⚠️ Failed to clear sessionStorage ${item}:`, error);
    }
  });

  // Clear any additional session data that might be stored
  try {
    // Clear all keys that start with "next-auth"
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("next-auth")) {
        localStorage.removeItem(key);
        console.log(`✅ Cleared additional localStorage: ${key}`);
      }
    }

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith("next-auth")) {
        sessionStorage.removeItem(key);
        console.log(`✅ Cleared additional sessionStorage: ${key}`);
      }
    }
  } catch (error) {
    console.warn("⚠️ Failed to clear additional session data:", error);
  }
};

export const getUserDisplayName = (session: any): string => {
  // Debug logging to identify the issue
  console.log("🔍 getUserDisplayName - Session data:", {
    session: session,
    user: session?.user,
    name: session?.user?.name,
    email: session?.user?.email,
    emailType: typeof session?.user?.email,
  });

  // Check if session and user exist
  if (!session || !session.user) {
    console.warn("⚠️ No session or user data found");
    return "User";
  }

  // Try to get name first
  if (
    session.user.name &&
    typeof session.user.name === "string" &&
    session.user.name.trim()
  ) {
    console.log("✅ Using user name:", session.user.name);
    return session.user.name.trim();
  }

  // Try to get email and extract username
  if (
    session.user.email &&
    typeof session.user.email === "string" &&
    session.user.email.includes("@")
  ) {
    const emailUsername = session.user.email.split("@")[0];
    if (emailUsername && emailUsername.trim()) {
      console.log("✅ Using email username:", emailUsername);
      return emailUsername.trim();
    }
  }

  // Last resort - check if there's any other identifier
  if (session.user.id) {
    const identifier = session.user.id;
    const shortId = identifier.toString().slice(0, 8);
    console.log("✅ Using user ID as fallback:", shortId);
    return `User ${shortId}`;
  }

  console.warn("⚠️ No valid user identifier found, defaulting to 'User'");
  return "User";
};

export const getUserInitial = (session: any): string => {
  return getUserDisplayName(session).charAt(0).toUpperCase();
};

// Position calculation utilities
export const calculateDropdownPosition = (
  buttonRect: DOMRect,
  viewport: { width: number; height: number },
): { position: DropdownPosition; alignment: DropdownAlignment } => {
  const dropdownHeight = 300;
  const dropdownWidth = 192;
  const safetyMargin = 20;

  const position: DropdownPosition =
    buttonRect.bottom + dropdownHeight + safetyMargin > viewport.height
      ? "top"
      : "bottom";

  const alignment: DropdownAlignment =
    buttonRect.left - dropdownWidth < safetyMargin ? "left" : "right";

  return { position, alignment };
};

// Icon components
export const Icons = {
  Settings: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="3" strokeWidth={2.5} fill="none" />
      <path strokeWidth={2.5} d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
    </svg>
  ),

  AdminDashboard: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth={2.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2v6m0 0V9a2 2 0 012-2h6a2 2 0 012 2v10m-6 0a2 2 0 00-2 2h6a2 2 0 002 2v6m0 0V5a2 2 0 012-2h6a2 2 0 012 2v6"
      />
    </svg>
  ),

  UserPortal: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeWidth={2.5} d="M12 6v6m0 0v6m0-6H6" />
    </svg>
  ),

  SwitchAccount: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeWidth={2.5} d="M8 7h12m0 0l-4 4m4 4H4" />
    </svg>
  ),

  Logout: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeWidth={2.5} d="M17 16l4-4m0 0l-4 4m4-4H3m4 4v-4m0 0v4" />
    </svg>
  ),

  RemoveAccount: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth={2.5}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m0-6v6m0-6V3a2 2 0 012-2h6a2 2 0 012 2v6"
      />
    </svg>
  ),

  Login: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="3" strokeWidth={2.5} fill="none" />
      <path strokeWidth={2.5} d="M16 19a4 4 0 00-8 0" />
    </svg>
  ),

  LoadingSpinner: () => (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ),
};
