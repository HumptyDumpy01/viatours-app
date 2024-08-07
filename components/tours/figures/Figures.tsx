'use client';

import React, { useEffect, useState } from 'react';
import './Figures.scss';
import { TourInterface } from '@/data/DUMMY_TOURS';
import Figure from './Figure';
import Pagination from '@/components/UI/Pagnation/Pagination';
import FiguresHeader from '@/components/tours/figures/FiguresHeader';
import NoItemsFound from '@/components/UI/Layout/NoItems/NoItemsFound';


interface FiguresInterface {
  tours: TourInterface[];
  clearFilters: () => void;
  loading: boolean;
}

export default function Figures({ tours, loading, clearFilters }: FiguresInterface) {

  // define how many tours to show per page
  const toursPerPage = 6;
  // define the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTours, setCurrentTours] = useState<TourInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  // fetch the tours
  // numberOfTours = tours.length;
  useEffect(() => {
    setCurrentTours(tours.slice(indexOfFirstTour, indexOfLastTour));
  }, [currentPage]);

  /*getTours(toursPerPage, {}, currentPage === 1 ? 0 : (currentPage - 1) * toursPerPage).then((tours) => {
    setCurrentTours(tours.slice(indexOfFirstTour, indexOfLastTour));
    // setCurrentTours(tours);
    setLoading(false);
  }).catch((error) => {
    console.error(`Failed to fetch tours: ${error}`);
    setLoading(false);
  });*/

  // setCurrentTours(prev => [...prev, ...tours.slice(indexOfFirstTour, indexOfLastTour)]);


  // TODO: Implement the clear filters function
  // it should basically load all the tours again
  // and reset all the checkboxes
  function handleClearFilters() {
    clearFilters();
  }

  return (
    <>
      {/*{loading && (
        <div className="all-tours__content__figures__figure-container">
          <SkeletonCardHorizontal />
          <SkeletonCardHorizontal />
          <SkeletonCardHorizontal />
        </div>
      )}*/}
      {(!loading && currentTours.length === 0) && (
        <>
          <FiguresHeader summarizedResults={tours.length} />
          <NoItemsFound clearFilters={handleClearFilters} />
        </>
      )}
      {(currentTours.length > 0 && !loading) && (
        <>
          <FiguresHeader summarizedResults={tours.length} />
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
                  overview: tour.overview,
                  onSale: tour.onSale
                }]} />
            ))}
          </div>

          <Pagination
            // handleSetLoading={() => setLoading(true)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={tours.length}
            itemsPerPage={toursPerPage}
          />
        </>
      )}
    </>
  );
}