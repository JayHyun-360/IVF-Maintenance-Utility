"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { LoadingSkeleton } from "./LoadingSpinner";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({ 
  src, 
  alt, 
  className = "", 
  placeholder = "/placeholder.jpg",
  onLoad,
  onError 
}: LazyImageProps) {
  const { themeConfig } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <LoadingSkeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Image */}
      <img
        ref={imgRef}
        src={isInView ? (hasError ? placeholder : src) : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } w-full h-full object-cover`}
        loading="lazy"
      />
      
      {/* Error state */}
      {hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: `${themeConfig.colors.surface}90` }}
        >
          <div className="text-center">
            <span className="text-2xl mb-2 block">🖼️</span>
            <p 
              className="text-xs font-medium"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              Image not available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
