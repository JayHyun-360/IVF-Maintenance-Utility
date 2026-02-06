"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface WebHeaderProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  showMenuToggle?: boolean;
  actions?: React.ReactNode;
}

export default function WebHeader({
  title,
  breadcrumbs = [],
  showMenuToggle = true,
  actions,
}: WebHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Generate breadcrumbs from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (breadcrumbs.length > 0) return breadcrumbs;

    const pathSegments = pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      if (index === pathSegments.length - 1) {
        crumbs.push({ label });
      } else {
        crumbs.push({ label, href: currentPath });
      }
    });

    return crumbs;
  };

  const currentBreadcrumbs = generateBreadcrumbs();

  const menuItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/student", label: "Requests", icon: "📝" },
    { href: "/student/history", label: "History", icon: "📚" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBreadcrumbClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: themeConfig.colors.background,
          borderColor: themeConfig.colors.border,
        }}
      >
        <div className={`${isMobile ? "px-4" : "px-6"} py-3`}>
          <div className="flex items-center justify-between">
            {/* Left side: Menu toggle and Title/Breadcrumbs */}
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Menu Toggle */}
              {showMenuToggle && (
                <button
                  onClick={handleMenuToggle}
                  className="p-2 rounded-lg border transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  style={{
                    borderColor: themeConfig.colors.border,
                    backgroundColor: "transparent",
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: themeConfig.colors.text }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}

              {/* Title and Breadcrumbs */}
              <div className="flex-1 min-w-0">
                {title && (
                  <h1
                    className="text-lg font-semibold truncate"
                    style={{
                      color: themeConfig.colors.text,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    {title}
                  </h1>
                )}

                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-1 text-sm mt-1">
                  {currentBreadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: themeConfig.colors.textSecondary }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                      <button
                        onClick={() => handleBreadcrumbClick(crumb.href)}
                        className={`truncate ${
                          crumb.href
                            ? "hover:text-blue-600 transition-colors"
                            : "text-gray-500 font-medium"
                        }`}
                        style={{
                          color: crumb.href
                            ? themeConfig.colors.textSecondary
                            : themeConfig.colors.textSecondary,
                          fontFamily: "Inter, system-ui, sans-serif",
                        }}
                      >
                        {crumb.label}
                      </button>
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right side: Actions */}
            {actions && (
              <div className="flex items-center space-x-2 ml-4">{actions}</div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className="fixed top-0 left-0 bottom-0 z-40 w-72 overflow-y-auto"
            style={{
              backgroundColor: themeConfig.colors.background,
              borderRight: `1px solid ${themeConfig.colors.border}`,
            }}
          >
            {/* Menu Header */}
            <div
              className="p-4 border-b"
              style={{ borderColor: themeConfig.colors.border }}
            >
              <div className="flex items-center justify-between">
                <h2
                  className="text-lg font-semibold"
                  style={{
                    color: themeConfig.colors.text,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  Navigation
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: themeConfig.colors.text }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="p-2">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    color:
                      pathname === item.href
                        ? themeConfig.colors.primary
                        : themeConfig.colors.text,
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className="font-medium"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {item.label}
                  </span>
                  {pathname === item.href && (
                    <svg
                      className="w-4 h-4 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
