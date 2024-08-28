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

export default function NewestArticlesContainer(/*{ newestArticles }: NewestArticlesContainerType*/) {

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
        body: JSON.stringify({ tags: [`new`] })
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
      <div className="travel-articles__the-newest">
        <span className="travel-articles__the-newest__subheading subheading">The hottest articles you ever saw!</span>
        <ArticlesContainerCardsHeading heading={`The Newest`} buttonLabel={`See all`} />
        <div className="travel-articles__the-newest__card-container flex gap-15px">
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
                  <>
                    <SearchResultsCard {...article} />
                  </>
                );
              })}

            </>
          )}
        </div>
      </div>
    </>
  );
}
