"use client";

import { ReactNode, useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useAnalytics } from "@/hooks/use-analytics";
import { useGoogleAnalytics } from "@/hooks/use-google-analytics";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  useGoogleAnalytics();
  useAnalytics();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
        <SonnerToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
