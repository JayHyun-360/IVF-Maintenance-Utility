"use client";

import React, { forwardRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  useMobileOptimizations,
  useHapticFeedback,
} from "@/hooks/useMobileOptimizations";

// Mobile-optimized input component
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "search" | "numeric";
}

export const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      className = "",
      ...props
    },
    ref,
  ) => {
    const { themeConfig } = useTheme();
    const { isMobile } = useMobileOptimizations();
    const { triggerLightHaptic } = useHapticFeedback();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      triggerLightHaptic();
      props.onFocus?.(e);
    };

    const getInputType = () => {
      if (variant === "numeric") return "tel";
      if (variant === "search") return "search";
      return props.type || "text";
    };

    const getInputMode = () => {
      if (variant === "numeric") return "numeric";
      if (variant === "search") return "search";
      return undefined;
    };

    return (
      <div className="w-full">
        {label && (
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: themeConfig.colors.text }}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={getInputType()}
            inputMode={getInputMode()}
            className={`
              w-full px-4 py-3 rounded-xl border transition-all duration-200
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${error ? "border-red-500" : ""}
              ${className}
            `}
            style={{
              backgroundColor: themeConfig.colors.background,
              borderColor: error
                ? themeConfig.colors.error
                : themeConfig.colors.border,
              color: themeConfig.colors.text,
              fontSize: isMobile ? "16px" : "14px", // Prevents zoom on iOS
              minHeight: isMobile ? "44px" : "40px",
            }}
            onFocus={handleFocus}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            className="mt-1 text-xs"
            style={{ color: themeConfig.colors.error }}
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            className="mt-1 text-xs"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

MobileInput.displayName = "MobileInput";

// Mobile-optimized textarea component
interface MobileTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoResize?: boolean;
}

export const MobileTextarea = forwardRef<
  HTMLTextAreaElement,
  MobileTextareaProps
>(
  (
    { label, error, helperText, autoResize = false, className = "", ...props },
    ref,
  ) => {
    const { themeConfig } = useTheme();
    const { isMobile } = useMobileOptimizations();
    const { triggerLightHaptic } = useHapticFeedback();

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || textareaRef;

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      triggerLightHaptic();
      props.onFocus?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && mergedRef?.current) {
        mergedRef.current.style.height = "auto";
        mergedRef.current.style.height = `${mergedRef.current.scrollHeight}px`;
      }
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: themeConfig.colors.text }}
          >
            {label}
          </label>
        )}

        <textarea
          ref={mergedRef}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          style={{
            backgroundColor: themeConfig.colors.background,
            borderColor: error
              ? themeConfig.colors.error
              : themeConfig.colors.border,
            color: themeConfig.colors.text,
            fontSize: isMobile ? "16px" : "14px",
            minHeight: isMobile ? "100px" : "80px",
          }}
          onFocus={handleFocus}
          onChange={handleChange}
          {...props}
        />

        {error && (
          <p
            className="mt-1 text-xs"
            style={{ color: themeConfig.colors.error }}
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            className="mt-1 text-xs"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

MobileTextarea.displayName = "MobileTextarea";

// Mobile-optimized select component
interface MobileSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const MobileSelect = forwardRef<HTMLSelectElement, MobileSelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      className = "",
      ...props
    },
    ref,
  ) => {
    const { themeConfig } = useTheme();
    const { isMobile } = useMobileOptimizations();
    const { triggerLightHaptic } = useHapticFeedback();

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      triggerLightHaptic();
      props.onFocus?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: themeConfig.colors.text }}
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200 appearance-none
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          style={{
            backgroundColor: themeConfig.colors.background,
            borderColor: error
              ? themeConfig.colors.error
              : themeConfig.colors.border,
            color: themeConfig.colors.text,
            fontSize: isMobile ? "16px" : "14px",
            minHeight: isMobile ? "44px" : "40px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${themeConfig.colors.textSecondary.slice(1)}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "20px",
            paddingRight: "40px",
          }}
          onFocus={handleFocus}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p
            className="mt-1 text-xs"
            style={{ color: themeConfig.colors.error }}
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            className="mt-1 text-xs"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

MobileSelect.displayName = "MobileSelect";

// Mobile-optimized checkbox component
interface MobileCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const MobileCheckbox = forwardRef<HTMLInputElement, MobileCheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const { themeConfig } = useTheme();
    const { triggerLightHaptic } = useHapticFeedback();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      triggerLightHaptic();
      props.onChange?.(e);
    };

    return (
      <div className="flex items-start space-x-3">
        <input
          ref={ref}
          type="checkbox"
          className={`
            w-5 h-5 rounded border-2 transition-all duration-200
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          style={{
            backgroundColor: props.checked
              ? themeConfig.colors.primary
              : themeConfig.colors.background,
            borderColor: error
              ? themeConfig.colors.error
              : themeConfig.colors.border,
            color: props.checked ? "white" : themeConfig.colors.text,
          }}
          onChange={handleChange}
          {...props}
        />

        {label && (
          <label
            className="text-sm font-medium leading-tight cursor-pointer"
            style={{ color: themeConfig.colors.text }}
            onClick={() => {
              triggerLightHaptic();
              const checkbox = ref as React.RefObject<HTMLInputElement>;
              if (checkbox?.current) {
                checkbox.current.checked = !checkbox.current.checked;
                checkbox.current.dispatchEvent(
                  new Event("change", { bubbles: true }),
                );
              }
            }}
          >
            {label}
          </label>
        )}

        {error && (
          <p
            className="mt-1 text-xs"
            style={{ color: themeConfig.colors.error }}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

MobileCheckbox.displayName = "MobileCheckbox";

// Mobile-optimized button component
interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const { themeConfig } = useTheme();
    const { isMobile } = useMobileOptimizations();
    const { triggerLightHaptic } = useHapticFeedback();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading && !disabled) {
        triggerLightHaptic();
        props.onClick?.(e);
      }
    };

    const getVariantStyles = () => {
      switch (variant) {
        case "secondary":
          return {
            backgroundColor: themeConfig.colors.surface,
            color: themeConfig.colors.text,
            border: `1px solid ${themeConfig.colors.border}`,
          };
        case "outline":
          return {
            backgroundColor: "transparent",
            color: themeConfig.colors.primary,
            border: `1px solid ${themeConfig.colors.primary}`,
          };
        case "ghost":
          return {
            backgroundColor: "transparent",
            color: themeConfig.colors.text,
            border: "none",
          };
        default:
          return {
            backgroundColor: themeConfig.colors.primary,
            color: "white",
            border: "none",
          };
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case "small":
          return "px-3 py-2 text-sm";
        case "large":
          return "px-6 py-4 text-base";
        default:
          return "px-4 py-3 text-sm";
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          w-full rounded-xl font-medium transition-all duration-200
          flex items-center justify-center space-x-2
          ${getSizeStyles()}
          ${disabled || loading ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]"}
          ${className}
        `}
        style={{
          minHeight: isMobile ? "44px" : "40px",
          ...getVariantStyles(),
        }}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
    );
  },
);

MobileButton.displayName = "MobileButton";
