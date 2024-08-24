// 'use client';
import './ArticlesContainer.scss';
import { type ReactNode } from 'react';

type ArticlesContainerType = {
  children: ReactNode;
}

export default function ArticlesContainer({ children }: ArticlesContainerType) {
  return (
    <section className="travel-articles-container">
      {children}
    </section>
  );
}
