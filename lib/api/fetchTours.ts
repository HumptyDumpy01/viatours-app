'use server';

import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';

export async function fetchTours(tag?: `new` | `popular`, max?: number): Promise<TourInterface[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let tours: TourInterface[] = [];
  if (!max && !tag) {
    tours = DUMMY_TOURS;
    return tours;
  }

  if (max && tag) {
    // filter out tours that are new
    const sortedTours = DUMMY_TOURS.filter((tour) => tour.tag.includes(tag));

    tours = sortedTours.length > max ? sortedTours.slice(0, max) : sortedTours;
    // console.log(tours);
    return tours;
  }
  if (max && !tag) {
    tours = DUMMY_TOURS.length > max ? DUMMY_TOURS.slice(0, max) : DUMMY_TOURS;
    // console.log(tours);
    return tours;
  }
  tours = DUMMY_TOURS.filter((tour) => tour.tag.includes(`${tag}`));
  // console.log(tours);
  return tours;

}
