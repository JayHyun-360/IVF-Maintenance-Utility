"use client";

import React, { ReactNode } from 'react';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface MobileOptimizedContainerProps {
  children: ReactNode;
  className?: string;
  enablePullToRefresh?: boolean;
  onRefresh?: () => Promise<void> | void;
  enableSwipeGestures?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export default function MobileOptimizedContainer({
  children,
  className = '',
  enablePullToRefresh = false,
  onRefresh,
  enableSwipeGestures = false,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: MobileOptimizedContainerProps) {
  const { isMobile, safeAreaInsets } = useMobileOptimizations();

  const containerStyle = isMobile
    ? {
        paddingTop: `${safeAreaInsets.top + 16}px`,
        paddingBottom: `${safeAreaInsets.bottom + 16}px`,
        paddingLeft: `${safeAreaInsets.left + 16}px`,
        paddingRight: `${safeAreaInsets.right + 16}px`,
      }
    : {};

  return (
    <div
      className={`mobile-optimized-container ${className}`}
      style={containerStyle}
    >
      {children}
    </div>
  );
}

interface MobilePullToRefreshProps {
  isPulling: boolean;
  pullDistance: number;
  pullProgress: number;
  isRefreshing: boolean;
  threshold: number;
}

export function MobilePullToRefresh({
  isPulling,
  pullDistance,
  pullProgress,
  isRefreshing,
  threshold,
}: MobilePullToRefreshProps) {
  if (!isPulling && !isRefreshing) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        height: `${Math.min(pullDistance, threshold * 1.5)}px`,
        transform: `translateY(-${Math.min(pullDistance, threshold * 1.5)}px)`,
      }}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
        style={{
          width: '40px',
          height: '40px',
          opacity: pullProgress,
        }}
      >
        {isRefreshing ? (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            className="w-5 h-5 text-blue-500 transition-transform duration-200"
            style={{
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
      </div>
    </div>
  );
}

interface MobileGestureHintProps {
  type: 'swipe' | 'tap' | 'long-press';
  direction?: 'left' | 'right' | 'up' | 'down';
  visible?: boolean;
  className?: string;
}

export function MobileGestureHint({
  type,
  direction = 'right',
  visible = true,
  className = '',
}: MobileGestureHintProps) {
  if (!visible) return null;

  const getHintContent = () => {
    switch (type) {
      case 'swipe':
        const arrow = direction === 'left' ? '←' : direction === 'right' ? '→' : direction === 'up' ? '↑' : '↓';
        return `${arrow} Swipe ${direction}`;
      case 'tap':
        return 'Tap to interact';
      case 'long-press':
        return 'Long press for options';
      default:
        return '';
    }
  };

  return (
    <div
      className={`mobile-gesture-hint fixed bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 animate-pulse ${className}`}
    >
      {getHintContent()}
    </div>
  );
}
