'use client';

import React, { useEffect, useState } from 'react';
import './TopTrending.scss';
import TourCard from '@/components/UI/Card/TourCard';
import { TourInterface } from '@/data/DUMMY_TOURS';
import { fetchTours } from '@/lib/api/fetchTours';
import SkeletonCardFull from '@/components/skeletons/Card/SkeletonCardFull';

type TopTrendingSliderType = {
  tag: string;
  max?: number;
  // children: ReactNode;
}

export default function TopTrendingSlider({ tag, max }: TopTrendingSliderType) {
  const [tours, setTours] = useState<TourInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTours(tag, max)
      .then((data) => {
        setTours(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && (
        <>
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
        </>
      )}
      {!loading && tours.map((item) => (
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
      {!loading && tours.length === 0 && (
        <h2 className={`highlighted`}>No tours found</h2>
      )}
    </>
  );
}