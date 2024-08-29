'use client';

/*type NewestArticlesContainerType = {
  /!* TODO: IMPLEMENT A BETTER SCHEMA LATER *!/
  newestArticles: []
  // children: ReactNode;
}*/

import ArticlesContainerCardsHeading from '@/components/articles/card/ArticlesContainerCardsHeading';
import SearchResultsCardSkeleton from '@/components/articles/skeletons/SearchResultsCardSkeleton';
import { useEffect, useState } from 'react';
import { ArticleType } from '@/components/articles/search-article/SearchArticleContainer';
import SearchResultsCard from '@/components/articles/search-article/SearchResultsCard';
import { motion } from 'framer-motion';

export default function NewestArticlesContainer(/*{ newestArticles }: NewestArticlesContainerType*/) {

  const [newestArticles, setNewestArticles] = useState<ArticleType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchNewestArticles() {
    try {
      const res = await fetch(`/api/fetch-articles-by-tag`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ tags: [`new`], limit: 22 })
      });

      const data = await res.json();

      console.log(`Executing data: `, data);

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 1 }}
        className="travel-articles__the-newest">
        <span className="travel-articles__the-newest__subheading subheading">The hottest articles you ever saw!</span>
        <ArticlesContainerCardsHeading linkVisible={false} heading={`The Newest`} buttonLabel={`See all`} />
        <div className="travel-articles__the-newest__card-container flex">
          {(isLoading && !error) && (
            <>
              <SearchResultsCardSkeleton />
              <SearchResultsCardSkeleton />
              <SearchResultsCardSkeleton />
              <SearchResultsCardSkeleton />
            </>
          )}
          {(!isLoading && !error) && (
            <>
              {newestArticles.map(function(article) {
                return (
                  <SearchResultsCard key={article._id} {...article} />
                );
              })}

            </>
          )}
          {!isLoading && error && (
            <div className="travel-articles__the-newest__error">
              <span className={`subheading`}>Failed to fetch newest articles!</span>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
