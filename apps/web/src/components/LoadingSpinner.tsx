"use client";

import { useTheme } from "@/components/ThemeProvider";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const { themeConfig } = useTheme();
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${className}`}
      style={{
        borderColor: `${themeConfig.colors.primary}20`,
        borderTopColor: themeConfig.colors.primary,
      }}
    />
  );
}

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  const { themeConfig } = useTheme();
  
  return (
    <div
      className={`animate-pulse rounded-md ${className}`}
      style={{
        backgroundColor: `${themeConfig.colors.border}30`,
      }}
    />
  );
}
