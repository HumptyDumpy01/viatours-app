'use client';

import TourComments, { TourCommentsType } from '@/components/tourDescription/TourOverview/TourComments';
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

export default function TourCommentsContainer({ currTourComments, session }: TourCommentsType) {
  return (
    <TourComments session={session} currTourComments={currTourComments} />
  );
}
