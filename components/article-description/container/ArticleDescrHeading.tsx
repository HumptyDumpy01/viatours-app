'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ArticleDescrHeadingType = {
  subHeading: string;
  heading: ReactNode;
  // children: ReactNode;
}

export default function ArticleDescrHeading({ subHeading, heading }: ArticleDescrHeadingType) {
  return (
    <>
      <div className="tour-article-descr__title-container">
        <span className="tour-article-descr__title-subheading subheading">{subHeading}</span>
        <motion.h1
          whileHover={{ scale: 1.07, x: 30 }}
          whileTap={{ scale: 0.9, x: -30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="tour-article-descr__title">{heading}</motion.h1>
      </div>
    </>
  );
}
