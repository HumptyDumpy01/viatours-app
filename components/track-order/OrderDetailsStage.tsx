'use client';

import classes from './OrderDetailsStage.module.scss';
/*type OrderDetailsStageType = {
  // children: ReactNode;
}*/
import React from 'react';
import { useCartSelector } from '@/store/hooks';
import NotFound from 'next/dist/client/components/not-found-error';
import { OrderDetailsType } from '@/store/trackOrderSlice';
import Link from 'next/link';

export default function OrderDetailsStage(/*{  }: OrderDetailsStageType*/) {

  const orderDetails = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;

  const orderDetailsDummy = {
    _id: `66cd917717fb802dfbc4e4a9`,
    status: `booked`,
    tour: {
      _id: `66cd917717fb802dfbc4e4a9`,
      title: `The Forest Hiker`
    },
    tickets: 4,
    refundAvailable: false,
    cancellationAvailable: true,
    createdAt: `August 27, 2024, 13:55`,
    orderMadeBy: `Nick Baker`
  } as OrderDetailsType;

  if (!orderDetails) {
    NotFound();
  }


  // if the date in 2020-12-12T12:00:00Z format,
  // I do want it to be as 12 December 2020, 12:00
  const date = new Date(orderDetailsDummy?.createdAt);
  const formattedDate = date.toLocaleString(`en-UA`, {
    day: `numeric`,
    month: `long`,
    year: `numeric`,
    hour: `numeric`,
    minute: `numeric`
  });


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
            className={`inline-block`}>Status:</span> {orderDetailsDummy?.status?.toUpperCase() || `UNDEFINED`}
          </p>
          <p className={classes[`order-details-data-par`]}><span
            className={`inline-block font-weight-bold`}>ID:</span> {orderDetailsDummy?._id?.toString()} </p>
          <Link href={`/tours/${orderDetailsDummy?._id?.toString()}`}
                className={`${classes[`order-details-data-par`]}`}><span
            className={`inline-block font-weight-bold`}>Tour:</span> <u>{orderDetailsDummy?.tour?.title}</u></Link>
          <p className={classes[`order-details-data-par`]}><span
            className={`inline-block font-weight-bold`}>Tickets:</span> {orderDetailsDummy?.tickets} </p>
          <p className={classes[`order-details-data-par`]}><span className={`inline-block font-weight-bold`}>Refund available:</span>
            {orderDetailsDummy?.refundAvailable ? `Yes` : `No`}
          </p>
          <p className={classes[`order-details-data-par`]}>
            <span
              className={`inline-block font-weight-bold`}>Cancellation available:</span> {orderDetailsDummy?.cancellationAvailable ? `Yes` : `No`}
          </p>
        </div>
      </div>

      <div className={classes[`order-details-extra`]}>
        <p>Created: {formattedDate}</p>
        <p>Order made by : {orderDetailsDummy.orderMadeBy}</p>
      </div>
    </div>
  );
}
