'use client';

import './YouMightAlsoLike.scss';
import { TypesType } from '@/lib/mongodb';
import { useEffect, useState } from 'react';
import SearchResultsCardSkeleton from '@/components/articles/skeletons/SearchResultsCardSkeleton';
import ArticlesCard from '@/components/articles/card/ArticlesCard';
import { SearchResultsCardType } from '@/components/articles/search-article/SearchResultsCard';

type YouMightAlsoLikeType = {
  types: TypesType[];
  // children: ReactNode;
}

export default function YouMightAlsoLike({ types }: YouMightAlsoLikeType) {

  /* FETCH SIMILAR ARTICLES BASED ON THE TYPE */
  const [articles, setArticles] = useState<SearchResultsCardType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(`Executing types: `, types);
  useEffect(() => {
    async function fetchSimilarArticles() {
      const response = await fetch(`/api/fetch-articles-by-type`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          type: types,
          limit: 22
        })
      }).then(res => res.json());
      if (response.error) {
        setError(true);
        setIsLoading(false);
        return;
      }
      setArticles(response.articles);
      setIsLoading(false);

    }

    fetchSimilarArticles();
  }, []);


  return (
    <section className="you-might-also-like-article-descr-container">
      <div className="you-might-also-like-article-descr container">
        <h2 className="you-might-also-like-article-descr__heading secondary-heading">You might also like...</h2>

        <div className="search-results-container-you-might-like overflow-x-auto padding-top-5rem">
          {(isLoading && !error) && (
            <>
              <SearchResultsCardSkeleton mode={`light`} />
              <SearchResultsCardSkeleton mode={`light`} />
              <SearchResultsCardSkeleton mode={`light`} />
              <SearchResultsCardSkeleton mode={`light`} />
            </>
          )}
          {(error && !isLoading) && (
            <p className={`subheading`}>Something went wrong...</p>
          )}
          {(!isLoading && !error) && (
            <div className={`flex margin-top-huge`}>
              {articles.map(function(article) {
                return (
                  <ArticlesCard key={article._id} {...article} />
                );
              })}
            </div>
          )}
          {(!isLoading && articles.length === 0) && (
            <p className={`subheading`}>No similar articles found...</p>
          )}
        </div>
      </div>
    </section>
  );
}
