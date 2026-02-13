"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider
      refetchInterval={5 * 60} // Refetch every 5 minutes to prevent stale sessions
      refetchOnWindowFocus={true} // Enable refetch on window focus to sync sessions
    >
      {children}
    </SessionProvider>
  );
}
