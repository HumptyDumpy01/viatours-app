// 'use client';
import '@/app/tours/page.scss';

/*interface AllToursInterface {
  // children: ReactNode;
}*/
import ToursHeader from '@/components/tours/header/ToursHeader';
import SearchTour from '@/components/tours/form/SearchTour';
import Filter from '@/components/UI/Filter/Filter';
import Figures from '@/components/tours/figures/Figures';
// import { getTours } from '@/lib/mongodb';

export default function AllTours(/*{  }: AllToursInterface*/) {

  // let numberOfTours;
  // const tours = getTours(9999, {}, 0).then((tours) => {
  //   numberOfTours = tours.length;
  // }).catch((error) => {
  //   console.error(`Failed to fetch tours: ${error}`);
  // });
  //
  return (
    <>
      <div className={`all-tours__content-header`}>
        <ToursHeader />
        <SearchTour />
      </div>
      <div className="all-tours__content grid">
        <Filter />
        <div className="all-tours__content__figures">
          <Figures />
        </div>
      </div>
    </>
  );
}
