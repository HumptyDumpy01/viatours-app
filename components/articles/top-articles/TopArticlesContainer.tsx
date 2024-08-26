'use client';

import React, { useRef } from 'react';
import './TopArticlesContainer.scss';
import TopArticlesHeading from '@/components/articles/top-articles/TopArticlesHeading';
import BtnBulky from '@/components/UI/Button/BtnBulky';
import TopArticlesCardContainer from '@/components/articles/top-articles/card/TopArticlesCardContainer';

export default function TopArticlesContainer() {
  const topArticlesContainerRef = useRef<HTMLDivElement>(null);

  function handleScroll(mode: string) {
    const topArticlesContainer = topArticlesContainerRef.current;
    if (topArticlesContainer) {
      if (mode === 'left') {
        topArticlesContainer.scrollLeft -= 500;
      } else {
        topArticlesContainer.scrollLeft += 500;
      }
      topArticlesContainer.style.scrollBehavior = 'smooth';
    }
  }

  return (
    <div className="travel-articles__the-top-articles-container flex">
      <div className="travel-articles__the-top-articles">
        <TopArticlesHeading />
        <BtnBulky onClick={() => handleScroll('left')} mode="left" />
        <BtnBulky onClick={() => handleScroll('right')} mode="right" />
        <div ref={topArticlesContainerRef} className="travel-articles__the-top-articles__card-wrapper">
          <TopArticlesCardContainer />
        </div>
      </div>
    </div>
  );
}