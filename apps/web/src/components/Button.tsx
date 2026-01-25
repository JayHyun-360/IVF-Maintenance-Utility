"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
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
}: ButtonProps) {
  const { themeConfig } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.accent} 100%)`,
          color: "#FFFFFF",
          border: `1px solid ${themeConfig.colors.primary}`,
        };
      case "secondary":
        return {
          backgroundColor: themeConfig.colors.surface,
          color: themeConfig.colors.text,
          border: `1px solid ${themeConfig.colors.border}`,
        };
      case "danger":
        return {
          background: `linear-gradient(135deg, ${themeConfig.colors.error} 0%, #DC2626 100%)`,
          color: "#FFFFFF",
          border: `1px solid ${themeConfig.colors.error}`,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: themeConfig.colors.text,
          border: `1px solid transparent`,
        };
      default:
        return {
          background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.accent} 100%)`,
          color: "#FFFFFF",
          border: `1px solid ${themeConfig.colors.primary}`,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm";
      case "md":
        return "px-6 py-3 text-base";
      case "lg":
        return "px-8 py-4 text-lg";
      default:
        return "px-6 py-3 text-base";
    }
  };

  const styles = getVariantStyles();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${getSizeStyles()}
        ${fullWidth ? "w-full" : ""}
        rounded-xl font-medium transition-all duration-200 
        hover:scale-105 shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
      style={styles}
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
