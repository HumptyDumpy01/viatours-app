// 'use client';

type NewestArticlesContainerType = {
  /* TODO: IMPLEMENT A BETTER SCHEMA LATER */
  newestArticles: []
  // children: ReactNode;
}

import ArticlesContainerCardsHeading from '@/components/articles/card/ArticlesContainerCardsHeading';
import ArticlesCard from '@/components/articles/card/ArticlesCard';
import theNewest1 from '@/assets/images/articles/the-newest/the-newest-1.png';
import theNewest2 from '@/assets/images/articles/the-newest/the-newest-2.png';
import theNewest3 from '@/assets/images/articles/the-newest/the-newest-3.png';
import theNewest4 from '@/assets/images/articles/the-newest/the-newest-4.png';
import theNewest5 from '@/assets/images/articles/the-newest/the-newest-5.png';

export default function NewestArticlesContainer({ newestArticles }: NewestArticlesContainerType) {
  return (
    <>
      <div className="travel-articles__the-newest">
        <span className="travel-articles__the-newest__subheading subheading">The hottest articles you ever saw!</span>
        <ArticlesContainerCardsHeading heading={`The Newest`} buttonLabel={`See all`} />
        <div className="travel-articles__the-newest__card-container flex">
          <ArticlesCard image={theNewest1} />
          <ArticlesCard image={theNewest2} />
          <ArticlesCard image={theNewest3} />
          <ArticlesCard image={theNewest4} />
          <ArticlesCard image={theNewest5} />
        </div>
      </div>
    </>
  );
}
