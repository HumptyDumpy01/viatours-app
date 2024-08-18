'use client';

import FindPopularHeading from '@/components/homepage/find-popular-tours/FindPopularHeading';
import TourCard from '@/components/UI/Card/TourCard';
import './FindPopularTours.scss';
import { TourInterface } from '@/data/DUMMY_TOURS';
import React, { useEffect, useState } from 'react';
import FindPopularToursSkeleton from '@/components/homepage/skeletons/FindPopularToursSkeleton';
import { motion } from 'framer-motion';

/*interface FindPopularToursInterface {
  tours: TourInterface[];
  // children: ReactNode;
}*/

export default function FindPopularTours(/*{ tours }: FindPopularToursInterface*/) {
  // console.log(`Executing tours in FindPopularTours: `, tours);
  const [tours, setTours] = useState<TourInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch(`/api/fetch-tours`, {
          method: `POST`,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter: [`popular`],
            limit: 4,
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
        console.error(`Error fetching popular tours: `, error);
        setError(true);
      }
    }

    fetchTours().catch(err => {
      console.error(`Error fetching popular tours: `, error);
      setError(true);
      setLoading(false);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      viewport={{ once: false }}
      className={`find-popular-tours container`}
    >
      <FindPopularHeading />
      <div className="find-popular-tours__tours-wrapper flex">
        <div
          className="find-popular-tours__figure-wrapper--1">
          {(error && !loading) && (
            <div className="find-popular-tours__error">
              <p className="subheading">There was an error fetching the tours. Please try again later.</p>
            </div>
          )}
          {(loading && !error) && (
            <FindPopularToursSkeleton />
          )}
          {(!loading && !error) && (tours as TourInterface[]).map(function(tour) {
            return (
              <TourCard
                key={tour._id}
                href={`/tours/${tour._id}`}
                imgSrc={tour.images[0]}
                imgAlt={tour.title}
                info={[{
                  country: tour.country,
                  city: tour.city,
                  heading: tour.title,
                  rating: tour.rating.overall,
                  ratingCount: tour.reviews,
                  duration: tour.duration,
                  price: tour.price.children
                }]}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
