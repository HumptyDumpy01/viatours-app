// 'use client';

import TourDescriptionSection from '@/components/tourDescription/TourDescription';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';
import { notFound } from 'next/navigation';


interface TourDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

export async function generateMetadata({ params }: TourDescriptionInterface) {
  // const meal = FUNC_FETCHING_ITEM(params.YOUR_DYNAMIC_ID);
  const currTour = DUMMY_TOURS.find((item) => item.id === params.id);

  if (!currTour) {
    notFound();
  }
  return {
    title: `${currTour.title}`,
    description: `${currTour.overview}. The Tour to ${currTour.city} is ${currTour.duration} long and costs ${currTour.price.adult} per person,
    ${currTour.price.youth} per youth, and ${currTour.price.children} per children. 
    This particular tour is rated ${currTour.rating.overall} stars by our customers, and also includes: ${currTour.what_included.green.join(`, `)}. We did not 
    for forget about the ${currTour.what_included.orange.join(`, `)} and more! Book now!`
  };
}


export default function TourDescription({ params }: TourDescriptionInterface) {
  return (
    <>
      <TourDescriptionSection params={params} />
    </>
  );
}
