'use client';

import { SessionProvider } from 'next-auth/react';
import TourStats from '@/components/tourDescription/TourStats';
import React from 'react';

type TourStatsContainerType = {
  info: {
    rating: number;
    totalReviews: number;
    city: string;
    title: string;
    country: string;
    booked: number;
    views: number;
  };
  session: any;
  // children: ReactNode;
}

export default function TourStatsContainer({ info, session }: TourStatsContainerType) {
  return (
    <SessionProvider>
      <TourStats
        session={session}
        info={{
          title: info.title,
          rating: info.rating,
          totalReviews: info.totalReviews,
          city: info.city,
          country: info.country,
          booked: info.booked,
          views: info.views
        }}
      />
    </SessionProvider>
  );
}
