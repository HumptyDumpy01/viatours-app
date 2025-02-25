'use client';

import React, { useEffect, useRef, useState } from 'react';
import './TopArticlesContainer.scss';
import TopArticlesHeading from '@/components/articles/top-articles/TopArticlesHeading';
import BtnBulky from '@/components/UI/Button/BtnBulky';
import { ArticleType } from '@/components/articles/search-article/SearchArticleContainer';
import TopArticlesCardSkeleton from '@/components/articles/skeletons/TopArticlesCardSkeleton';
import TopArticlesCard from '@/components/articles/top-articles/card/TopArticlesCard';
import { motion } from 'framer-motion';

/*type TopArticlesContainerType = {
  topArticles: [];
}*/

export default function TopArticlesContainer(/*{ topArticles }: TopArticlesContainerType*/) {
  const [topArticles, setTopArticles] = useState<ArticleType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchTopArticles() {
    try {
      const res = await fetch(`/api/fetch-articles-by-tag`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ tags: [`top`], limit: 22 })
      });

      const data = await res.json();

      if (data.error) {
        setError(true);
        setIsLoading(false);
        return;
      }

      setTopArticles(data.articles);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTopArticles();
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
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 1 }}
      className="travel-articles__the-top-articles-container flex">
      <div className="travel-articles__the-top-articles">
        <TopArticlesHeading linkVisible={false} />
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
              {topArticles.map(function(article) {
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
    </motion.div>
  );
}