'use server';

import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';

export async function fetchTours(max?: number): Promise<TourInterface[]> {
  if (!max) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const tours: TourInterface[] = DUMMY_TOURS;
    return tours;
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // filter out tours that are new
  const newestTours = DUMMY_TOURS.filter((tour) => tour.tag.includes('new'));

  const tours: TourInterface[] = newestTours.length > max ? newestTours.slice(0, max) : newestTours;
  console.log(tours);
  return tours;
}
