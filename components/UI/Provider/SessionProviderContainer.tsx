'use client';

import { type ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type SessionProviderContainerType = {
  children: ReactNode;
}

export default function SessionProviderContainer({ children }: SessionProviderContainerType) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
