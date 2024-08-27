// 'use client';

import tourImage1 from '@/assets/images/articles/search-any-article/tour-image-1.png';
import tourImage2 from '@/assets/images/articles/search-any-article/tour-image-2.png';
import tourImage3 from '@/assets/images/articles/search-any-article/tour-image-3.png';
import tourImage4 from '@/assets/images/articles/search-any-article/tour-image-4.png';
import tourImage5 from '@/assets/images/articles/search-any-article/tour-image-5.png';
import tourImage6 from '@/assets/images/articles/search-any-article/tour-image-6.png';
import tourImage7 from '@/assets/images/articles/search-any-article/tour-image-7.png';
import tourImage8 from '@/assets/images/articles/search-any-article/tour-image-8.png';


import './YouMightAlsoLike.scss';
import ArticlesCard from '@/components/articles/card/ArticlesCard';

type YouMightAlsoLikeType = {
  tags: string[];
  // children: ReactNode;
}

export default function YouMightAlsoLike({ tags }: YouMightAlsoLikeType) {
  /* TODO: FETCH SIMILAR ARTICLES */
  return (
    <section className="you-might-also-like-article-descr-container">
      <div className="you-might-also-like-article-descr container">
        <h2 className="you-might-also-like-article-descr__heading secondary-heading">You might also like...</h2>

        <div className="search-results-container flex overflow-x-auto padding-top-5rem">
          <ArticlesCard image={tourImage1} />
          <ArticlesCard image={tourImage2} />
          <ArticlesCard image={tourImage3} />
          <ArticlesCard image={tourImage4} />
          <ArticlesCard image={tourImage5} />
          <ArticlesCard image={tourImage6} />
          <ArticlesCard image={tourImage7} />
          <ArticlesCard image={tourImage8} />
        </div>
      </div>
    </section>
  );
}
