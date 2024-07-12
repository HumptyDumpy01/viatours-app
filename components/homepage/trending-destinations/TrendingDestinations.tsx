// 'use client';

import './TrendingDestinations.scss';
/*interface TrendingDestinationsInterface {
  // children: ReactNode;
}*/
import TrendingDestinationsHeading from '@/components/homepage/trending-destinations/TrendingDestinationsHeading';
import TrendingDestination from '@/components/homepage/trending-destinations/TrendingDestination';
import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';

export default function TrendingDestinations(/*{  }: TrendingDestinationsInterface*/) {
  let tours: TourInterface[] = [];
  if (DUMMY_TOURS.length > 10) {
    tours = DUMMY_TOURS.slice(0, 10);
  } else {
    tours = DUMMY_TOURS;
  }
  return (
    <>
      <TrendingDestinationsHeading />
      <div className="trending-destinations-figure-wrapper container-trending-destinations flex">
        {tours.length === 0 && (<h1 className={`subheading`}>No destinations found!</h1>)}
        {tours.map(function(item) {
          return (
            <TrendingDestination
              key={item.id}
              country={item.country}
              alt={item.title}
              href={`/tours/${item.id}`}
              text={item.city}
              imgSrc={item.images[0]}
            />
          );
        })}
      </div>
    </>
  );
}
