"use client";

import React from 'react';
import { useTheme } from "@/components/ThemeProvider";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          reset={() => this.setState({ hasError: false, error: undefined })} 
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  const { themeConfig } = useTheme();
  
  return (
    <div 
      className="p-6 rounded-2xl border text-center"
      style={{
        backgroundColor: `${themeConfig.colors.surface}90`,
        borderColor: `${themeConfig.colors.border}40`,
      }}
    >
      <div className="mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ backgroundColor: `${themeConfig.colors.error}15` }}
        >
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 
          className="text-lg font-bold mb-2"
          style={{ color: themeConfig.colors.error }}
        >
          Something went wrong
        </h3>
        <p 
          className="text-sm opacity-70 mb-4"
          style={{ color: themeConfig.colors.textSecondary }}
        >
          {error?.message || 'An unexpected error occurred'}
        </p>
      </div>
      
      <button
        onClick={reset}
        className="px-4 py-2 rounded-xl font-medium transition-all"
        style={{
          backgroundColor: themeConfig.colors.primary,
          color: themeConfig.colors.secondary,
        }}
      >
        Try again
      </button>
    </div>
  );
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
}
