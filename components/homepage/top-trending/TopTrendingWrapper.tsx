'use client';

import React, { useRef } from 'react';
import './TopTrending.scss';
import { motion } from 'framer-motion';

interface TopTrendingWrapperInterface {
  children: React.ReactNode;
}

export default function TopTrendingWrapper({ children }: TopTrendingWrapperInterface) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollContainerRef.current!.scrollLeft -= 1000; // Adjust this value as needed
  };

  const handleScrollRight = () => {
    scrollContainerRef.current!.scrollLeft += 1000; // Adjust this value as needed
  };

  return (
    <div className="top-trending-wrapper container">
      <div className="top-trending__items-wrapper container" ref={scrollContainerRef}>
        <div className="top-trending__items flex">
          {children}
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="top-trending-toggle-left" onClick={handleScrollLeft}>&larr;</motion.div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="top-trending-toggle-right" onClick={handleScrollRight}>&rarr;</motion.div>
    </div>
  );
};