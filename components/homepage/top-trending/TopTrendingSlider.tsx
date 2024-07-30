// 'use client';

import React from 'react';
import './TopTrending.scss';
import TourCard from '@/components/UI/Card/TourCard';
import { TourInterface } from '@/data/DUMMY_TOURS';

type TopTrendingSliderType = {
  tours: TourInterface[];
  // children: ReactNode;
}

export default function TopTrendingSlider({ tours }: TopTrendingSliderType) {

  return (
    <>
      {tours.map(function(item) {
        return (
          <>
            <TourCard
              key={item._id}
              href={`/tours/${item._id}`}
              imgSrc={item.images[0]}
              imgAlt={item.title}
              info={[{
                country: item.country,
                city: item.city,
                heading: item.title,
                rating: item.rating.overall,
                ratingCount: item.reviews,
                duration: item.duration,
                price: item.price.children
              }]}
            />
          </>
        );
      })}

    </>
  );
}