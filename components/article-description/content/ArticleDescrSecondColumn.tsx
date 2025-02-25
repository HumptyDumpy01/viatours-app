'use client';

import ArticleContentCard from '@/components/article-description/content/ArticleContentCard';
import ArticleContentTopCreatorCard from '@/components/article-description/content/ArticleContentTopCreatorCard';
import React, { useEffect, useState } from 'react';
import { ArticleType } from '@/components/articles/search-article/SearchArticleContainer';
import TopArticlesCardSkeleton from '@/components/articles/skeletons/TopArticlesCardSkeleton';
import { ArticleAuthorType } from '@/app/articles/[id]/page';
import ArticleContentTopCreatorCardSkeleton
  from '@/components/article-description/top-authors/ArticleContentTopCreatorCardSkeleton';

export default function ArticleDescrSecondColumn(/*{ articles }: any*/) {
  const [topArticles, setTopArticles] = useState<ArticleType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [topAuthors, setTopAuthors] = useState<ArticleAuthorType[] | []>([]);
  const [isAuthorsLoading, setIsAuthorsLoading] = useState<boolean>(true);
  const [authorsError, setAuthorsError] = useState<boolean>(false);

  async function fetchTopArticles() {
    try {
      const res = await fetch(`/api/fetch-articles-by-tag`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ tags: [`top`], limit: 3 })
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

  async function fetchArticleAuthors() {
    const res = await fetch(`/api/fetch-articles-authors`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({
        project: { firstName: 1, lastName: 1, employment: 1, image: 1, rating: 1 },
        limit: 3
      })
    });

    const data = await res.json();

    if (data.error) {
      setAuthorsError(true);
      setIsAuthorsLoading(false);
      return;
    }

    // push only the authors with the rating of 4 - 5 and the limit of 3 authors.
    // also push only the authors with the rating array number count at least 3.
    const filteredAuthors = data.authors.filter((author: ArticleAuthorType) => {
      return author.rating.reduce((acc: number, i: number) => acc + i, 0) / author.rating.length >= 4 && author.rating.length >= 3;
    });
    setTopAuthors(filteredAuthors);
    setIsAuthorsLoading(false);

  }

  useEffect(() => {
    fetchTopArticles();
    fetchArticleAuthors();
  }, []);

  return (
    <>
      <div className="tour-articles-descr__content-2">
        <h3 className="tour-articles-descr__content-2__heading">Top Stories</h3>

        <div className="tour-articles-descr__content-2-cards">
          {(isLoading && !error) && (
            <>
              <div className={`flex gap-13px flex-direction-column`}>
                <TopArticlesCardSkeleton />
                <TopArticlesCardSkeleton />
                <TopArticlesCardSkeleton />
              </div>
            </>
          )}
          {!isLoading && !error && (
            <>
              {topArticles.map(function(topArticle) {
                return (
                  <ArticleContentCard key={topArticle._id} {...topArticle} />
                );
              })}
            </>
          )}
        </div>

        <div className="tour-articles-descr__content-2__top-creators">
          <h3 className="tour-articles-descr__content-2__heading">Top Creators</h3>
          <div className="tour-articles-descr__content-2__top-creators-wrapper">
            {(!isAuthorsLoading && !authorsError) && (
              <>
                {topAuthors.map(function(item) {
                  return (
                    <>
                      <ArticleContentTopCreatorCard image={item.image} name={`${item.firstName} ${item.lastName}`}
                                                    role={item.employment} />
                    </>
                  );
                })}

              </>
            )}
            {(isAuthorsLoading && !authorsError) && (
              <>
                <ArticleContentTopCreatorCardSkeleton />
                <ArticleContentTopCreatorCardSkeleton />
                <ArticleContentTopCreatorCardSkeleton />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
