'use client';

import TourComments, { TourCommentsType } from '@/components/tourDescription/TourOverview/TourComments';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type TourCommentsContainerType = {
  currTourComments: [] | {
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
  // children: ReactNode;
}

export default function TourCommentsContainer({ currTourComments }: TourCommentsType) {
  return (
    <SessionProvider>
      <TourComments currTourComments={currTourComments} />
    </SessionProvider>
  );
}
