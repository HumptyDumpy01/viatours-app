// 'use client';
/*interface FindPopularToursInterface {
  // children: ReactNode;
}*/
import FindPopularHeading from '@/components/homepage/find-popular-tours/FindPopularHeading';
import TourCard from '@/components/UI/Card/TourCard';
import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';
import './FindPopularTours.scss';

export default function FindPopularTours(/*{  }: FindPopularToursInterface*/) {
  let tours: TourInterface[] = [];
  // const DUMMY_TOURS = [];
  if (DUMMY_TOURS.length > 8) {
    tours = DUMMY_TOURS.slice(0, 8);
  } else {
    tours = DUMMY_TOURS;
  }
  return (
    <>
      <FindPopularHeading />
      <div className="find-popular-tours__tours-wrapper flex">
        <div className="find-popular-tours__figure-wrapper--1">
          {tours.length === 0 && <h2 className={`subheading`}>No tours found</h2>}
          {tours.map(function(item) {
            return (
              <TourCard
                key={item.id}
                href={`/tours/${item.id}`}
                imgSrc={item.images[0]}
                imgAlt={item.title}
                info={[{
                  country: item.country,
                  city: item.city,
                  heading: item.title,
                  rating: item.rating.overall,
                  ratingCount: item.reviewed,
                  duration: item.duration[0],
                  price: item.price.children
                }]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
