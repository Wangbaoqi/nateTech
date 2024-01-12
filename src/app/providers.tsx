'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// create client
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
