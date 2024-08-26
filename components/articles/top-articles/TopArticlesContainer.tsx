'use client';

import topArticleImg1 from '@/assets/images/articles/top-articles/top-articles-1.png';
import topArticleImg2 from '@/assets/images/articles/top-articles/top-articles-2.png';
import topArticleImg3 from '@/assets/images/articles/top-articles/top-articles-3.png';
import topArticleImg4 from '@/assets/images/articles/top-articles/top-articles-4.png';
import topArticleImg5 from '@/assets/images/articles/top-articles/top-articles-5.png';
import topArticleImg6 from '@/assets/images/articles/top-articles/top-articles-6.png';
import topArticleImg7 from '@/assets/images/articles/top-articles/top-articles-7.png';
import topArticleImg8 from '@/assets/images/articles/top-articles/top-articles-8.png';
import topArticleImg9 from '@/assets/images/articles/top-articles/top-articles-9.png';

import React, { useRef } from 'react';
import './TopArticlesContainer.scss';
import TopArticlesHeading from '@/components/articles/top-articles/TopArticlesHeading';
import BtnBulky from '@/components/UI/Button/BtnBulky';
import TopArticlesCard from '@/components/articles/top-articles/card/TopArticlesCard';

type TopArticlesContainerType = {
  /* TODO: IMPLEMENT A BETTER SCHEMA LATER */
  topArticles: [];
}

export default function TopArticlesContainer({ topArticles }: TopArticlesContainerType) {
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
          <TopArticlesCard imageUrl={topArticleImg1} />
          <TopArticlesCard imageUrl={topArticleImg2} />
          <TopArticlesCard imageUrl={topArticleImg3} />
          <TopArticlesCard imageUrl={topArticleImg4} />
          <TopArticlesCard imageUrl={topArticleImg5} />
          <TopArticlesCard imageUrl={topArticleImg6} />
          <TopArticlesCard imageUrl={topArticleImg7} />
          <TopArticlesCard imageUrl={topArticleImg8} />
          <TopArticlesCard imageUrl={topArticleImg9} />
        </div>
      </div>
    </div>
  );
}