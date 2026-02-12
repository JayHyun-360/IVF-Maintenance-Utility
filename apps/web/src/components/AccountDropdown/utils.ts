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
  const items = [
    "next-auth.session-token",
    "next-auth.callback-url",
  ];
  
  items.forEach(item => {
    localStorage.removeItem(item);
    sessionStorage.removeItem(item);
  });
};

export const getUserDisplayName = (session: any): string => {
  return session?.user?.name || 
         session?.user?.email?.split("@")[0] || 
         "User";
};

export const getUserInitial = (session: any): string => {
  return getUserDisplayName(session).charAt(0).toUpperCase();
};

// Position calculation utilities
export const calculateDropdownPosition = (
  buttonRect: DOMRect,
  viewport: { width: number; height: number }
): { position: DropdownPosition; alignment: DropdownAlignment } => {
  const dropdownHeight = 300;
  const dropdownWidth = 192;
  const safetyMargin = 20;

  const position: DropdownPosition = 
    buttonRect.bottom + dropdownHeight + safetyMargin > viewport.height
      ? "top"
      : "bottom";

  const alignment: DropdownAlignment = 
    buttonRect.left - dropdownWidth < safetyMargin
      ? "left"
      : "right";

  return { position, alignment };
};

// Icon components
export const Icons = {
  Settings: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" strokeWidth={2.5} fill="none" />
      <path strokeWidth={2.5} d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
    </svg>
  ),
  
  AdminDashboard: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2v6m0 0V9a2 2 0 012-2h6a2 2 0 012 2v10m-6 0a2 2 0 00-2 2h6a2 2 0 002 2v6m0 0V5a2 2 0 012-2h6a2 2 0 012 2v6" />
    </svg>
  ),
  
  UserPortal: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth={2.5} d="M12 6v6m0 0v6m0-6H6" />
    </svg>
  ),
  
  SwitchAccount: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth={2.5} d="M8 7h12m0 0l-4 4m4 4H4" />
    </svg>
  ),
  
  Logout: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth={2.5} d="M17 16l4-4m0 0l-4 4m4-4H3m4 4v-4m0 0v4" />
    </svg>
  ),
  
  RemoveAccount: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m0-6v6m0-6V3a2 2 0 012-2h6a2 2 0 012 2v6" />
    </svg>
  ),
  
  Login: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3" strokeWidth={2.5} fill="none" />
      <path strokeWidth={2.5} d="M16 19a4 4 0 00-8 0" />
    </svg>
  ),
  
  LoadingSpinner: () => (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
};
