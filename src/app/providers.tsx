"use client";

import { Toaster } from "@/components/lib/Sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,

      },
      mutations: {
        retry: 0,
      }
    }
  }));

  return (
    <QueryClientProvider client={client} >
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
