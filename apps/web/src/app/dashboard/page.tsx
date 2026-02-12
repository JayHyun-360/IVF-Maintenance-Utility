"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import BackButton from "@/components/BackButton";
import AuthGuard from "@/components/AuthGuard";

function DashboardContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const { themeConfig } = useTheme();

  // Redirect based on user role
  if (session?.user?.role === "ADMIN") {
    console.log("Admin role detected, redirecting to admin dashboard");
    router.push("/admin/dashboard");
  } else if (session?.user?.role === "USER") {
    console.log("User role detected, redirecting to user page");
    router.push("/student");
  } else {
    console.log("Unknown role, defaulting to user page");
    router.push("/student");
  }

  // Show loading state while redirecting
  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <BackButton fallback="/" />
      </div>

      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p style={{ color: themeConfig.colors.text }}>
          Redirecting to your portal...
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard redirectTo="/login">
      <DashboardContent />
    </AuthGuard>
  );
}
