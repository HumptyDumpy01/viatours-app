/* IMPORTANT: DO NOT MODIFY */
/* IMPORTANT: DO NOT MODIFY */
/* IMPORTANT: DO NOT MODIFY */

export type MeetingPointType = {
  title: string;
  location: { type: `Point`, coordinates: [number, number] };
  city: string;
  state: string;
  country: string;
};

export interface TourInterface {
  _id: string;
  title: string;
  overview: string;
  country: string;
  city: string;
  reviews: number;
  views: number;
  time: string[];
  type: string[];
  price: {
    adult: number;
    youth: number;
    children: number;
    extra: {
      servicePerBooking: number,
      servicePerPerson: number;
      adult: number;
      youth: number;
    }
  };
  tags: string[];
  booked: number;
  images: string[];
  duration: string;
  groupSize: number;
  ages: string;
  tourHighlights: string[];
  whatsIncluded: {
    green: string[];
    orange: string[];
  };
  itinerary: {
    title: string;
    description: string;
  }[];
  tourMap: {
    label: string,
    location: { type: `Point` | `Polygon`, coordinates: [number, number] },
    googleMap: { key: string, location: google.maps.LatLngLiteral }
  }[];
  meetingPoint: MeetingPointType;
  searchIndex: string;
  available: boolean;
  onSale: false | {
    newPrice: {
      adult: number,
      youth: number,
      children: number,
      extra: { servicePerBooking: number, servicePerPerson: number, adult: number, youth: number }
    }
  };
  languages: string[];
  rating: {
    overall: number;
    location: number;
    amenities: number;
    food: number;
    price: number;
    rooms: number;
    tourOperator: number;
  };
  comments: { id: string }[] | [];
  tourComments: {
    _id: string;
    user: string;
    rating: number;
    title: string;
    text: string;
    images: string[];
    addedAt: string;
    likes: [];
    dislikes: [];
  }[];
}

// IMPORTANT: FOR PRODUCTION
/*

import TourDescriptionSection from '@/components/tourDescription/TourDescription';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import TourDescriptionLoadingPage from './loading-page';

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
    forget about the ${currTour.whatsIncluded.orange.join(`, `)} and more! Book now!`
  };
}

export default async function TourDescription({ params }: TourDescriptionInterface) {
  const session = await getServerSession(authConfig);

  if (session === undefined) {
    return <TourDescriptionLoadingPage />;
  }


  let sessionVar;
  if (session === null) {
    sessionVar = {
      user: {
        email: '',
        name: ''
      }
    };
  } else {
    sessionVar = {
      user: {
        email: session!.user!.email,
        name: session!.user!.name
      }
    };
  }

  const fetchedTours = await fetchTourData(params.id);
  const { similarTours, currTour } = fetchedTours;

  return (
    <>
      {/!*@ts-ignore*!/}
      <TourDescriptionSection userName={sessionVar.user.name} userEmail={sessionVar.user.email} session={sessionVar}
                              similarTours={similarTours}
                              tour={currTour} params={params} />
    </>
  );
}
*/


/* INFO: the reason why I do have two versions is that in build bundle I change the way how
*   I parse the data by using separate fetch apis. It is not possible to do so without env variable
*   that points to your domain, so the version above, of course, won't work in development.
* */

/* IMPORTANT: FOR DEVELOPMENT */

import TourDescriptionSection from '@/components/tourDescription/TourDescription';
import { notFound } from 'next/navigation';
import { getTourById, getTours } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import TourDescriptionLoadingPage from '@/app/tours/[id]/loading-page';


export async function generateMetadata({ params }: TourDescriptionInterface) {
  const fetchedTours = await getTour(params.id);
  const { currTour } = fetchedTours;
  // const { similarTours } = currTour;

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

interface TourDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

async function getTour(id: string): Promise<{ currTour: TourInterface, similarTours: TourInterface[] }> {
  'use server';

  const currTour = await getTourById(id) as TourInterface;
  const similarTours = await getTours(22, { tags: { $in: currTour.tags } }) as TourInterface[];

  return {
    currTour,
    similarTours
  };
}


export default async function TourDescription({ params }: TourDescriptionInterface) {
  const fetchedTours = await getTour(params.id);
  const { similarTours, currTour } = fetchedTours;

  const session = await getServerSession(authConfig);

  if (session === undefined) {
    return <TourDescriptionLoadingPage />;
  }


  let sessionVar;
  if (session === null) {
    sessionVar = {
      user: {
        email: '',
        name: ''
      }
    };
  } else {
    sessionVar = {
      user: {
        email: session!.user!.email,
        name: session!.user!.name
      }
    };
  }

  return (
    <>
      {/*@ts-ignore*/}
      <TourDescriptionSection session={sessionVar} userEmail={sessionVar.user.email} userName={sessionVar.user.name}
                              similarTours={similarTours}
                              tour={currTour}
                              params={params} />
    </>
  );
}


