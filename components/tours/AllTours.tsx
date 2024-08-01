'use client';

import '@/app/tours/page.scss';

/*interface AllToursInterface {
  // children: ReactNode;
}*/
import ToursHeader from '@/components/tours/header/ToursHeader';
import SearchTour from '@/components/tours/form/SearchTour';
import Filter from '@/components/UI/Filter/Filter';
import Figures from '@/components/tours/figures/Figures';
import React, { useEffect, useState } from 'react';
import SkeletonCardHorizontal from '@/components/skeletons/Card/SkeletonCardHorizontal';


export default function AllTours(/*{  }: AllToursInterface*/) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch the tours
  useEffect(() => {
    fetch('http://localhost:3000/api/fetch-tours')
      .then(response => response.json())
      .then(data => {
        setTours(data.tours);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Failed to fetch tours: ${error}`);
        setLoading(false);
      });

  }, []);

  return (
    <>
      <div className={`all-tours__content-header`}>
        <ToursHeader />
        <SearchTour />
      </div>
      <div className="all-tours__content grid">
        <Filter />
        <div className="all-tours__content__figures">
          {loading && (
            <div className="all-tours__content__figures__figure-container">
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
              <SkeletonCardHorizontal />
            </div>
          )
          }
          {!loading &&
            <Figures tours={tours} />
          }
        </div>
      </div>
    </>
  );
}
