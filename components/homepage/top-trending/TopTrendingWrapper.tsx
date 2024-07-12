'use client';

import React, { useRef } from 'react';
import './TopTrending.scss';

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
      <div className="top-trending-toggle-left" onClick={handleScrollLeft}>&larr;</div>
      <div className="top-trending-toggle-right" onClick={handleScrollRight}>&rarr;</div>
    </div>
  );
};