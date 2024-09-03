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
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { articlesSliceActions } from '@/store/articlesSlice';

/*type SearchArticleContainerType = {
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
  views: number;
};

export default function SearchArticleContainer(/*{ results }: SearchArticleContainerType*/) {
  const [articles, setArticles] = useState<ArticleType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disableSearchBtn, setDisableSearchBtn] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useCartDispatch();

  const heroSearchTerm = useCartSelector((state) => state.articles.searchTerm);
  const heroTagChosen = useCartSelector((state) => state.articles.tag);

  const isHeroSearchBtnClicked = useCartSelector((state) => state.articles.searchHeroBtnClicked);

  const articlesPerPage = 6;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentArticles, setCurrentArticles] = useState<ArticleType[]>([]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  async function searchArticles(results: { searchTerm: string }) {

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
    return response;
  }

  async function fetchAllArticles() {
    setDisableSearchBtn(true);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/fetch-articles`, {
        method: `POST`,
        body: JSON.stringify({})
      });
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

  async function filterArticlesByTag() {
    setDisableSearchBtn(true);
    setIsLoading(true);
    const fetchArticlesFilteredByType = await fetch(`/api/fetch-articles-by-type`, {
      method: `POST`,
      body: JSON.stringify({
        type: [heroTagChosen]
      })
    }).then(res => res.json());

    if (fetchArticlesFilteredByType.error) {
      setError(true);
      setIsLoading(false);
      setDisableSearchBtn(false);
      return;
    }
    setArticles(fetchArticlesFilteredByType.articles);
    setCurrentArticles(fetchArticlesFilteredByType.articles);
    setCurrentPage(1);
    setIsLoading(false);

    timer.current = setTimeout(() => {
      setDisableSearchBtn(false);
    }, 2000);

    console.log(`fetchArticlesFilteredByType:`, fetchArticlesFilteredByType);
    dispatch(articlesSliceActions.resetArticlesState());
  }

  useEffect(() => {

    // if the user did not enter the search term,
    // then return all articles but filtered by type (because it is mandatory anyway.)
    if (heroSearchTerm.trim() === `searchAll`) {
      filterArticlesByTag();
      return;
    }

    // if the user entered the search term, then filter the articles by the search term and the type
    if (heroSearchTerm.trim() !== `` && heroSearchTerm !== `searchAll`
      && heroTagChosen !== ``) {
      // Fetch articles based on term. Each document contains a "type" param.
      // Use filter to filter the articles based on the type and the search term
      // and them set the current articles to the filtered articles
      const response = searchArticles({ searchTerm: heroSearchTerm }).then(res => {
        return res;
      }).then((res) => {
        console.log(`res:`, res);

        // @ts-ignore
        const filteredArticles = res.articles.filter(article => article.type.includes(heroTagChosen));
        setCurrentArticles(filteredArticles);
        setArticles(filteredArticles);
        setCurrentPage(1);
      });
    }


  }, [isHeroSearchBtnClicked, heroSearchTerm, heroTagChosen]);

  useEffect(() => {
    setCurrentArticles(articles.slice(indexOfFirstArticle, indexOfLastArticle));
  }, [currentPage, articles]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setDisableSearchBtn(true);
    setIsLoading(true);
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { searchTerm: string };

    searchArticles(results);
  }

  function setNewValues(articlesCopy: ArticleType[], currentArticlesCopy: ArticleType[]) {
    setArticles(articlesCopy);
    setCurrentArticles(currentArticlesCopy);
    setCurrentPage(1);
  }

  function handleSortArticles(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as `all` | `newest` | `oldest` | `by-views` | `ascending` | `descending` | `culture` | `historic` | `nature` | `trips`;
    const articlesCopy = [...articles];
    const currentArticlesCopy = [...currentArticles];
    console.log(`value:`, value);

    /* INFO: the point is, that all, all values should only filter articles that are currently on the screen, including paginated ones, if any.
    *   the difference is the "all" value because when it chosen, I just do need to fetch all articles again.*/
    if (value === `all`) {
      setCurrentPage(1);
      fetchAllArticles();
      return;
    }

    if (value === `newest`) {
      articlesCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      currentArticlesCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNewValues(articlesCopy, currentArticlesCopy);
    }

    if (value === `oldest`) {
      articlesCopy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      currentArticlesCopy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setNewValues(articlesCopy, currentArticlesCopy);
    }

    if (value === `by-views`) {
      articlesCopy.sort((a, b) => b.views - a.views);
      currentArticlesCopy.sort((a, b) => b.views - a.views);
      setNewValues(articlesCopy, currentArticlesCopy);
    }

    if (value === `ascending`) {
      articlesCopy.sort((a, b) => a.title.localeCompare(b.title));
      currentArticlesCopy.sort((a, b) => a.title.localeCompare(b.title));
      setNewValues(articlesCopy, currentArticlesCopy);
    }

    if (value === `descending`) {
      articlesCopy.sort((a, b) => b.title.localeCompare(a.title));
      currentArticlesCopy.sort((a, b) => b.title.localeCompare(a.title));
      setNewValues(articlesCopy, currentArticlesCopy);
    }

    if (value === `trips`) {
      const filteredArticles = articlesCopy.filter(article => article.type.includes(`trips`));
      const filteredCurrentArticles = currentArticlesCopy.filter(article => article.type.includes(`trips`));
      setNewValues(filteredArticles, filteredCurrentArticles);
    }
    if (value === `culture`) {
      const filteredArticles = articlesCopy.filter(article => article.type.includes(`culture`));
      const filteredCurrentArticles = currentArticlesCopy.filter(article => article.type.includes(`culture`));
      setNewValues(filteredArticles, filteredCurrentArticles);
    }
    if (value === `historic`) {
      const filteredArticles = articlesCopy.filter(article => article.type.includes(`historic`));
      const filteredCurrentArticles = currentArticlesCopy.filter(article => article.type.includes(`historic`));
      setNewValues(filteredArticles, filteredCurrentArticles);
    }
    if (value === `nature`) {
      const filteredArticles = articlesCopy.filter(article => article.type.includes(`nature`));
      const filteredCurrentArticles = currentArticlesCopy.filter(article => article.type.includes(`nature`));
      setNewValues(filteredArticles, filteredCurrentArticles);
    }

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
      <p className="search-results">Search results({isLoading ? `...` : articles.length}):</p>

      <div className="search-results-container">
        {(isLoading && !error) && (
          <>
            <SearchResultsCardSkeleton mode={`dark`} />
            <SearchResultsCardSkeleton mode={`dark`} />
            <SearchResultsCardSkeleton mode={`dark`} />
            <SearchResultsCardSkeleton mode={`dark`} />
            <SearchResultsCardSkeleton mode={`dark`} />
            <SearchResultsCardSkeleton mode={`dark`} />
          </>
        )}
        {(!isLoading && !error && currentArticles.length > 0) && (
          <>
            {currentArticles.map(function(article) {
              return (
                <SearchResultsCard
                  key={article._id}
                  image={article.image}
                  type={article.type}
                  title={article.title}
                  author={article.author}
                  _id={article._id}
                  createdAt={article.createdAt}
                />
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
