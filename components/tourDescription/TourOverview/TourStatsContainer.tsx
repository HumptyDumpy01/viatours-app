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
  // children: ReactNode;
}

export default function TourStatsContainer({ info }: TourStatsContainerType) {
  return (
    <SessionProvider>
      <TourStats
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
