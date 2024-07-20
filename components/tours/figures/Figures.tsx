'use client';

import React, { useEffect, useState } from 'react';
import './Figures.scss';
import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';
import Figure from './Figure';
import Pagination from '@/components/UI/Pagnation/Pagination';
import FiguresHeader from '@/components/tours/figures/FiguresHeader';
import NoItemsFound from '@/components/UI/Layout/NoItems/NoItemsFound';
import SkeletonCardHorizontal from '@/components/skeletons/Card/SkeletonCardHorizontal';
import { fetchTours } from '@/lib/api/fetchTours';


export default function Figures() {

  // define how many tours to show per page
  const toursPerPage = 6;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTours, setCurrentTours] = useState<TourInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // get the current tours and paginate them
  useEffect(() => {
    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    // fetch the tours
    fetchTours().then((tours) => {
      setCurrentTours(tours.slice(indexOfFirstTour, indexOfLastTour));
      setLoading(false);
    });

  }, [currentPage]);

  // TODO: Implement the clear filters function
  // it should basically load all the tours again
  // and reset all the checkboxes
  function handleClearFilters() {
  }

  return (
    <>
      {loading && (
        <div className="all-tours__content__figures__figure-container">
          <SkeletonCardHorizontal />
          <SkeletonCardHorizontal />
          <SkeletonCardHorizontal />
        </div>
      )}
      {(!loading && currentTours.length === 0) && <NoItemsFound clearFilters={handleClearFilters} />}
      {(!loading && currentTours.length > 0) && (
        <>
          <FiguresHeader summarizedResults={DUMMY_TOURS.length} />
          <div className="all-tours__content__figures__figure-container">
            {currentTours.map((tour) => (
              <Figure
                key={tour.id}
                href={tour.id}
                imgSrc={tour.images[0]}
                imgAlt={tour.title}
                info={[{
                  country: tour.country,
                  city: tour.city,
                  heading: tour.title,
                  rating: tour.rating.overall,
                  ratingCount: tour.reviewed,
                  duration: tour.duration[0],
                  price: tour.price.children,
                  overview: tour.overview
                }]} />
            ))}
          </div>
          <Pagination
            handleSetLoading={() => setLoading(true)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={DUMMY_TOURS.length}
            itemsPerPage={toursPerPage}
          />
        </>
      )}
    </>
  );
}