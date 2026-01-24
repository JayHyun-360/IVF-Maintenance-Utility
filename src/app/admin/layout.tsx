"use client";

import AuthGuard from "@/components/AuthGuard";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthGuard>{children}</AuthGuard>
    </ThemeProvider>
  );
}
