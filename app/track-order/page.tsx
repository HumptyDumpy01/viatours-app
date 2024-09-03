// 'use client';
import React from 'react';
import TrackOrderContent from '@/components/track-order/TrackOrderContent';
/*type TrackOrderPageType = {
  // children: ReactNode;
}*/

export default function TrackOrderPage(/*{  }: TrackOrderPageType*/) {
  return (
    <>
      <main className={`container margin-bottom-36px`}>
        <TrackOrderContent />
      </main>
    </>
  );
}
