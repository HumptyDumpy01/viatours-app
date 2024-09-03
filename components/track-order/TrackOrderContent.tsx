'use client';

/*type TrackOrderContentType = {
  // children: ReactNode;
}*/

import classes from '@/app/track-order/page.module.scss';
import TrackOrderFirstCol from '@/components/track-order/TrackOrderFirstCol';
import TrackOrderSecondCol from '@/components/track-order/TrackOrderSecondCol';
import OrderDetailsActions from '@/components/track-order/OrderDetailsActions';
import React from 'react';
import { useCartSelector } from '@/store/hooks';

export default function TrackOrderContent(/*{  }: TrackOrderContentType*/) {
  const currentStage = useCartSelector((state) => state.trackOrder.currentStage);

  return (
    <>
      <div className={classes[`track-order-container`]}>
        <TrackOrderFirstCol currentStage={currentStage} />
        <TrackOrderSecondCol />
      </div>
      {currentStage === 2 && (
        <div className={classes[`order-details-actions-container`]}>
          <OrderDetailsActions />
        </div>
      )}
    </>
  );
}
