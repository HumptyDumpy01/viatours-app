// 'use client';

import FindPopularHeading from '@/components/homepage/find-popular-tours/FindPopularHeading';
import TourCard from '@/components/UI/Card/TourCard';
import './FindPopularTours.scss';
import { TourInterface } from '@/data/DUMMY_TOURS';

interface FindPopularToursInterface {
  tours: TourInterface[];
  // children: ReactNode;
}

export default function FindPopularTours({ tours }: FindPopularToursInterface) {
  // console.log(`Executing tours in FindPopularTours: `, tours);
  // const [tours, setTours] = useState<TourInterface[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  /*useEffect(() => {
    fetchTours('popular', 8)
      .then((tours) => {
        setTours(tours);
        setLoading(false);
      });

  }, []);*/

  return (
    <>
      <FindPopularHeading />
      <div className="find-popular-tours__tours-wrapper flex">
        <div className="find-popular-tours__figure-wrapper--1">
          {(tours as TourInterface[]).map(function(tour) {
            return (
              <>
                <TourCard
                  key={tour._id}
                  href={`/tours/${tour._id}`}
                  imgSrc={tour.images[0]}
                  imgAlt={tour.title}
                  info={[{
                    country: tour.country,
                    city: tour.city,
                    heading: tour.title,
                    rating: tour.rating.overall,
                    ratingCount: tour.reviews,
                    duration: tour.duration,
                    price: tour.price.children
                  }]}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
