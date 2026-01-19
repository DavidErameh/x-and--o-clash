'use client';

import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <GeistProvider themeType="dark">
        <CssBaseline />
        {children}
      </GeistProvider>
    </ThemeProvider>
  );
}
