"use client";

import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { useHapticFeedback } from '@/hooks/useMobileOptimizations';

interface MobileCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  status?: 'default' | 'success' | 'warning' | 'error';
  loading?: boolean;
}

export default function MobileCard({
  children,
  title,
  subtitle,
  icon,
  badge,
  onClick,
  className = '',
  variant = 'default',
  status = 'default',
  loading = false,
}: MobileCardProps) {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const { triggerLightHaptic } = useHapticFeedback();

  const handleClick = () => {
    if (onClick) {
      triggerLightHaptic();
      onClick();
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return themeConfig.colors.success;
      case 'warning':
        return themeConfig.colors.warning;
      case 'error':
        return themeConfig.colors.error;
      default:
        return themeConfig.colors.primary;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'p-3';
      case 'expanded':
        return 'p-5';
      default:
        return 'p-4';
    }
  };

  const Card = onClick ? 'button' : 'div';
  const cardProps = onClick ? { onClick: handleClick } : {};

  return (
    <Card
      {...cardProps}
      className={`
        relative w-full rounded-xl transition-all duration-200 active:scale-[0.98]
        ${getVariantStyles()}
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
        ${loading ? 'animate-pulse' : ''}
        ${className}
      `}
      style={{
        backgroundColor: themeConfig.colors.surface,
        border: `1px solid ${themeConfig.colors.border}`,
        boxShadow: `0 2px 8px ${themeConfig.colors.primary}10`,
      }}
    >
      {/* Status indicator */}
      {status !== 'default' && (
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
          style={{ backgroundColor: getStatusColor() }}
        />
      )}

      {/* Header */}
      {(title || icon || badge) && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {icon && (
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${getStatusColor()}20` }}
              >
                <div style={{ color: getStatusColor() }}>{icon}</div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              {title && (
                <h3
                  className="font-semibold truncate"
                  style={{
                    color: themeConfig.colors.text,
                    fontSize: isMobile ? '14px' : '16px',
                  }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  className="text-sm truncate"
                  style={{
                    color: themeConfig.colors.textSecondary,
                    fontSize: isMobile ? '12px' : '14px',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {badge && (
            <div
              className="flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${getStatusColor()}20`,
                color: getStatusColor(),
              }}
            >
              {badge}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div
        className={`
          ${title || icon || badge ? 'mt-2' : ''}
          ${loading ? 'opacity-50' : ''}
        `}
      >
        {children}
      </div>

      {/* Touch feedback overlay */}
      {onClick && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 active:opacity-10 transition-opacity duration-150 pointer-events-none"
          style={{ backgroundColor: getStatusColor() }}
        />
      )}
    </Card>
  );
}

// Mobile card grid component
interface MobileCardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export function MobileCardGrid({
  children,
  columns = 1,
  gap = 'medium',
  className = '',
}: MobileCardGridProps) {
  const getGapClass = () => {
    switch (gap) {
      case 'small':
        return 'gap-2';
      case 'large':
        return 'gap-4';
      default:
        return 'gap-3';
    }
  };

  const getColumnsClass = () => {
    return columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1';
  };

  return (
    <div
      className={`
        grid ${getColumnsClass()} ${getGapClass()}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Mobile card list component
interface MobileCardListProps {
  children: React.ReactNode;
  spacing?: 'compact' | 'normal' | 'loose';
  className?: string;
}

export function MobileCardList({
  children,
  spacing = 'normal',
  className = '',
}: MobileCardListProps) {
  const getSpacingClass = () => {
    switch (spacing) {
      case 'compact':
        return 'space-y-2';
      case 'loose':
        return 'space-y-4';
      default:
        return 'space-y-3';
    }
  };

  return (
    <div className={`${getSpacingClass()} ${className}`}>
      {children}
    </div>
  );
}
