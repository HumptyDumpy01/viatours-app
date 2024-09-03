// 'use client';

type TrackOrderFirstColType = {
  currentStage: number;
  // children: ReactNode;
}

import classes from '@/app/track-order/page.module.scss';
import EnterOrderIdStage from '@/components/track-order/EnterOrderIdStage';
import React from 'react';
import OrderDetailsStage from '@/components/track-order/OrderDetailsStage';

export default function TrackOrderFirstCol({ currentStage }: TrackOrderFirstColType) {

  return (
    <>
      <div className={classes[`track-order-container-first-col`]}>
        {currentStage === 1 && (
          <EnterOrderIdStage />
        )}
        {currentStage === 2 && (
          <OrderDetailsStage />
        )}
      </div>
    </>
  );
}
