export type DropdownPosition = "top" | "bottom";
export type DropdownAlignment = "left" | "right";

export interface AccountDropdownConfig {
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
  position?: DropdownPosition;
  /** Preferred dropdown alignment (default: "right") */
  alignment?: DropdownAlignment;
  /** Whether to redirect to login page after logout (default: true) */
  redirectOnLogout?: boolean;
  /** Custom logout callback function (optional) */
  onLogoutComplete?: () => void;
}

export interface AccountDropdownProps {
  /** Configuration object for customizing dropdown behavior */
  config?: AccountDropdownConfig;
}

export interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  show: boolean;
}
