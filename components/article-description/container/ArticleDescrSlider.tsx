'use client';

import { type ReactNode } from 'react';

type ArticleDescrSliderType = {
  children: ReactNode;
}

export default function ArticleDescrSlider({ children }: ArticleDescrSliderType) {
  return (
    <>
      <div className="tour-article-descr__slider-container">
        <div className="tour-article-descr__slider">
          {children}
        </div>
      </div>
    </>
  );
}
