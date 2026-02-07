"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "mobile";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
  hapticFeedback?: boolean;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  fullWidth = false,
  hapticFeedback = true,
  onTouchStart,
  onTouchEnd,
  style = {},
}: ButtonProps) {
  const { themeConfig } = useTheme();

  const triggerHapticFeedback = () => {
    if (hapticFeedback && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleTouchStart = () => {
    triggerHapticFeedback();
    onTouchStart?.();
  };

  const handleClick = () => {
    triggerHapticFeedback();
    onClick?.();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: themeConfig.colors.primary,
          color: themeConfig.colors.secondary,
          border: `1px solid ${themeConfig.colors.primary}`,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        };
      case "secondary":
        return {
          backgroundColor: themeConfig.colors.surface,
          color: themeConfig.colors.text,
          border: `1px solid ${themeConfig.colors.border}`,
        };
      case "danger":
        return {
          backgroundColor: themeConfig.colors.error,
          color: themeConfig.colors.secondary,
          border: `1px solid ${themeConfig.colors.error}`,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: themeConfig.colors.text,
          border: `1px solid ${themeConfig.colors.border}`,
        };
      default:
        return {
          backgroundColor: themeConfig.colors.primary,
          color: themeConfig.colors.secondary,
          border: `1px solid ${themeConfig.colors.primary}`,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-xs";
      case "md":
        return "px-4 py-3 text-sm";
      case "lg":
        return "px-6 py-4 text-base";
      case "mobile":
        return "px-4 py-4 text-base min-h-[44px] min-w-[44px]";
      default:
        return "px-4 py-3 text-sm";
    }
  };

  const styles = getVariantStyles();

  return (
    <button
      type={type}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={onTouchEnd}
      disabled={disabled || loading}
      className={`
        ${getSizeStyles()}
        ${fullWidth ? "w-full" : ""}
        rounded-md font-medium transition-all duration-200 
        hover:shadow-sm active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:shadow-none disabled:hover:scale-100
        ${hapticFeedback ? "haptic-feedback" : ""}
        touch-manipulation
        ${className}
      `}
      style={{ ...styles, ...style }}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
