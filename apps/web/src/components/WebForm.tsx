"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";

interface WebFormProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit?: (data: any) => void;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

interface WebFormFieldProps {
  label?: string;
  name: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "date"
    | "time"
    | "datetime-local"
    | "password"
    | "select"
    | "textarea";
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: string;
  options?: Array<{ label: string; value: string | number }>;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  autoFocus?: boolean;
}

interface WebFormSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function WebForm({
  children,
  title,
  subtitle,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  loading = false,
  disabled = false,
  className = "",
}: WebFormProps) {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && !loading && !disabled) {
      onSubmit(formData);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border ${className}`}
      style={{ borderColor: themeConfig.colors.border }}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div
          className="px-4 py-4 border-b"
          style={{ borderColor: themeConfig.colors.border }}
        >
          {title && (
            <h2
              className="text-lg font-semibold"
              style={{
                color: themeConfig.colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className="text-sm mt-1"
              style={{
                color: themeConfig.colors.textSecondary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === WebFormField) {
            const childProps = child.props as WebFormFieldProps;
            return React.cloneElement(child, {
              value: formData[childProps.name] || "",
              onChange: (value: string | number) => {
                setFormData((prev: any) => ({
                  ...prev,
                  [childProps.name]: value,
                }));
              },
            } as any);
          }
          return child;
        })}

        {/* Actions */}
        <div
          className="flex items-center justify-end space-x-3 pt-4 border-t"
          style={{ borderColor: themeConfig.colors.border }}
        >
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50 active:scale-95"
              style={{
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            type="submit"
            disabled={loading || disabled}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: themeConfig.colors.primary,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {loading ? "Submitting..." : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}

export function WebFormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  helper,
  options = [],
  min,
  max,
  step,
  className = "",
  autoFocus = false,
}: WebFormFieldProps) {
  const { themeConfig } = useTheme();
  const { isMobile } = useMobileOptimizations();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const newValue =
      type === "number" ? parseFloat(e.target.value) || "" : e.target.value;
    onChange?.(newValue);
  };

  const getInputProps = () => {
    const baseProps = {
      id: name,
      name,
      value: value || "",
      onChange: handleChange,
      required,
      disabled,
      autoFocus,
      className: `
        w-full px-3 py-2 text-sm rounded-lg border transition-colors
        ${error ? "border-red-500" : "border-gray-300"}
        ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${className}
      `,
      style: {
        fontFamily: "Inter, system-ui, sans-serif",
        borderColor: error
          ? themeConfig.colors.error
          : themeConfig.colors.border,
      },
      placeholder,
    };

    if (type === "number") {
      return {
        ...baseProps,
        type: "number" as const,
        inputMode: "decimal" as const,
        pattern: "[0-9]*",
        min,
        max,
        step: step || "any",
      };
    }

    if (type === "tel") {
      return {
        ...baseProps,
        type: "tel" as const,
        inputMode: "tel" as const,
      };
    }

    if (type === "email") {
      return {
        ...baseProps,
        type: "email" as const,
        inputMode: "email" as const,
      };
    }

    if (type === "password") {
      return {
        ...baseProps,
        type: "password" as const,
      };
    }

    return {
      ...baseProps,
      type: type as any,
    };
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-1"
          style={{
            color: themeConfig.colors.text,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea {...getInputProps()} rows={4} />
      ) : type === "select" ? (
        <select {...getInputProps()}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...getInputProps()} />
      )}

      {helper && !error && (
        <p
          className="text-xs mt-1"
          style={{
            color: themeConfig.colors.textSecondary,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {helper}
        </p>
      )}

      {error && (
        <p
          className="text-xs mt-1 text-red-600"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function WebFormSection({
  title,
  subtitle,
  children,
  className = "",
}: WebFormSectionProps) {
  const { themeConfig } = useTheme();

  return (
    <div className={`space-y-4 ${className}`}>
      {(title || subtitle) && (
        <div>
          {title && (
            <h3
              className="text-base font-semibold"
              style={{
                color: themeConfig.colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              className="text-sm mt-1"
              style={{
                color: themeConfig.colors.textSecondary,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Specialized field components for maintenance logging
export function TemperatureField(props: Omit<WebFormFieldProps, "type">) {
  return (
    <WebFormField
      {...props}
      type="number"
      step={0.1}
      min={-50}
      max={100}
      placeholder="e.g., 37.5"
      helper="Temperature in Celsius"
    />
  );
}

export function GasReadingField(props: Omit<WebFormFieldProps, "type">) {
  return (
    <WebFormField
      {...props}
      type="number"
      step={0.01}
      min={0}
      max={100}
      placeholder="e.g., 5.00"
      helper="Gas concentration percentage"
    />
  );
}

export function PhoneNumberField(props: Omit<WebFormFieldProps, "type">) {
  return (
    <WebFormField
      {...props}
      type="tel"
      placeholder="+1 (555) 123-4567"
      helper="Include country code for international numbers"
    />
  );
}
