'use client';

import React, { useEffect, useState } from 'react';
import './Figures.scss';
import { TourInterface } from '@/data/DUMMY_TOURS';
import Figure from './Figure';
import Pagination from '@/components/UI/Pagnation/Pagination';
import FiguresHeader from '@/components/tours/figures/FiguresHeader';
import NoItemsFound from '@/components/UI/Layout/NoItems/NoItemsFound';
import SkeletonCardHorizontal from '@/components/skeletons/Card/SkeletonCardHorizontal';
import { getTours } from '@/lib/mongodb';


export default function Figures() {

  // define how many tours to show per page
  const toursPerPage = 6;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTours, setCurrentTours] = useState<TourInterface[]>([]);
  const [loading, setLoading] = useState(true);
  let numberOfTours = 14;

  // get the current tours and paginate them
  useEffect(() => {
    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    // fetch the tours
    getTours(9999, {}, 0).then((tours) => {
      // numberOfTours = tours.length;
      setCurrentTours(tours.slice(indexOfFirstTour, indexOfLastTour));
      setLoading(false);
      console.log(numberOfTours);
    }).catch((error) => {
      console.error(`Failed to fetch tours: ${error}`);
      setLoading(false);
    });

    /*getTours(toursPerPage, {}, currentPage === 1 ? 0 : (currentPage - 1) * toursPerPage).then((tours) => {
      setCurrentTours(tours.slice(indexOfFirstTour, indexOfLastTour));
      // setCurrentTours(tours);
      setLoading(false);
    }).catch((error) => {
      console.error(`Failed to fetch tours: ${error}`);
      setLoading(false);
    });*/

    // setCurrentTours(prev => [...prev, ...tours.slice(indexOfFirstTour, indexOfLastTour)]);

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
          <FiguresHeader summarizedResults={currentTours.length} />
          <div className="all-tours__content__figures__figure-container">
            {currentTours.map((tour) => (
              <Figure
                key={tour._id}
                href={tour._id}
                imgSrc={tour.images[0]}
                imgAlt={tour.title}
                info={[{
                  country: tour.country,
                  city: tour.city,
                  heading: tour.title,
                  rating: tour.rating.overall,
                  ratingCount: tour.reviews,
                  duration: tour.duration,
                  price: tour.price.children,
                  overview: tour.overview
                }]} />
            ))}
          </div>

          <Pagination
            handleSetLoading={() => setLoading(true)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={numberOfTours}
            itemsPerPage={toursPerPage}
          />
        </>
      )}
    </>
  );
}