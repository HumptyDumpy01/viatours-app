'use client';

/*interface FindPopularToursInterface {
  // children: ReactNode;
}*/
import FindPopularHeading from '@/components/homepage/find-popular-tours/FindPopularHeading';
import TourCard from '@/components/UI/Card/TourCard';
import { TourInterface } from '@/data/DUMMY_TOURS';
import './FindPopularTours.scss';
import SkeletonCardFull from '@/components/skeletons/Card/SkeletonCardFull';
import { fetchTours } from '@/lib/api/fetchTours';
import { useEffect, useState } from 'react';

export default function FindPopularTours(/*{  }: FindPopularToursInterface*/) {
  const [tours, setTours] = useState<TourInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTours('popular', 8)
      .then((tours) => {
        setTours(tours);
        setLoading(false);
      });

  }, []);

  return (
    <>
      <FindPopularHeading />
      <div className="find-popular-tours__tours-wrapper flex">
        <div className="find-popular-tours__figure-wrapper--1">
          {(tours.length === 0 && !loading) && <h2 className={`subheading`}>No tours found</h2>}
          {loading && (
            <>
              <div className={`find-popular-tours__skeletons`}>
                <SkeletonCardFull />
                <SkeletonCardFull />
                <SkeletonCardFull />
                <SkeletonCardFull />
              </div>
            </>
          )}
          {!loading && tours.map(function(item) {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
}
