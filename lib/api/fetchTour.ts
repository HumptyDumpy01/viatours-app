import { DUMMY_TOURS, TourInterface } from '@/data/DUMMY_TOURS';

export async function fetchTour(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const currTour = DUMMY_TOURS.find((item) => item.id === id) as TourInterface;

  if (!currTour) {
    return {
      message: 'Tour not found'
    };
  }

  return currTour;
}