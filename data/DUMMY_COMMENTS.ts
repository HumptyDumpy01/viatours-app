import { StaticImageData } from 'next/image';
import commentImg1 from '@/assets/images/commentImages/img-1.jpg';
import commentImg2 from '@/assets/images/commentImages/img-2.jpg';
import commentImg3 from '@/assets/images/commentImages/img-3.jpg';
import commentImg4 from '@/assets/images/commentImages/img-4.jpg';
import commentImg5 from '@/assets/images/commentImages/img-5.jpg';
import commentImg6 from '@/assets/images/commentImages/img-6.jpg';
import commentImg7 from '@/assets/images/commentImages/img-7.jpg';
import commentImg8 from '@/assets/images/commentImages/img-8.jpg';
import commentImg9 from '@/assets/images/commentImages/img-9.jpg';

export type DummyTourCommentType = {
  id: string;
  tourId: string;
  userId: string;
  user: string;
  rated: number;
  title: string;
  text: string;
  images: string[] | StaticImageData[]
  date_added: string;
  likes: number;
  dislikes: number;
  abuse_reports: number;
}

export const DUMMY_TOUR_COMMENTS: DummyTourCommentType[] = [
  {
    id: `c1`,
    userId: `u1`,
    tourId: `e1`,
    user: `Nancy van Brown`,
    rated: 4.3,
    title: `Take this tour! It was a fantastic experience!`,
    text: `We had a great time on this tour. The guide was very knowledgeable and friendly, and the itinerary was well-planned. The boat was comfortable, and the lunch was delicious. We especially enjoyed snorkeling at Bamboo Island and swimming in the crystal-clear waters of Pileh Lagoon. Highly recommended!`,
    images: [
      commentImg1,
      commentImg2,
      commentImg3
    ],
    date_added: `2024-07-01T13:45:04.000Z`,
    likes: 589,
    dislikes: 14,
    abuse_reports: 0
  },
  {
    id: `c2`,
    tourId: `e1`,
    userId: `u2`,
    user: `Linda Brown`,
    rated: 3.5,
    title: `Good tour, but could be better`,
    text: `We enjoyed the tour, but there were a few things that could have been better. The guide was friendly, but not very knowledgeable. The boat was comfortable, but the lunch was just okay. The itinerary was good, but we felt a bit rushed at times. Overall, it was a good tour, but it could have been better.`,
    images: [
      commentImg4,
      commentImg5,
      commentImg6
    ],
    date_added: `2024-07-01T13:45:04.000Z`,
    likes: 15,
    dislikes: 58,
    abuse_reports: 0
  },
  {
    id: `c3`,
    tourId: `e1`,
    userId: `u3`,
    user: `George Boyd`,
    rated: 4.8,
    title: `Amazing tour! Highly recommended!`,
    text: `We had an amazing time on this tour. The guide was very knowledgeable and friendly, and the itinerary was well-planned. The boat was comfortable, and the lunch was delicious. We especially enjoyed snorkeling at Bamboo Island and swimming in the crystal-clear waters of Pileh Lagoon. Highly recommended!`,
    images: [
      commentImg7,
      commentImg8,
      commentImg9
    ],
    date_added: `2024-07-01T13:45:04.000Z`,
    likes: 0,
    dislikes: 0,
    abuse_reports: 0
  },
  {
    id: `c4`,
    tourId: `e1`,
    userId: `u4`,
    user: `lucy Hood`,
    rated: 4.5,
    title: `Wow! That was amazing!`,
    text: `We had a fantastic time on this tour. The guide was very knowledgeable and friendly, and the itinerary was well-planned. The boat was comfortable, and the lunch was delicious. We especially enjoyed snorkeling at Bamboo Island and swimming in the crystal-clear waters of Pileh Lagoon. Highly recommended!`,
    images: [],
    date_added: `2024-07-01T13:45:04.000Z`,
    likes: 0,
    dislikes: 0,
    abuse_reports: 0
  }
];

