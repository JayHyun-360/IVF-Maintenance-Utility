"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { themeConfig } = useTheme();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    // Redirect based on user role
    if (session.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/student");
    }
  }, [session, status, router]);

  // Show loading state while redirecting
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: themeConfig.colors.background }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p style={{ color: themeConfig.colors.text }}>
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
}
