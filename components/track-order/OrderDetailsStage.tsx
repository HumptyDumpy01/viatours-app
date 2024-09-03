// 'use client';
import classes from './OrderDetailsStage.module.scss';
/*type OrderDetailsStageType = {
  // children: ReactNode;
}*/
import React from 'react';

export default function OrderDetailsStage(/*{  }: OrderDetailsStageType*/) {
  return (
    <div>
      <h1 className={classes[`order-details-heading`]}>Wow! Nice order!</h1>
      <p className={classes[`order-details-par`]}>Here we are! You can contemplate the most important details about your
        order. Check the
        meeting point, or Actions you can perform.</p>
      <div className={classes[`order-details-data-container`]}>
        <h2 className={classes[`order-details-heading-2`]}>Your Order</h2>
        <div className={classes[`order-details-data`]}>
          <p className={`highlighted ${classes[`order-details-data-par`]}`}><span
            className={`inline-block`}>Status:</span> BOOKED
          </p>
          <p className={classes[`order-details-data-par`]}><span
            className={`inline-block font-weight-bold`}>ID:</span> 66b20fa4a23d4368983c88f5 </p>
          <p className={classes[`order-details-data-par`]}><span
            className={`inline-block font-weight-bold`}>Tour:</span> <u>Tokyo Cultural Odyssey</u></p>
          <p className={classes[`order-details-data-par`]}><span
            className={`inline-block font-weight-bold`}>Tickets:</span> 4 </p>
          <p className={classes[`order-details-data-par`]}><span className={`inline-block font-weight-bold`}>Refund available:</span> No
          </p>
          <p className={classes[`order-details-data-par`]}><span className={`inline-block font-weight-bold`}>Cancellation available:</span> Yes
          </p>
        </div>
      </div>

      <div className={classes[`order-details-extra`]}>
        <p>Created: August 27, 2024, 13:55</p>
        <p>Order made by : Nick Baker</p>
      </div>
    </div>
  );
}
