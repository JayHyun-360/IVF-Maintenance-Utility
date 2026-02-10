"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorBoundary } from "./ErrorBoundary";

interface RequestCardProps {
  request: {
    id: string;
    title: string;
    category: 'PLUMBING' | 'ELECTRICAL' | 'CARPENTRY' | 'PERSONNEL';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    location?: string;
    createdAt: string;
    user?: {
      name: string;
      email: string;
      avatar?: string;
    };
  };
  isLoading?: boolean;
  onClick?: () => void;
}

function RequestCardComponent({ request, isLoading = false, onClick }: RequestCardProps) {
  const { themeConfig } = useTheme();
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return themeConfig.colors.success;
      case "in progress":
        return themeConfig.colors.primary;
      case "pending":
        return themeConfig.colors.warning || "#f59e0b";
      default:
        return themeConfig.colors.textSecondary;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PLUMBING":
        return "💧";
      case "ELECTRICAL":
        return "⚡";
      case "CARPENTRY":
        return "🔨";
      case "PERSONNEL":
        return "👥";
      default:
        return "📋";
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/admin/requests/${request.id}`);
    }
  };

  if (isLoading) {
    return (
      <div 
        className="p-5 rounded-3xl border"
        style={{
          backgroundColor: `${themeConfig.colors.surface}70`,
          borderColor: `${themeConfig.colors.border}30`,
        }}
      >
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        className="group p-5 rounded-3xl border backdrop-blur-xl transition-all hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: `${themeConfig.colors.surface}70`,
          borderColor: `${themeConfig.colors.border}30`,
        }}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
              style={{
                backgroundColor: `${getStatusColor(request.status)}10`,
              }}
            >
              {getCategoryIcon(request.category)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate">
                {request.title}
              </h3>
              <p className="text-[10px] font-medium opacity-70">
                {request.user?.name || "Unknown"} •{" "}
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
              {request.location && (
                <p className="text-[9px] opacity-60 mt-1">
                  📍 {request.location}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span
              className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border"
              style={{
                color: getStatusColor(request.status),
                borderColor: `${getStatusColor(request.status)}30`,
                backgroundColor: `${getStatusColor(request.status)}05`,
              }}
            >
              {request.status}
            </span>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: `${themeConfig.colors.text}08`,
              }}
            >
              <svg
                className="w-4 h-4"
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
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export const RequestCard = memo(RequestCardComponent);
