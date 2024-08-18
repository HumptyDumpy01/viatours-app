'use client';

import React, { useEffect, useRef, useState } from 'react';
import './TrendingDestinations.scss';
import TrendingDestinationsHeading from '@/components/homepage/trending-destinations/TrendingDestinationsHeading';
import TrendingDestination from '@/components/homepage/trending-destinations/TrendingDestination';
import { AnimatePresence, motion } from 'framer-motion';
import NewestDestinationsSkeleton from '@/components/homepage/skeletons/NewestDestinationsSkeleton';

interface TourInterface {
  _id: string;
  country: string;
  title: string;
  city: string;
  images: string[];
}

/*interface TrendingDestinationsProps {
  tours: TourInterface[];
}*/

export default function TrendingDestinations(/*{ tours }: TrendingDestinationsProps*/) {

  const [tours, setTours] = useState<TourInterface[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);


  /*
  const tours = await getTours(22, { tags: `new` }, 0, {
    _id: 1,
    title: 1,
    city: 1,
    country: 1,
    images: 1
  }) as TourInterface[];
  */

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch(`/api/fetch-tours`, {
          method: `POST`,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter: [`new`],
            limit: 22,
            project: {
              _id: 1,
              title: 1,
              city: 1,
              country: 1,
              images: 1
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

    });
  }, []);


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
      <AnimatePresence>
        <TrendingDestinationsHeading />
        <div>
          {!loading && error && (
            <p className="subheading">Error fetching tours</p>
          )}
        </div>
        <div>
          {(loading && !error) && (
            <>
              <NewestDestinationsSkeleton />
            </>
          )}
        </div>
        {(!loading && tours.length > 0 && !error) && (
          <motion.div
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
                href={`/tours/${item._id}`}
                text={item.city}
                imgSrc={item.images[0]} // Use the first image path
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}