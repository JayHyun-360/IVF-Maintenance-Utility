"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "USER";
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requiredRole,
  redirectTo = "/login",
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [isChecking] = useState(() => {
    if (status === "loading") return true;
    if (!session) return false;
    if (requiredRole && session.user?.role !== requiredRole) return false;
    return false;
  });

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "loading") {
        setHasTimedOut(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push(redirectTo);
      return;
    }

    if (requiredRole && session.user?.role !== requiredRole) {
      // If user is logged in but doesn't have required role
      if (requiredRole === "ADMIN" && session.user?.role !== "ADMIN") {
        router.push("/student"); // Redirect non-admin users to user dashboard
      } else if (requiredRole === "USER" && session.user?.role === "ADMIN") {
        // Allow admins to access user pages but don't redirect them away
        // They can choose to go back to homepage if needed
      } else {
        router.push("/login"); // Redirect to login for other cases
      }
      return;
    }
  }, [session, status, router, requiredRole, redirectTo]);

  if (status === "loading" || isChecking) {
    // Show timeout state if authentication takes too long
    if (hasTimedOut) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="text-center">
            <div
              className="rounded-full h-12 w-12 mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#FEF3C7" }}
            >
              <svg
                className="w-6 h-6 text-yellow-600"
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
                color: "#64748B",
                fontFamily: "Inter, system-ui, sans-serif",
                marginBottom: "16px",
              }}
            >
              Authentication is taking longer than expected
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#1B4332",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#1B4332" }}
          ></div>
          <p
            style={{
              color: "#64748B",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
