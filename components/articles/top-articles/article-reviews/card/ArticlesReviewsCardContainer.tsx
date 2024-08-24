// 'use client';

import travellerLogo1 from '@/assets/images/articles/travellers-reviews/traveller-logo-1.png';
import travellerLogo2 from '@/assets/images/articles/travellers-reviews/traveller-logo-2.png';
import travellerLogo3 from '@/assets/images/articles/travellers-reviews/traveller-logo-3.png';


/*type ArticlesReviewsCardContainerType = {
  // children: ReactNode;
}*/
import ArticlesReviewsCard from '@/components/articles/top-articles/article-reviews/card/ArticlesReviewsCard';
import ArticleReviewsOverall from '@/components/articles/top-articles/article-reviews/ArticleReviewsOverall';

export default function ArticlesReviewsCardContainer(/*{  }: ArticlesReviewsCardContainerType*/) {
  return (
    <>
      <div className="traveller-reviews__review-container">
        <ArticlesReviewsCard imageUrl={travellerLogo1} />
        <ArticlesReviewsCard imageUrl={travellerLogo2} />
        <ArticlesReviewsCard imageUrl={travellerLogo3} />
      </div>
      <ArticleReviewsOverall />
    </>
  )
    ;
}
