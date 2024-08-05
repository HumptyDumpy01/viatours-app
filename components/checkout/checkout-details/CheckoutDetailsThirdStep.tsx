'use client';

import './CheckoutDetailsThirdStep.scss';
import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import { useCartSelector } from '@/store/hooks';


import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFormPaymentDetails from '@/components/checkout/form/CheckoutFormPaymentDetails';
import convertToCurrency from '@/lib/convertToCurrency';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type CheckoutDetailsThirdStepType = {
  order: OrderInterface;
  // children: ReactNode;
}

export default function CheckoutDetailsThirdStep({ order }: CheckoutDetailsThirdStepType) {
  const openPaymentDetails = useCartSelector((state) => !state.checkout.openPaymentDetails);

  return (
    <div className="book-now__details-3">
      <CheckoutHeading number={3} label={`Payment Details`} />
      <div className={`book-now__details-3__content ${openPaymentDetails ? `hidden` : ``}`}>
        <Elements stripe={stripePromise} options={{
          mode: 'payment',
          amount: convertToCurrency(order.totalPrice),
          currency: 'usd'
        }}>
          <CheckoutFormPaymentDetails order={order} />
        </Elements>
      </div>
    </div>
  );
}
