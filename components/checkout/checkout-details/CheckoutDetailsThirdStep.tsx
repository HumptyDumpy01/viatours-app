'use client';

import './CheckoutDetailsThirdStep.scss';
import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import { useCartSelector } from '@/store/hooks';


import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFormPaymentDetails from '@/components/checkout/form/CheckoutFormPaymentDetails';
import convertToCurrency from '@/lib/convertToCurrency';


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

/*type CheckoutDetailsThirdStepType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsThirdStep(/*{  }: CheckoutDetailsThirdStepType*/) {
  const amount = 1080.88;
  const openPaymentDetails = useCartSelector((state) => !state.checkout.openPaymentDetails);

  return (
    <div className="book-now__details-3">
      <CheckoutHeading number={3} label={`Payment Details`} />
      <div className={`book-now__details-3__content ${openPaymentDetails ? `hidden` : ``}`}>
        <Elements stripe={stripePromise} options={{
          mode: 'payment',
          amount: convertToCurrency(amount),
          currency: 'usd'
        }}>
          <CheckoutFormPaymentDetails amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
