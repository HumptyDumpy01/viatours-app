'use client';

import './SearchArticleContainer.scss';
import SearchArticleHeading from '@/components/articles/search-article/SearchArticleHeading';
import SortBy from '@/components/UI/SortBy/SortBy';
import SearchResultsCard from '@/components/articles/search-article/SearchResultsCard';
import searchImage1 from '@/assets/images/articles/search-any-article/tour-image-1.png';
import searchImage2 from '@/assets/images/articles/search-any-article/tour-image-2.png';
import searchImage3 from '@/assets/images/articles/search-any-article/tour-image-3.png';
import searchImage4 from '@/assets/images/articles/search-any-article/tour-image-4.png';
import searchImage5 from '@/assets/images/articles/search-any-article/tour-image-5.png';
import searchImage6 from '@/assets/images/articles/search-any-article/tour-image-6.png';
// import searchImage7 from '@/assets/images/articles/search-any-article/tour-image-7.png';
// import searchImage8 from '@/assets/images/articles/search-any-article/tour-image-8.png';
// import searchImage9 from '@/assets/images/articles/search-any-article/tour-image-9.png';
// import searchImage10 from '@/assets/images/articles/search-any-article/tour-image-10.png';
// import searchImage11 from '@/assets/images/articles/search-any-article/tour-image-11.png';
import Pagination from '@/components/UI/Pagnation/Pagination';

type SearchArticleContainerType = {
  /* TODO: IMPLEMENT A BETTER SCHEMA LATER */
  results: []
  // children: ReactNode;
}

export default function SearchArticleContainer({ results }: SearchArticleContainerType) {

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
          }} disabled={false}
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
        <SearchResultsCard imageUrl={searchImage1} />
        <SearchResultsCard imageUrl={searchImage2} />
        <SearchResultsCard imageUrl={searchImage3} />
        <SearchResultsCard imageUrl={searchImage4} />
        <SearchResultsCard imageUrl={searchImage5} />
        <SearchResultsCard imageUrl={searchImage6} />
        {/*<SearchResultsCard imageUrl={searchImage7} />*/}
        {/*<SearchResultsCard imageUrl={searchImage8} />*/}
        {/*<SearchResultsCard imageUrl={searchImage9} />*/}
        {/*<SearchResultsCard imageUrl={searchImage10} />*/}
        {/*<SearchResultsCard imageUrl={searchImage11} />*/}
      </div>
      <Pagination currentPage={1} setCurrentPage={() => {
      }} totalItems={4} itemsPerPage={4} />
    </section>
  );
}
