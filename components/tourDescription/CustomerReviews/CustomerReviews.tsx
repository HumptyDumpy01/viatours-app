'use client';

import './CustomerReviews.scss';
import CustomerReviewOverallRating from '@/components/tourDescription/CustomerReviews/CustomerReviewOverallRating';
import { motion } from 'framer-motion';

type CustomerReviewsType = {
  rating: {
    overall: number;
    location: number;
    amenities: number;
    food: number;
    price: number;
    rooms: number;
    tourOperator: number;
  };
  // children: ReactNode;
}

export default function CustomerReviews({ rating }: CustomerReviewsType) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="customer-reviews">
      <motion.h2
        whileHover={{ scale: 1.1, x: 20 }}
        whileTap={{ scale: 0.9, x: -20 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="secondary-heading customer-reviews-heading">Customer Reviews
      </motion.h2>
      <div className="customer-reviews__rating-wrapper grid grid-two-cols">
        <CustomerReviewOverallRating tableHead={'head'} icon={`happy-smile`} rate={rating.overall}
                                     heading={`Overall Rating`} />
        <CustomerReviewOverallRating icon={`map`} rate={rating.location}
                                     heading={`Location`} />

        <CustomerReviewOverallRating icon={`icecream`} rate={rating.amenities}
                                     heading={`Amenities`} />
        <CustomerReviewOverallRating icon={`food`} rate={rating.food}
                                     heading={`Food`} />
        <CustomerReviewOverallRating icon={`wallet`} rate={rating.price}
                                     heading={`Price`} />
        <CustomerReviewOverallRating tableHead={`end`} icon={`apartment`} rate={rating.rooms}
                                     heading={`Rooms`} />
        <CustomerReviewOverallRating tableHead={`end`} icon={`phone`} rate={rating.tourOperator}
                                     heading={`Tour Operator`} />
      </div>
    </motion.section>
  );
}
