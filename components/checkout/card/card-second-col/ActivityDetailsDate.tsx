// 'use client';

import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import ActivityDetailsDateHeading from '@/components/checkout/card/card-second-col/ActivityDetailsDateHeading';
import ActivityDetailsAmountOfTickets from '@/components/checkout/card/card-second-col/ActivityDetailsAmountOfTickets';
import NonRefundableCancellation from '@/components/UI/Other/NonRefundableCancellation';

type ActivityDetailsSecondColType = {
  order: OrderInterface;
  // children: ReactNode;
}

export default function ActivityDetailsDate({ order }: ActivityDetailsSecondColType) {
  return (
    <div className="book-now__details-2__activity-details__card-date">
      <ActivityDetailsDateHeading heading={`Date: `} date={order.date} time={order.time} />
      <ActivityDetailsAmountOfTickets order={order} />
      <NonRefundableCancellation />
    </div>
  );
}
