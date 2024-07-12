// 'use client';

import tourCard1 from '@/assets/images/topTrending/tourCard_image_5.svg';
import tourCard2 from '@/assets/images/topTrending/tourCard_image_6.svg';
import tourCard3 from '@/assets/images/topTrending/tourCard_image_7.svg';
import tourCard4 from '@/assets/images/topTrending/tourCard_image_8.svg';
import tourCard5 from '@/assets/images/topTrending/tourCard_image_9.svg';
import tourCard6 from '@/assets/images/topTrending/tourCard_image_6.svg';
import tourCard7 from '@/assets/images/topTrending/tourCard_image_7.svg';
import tourCard8 from '@/assets/images/topTrending/tourCard_image_8.svg';
import tourCard9 from '@/assets/images/topTrending/tourCard_image_9.svg';
import tourCard10 from '@/assets/images/topTrending/tourCard_image_10.svg';


import './TrendingDestinations.scss';
/*interface TrendingDestinationsInterface {
  // children: ReactNode;
}*/
import TrendingDestinationsHeading from '@/components/homepage/trending-destinations/TrendingDestinationsHeading';
import TrendingDestination from '@/components/homepage/trending-destinations/TrendingDestination';

export default function TrendingDestinations(/*{  }: TrendingDestinationsInterface*/) {
  return (
    <>
      <TrendingDestinationsHeading />
      <div className="trending-destinations-figure-wrapper container-trending-destinations flex">
        <TrendingDestination
          country={`Paris`}
          alt={`Eiffel tower image`}
          href={`/tours/e1`}
          text={`100+ Tours`}
          imgSrc={tourCard1}
        />
        <TrendingDestination
          country={`Singapore`}
          alt={`Eiffel tower image`}
          href={`/tours/e2`}
          text={`600+ Tours`}
          imgSrc={tourCard2}
        />
        <TrendingDestination
          country={`Roma`}
          alt={`Eiffel tower image`}
          href={`/tours/e3`}
          text={`200+ Tours`}
          imgSrc={tourCard3}
        />
        <TrendingDestination
          country={`Bangkok`}
          alt={`Eiffel tower image`}
          href={`/tours/e4`}
          text={`541+ Tours`}
          imgSrc={tourCard4}
        />
        <TrendingDestination
          country={`Bali`}
          alt={`Eiffel tower image`}
          href={`/tours/e5`}
          text={`13+ Tours`}
          imgSrc={tourCard5}
        />
        <TrendingDestination
          country={`Phuket`}
          alt={`Eiffel tower image`}
          href={`/tours/e6`}
          text={`754+ Tours`}
          imgSrc={tourCard6}
        />
        <TrendingDestination
          country={`Tokio`}
          alt={`Eiffel tower image`}
          href={`/tours/e7`}
          text={`131+ Tours`}
          imgSrc={tourCard7}
        />
        <TrendingDestination
          country={`Cappadocia`}
          alt={`Eiffel tower image`}
          href={`/tours/e8`}
          text={`241+ Tours`}
          imgSrc={tourCard8}
        />
        <TrendingDestination
          country={`New York`}
          alt={`Eiffel tower image`}
          href={`/tours/e9`}
          text={`400+ Tours`}
          imgSrc={tourCard9}
        />
        <TrendingDestination
          country={`Milan`}
          alt={`Eiffel tower image`}
          href={`/tours/e10`}
          text={`600+ Tours`}
          imgSrc={tourCard10}
        />
        <TrendingDestination
          country={`Manchester`}
          alt={`Eiffel tower image`}
          href={`/tours/e11`}
          text={`300+ Tours`}
          imgSrc={tourCard1}
        />
      </div>
    </>
  );
}
