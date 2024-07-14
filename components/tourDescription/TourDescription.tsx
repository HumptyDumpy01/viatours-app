// 'use client';

import TourDescriptionNavigation from '@/components/tourDescription/TourDescriptionNav/TourDescriptionNavigation';
import DescriptionTag from '@/components/tourDescription/DescriptionTag';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';
import { notFound } from 'next/navigation';
import TourStats from '@/components/tourDescription/TourStats';

type TourDescriptionType = {
  params: {
    id: string;
  }
  // children: ReactNode;
}

export default function TourDescriptionSection({ params }: TourDescriptionType) {
  const currTour = DUMMY_TOURS.find((item) => item.id === params.id);

  if (!currTour) {
    notFound();
  }

  return (
    <>
      <TourDescriptionNavigation params={params} />
      <section className="description container">
        <DescriptionTag />
        <h1 className="description__heading margin-bottom-small">{currTour.title}</h1>
      </section>

      <div className="description__stats-wrapper flex flex-space-between">
        <TourStats
          info={{
            rating: currTour.rating.overall,
            totalReviews: currTour.reviewed,
            city: currTour.city,
            country: currTour.country,
            booked: currTour.booked
          }}
        />
      </div>
    </>
  );
}
