"use client";

import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

// Mobile-optimized skeleton loader
interface MobileSkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function MobileSkeleton({
  className = '',
  height = '20px',
  width = '100%',
  variant = 'rectangular',
}: MobileSkeletonProps) {
  const { themeConfig } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'rounded';
      case 'circular':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <div
      className={`
        mobile-loading
        ${getVariantStyles()}
        ${className}
      `}
      style={{
        height,
        width,
        backgroundColor: themeConfig.colors.surface,
      }}
    />
  );
}

// Mobile skeleton card
interface MobileSkeletonCardProps {
  showAvatar?: boolean;
  showTitle?: boolean;
  showSubtitle?: boolean;
  lines?: number;
  className?: string;
}

export function MobileSkeletonCard({
  showAvatar = true,
  showTitle = true,
  showSubtitle = true,
  lines = 2,
  className = '',
}: MobileSkeletonCardProps) {
  const { themeConfig } = useTheme();

  return (
    <div
      className={`
        p-4 rounded-xl
        ${className}
      `}
      style={{
        backgroundColor: themeConfig.colors.surface,
        border: `1px solid ${themeConfig.colors.border}`,
      }}
    >
      {showAvatar && (
        <div className="flex items-center space-x-3 mb-3">
          <MobileSkeleton variant="circular" height="40px" width="40px" />
          <div className="flex-1">
            {showTitle && (
              <MobileSkeleton
                variant="text"
                height="16px"
                width="60%"
                className="mb-2"
              />
            )}
            {showSubtitle && (
              <MobileSkeleton variant="text" height="14px" width="40%" />
            )}
          </div>
        </div>
      )}
      
      {!showAvatar && showTitle && (
        <MobileSkeleton
          variant="text"
          height="18px"
          width="80%"
          className="mb-3"
        />
      )}
      
      {Array.from({ length: lines }).map((_, index) => (
        <MobileSkeleton
          key={index}
          variant="text"
          height="14px"
          width={index === lines - 1 ? '70%' : '100%'}
          className={index < lines - 1 ? 'mb-2' : ''}
        />
      ))}
    </div>
  );
}

// Mobile loading spinner
interface MobileSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export function MobileSpinner({
  size = 'medium',
  color,
  className = '',
}: MobileSpinnerProps) {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <div
      className={`
        border-2 border-t-transparent rounded-full animate-spin
        ${getSizeStyles()}
        ${className}
      `}
      style={{
        borderColor: color || themeConfig.colors.primary,
        borderTopColor: 'transparent',
      }}
    />
  );
}

// Mobile loading overlay
interface MobileLoadingOverlayProps {
  visible: boolean;
  message?: string;
  spinner?: boolean;
}

export function MobileLoadingOverlay({
  visible,
  message = 'Loading...',
  spinner = true,
}: MobileLoadingOverlayProps) {
  const { themeConfig } = useTheme();

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center mobile-safe-padding"
      style={{
        backgroundColor: `${themeConfig.colors.background}CC`,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl max-w-xs mx-4"
        style={{
          backgroundColor: themeConfig.colors.surface,
          border: `1px solid ${themeConfig.colors.border}`,
        }}
      >
        {spinner && <MobileSpinner size="large" />}
        <p
          className="text-center text-sm font-medium"
          style={{ color: themeConfig.colors.text }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

// Mobile pull-to-refresh indicator
interface MobilePullToRefreshIndicatorProps {
  isPulling: boolean;
  pullProgress: number;
  isRefreshing: boolean;
  message?: string;
}

export function MobilePullToRefreshIndicator({
  isPulling,
  pullProgress,
  isRefreshing,
  message = 'Pull to refresh',
}: MobilePullToRefreshIndicatorProps) {
  const { themeConfig } = useTheme();

  if (!isPulling && !isRefreshing) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none mobile-safe-padding-top"
      style={{
        transform: `translateY(${isPulling ? Math.min(pullProgress * 60, 60) : 0}px)`,
        opacity: isPulling ? pullProgress : 1,
      }}
    >
      <div
        className="flex items-center space-x-3 px-4 py-2 rounded-full"
        style={{
          backgroundColor: themeConfig.colors.surface,
          border: `1px solid ${themeConfig.colors.border}`,
          boxShadow: `0 4px 12px ${themeConfig.colors.primary}20`,
        }}
      >
        {isRefreshing ? (
          <MobileSpinner size="small" />
        ) : (
          <svg
            className="w-4 h-4 transition-transform duration-200"
            style={{
              color: themeConfig.colors.primary,
              transform: `rotate(${pullProgress * 180}deg)`,
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        )}
        <span
          className="text-xs font-medium"
          style={{ color: themeConfig.colors.text }}
        >
          {isRefreshing ? 'Refreshing...' : message}
        </span>
      </div>
    </div>
  );
}

// Mobile loading states for different content types
export const MobileLoadingStates = {
  // Dashboard loading state
  Dashboard: () => (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <MobileSkeletonCard key={index} lines={1} />
        ))}
      </div>
      <MobileSkeletonCard showAvatar lines={3} />
      <MobileSkeletonCard lines={2} />
    </div>
  ),

  // List loading state
  List: ({ count = 3 }: { count?: number }) => (
    <div className="p-4 space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <MobileSkeletonCard key={index} showAvatar lines={2} />
      ))}
    </div>
  ),

  // Form loading state
  Form: () => (
    <div className="p-4 space-y-4">
      <MobileSkeleton height="20px" width="30%" />
      <MobileSkeleton height="44px" />
      <MobileSkeleton height="20px" width="25%" />
      <MobileSkeleton height="44px" />
      <MobileSkeleton height="20px" width="20%" />
      <MobileSkeleton height="100px" />
      <MobileSkeleton height="44px" width="100%" />
    </div>
  ),

  // Card grid loading state
  CardGrid: ({ cols = 2, rows = 2 }: { cols?: number; rows?: number }) => (
    <div className="p-4">
      <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3`}>
        {Array.from({ length: cols * rows }).map((_, index) => (
          <MobileSkeletonCard key={index} lines={2} />
        ))}
      </div>
    </div>
  ),
};

// Mobile empty state component
interface MobileEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function MobileEmptyState({
  icon,
  title,
  description,
  action,
}: MobileEmptyStateProps) {
  const { themeConfig } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {icon && (
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{
            backgroundColor: `${themeConfig.colors.primary}20`,
            color: themeConfig.colors.primary,
          }}
        >
          {icon}
        </div>
      )}
      
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: themeConfig.colors.text }}
      >
        {title}
      </h3>
      
      {description && (
        <p
          className="text-sm mb-6"
          style={{ color: themeConfig.colors.textSecondary }}
        >
          {description}
        </p>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]"
          style={{
            backgroundColor: themeConfig.colors.primary,
            color: 'white',
            minHeight: '44px',
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
