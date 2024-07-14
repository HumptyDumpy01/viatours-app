'use client';

import React, { useRef } from 'react';
import './TrendingDestinations.scss';
import TrendingDestinationsHeading from '@/components/homepage/trending-destinations/TrendingDestinationsHeading';
import TrendingDestination from '@/components/homepage/trending-destinations/TrendingDestination';
import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';

export default function TrendingDestinations() {
  // Specify the type of elements the ref will hold, in this case, HTMLDivElement
  const containerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number = 0;
  let scrollLeft: number = 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) {
      e.preventDefault();
      return;
    }

    // TypeScript now understands that containerRef.current is either null or an HTMLDivElement
    if (containerRef.current) {
      isDown = true;
      startX = e.pageX - containerRef.current.offsetLeft;
      scrollLeft = containerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 3; // Adjust scroll speed if necessary
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  let tours: TourInterface[] = DUMMY_TOURS.length > 10 ? DUMMY_TOURS.slice(0, 10) : DUMMY_TOURS;

  return (
    <>
      <TrendingDestinationsHeading />
      <div
        className="trending-destinations-figure-wrapper container-trending-destinations flex"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {tours.length === 0 && (<h1 className={`subheading`}>No destinations found!</h1>)}
        {tours.map((item) => (
          <TrendingDestination
            key={item.id}
            country={item.country}
            alt={item.title}
            // href={`/tours/${item.id}`}
            href={`/tours/?country=${item.country}`}
            text={item.city}
            imgSrc={item.images[0]}
          />
        ))}
      </div>
    </>
  );
}