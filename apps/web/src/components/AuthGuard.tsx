"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "USER" | "STAFF";
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requiredRole,
  redirectTo = "/login",
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { themeConfig } = useTheme();
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "loading") {
        setHasTimedOut(true);
        setDebugInfo(
          `Status: ${status}, Session: ${!!session}, Required Role: ${requiredRole}`,
        );
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [status, session, requiredRole]);

  useEffect(() => {
    // Debug logging
    console.log("AuthGuard Debug:", {
      status,
      hasSession: !!session,
      userRole: session?.user?.role,
      requiredRole,
      redirectTo,
    });

    if (status === "loading") return;

    if (!session) {
      console.log("No session found, redirecting to:", redirectTo);
      router.push(redirectTo);
      return;
    }

    if (requiredRole && session.user?.role !== requiredRole) {
      console.log("Role mismatch:", {
        userRole: session.user?.role,
        requiredRole,
      });

      // If user is logged in but doesn't have required role
      if (requiredRole === "ADMIN" && session.user?.role !== "ADMIN") {
        // Redirect non-admin users based on their current role
        if (session.user?.role === "STAFF") {
          router.push("/staff");
        } else {
          router.push("/student");
        }
      } else if (
        requiredRole === "STAFF" &&
        !["ADMIN", "STAFF"].includes(session.user?.role || "")
      ) {
        // Only admin and staff can access staff routes
        router.push("/student");
      } else if (requiredRole === "USER" && session.user?.role === "ADMIN") {
        // Allow admins to access user pages but don't redirect them away
        // They can choose to go back to homepage if needed
      } else {
        router.push("/login"); // Redirect to login for other cases
      }
      return;
    }
  }, [session, status, router, requiredRole, redirectTo]);

  if (status === "loading") {
    // Show timeout state if authentication takes too long
    if (hasTimedOut) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: themeConfig.colors.background }}
        >
          <div className="text-center max-w-md mx-auto p-6">
            <div
              className="rounded-full h-12 w-12 mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${themeConfig.colors.warning}20` }}
            >
              <svg
                className="w-6 h-6"
                style={{ color: themeConfig.colors.warning }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p
              style={{
                color: themeConfig.colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
                marginBottom: "16px",
              }}
            >
              Authentication is taking longer than expected
            </p>
            {debugInfo && (
              <p
                style={{
                  color: themeConfig.colors.textSecondary,
                  fontFamily: "monospace",
                  fontSize: "12px",
                  marginBottom: "16px",
                }}
              >
                {debugInfo}
              </p>
            )}
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: themeConfig.colors.primary,
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginRight: "8px",
                }}
              >
                Refresh Page
              </button>
              <button
                onClick={() => router.push("/login")}
                style={{
                  backgroundColor: themeConfig.colors.textSecondary,
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: themeConfig.colors.primary }}
          ></div>
          <p
            style={{
              color: themeConfig.colors.text,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Verifying access...
          </p>
          <p
            style={{
              color: themeConfig.colors.textSecondary,
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "12px",
              marginTop: "8px",
            }}
          >
            Status: {status}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
