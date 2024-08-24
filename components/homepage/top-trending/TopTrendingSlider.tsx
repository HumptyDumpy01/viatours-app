'use client';

import React, { useEffect, useState } from 'react';
import './TopTrending.scss';
import TourCard from '@/components/UI/Card/TourCard';
import { TourInterface } from '@/data/DUMMY_TOURS';
import SkeletonCardFull from '@/components/skeletons/Card/SkeletonCardFull';

type TopTrendingSliderType = {
  filter: unknown;
  // children: ReactNode;
}

export default function TopTrendingSlider({ filter }: TopTrendingSliderType) {

  const [tours, setTours] = useState<TourInterface[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch(`/api/fetch-tours`, {
          method: `POST`,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter: filter,
            limit: 30,
            project: {
              _id: 1,
              images: 1,
              title: 1,
              country: 1,
              city: 1,
              rating: 1,
              reviews: 1,
              duration: 1,
              price: 1
            }
          })
        });
        const data = await response.json();
        setTours(data.tours);
        console.log(`fetchTours: `, data.tours);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching tours: `, error);
        setError(true);
      }
    }

    fetchTours().catch(err => {
      console.error(`Error fetching tours: `, err);
      setError(true);
      setLoading(false);
    });
  }, []);


  /*const tours = await getTours(22, { tags: `featured` }, 0, {
    _id: 1,
    images: 1,
    title: 1,
    country: 1,
    city: 1,
    rating: 1,
    reviews: 1,
    duration: 1,
    price: 1
  }) as TourInterface[];*/

  return (
    <>
      {(loading && !error) && (
        <div>
          {!loading && error && (
            <p className="subheading">Error fetching tours</p>
          )}
        </div>
      )}
      {(loading && !error) && (
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
      {(!loading && tours.length > 0 && !error) && tours.map(function(item) {
        return (
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
        );
      })}

    </>
  );
}