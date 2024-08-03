// 'use client';

// import lottie component
// import Lottie from 'lottie-react';
// import animation data
// import animationData from '@/animations/loading-spinner.json';
import './WhereToPopup.scss';
import WhereToElement from '@/components/homepage/choose-location-popup/WhereToElement';
import { TourInterface } from '@/data/DUMMY_TOURS';
import WhereToPopupSkeleton from '@/components/homepage/skeletons/WhereToPopupSkeleton';

interface WhereToPopupInterface {
  tours: TourInterface[];
  isLoading: boolean;
  // children: ReactNode;
}

export default function WhereToPopup({ tours, isLoading }: WhereToPopupInterface) {

  const isEmpty = tours.length === 0;

  const firstThreeTours = tours.slice(0, 3);
  //each title should contain max 20 characters
  firstThreeTours.forEach(function(tour) {
    tour.title = tour.title.slice(0, 60);
  });

  return (
    <>
      <div className="where-to-popup">
        <div className="where-to-popup-wrapper">
          {(isLoading) && (
            <div className={`where-to-popup-loading-screen-container`}>
              <WhereToPopupSkeleton />
              <WhereToPopupSkeleton />
            </div>
          )}

          {(!isLoading && !isEmpty) && (
            <>
              {firstThreeTours.map(function(tour) {
                return (
                  <>
                    <WhereToElement
                      href={`/tours/?filter-country=${tour.country}`}
                      type={`location`}
                      country={`Location`} title={tour.country} />
                  </>
                );
              })}
              {tours.slice(0, 5).map(function(tour) {
                return (
                  <>
                    <WhereToElement
                      href={`/tours/${tour._id}`}
                      type={`tour`}
                      title={tour.title}
                      country={tour.country}
                      price={`${tour.price.children}$`}
                      image={tour.images[0]}
                    />
                  </>
                );
              })}
              <WhereToElement type={`search-all`} title={`All Tours`} />
            </>
          )}
          {(!isLoading && isEmpty) && (
            <>
              <div className="where-to-popup__element where-to-popup__element--location flex flex-align-center">
                <h3 className="where-to-popup__element__data-span">No tours found!</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
