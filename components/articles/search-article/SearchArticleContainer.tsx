'use client';

import './SearchArticleContainer.scss';
import SearchArticleHeading from '@/components/articles/search-article/SearchArticleHeading';
import SortBy from '@/components/UI/SortBy/SortBy';
// import searchImage7 from '@/assets/images/articles/search-any-article/tour-image-7.png';
// import searchImage8 from '@/assets/images/articles/search-any-article/tour-image-8.png';
// import searchImage9 from '@/assets/images/articles/search-any-article/tour-image-9.png';
// import searchImage10 from '@/assets/images/articles/search-any-article/tour-image-10.png';
// import searchImage11 from '@/assets/images/articles/search-any-article/tour-image-11.png';
import Pagination from '@/components/UI/Pagnation/Pagination';
import React, { useEffect, useState } from 'react';
import SearchResultsCardSkeleton from '@/components/articles/skeletons/SearchResultsCardSkeleton';
import SearchResultsCard from '@/components/articles/search-article/SearchResultsCard';
import NoItemsFound from '@/components/UI/Layout/NoItems/NoItemsFound';

/*type SearchArticleContainerType = {
  /!* TODO: IMPLEMENT A BETTER SCHEMA LATER *!/
  results: []
  // children: ReactNode;
}*/

export type ArticleType = {
  _id: string;
  title: string;
  createdAt: string;
  author: string;
  type: string[];
  image: string;
  country: string;
  readTime: string;
};

export default function SearchArticleContainer(/*{ results }: SearchArticleContainerType*/) {
  const [articles, setArticles] = useState<ArticleType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);


  const articlesPerPage = 6;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentArticles, setCurrentArticles] = useState<ArticleType[]>([]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  /* FETCH ALL ARTICLES */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/fetch-articles`);
        const data = await response.json();

        if (data.error) {
          setError(true);
        }

        setArticles(data.articles);
      } catch (e) {
        console.error(e);
        setError(true);
      }

      setIsLoading(false);
    };

    fetchArticles();

  }, []);


  useEffect(() => {
    setCurrentArticles(articles.slice(indexOfFirstArticle, indexOfLastArticle));
  }, [currentPage, articles]);

  function handleClearFilters() {
  }

  return (
    <section className="search-article-container container">
      <div className="search-article">
        <SearchArticleHeading />
        <div className="search-article-container flex flex-align-center flex-space-between margin-bottom-big">
          <div className="search-article__search-input-container flex flex-align-center">
            <form className="gap-13px flex">
              <label>
                <input type="search" className="search-article__search-input" placeholder="Country, City, Title"
                       required />
              </label>
              <button type="submit" className="btn search-article__search">Search</button>
            </form>
          </div>

          <SortBy handleOnChange={() => {
          }} disabled={isLoading}
                  options={[
                    { value: `default`, label: `Choose` },
                    { value: `all`, label: `All` },
                    { value: `newest`, label: `From Newest` },
                    { value: `oldest`, label: `From Oldest` },
                    { value: `by-views`, label: `By Views` },
                    { value: `ascending`, label: `Ascending(a-z)` },
                    { value: `descending`, label: `Descending(z-a)` },
                    { value: `culture`, label: `Culture` },
                    { value: `historic`, label: `Historic` },
                    { value: `nature`, label: `Nature` },
                    { value: `trips`, label: `Trips` }
                  ]} />
        </div>
      </div>
      <p className="search-results">Search results:</p>

      <div className="search-results-container">
        {(isLoading && !error) && (
          <>
            <SearchResultsCardSkeleton />
            <SearchResultsCardSkeleton />
            <SearchResultsCardSkeleton />
            <SearchResultsCardSkeleton />
            <SearchResultsCardSkeleton />
            <SearchResultsCardSkeleton />
          </>
        )}
        {(!isLoading && !error && currentArticles.length > 0) && (
          <>
            {currentArticles.map(function(article) {
              return (
                <>
                  <SearchResultsCard {...article} />
                </>
              );
            })}
          </>
        )}
        {(!isLoading && !error && currentArticles.length === 0) && (
          <>
          </>
        )}
        {(!isLoading && error) && (
          <p className="subheading">An error occurred while fetching the articles. Please try again later.</p>
        )}
      </div>
      {(!isLoading && currentArticles.length === 0) && (
        <div className={`flex flex-direction-column`}>
          <NoItemsFound buttonLabel={`See All Articles`} clearFilters={handleClearFilters} />
        </div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={articles.length}
                  itemsPerPage={articlesPerPage} />
    </section>
  );
}
