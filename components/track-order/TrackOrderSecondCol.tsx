'use client';
import classes from '@/app/track-order/page.module.scss';
/*type TrackOrderSecondColType = {
  // children: ReactNode;
}*/
import Lottie from 'lottie-react';
import TravellerAnimation from '@/animations/traveller.json';
import React from 'react';

export default function TrackOrderSecondCol(/*{  }: TrackOrderSecondColType*/) {
  return (
    <>
      <div className={classes[`track-order-second-col`]}>
        <Lottie animationData={TravellerAnimation} />
      </div>
    </>
  );
}
