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
  const [isChecking] = useState(() => {
    if (status === "loading") return true;
    if (!session) return false;
    if (requiredRole && session.user?.role !== requiredRole) return false;
    return false;
  });

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
