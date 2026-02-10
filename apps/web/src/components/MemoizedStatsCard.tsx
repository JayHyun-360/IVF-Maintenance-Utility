"use client";

import { memo } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { LoadingSkeleton } from "./LoadingSpinner";

interface StatsCardProps {
  label: string;
  value: number;
  icon: string;
  trend: string;
  color: string;
  isLoading?: boolean;
}

function StatsCardComponent({ 
  label, 
  value, 
  icon, 
  trend, 
  color, 
  isLoading = false 
}: StatsCardProps) {
  const { themeConfig } = useTheme();

  if (isLoading) {
    return (
      <div 
        className="group p-6 rounded-[2rem] border backdrop-blur-xl"
        style={{
          backgroundColor: `${themeConfig.colors.surface}90`,
          borderColor: `${themeConfig.colors.border}40`,
        }}
      >
        <div className="space-y-4">
          <LoadingSkeleton className="w-10 h-10 rounded-xl" />
          <LoadingSkeleton className="w-20 h-8 rounded" />
          <LoadingSkeleton className="w-24 h-4 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="group p-6 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 hover:translate-y-[-4px]"
      style={{
        backgroundColor: `${themeConfig.colors.surface}90`,
        borderColor: `${themeConfig.colors.border}40`,
        boxShadow: `0 15px 30px -15px rgba(0,0,0,0.05)`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
        <span
          className={`text-[10px] font-black px-2 py-1 rounded-full ${
            trend.startsWith("+") 
              ? "text-green-500 bg-green-500/10" 
              : "text-red-500 bg-red-500/10"
          }`}
        >
          {trend}
        </span>
      </div>
      
      <div className="text-3xl font-black mb-1">
        {value.toLocaleString()}
      </div>
      
      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
        {label}
      </div>
    </div>
  );
}

export const StatsCard = memo(StatsCardComponent);
