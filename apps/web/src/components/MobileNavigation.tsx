"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { useHapticFeedback } from "@/hooks/useMobileOptimizations";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  active?: boolean;
}

export default function MobileNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const { triggerLightHaptic } = useHapticFeedback();

  if (!isMobile) return null;

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      href: "/",
      active: pathname === "/",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      href: "/dashboard",
      active: pathname.includes("/dashboard"),
    },
    {
      id: "requests",
      label: "Requests",
      icon: (
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      href: "/student",
      active: pathname.includes("/student"),
      badge: 3, // Example badge count
    },
    {
      id: "history",
      label: "History",
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      href: "/student/history",
      active: pathname.includes("/history"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      href: "/settings",
      active: pathname.includes("/settings"),
    },
  ];

  const handleNavClick = (href: string) => {
    triggerLightHaptic();
    router.push(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 mobile-safe-padding-bottom bg-surface border-t border-border"
      style={{
        boxShadow: "0 -1px 2px 0 rgb(0 0 0 / 0.05)",
      }}
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.href)}
            className="flex flex-col items-center justify-center relative min-w-[44px] min-h-[44px] px-2 py-1 rounded-md transition-all duration-200 active:scale-95"
            style={{
              color: item.active
                ? themeConfig.colors.primary
                : themeConfig.colors.textSecondary,
              backgroundColor: item.active
                ? `${themeConfig.colors.primary}10`
                : "transparent",
            }}
          >
            <div className="relative">
              {item.icon}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-medium rounded-full min-w-[16px] h-4 flex items-center justify-center bg-error text-secondary">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1 font-medium truncate max-w-[60px]">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// Mobile navigation wrapper for pages
interface MobileNavigationWrapperProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export function MobileNavigationWrapper({
  children,
  showNavigation = true,
}: MobileNavigationWrapperProps) {
  const { isMobile } = useMobileOptimizations();

  return (
    <div className="relative min-h-screen">
      <div className={showNavigation && isMobile ? "pb-20" : ""}>
        {children}
      </div>
      {showNavigation && <MobileNavigation />}
    </div>
  );
}
