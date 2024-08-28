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
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import SearchResultsCardSkeleton from '@/components/articles/skeletons/SearchResultsCardSkeleton';
import SearchResultsCard from '@/components/articles/search-article/SearchResultsCard';
import NoItemsFound from '@/components/UI/Layout/NoItems/NoItemsFound';
import loadingSpinner from '@/animations/loading-spinner.json';
import Lottie from 'lottie-react';

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
  const [disableSearchBtn, setDisableSearchBtn] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const articlesPerPage = 6;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentArticles, setCurrentArticles] = useState<ArticleType[]>([]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  async function fetchAllArticles() {
    setDisableSearchBtn(true);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/fetch-articles`);
      const data = await response.json();

      if (data.error) {
        setError(true);
      }

      setArticles(data.articles);
      setCurrentArticles(data.articles);
      setCurrentPage(1);
      setIsLoading(false);
      setDisableSearchBtn(false);
    } catch (e) {
      console.error(e);
      setError(true);
      setIsLoading(false);
    }
  }

  /* FETCH ALL ARTICLES */
  useEffect(() => {
    fetchAllArticles();
  }, []);


  useEffect(() => {
    setCurrentArticles(articles.slice(indexOfFirstArticle, indexOfLastArticle));
  }, [currentPage, articles]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setDisableSearchBtn(true);
    setIsLoading(true);
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    // implement search functionality by creating a function that will filter the articles based on the search term
    // and then set the current articles to the filtered articles
    const response = await fetch(`/api/search-articles`, {
      method: `POST`,
      body: JSON.stringify({
        searchTerm: results.searchTerm
      })
    }).then(res => res.json());

    // console.log(`response:`, response);
    if (response.error) {
      setError(true);
    }
    setCurrentArticles(response.articles);
    setArticles(response.articles);
    // console.log(`response.articles:`, response.articles);
    setCurrentPage(1);
    setIsLoading(false);

    timer.current = setTimeout(() => {
      setDisableSearchBtn(false);
    }, 2000);
  }

  function handleSortArticles(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as `all` | `newest` | `oldest` | `by-views` | `ascending` | `descending` | `culture` | `historic` | `nature` | `trips`;
    console.log(`value:`, value);

    /* INFO: the point is, that all, all values should only filter articles that are currently on the screen, including paginated ones, if any.
    *   the difference is the "all" value because when it chosen, I just do need to fetch all articles again.*/

  }

  return (
    <section className="search-article-container container">
      <div className="search-article">
        <SearchArticleHeading />
        <div className="search-article-container flex flex-align-center flex-space-between margin-bottom-big">
          <div className="search-article__search-input-container flex flex-align-center">
            <form onSubmit={handleSubmit} className="gap-13px flex">
              <label>
                <input name={`searchTerm`} type="search" className="search-article__search-input"
                       placeholder="Country, City, Title" />
              </label>
              <div className={`flex`}>
                <button disabled={isLoading || disableSearchBtn} type="submit"
                        className={`btn search-article__search ${isLoading || disableSearchBtn ? `search-article__search-disabled` : ``}`}>Search
                </button>
                {isLoading || disableSearchBtn && (
                  <div className={`loading-spinner-search`}>
                    <Lottie animationData={loadingSpinner} />
                  </div>
                )}
              </div>
            </form>
          </div>

          <SortBy handleOnChange={handleSortArticles} disabled={isLoading || disableSearchBtn}
                  options={[
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
      <p className="search-results">Search results({articles.length}):</p>

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
                  <SearchResultsCard
                    image={article.image}
                    type={article.type}
                    title={article.title}
                    author={article.author}
                    _id={article._id}
                    createdAt={article.createdAt}
                  />
                </>
              );
            })}
          </>
        )}
        {(!isLoading && error) && (
          <p className="subheading">An error occurred while fetching the articles. Please try again later.</p>
        )}
      </div>
      {(!isLoading && currentArticles.length === 0) && (
        <div className={`flex flex-direction-column`}>
          <NoItemsFound buttonLabel={`See All Articles`} clearFilters={() => fetchAllArticles()} />
        </div>
      )}
      <Pagination scrollToElem={{
        className: `.search-article__header`,
        offset: 100
      }} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={articles.length}
                  itemsPerPage={articlesPerPage} />
    </section>
  );
}
