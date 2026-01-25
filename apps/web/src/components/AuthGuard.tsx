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
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push(redirectTo);
      return;
    }

    if (requiredRole && session.user?.role !== requiredRole) {
      // If user is logged in but doesn't have required role
      if (requiredRole === "ADMIN" && session.user?.role !== "ADMIN") {
        router.push("/"); // Redirect non-admin users to home
      } else {
        router.push("/login"); // Redirect to login for other cases
      }
      return;
    }

    setIsChecking(false);
  }, [session, status, router, requiredRole, redirectTo]);

  if (status === "loading" || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
