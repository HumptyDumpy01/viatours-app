// 'use client';

import TourDescriptionSection from '@/components/tourDescription/TourDescription';
import { notFound } from 'next/navigation';
import { getTourById, getTours } from '@/lib/mongodb';
import { TourInterface } from '@/data/DUMMY_TOURS';


interface TourDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

async function getTour(id: string) {
  const currTour = await getTourById(id) as TourInterface;
  return currTour;
}

export async function generateMetadata({ params }: TourDescriptionInterface) {
  const currTour = await getTour(params.id) as TourInterface;

  if (!currTour) {
    notFound();
  }
  return {
    title: `${currTour.title}`,
    description: `${currTour.overview}. The Tour to ${currTour.city} is ${currTour.duration} long and costs ${currTour.price.adult} per person,
    ${currTour.price.youth} per youth, and ${currTour.price.children} per children. 
    This particular tour is rated ${currTour.rating.overall} stars by our customers, and also includes: ${currTour.whatsIncluded.green.join(`, `)}. We did not 
    for forget about the ${currTour.whatsIncluded.orange.join(`, `)} and more! Book now!`
  };
}


export default async function TourDescription({ params }: TourDescriptionInterface) {
  const currTour = await getTour(params.id) as TourInterface;
  const similarTours = await getTours(22, { tags: { $in: currTour.tags } }) as TourInterface[];
  return (
    <>
      <TourDescriptionSection similarTours={similarTours} tour={currTour} params={params} />
    </>
  );
}
