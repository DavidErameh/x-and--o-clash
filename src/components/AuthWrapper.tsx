"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
