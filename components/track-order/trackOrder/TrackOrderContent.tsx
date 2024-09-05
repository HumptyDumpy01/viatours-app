'use client';

/*type TrackOrderContentType = {
  // children: ReactNode;
}*/

import classes from '@/app/track-order/page.module.scss';
import TrackOrderFirstCol from '@/components/track-order/trackOrder/TrackOrderFirstCol';
import TrackOrderSecondCol from '@/components/track-order/trackOrder/TrackOrderSecondCol';
import OrderDetailsActions from '@/components/track-order/orderDetailsActions/OrderDetailsActions';
import React, { useEffect } from 'react';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { trackOrderSliceActions } from '@/store/trackOrderSlice';

export default function TrackOrderContent(/*{  }: TrackOrderContentType*/) {
  const currentStage = useCartSelector((state) => state.trackOrder.orderStage);
  const dispatch = useCartDispatch();

  useEffect(() => {
    dispatch(trackOrderSliceActions.setOrderStage(1));
  }, [dispatch]);


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
