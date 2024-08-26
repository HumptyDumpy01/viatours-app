// 'use client';
import './ArticleDescrContent.scss';
import { type ReactNode } from 'react';

type ArticleDescrContentType = {
  children: ReactNode;
}

export default function ArticleDescrContent({ children }: ArticleDescrContentType) {
  return (
    <section className="tour-articles-descr__content-wrapper container">
      <div className="tour-articles-descr__content grid">
        {children}
      </div>
    </section>
  );
}
