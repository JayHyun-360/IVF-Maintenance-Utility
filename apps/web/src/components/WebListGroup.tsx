"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

interface WebListGroupProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  divided?: boolean;
  compact?: boolean;
}

interface WebListGroupItemProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  badge?: string | number;
  status?: "default" | "success" | "warning" | "error";
}

export function WebListGroup({
  children,
  title,
  subtitle,
  className = "",
  divided = true,
  compact = false,
}: WebListGroupProps) {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();

  return (
    <div
      className={`bg-white rounded-lg border ${className}`}
      style={{ borderColor: themeConfig.colors.border }}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div
          className={`px-4 ${compact ? "py-3" : "py-4"} border-b`}
          style={{ borderColor: themeConfig.colors.border }}
        >
          {title && (
            <h3
              className={`font-semibold ${compact ? "text-sm" : "text-base"}`}
              style={{
                color: themeConfig.colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              className={`mt-1 ${compact ? "text-xs" : "text-sm"}`}
              style={{
                color: themeConfig.colors.textSecondary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Items */}
      <div
        className={divided ? "divide-y" : ""}
        style={{ borderColor: themeConfig.colors.border }}
      >
        {children}
      </div>
    </div>
  );
}

export function WebListGroupItem({
  children,
  title,
  subtitle,
  leftIcon,
  rightElement,
  onClick,
  className = "",
  disabled = false,
  badge,
  status = "default",
}: WebListGroupItemProps) {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return themeConfig.colors.success;
      case "warning":
        return themeConfig.colors.warning;
      case "error":
        return themeConfig.colors.error;
      default:
        return themeConfig.colors.primary;
    }
  };

  const Item = onClick ? "button" : "div";
  const itemProps = onClick ? { onClick } : {};

  return (
    <Item
      {...itemProps}
      className={`
        w-full px-4 py-3 flex items-center justify-between
        ${onClick && !disabled ? "hover:bg-gray-50 transition-colors active:bg-gray-100" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Left side: Icon and content */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {leftIcon && (
          <div
            className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
            style={{
              backgroundColor: `${getStatusColor()}10`,
              color: getStatusColor(),
            }}
          >
            {leftIcon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <div
              className="font-medium text-sm truncate"
              style={{
                color: themeConfig.colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {title}
            </div>
          )}
          {subtitle && (
            <div
              className="text-xs truncate mt-0.5"
              style={{
                color: themeConfig.colors.textSecondary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {subtitle}
            </div>
          )}
          {children && <div className="text-xs mt-1">{children}</div>}
        </div>
      </div>

      {/* Right side: Badge and right element */}
      <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
        {badge && (
          <span
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${getStatusColor()}10`,
              color: getStatusColor(),
            }}
          >
            {badge}
          </span>
        )}
        {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
        {onClick && !rightElement && (
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
      </div>
    </Item>
  );
}

// Stats list component for dashboard metrics
interface WebStatsListProps {
  stats: Array<{
    label: string;
    value: string | number;
    change?: {
      value: string;
      type: "increase" | "decrease" | "neutral";
    };
  }>;
  columns?: 2 | 3 | 4 | 5;
  compact?: boolean;
}

export function WebStatsList({
  stats,
  columns = 4,
  compact = false,
}: WebStatsListProps) {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();

  const getColumnsClass = () => {
    if (isMobile) return "grid-cols-2";
    switch (columns) {
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      default:
        return "grid-cols-2";
    }
  };

  return (
    <div
      className={`rounded-lg border ${compact ? "p-3" : "p-4"}`}
      style={{
        borderColor: themeConfig.colors.border,
        backgroundColor: themeConfig.colors.surface,
      }}
    >
      <div className={`grid ${getColumnsClass()} gap-4`}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div
              className={`${compact ? "text-lg" : "text-2xl"} font-semibold`}
              style={{
                color: themeConfig.colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {stat.value}
            </div>
            <div
              className={`${compact ? "text-xs" : "text-sm"} mt-1`}
              style={{
                color: themeConfig.colors.textSecondary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {stat.label}
            </div>
            {stat.change && (
              <div
                className={`text-xs mt-1 font-medium`}
                style={{
                  color:
                    stat.change.type === "increase"
                      ? themeConfig.colors.success
                      : stat.change.type === "decrease"
                        ? themeConfig.colors.error
                        : themeConfig.colors.textSecondary,
                }}
              >
                {stat.change.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
