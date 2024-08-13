'use client';

import './CustomerReviews.scss';
import { motion } from 'framer-motion';

/*interface CustomerReviewsHeadingInterface {
  // children: ReactNode; }*/
export default function CustomerReviewsHeading(/*{  }: CustomerReviewsHeadingInterface*/) {
  return (
    <>
      <div className="customer-reviews__heading">
        <motion.h2
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="secondary-heading text-align-center customer-reviews__heading">Customer Reviews
        </motion.h2>
      </div>
    </>
  );
}
