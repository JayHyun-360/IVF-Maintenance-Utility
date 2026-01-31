"use client";

import { useEffect, useState } from "react";

export interface MobileOptimizations {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: "portrait" | "landscape";
  supportsTouch: boolean;
  supportsHaptic: boolean;
  safeAreaInsets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export function useMobileOptimizations(): MobileOptimizations {
  const [optimizations, setOptimizations] = useState<MobileOptimizations>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1024,
    screenHeight: 768,
    orientation: "landscape",
    supportsTouch: false,
    supportsHaptic: false,
    safeAreaInsets: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  });

  useEffect(() => {
    // Defer the heavy DOM operations to prevent blocking
    const timer = setTimeout(() => {
      const updateOptimizations = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;

        // Get safe area insets
        const computedStyle = getComputedStyle(document.documentElement);
        const safeAreaInsets = {
          top: parseInt(
            computedStyle.getPropertyValue("--mobile-safe-area-top") || "0",
          ),
          right: parseInt(
            computedStyle.getPropertyValue("--mobile-safe-area-right") || "0",
          ),
          bottom: parseInt(
            computedStyle.getPropertyValue("--mobile-safe-area-bottom") || "0",
          ),
          left: parseInt(
            computedStyle.getPropertyValue("--mobile-safe-area-left") || "0",
          ),
        };

        setOptimizations({
          isMobile,
          isTablet,
          isDesktop,
          screenWidth: width,
          screenHeight: height,
          orientation: width > height ? "landscape" : "portrait",
          supportsTouch:
            "ontouchstart" in window || navigator.maxTouchPoints > 0,
          supportsHaptic: "vibrate" in navigator,
          safeAreaInsets,
        });
      };

      updateOptimizations();

      const resizeObserver = new ResizeObserver(updateOptimizations);
      resizeObserver.observe(document.body);

      const handleOrientationChange = () => {
        setTimeout(updateOptimizations, 100); // Delay for orientation change completion
      };

      window.addEventListener("orientationchange", handleOrientationChange);
      window.addEventListener("resize", updateOptimizations);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange,
        );
        window.removeEventListener("resize", updateOptimizations);
      };
    }, 100); // Small delay to allow page to render first

    return () => {
      // Cleanup timer if component unmounts quickly
    };
  }, []);

  return optimizations;
}

export function useHapticFeedback() {
  const { supportsHaptic } = useMobileOptimizations();

  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (supportsHaptic && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        console.warn("Haptic feedback not supported:", error);
      }
    }
  };

  const triggerLightHaptic = () => triggerHaptic(10);
  const triggerMediumHaptic = () => triggerHaptic([10, 50, 10]);
  const triggerHeavyHaptic = () => triggerHaptic([20, 100, 20]);
  const triggerSuccessHaptic = () => triggerHaptic([10, 30, 10, 30, 10]);
  const triggerErrorHaptic = () => triggerHaptic([50, 50, 50, 50, 50]);

  return {
    triggerHaptic,
    triggerLightHaptic,
    triggerMediumHaptic,
    triggerHeavyHaptic,
    triggerSuccessHaptic,
    triggerErrorHaptic,
    supportsHaptic,
  };
}

export function useTouchGestures(
  element: HTMLElement | null,
  options: {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onTap?: () => void;
    onLongPress?: () => void;
    threshold?: number;
    longPressDelay?: number;
  } = {},
) {
  const { supportsTouch } = useMobileOptimizations();
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    threshold = 50,
    longPressDelay = 500,
  } = options;

  useEffect(() => {
    if (!element || !supportsTouch) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let longPressTimer: NodeJS.Timeout;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();

      longPressTimer = setTimeout(() => {
        onLongPress?.();
      }, longPressDelay);
    };

    const handleTouchMove = (e: TouchEvent) => {
      clearTimeout(longPressTimer);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      clearTimeout(longPressTimer);

      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;
      const endTime = Date.now();

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;

      // Check for tap (short touch with minimal movement)
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
        onTap?.();
        return;
      }

      // Check for swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        }
      } else {
        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    element,
    supportsTouch,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    threshold,
    longPressDelay,
  ]);
}

export function usePullToRefresh(
  onRefresh: () => Promise<void> | void,
  options: {
    threshold?: number;
    maxPullDistance?: number;
    debounceMs?: number;
  } = {},
) {
  const { isMobile } = useMobileOptimizations();
  const { threshold = 80, maxPullDistance = 120, debounceMs = 300 } = options;
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let currentY = 0;
    let isPullingActive = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPullingActive = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPullingActive) return;

      currentY = e.touches[0].clientY;
      const distance = Math.min(currentY - startY, maxPullDistance);

      if (distance > 0) {
        e.preventDefault();
        setPullDistance(distance);
        setIsPulling(true);
      }
    };

    const handleTouchEnd = async () => {
      if (!isPullingActive) return;

      isPullingActive = false;

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }

      setPullDistance(0);
      setIsPulling(false);
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isMobile,
    onRefresh,
    threshold,
    maxPullDistance,
    pullDistance,
    isRefreshing,
  ]);

  return {
    isPulling,
    pullDistance,
    isRefreshing,
    pullProgress: Math.min(pullDistance / threshold, 1),
  };
}
