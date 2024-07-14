// 'use client';
import '@/app/tours/page.scss';

/*interface AllToursInterface {
  // children: ReactNode;
}*/
import ToursHeader from '@/components/tours/header/ToursHeader';
import SearchTour from '@/components/tours/form/SearchTour';
import Filter from '@/components/UI/Filter/Filter';
import Figures from '@/components/tours/figures/Figures';

export default function AllTours(/*{  }: AllToursInterface*/) {
  return (
    <>
      <ToursHeader />
      <SearchTour />
      <div className="all-tours__content grid">
        <Filter />
        <div className="all-tours__content__figures">
          <Figures />
        </div>
      </div>
    </>
  );
}
