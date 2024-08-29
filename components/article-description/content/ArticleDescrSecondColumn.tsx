'use client';

import topCreatorImg1 from '@/assets/images/article-descr/top-creators/top-creator-img-1.svg';
import topCreatorImg2 from '@/assets/images/article-descr/top-creators/top-creator-img-2.svg';
import topCreatorImg3 from '@/assets/images/article-descr/top-creators/top-creator-img-3.svg';

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

      // console.log(`Executing data from newestArticles: `, data);

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
  }

  useEffect(() => {
    fetchTopArticles();
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
                <ArticleContentTopCreatorCard image={topCreatorImg1.src} name={`Nika Bobson`} role={`Travel Writer`} />
                <ArticleContentTopCreatorCard image={topCreatorImg2.src} name={`Nika Bobson`} role={`Travel Writer`} />
                <ArticleContentTopCreatorCard image={topCreatorImg3.src} name={`Nika Bobson`} role={`Travel Writer`} />
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
