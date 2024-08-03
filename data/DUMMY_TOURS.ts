import { MeetingPointType } from '@/data/DUMMY_MEETING_POINTS';


// import tourCard9 from '@/assets/images/topTrending/tourCard_image_9.svg';

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
    likes: number;
    dislikes: number;
  }[];
}