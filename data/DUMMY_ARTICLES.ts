import travelArticleImg1 from '@/assets/images/homepage/travelArticles/travelArticle_1.svg';
import travelArticleImg2 from '@/assets/images/homepage/travelArticles/travelArticle_2.svg';
import travelArticleImg3 from '@/assets/images/homepage/travelArticles/travelArticle_3.svg';

export type DummyArticleType = {
  id: string;
  subtitle: string;
  title: string;
  tags: string[];
  rating: number;
  reviewed: number;
  city: string;
  country: string;
  views: number;
  author: {
    id: string;
    name: string;
    lastName: string;
    role: string;
  };
  date: string;
  readIn: string;
  images: string[]
}

export const DUMMY_ARTICLES: DummyArticleType[] = [
  {
    id: `a1`,
    subtitle: 'Tanah Lot Temple',
    title: 'Exploring the Serengeti: A Wildlife Adventure',
    tags: [
      // INFO: ONE OF THESE
      'Trips',
      // 'Culture',
      'Nature'
      // 'Historic'
    ],
    // INFO: CALCULATED MATHEMATICALLY
    // depending on the total number of reviews, assuming 5 is 100% we need to calculate the total rating
    // in this math way: total rating = (5 * 100) / reviewed
    rating: 4.33,
    reviewed: 998,
    city: 'Bali',
    country: 'Indonesia',
    views: 1003,
    author: {
      id: 'au1',
      name: `Lily`,
      lastName: `Baker`,
      role: 'Writer'
    },
    date: '2024-07-01T14:15:02.000Z',
    readIn: '2 minutes',
    images: [
      // INFO: TO 7 IMAGES
      // MIN 3
      travelArticleImg1
    ]
  },
  {
    id: `a2`,
    subtitle: 'Machu Picchu',
    title: 'The Hidden Wonders of Machu Picchu',
    tags: ['Culture'],
    rating: 4.67, // Calculated as (5 * 100) / 1070
    reviewed: 1070,
    city: 'Cusco',
    country: 'Peru',
    views: 1560,
    author: {
      id: 'au2',
      name: `Tom`,
      lastName: `Gates`,
      role: 'Travel Blogger'
    },
    date: '2024-08-15T09:30:00.000Z',
    readIn: '3 minutes',
    images: [
      travelArticleImg2
    ]
  },
  {
    id: `a3`,
    subtitle: 'Eiffel Tower',
    title: 'Romantic Paris: A Guide to the City of Love',
    tags: ['Historic'],
    rating: 4.89, // Calculated as (5 * 100) / 900
    reviewed: 900,
    city: 'Paris',
    country: 'France',
    views: 2024,
    author: {
      id: 'au3',
      name: `Emily`,
      lastName: `Roux`,
      role: 'Photographer'
    },
    date: '2024-09-10T11:00:00.000Z',
    readIn: '5 minutes',
    images: [
      travelArticleImg3
    ]
  },
  {
    id: `a4`,
    subtitle: 'Grand Canyon',
    title: 'A Breathtaking Journey Through the Grand Canyon',
    tags: ['Nature'],
    rating: 4.75, // Calculated as (5 * 100) / 800
    reviewed: 800,
    city: 'Arizona',
    country: 'USA',
    views: 2500,
    author: {
      id: 'au4',
      name: `Jessica`,
      lastName: `Carter`,
      role: 'Adventurer'
    },
    date: '2024-10-05T10:20:00.000Z',
    readIn: '4 minutes',
    images: [
      travelArticleImg1,
      travelArticleImg2,
      travelArticleImg3
    ]
  }

];