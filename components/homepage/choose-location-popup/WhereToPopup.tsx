'use client';

// import lottie component
// import Lottie from 'lottie-react';
// import animation data
// import animationData from '@/animations/loading-spinner.json';
import './WhereToPopup.scss';
import WhereToElement from '@/components/homepage/choose-location-popup/WhereToElement';
import { TourInterface } from '@/data/DUMMY_TOURS';
import WhereToPopupSkeleton from '@/components/homepage/skeletons/WhereToPopupSkeleton';
import { motion } from 'framer-motion';

interface WhereToPopupInterface {
  tours: TourInterface[];
  isLoading: boolean;
  inputVal: string;
  // children: ReactNode;
}

const bounceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      staggerChildren: 0.1
    }
  }
};

export default function WhereToPopup({ tours, isLoading, inputVal }: WhereToPopupInterface) {

  const isEmpty = tours.length === 0;

  // pick the first three tours with different countries
  const firstThreeTours = tours.filter((tour, index, self) =>
      index === self.findIndex((t) => (
        t.country === tour.country
      ))
  ).slice(0, 3);

  return (
    <>
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}
                  className="where-to-popup">
        <div className="where-to-popup-wrapper">
          {(isLoading) && (
            <div className={`where-to-popup-loading-screen-container`}>
              <WhereToPopupSkeleton />
              <WhereToPopupSkeleton />
            </div>
          )}

          {(!isLoading && !isEmpty) && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={bounceVariants}
              className="where-to-popup__elements"
            >
              {firstThreeTours.map(function(tour) {
                return (
                  <WhereToElement
                    key={tour._id}
                    href={`/tours/?filter-search=${tour.country}`}
                    type={`location`}
                    country={`Location`} title={tour.country} />
                );
              })}
              {tours.slice(0, 5).map(function(tour) {
                return (
                  <WhereToElement
                    key={tour._id}
                    href={`/tours/${tour._id}`}
                    type={`tour`}
                    title={tour.title}
                    country={tour.country}
                    price={`${tour.price.children}$`}
                    image={tour.images[0]}
                  />
                );
              })}
              {inputVal && (
                <WhereToElement href={`/tours?filter-search=${inputVal}`} type={`search-all`} title={inputVal} />
              )}
            </motion.div>
          )}
          {(!isLoading && isEmpty) && (
            <>
              <div className="where-to-popup__element where-to-popup__element--location flex flex-align-center">
                <h3 className="where-to-popup__element__data-span">No tours found!</h3>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
