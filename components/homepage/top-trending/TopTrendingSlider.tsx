'use client';

import React from 'react';
import './TopTrending.scss';
import TourCard from '@/components/UI/Card/TourCard';
import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';

export default function TopTrendingSlider() {
  let tours: TourInterface[] = [];
  if (DUMMY_TOURS.length > 22) {
    tours = DUMMY_TOURS.slice(0, 22);
  } else {
    tours = DUMMY_TOURS;
  }
  return (
    <>
      <div className="top-trending__items">
        {tours.map((item) => (
          <TourCard
            key={item.id}
            href={`/tours/${item.id}`}
            imgSrc={item.images[0]}
            imgAlt={item.title}
            info={[{
              country: item.country,
              city: item.city,
              heading: item.title,
              rating: item.rating.overall,
              ratingCount: item.reviewed,
              duration: item.duration[0],
              price: item.price.children
            }]}
          />
        ))}
      </div>
    </>
  );
}