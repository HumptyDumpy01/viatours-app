// 'use client';

/*type EnterOrderIdStageType = {
  // children: ReactNode;
}*/

import classes from '@/app/track-order/page.module.scss';
import TrackOrderForm from '@/components/track-order/trackOrder/TrackOrderForm';
import React from 'react';

export default function EnterOrderIdStage(/*{  }: EnterOrderIdStageType*/) {
  return (
    <>
      <h1 className={classes[`track-order-heading`]}>Track your order in <span
        className={`inline-block highlighted`}>one click!</span>
      </h1>
      <p className={classes[`track-order-par`]}>Simply enter your order ID below to get real-time updates on your
        order status. Also, you can &nbsp;
        <span className={`inline-block highlighted`}> request a refund</span> or <span
          className={`inline-block highlighted`}>cancel your purchase.</span></p>

      <TrackOrderForm />
    </>
  );
}
