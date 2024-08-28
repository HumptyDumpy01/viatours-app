'use client';

import React, { useEffect, useRef, useState } from 'react';
import './TopArticlesContainer.scss';
import TopArticlesHeading from '@/components/articles/top-articles/TopArticlesHeading';
import BtnBulky from '@/components/UI/Button/BtnBulky';
import { ArticleType } from '@/components/articles/search-article/SearchArticleContainer';
import TopArticlesCardSkeleton from '@/components/articles/skeletons/TopArticlesCardSkeleton';
import TopArticlesCard from '@/components/articles/top-articles/card/TopArticlesCard';

/*type TopArticlesContainerType = {
  /!* TODO: IMPLEMENT A BETTER SCHEMA LATER *!/
  topArticles: [];
}*/

export default function TopArticlesContainer(/*{ topArticles }: TopArticlesContainerType*/) {
  const [newestArticles, setNewestArticles] = useState<ArticleType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchNewestArticles() {
    try {
      const res = await fetch(`/api/fetch-article-by-tag`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ tags: [`top`], limit: 22 })
      });

      const data = await res.json();

      // console.log(`Executing data from newestArticles: `, data);

      if (data.error) {
        setError(true);
        setIsLoading(false);
        return;
      }

      setNewestArticles(data.articles);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNewestArticles();
  }, []);

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
          {isLoading && !error && (
            <div className={`flex gap-13px`}>
              <TopArticlesCardSkeleton />
              <TopArticlesCardSkeleton />
              <TopArticlesCardSkeleton />
            </div>
          )}
          {!isLoading && !error && (
            <div className={`flex gap-13px`}>
              {newestArticles.map(function(article) {
                return (
                  <TopArticlesCard key={article._id} {...article} />
                );
              })}
            </div>
          )}
          {!isLoading && error && (
            <div className="travel-articles__the-newest__error">
              <span className={`subheading`}>Failed to fetch top articles!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}