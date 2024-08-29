'use client';

import './ArticlesTravellerReviews.scss';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

type ArticlesTravellerReviewsType = {
  children: ReactNode;
}

export default function ArticlesTravellerReviews({ children }: ArticlesTravellerReviewsType) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="traveller-reviews-container">
      <div className="traveller-reviews container">
        {children}
      </div>
    </motion.section>
  );
}
