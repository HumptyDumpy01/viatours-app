'use client';

import './CheckoutDetailsThirdStep.scss';
import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import { useCartSelector } from '@/store/hooks';
/*type CheckoutDetailsThirdStepType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsThirdStep(/*{  }: CheckoutDetailsThirdStepType*/) {
  const openPaymentDetails = useCartSelector((state) => !state.checkout.openPaymentDetails);

  return (
    <div className="book-now__details-3">
      <CheckoutHeading number={3} label={`Payment Details`} />
      <div className={`book-now__details-3__content ${openPaymentDetails ? `hidden` : ``}`}>
        <h2 className={`subheading margin-top-normal`}>Here comes stripe payments</h2>
      </div>
    </div>
  );
}
