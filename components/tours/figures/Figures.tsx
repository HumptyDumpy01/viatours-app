'use client';

import React, { useEffect, useState } from 'react';
import './Figures.scss';
import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';
import Figure from './Figure';
import Pagination from '@/components/UI/Pagnation/Pagination';
import FiguresHeader from '@/components/tours/figures/FiguresHeader';

export default function Figures() {
  /* IMPORTANT: BEFORE DOING ANYTHING, DEFINE THE ACTUAL TYPE OF YOUR DATA FOR TS
  *   TO INFER IT. */

  /* INFO: CREATE A PAGINATION COMPONENT: use ReactCommonPagination snippet */

  // define how many tours to show per page
  const toursPerPage = 6;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTours, setCurrentTours] = useState<TourInterface[]>([]);

  // get the current tours and paginate them
  useEffect(() => {
    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    setCurrentTours(DUMMY_TOURS.slice(indexOfFirstTour, indexOfLastTour));
  }, [currentPage]);

  return (
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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={DUMMY_TOURS.length}
        itemsPerPage={toursPerPage}
      />
    </>
  );
}