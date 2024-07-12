// 'use client';

import './TrendingDestinations.scss';
/*interface TrendingDestinationsInterface {
  // children: ReactNode;
}*/
import TrendingDestinationsHeading from '@/components/homepage/trending-destinations/TrendingDestinationsHeading';
import TrendingDestination from '@/components/homepage/trending-destinations/TrendingDestination';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';

export default function TrendingDestinations(/*{  }: TrendingDestinationsInterface*/) {
  return (
    <>
      <TrendingDestinationsHeading />
      <div className="trending-destinations-figure-wrapper container-trending-destinations flex">
        {DUMMY_TOURS.map(function(item) {
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

        {DUMMY_TOURS.map(function(item) {
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
