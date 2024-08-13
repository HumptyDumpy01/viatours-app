'use client';

import quoteIcon from '@/assets/images/homepage/customerReviews/quote.svg';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';

interface CustomerReviewInterface {
  customerLogoImg: StaticImageData;
  title: string;
  text: string;
  initials: string;
  job: string;
  // children: ReactNode;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
};

const item = {
  transition: { type: 'spring', stiffness: 100, damping: 10 },
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 }
};

export default function CustomerReview({ customerLogoImg, title, text, initials, job }: CustomerReviewInterface) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
      variants={container}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      className="customer-reviews__review">
      <motion.div
        variants={item}
        className="customer-reviews__review-img">
        <motion.div
          variants={item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className={`customer-reviews__review-img-wrapper`}>
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={customerLogoImg}
            alt="Image of a customer" className="customer-reviews__img" />
        </motion.div>
        <motion.div
          variants={item}
          className="customer-reviews__quote">
          <Image width={10} src={quoteIcon} alt="quote icon" />
        </motion.div>
      </motion.div>
      <motion.span
        variants={item}
        className="customer-reviews__subheading">{title}</motion.span>
      <motion.blockquote
        variants={item}
        className="customer-reviews__commentary">{text}</motion.blockquote>
      <motion.h3
        variants={item}
        className="customer-reviews__author heading-scale-effect">{initials}</motion.h3>
      <motion.span
        variants={item}
        className="customer-reviews__job">{job}</motion.span>
    </motion.div>
  );
}
