'use client';

import { TourInterface } from '@/data/DUMMY_TOURS';
import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import ActivityDetailsCard from '@/components/checkout/card/card-first-col/ActivityDetailsCard';
import CheckoutFormActivityDetails from '@/components/checkout/form/CheckoutFormActivityDetails';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import { useCartSelector } from '@/store/hooks';


type CheckoutDetailsSecondStepType = {
  tour: TourInterface;
  order: OrderInterface;
  // children: ReactNode;
}

export default function CheckoutDetailsSecondStep({ tour, order }: CheckoutDetailsSecondStepType) {

  const openActivityDetails = useCartSelector((state) => state.checkout.openActivityDetails);
  console.log(openActivityDetails);

  return (
    <div className="book-now__details-2">
      <CheckoutHeading label={`Activity Details`} number={2} />
      <div className={`book-now__details-2__content ${!openActivityDetails ? `hidden` : ``}`}>
        <ActivityDetailsCard tour={tour} order={order} />
        <CheckoutFormActivityDetails
          languages={tour.languages}
          meetingPoint={tour.meetingPoint}
          adultTickets={order.adultTickets}
          childrenTickets={order.childrenTickets}
          youthTickets={order.youthTickets}
        />
      </div>
    </div>
  );
}
