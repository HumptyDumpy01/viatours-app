// 'use client';

/*type CheckoutDetailsSecondStepType = {
  // children: ReactNode;
}*/

import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import ActivityDetailsCard from '@/components/checkout/ActivityDetailsCard';

export default function CheckoutDetailsSecondStep(/*{  }: CheckoutDetailsSecondStepType*/) {
  return (
    <div className="book-now__details-2">
      <CheckoutHeading label={`Activity Details`} number={2} />
      <div className="book-now__details-2__content">
        <ActivityDetailsCard />
      </div>
    </div>
  );
}
