'use server';

import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';

export async function fetchTours(tag?: `new` | `popular`, max?: number): Promise<TourInterface[]> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  if (!max && !tag) {
    const tours: TourInterface[] = DUMMY_TOURS;
    return tours;
  }

  if (max && tag) {
    // filter out tours that are new
    const sortedTours = DUMMY_TOURS.filter((tour) => tour.tag.includes(tag));

    const tours: TourInterface[] = sortedTours.length > max ? sortedTours.slice(0, max) : sortedTours;
    // console.log(tours);
    return tours;
  }
  if (max && !tag) {
    const tours: TourInterface[] = DUMMY_TOURS.length > max ? DUMMY_TOURS.slice(0, max) : DUMMY_TOURS;
    // console.log(tours);
    return tours;
  }
  const tours: TourInterface[] = DUMMY_TOURS.filter((tour) => tour.tag.includes(`${tag}`));
  // console.log(tours);
  return tours;

}
