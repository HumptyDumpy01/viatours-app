import TourDescriptionSection from '@/components/tourDescription/TourDescription';
import { notFound } from 'next/navigation';
import { TourInterface } from '@/data/DUMMY_TOURS';

interface TourDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

async function fetchTourData(id: string): Promise<{ currTour: TourInterface, similarTours: TourInterface[] }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-tour-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      notFound();
    }

    return data.response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function generateMetadata({ params }: TourDescriptionInterface) {
  const fetchedTours = await fetchTourData(params.id);
  const { currTour } = fetchedTours;

  return {
    title: `${currTour.title}`,
    description: `${currTour.overview}. The Tour to ${currTour.city} is ${currTour.duration} long and costs ${currTour.price.adult} per person,
    ${currTour.price.youth} per youth, and ${currTour.price.children} per children.
    This particular tour is rated ${currTour.rating.overall} stars by our customers, and also includes: ${currTour.whatsIncluded.green.join(`, `)}. We did not
    for forget about the ${currTour.whatsIncluded.orange.join(`, `)} and more! Book now!`
  };
}

export default async function TourDescription({ params }: TourDescriptionInterface) {
  const fetchedTours = await fetchTourData(params.id);
  const { similarTours, currTour } = fetchedTours;
  return (
    <>
      <TourDescriptionSection similarTours={similarTours} tour={currTour} params={params} />
    </>
  );
}