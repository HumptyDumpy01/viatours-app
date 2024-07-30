'use client';

import React, { useRef } from 'react';
import './TrendingDestinations.scss';
import TrendingDestinationsHeading from '@/components/homepage/trending-destinations/TrendingDestinationsHeading';
import TrendingDestination from '@/components/homepage/trending-destinations/TrendingDestination';

interface TourInterface {
  _id: string;
  country: string;
  title: string;
  city: string;
  images: string[];
}

interface TrendingDestinationsProps {
  tours: TourInterface[];
}

export default function TrendingDestinations({ tours }: TrendingDestinationsProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number = 0;
  let scrollLeft: number = 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) {
      e.preventDefault();
      return;
    }

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
    const walk = (x - startX) * 3;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

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
          {tours.map((item) => (
            <TrendingDestination
              key={item._id}
              country={item.country}
              alt={item.title}
              href={`/tours/?country=${item.country}`}
              text={item.city}
              imgSrc={item.images[0]} // Use the first image path
            />
          ))}
      </div>
    </>
  );
}