'use client';

import { motion } from 'framer-motion';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';
import { item } from '@/components/tourDescription/TourOverview/TourHighlights';
/*type ArticleReviewsOverallType = {
  // children: ReactNode;
}*/

export default function ArticleReviewsOverall(/*{  }: ArticleReviewsOverallType*/) {
  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="traveller-reviews__bottom-container">
        <motion.div
          variants={item}
          className="traveller-reviews__bottom">
          <span className="traveller-reviews__bottom-rating">4.9</span>
          <p className="traveller-reviews__bottom-count">1000+ reviews on this article</p>
        </motion.div>
        <motion.div
          variants={item}
          className="traveller-reviews__bottom">
          <span className="traveller-reviews__bottom-rating">8k+</span>
          <p className="traveller-reviews__bottom-count">Views</p>
        </motion.div>
        <motion.div
          variants={item}
          className="traveller-reviews__bottom-award winner">
          <span className="traveller-reviews__bottom-rating">Award winner</span>
          <p className="traveller-reviews__bottom-count">In <b className="highlighted">Top Viatours Articles</b> in one
            month!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
