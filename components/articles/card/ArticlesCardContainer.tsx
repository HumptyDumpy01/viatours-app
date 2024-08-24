// 'use client';

import { type ReactNode } from 'react';

type ArticlesCardContainerType = {
  children: ReactNode;
}


export default function ArticlesCardContainer({ children }: ArticlesCardContainerType) {
  return (
    <>
      {children}
    </>
  );
}
