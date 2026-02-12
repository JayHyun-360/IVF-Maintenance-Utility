"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import BackButton from "@/components/BackButton";
import AuthGuard from "@/components/AuthGuard";
import { useEffect } from "react";

function DashboardContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const { themeConfig } = useTheme();

  // Redirect based on user role - use useEffect for proper redirect handling
  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      console.log("Admin role detected, redirecting to admin dashboard");
      router.replace("/admin/dashboard");
    } else if (session?.user?.role === "STAFF") {
      console.log("Staff role detected, redirecting to staff dashboard");
      router.replace("/staff");
    } else if (session?.user?.role === "USER") {
      console.log("User role detected, redirecting to user page");
      router.replace("/student");
    } else if (session?.user?.role === "STUDENT") {
      console.log("Student role detected, redirecting to student page");
      router.replace("/student");
    } else {
      console.log("Unknown role, defaulting to student page");
      router.replace("/student");
    }
  }, [session, router]);

  // Show minimal loading only while session loads
  if (!session) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{ backgroundColor: themeConfig.colors.background }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p style={{ color: themeConfig.colors.text, fontSize: "14px" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Return null while redirecting
  return null;
}

export default function DashboardPage() {
  return (
    <AuthGuard redirectTo="/login">
      <DashboardContent />
    </AuthGuard>
  );
}
