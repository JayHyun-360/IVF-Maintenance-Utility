"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface SessionDebugInfo {
  exists: boolean;
  status: string;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  hasValidName: boolean;
  hasValidEmail: boolean;
  issues: string[];
}

export function useSessionDebug(): SessionDebugInfo & { isReady: boolean } {
  const { data: session, status } = useSession();
  const [isReady, setIsReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<SessionDebugInfo>({
    exists: false,
    status: "loading",
    hasValidName: false,
    hasValidEmail: false,
    issues: [],
  });

  useEffect(() => {
    const issues: string[] = [];
    const exists = !!session;
    const userName = session?.user?.name;
    const userEmail = session?.user?.email;
    const userRole = session?.user?.role;

    // Check for various session issues
    if (status === "authenticated" && !exists) {
      issues.push("Status is authenticated but session is null");
    }

    if (exists && !session.user) {
      issues.push("Session exists but user object is missing");
    }

    if (exists && session.user && !userName && !userEmail) {
      issues.push("User exists but both name and email are missing");
    }

    if (userEmail && typeof userEmail !== "string") {
      issues.push("Email is not a string");
    }

    if (userName && typeof userName !== "string") {
      issues.push("Name is not a string");
    }

    const hasValidName = !!(
      userName &&
      typeof userName === "string" &&
      userName.trim().length > 0
    );
    const hasValidEmail = !!(
      userEmail &&
      typeof userEmail === "string" &&
      userEmail.includes("@")
    );

    if (!hasValidName && !hasValidEmail) {
      issues.push("No valid user identifier found (name or email)");
    }

    const newDebugInfo: SessionDebugInfo = {
      exists,
      status,
      userName: userName || undefined,
      userEmail: userEmail || undefined,
      userRole: userRole || undefined,
      hasValidName,
      hasValidEmail,
      issues,
    };

    setDebugInfo(newDebugInfo);
    setIsReady(true);

    // Log debug info in development
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 Session Debug Info:", newDebugInfo);
    }
  }, [session, status]);

  return { ...debugInfo, isReady };
}

export function validateSession(session: any): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!session) {
    issues.push("No session provided");
    return { isValid: false, issues };
  }

  if (!session.user) {
    issues.push("Session user object is missing");
    return { isValid: false, issues };
  }

  const { name, email, role } = session.user;

  if (!name && !email) {
    issues.push("Both name and email are missing");
  }

  if (email && typeof email !== "string") {
    issues.push("Email is not a string");
  }

  if (name && typeof name !== "string") {
    issues.push("Name is not a string");
  }

  if (email && !email.includes("@")) {
    issues.push("Email format is invalid");
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
