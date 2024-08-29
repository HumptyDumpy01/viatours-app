'use client';

import travellerLogo1 from '@/assets/images/articles/travellers-reviews/traveller-logo-1.png';
import travellerLogo2 from '@/assets/images/articles/travellers-reviews/traveller-logo-2.png';
import travellerLogo3 from '@/assets/images/articles/travellers-reviews/traveller-logo-3.png';
import { motion } from 'framer-motion';

/*type ArticlesReviewsCardContainerType = {
  // children: ReactNode;
}*/
import ArticlesReviewsCard from '@/components/articles/top-articles/article-reviews/card/ArticlesReviewsCard';
import ArticleReviewsOverall from '@/components/articles/top-articles/article-reviews/ArticleReviewsOverall';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

export default function ArticlesReviewsCardContainer(/*{  }: ArticlesReviewsCardContainerType*/) {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="traveller-reviews__review-container">
        <ArticlesReviewsCard imageUrl={travellerLogo1} />
        <ArticlesReviewsCard imageUrl={travellerLogo2} />
        <ArticlesReviewsCard imageUrl={travellerLogo3} />
      </motion.div>
      <ArticleReviewsOverall />
    </>
  )
    ;
}
