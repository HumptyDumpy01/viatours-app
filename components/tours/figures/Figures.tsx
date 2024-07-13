// 'use client';
import './Figures.scss';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';
import Figure from './Figure';
/*interface FiguresInterface {
  // children: ReactNode;
}*/

export default function Figures(/*{  }: FiguresInterface*/) {
  return (
    <div className="all-tours__content__figures__figure-container">
      {DUMMY_TOURS.map((tour) => (
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
  );
}
