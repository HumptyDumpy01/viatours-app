// 'use client';
import '@/app/checkout/page.scss';
import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import ButtonLoginOrSignup from '@/components/UI/Button/ButtonLoginOrSignup';
import CheckoutFormContactDetails from '@/components/checkout/CheckoutFormContactDetails';
/*type CheckoutDetailsFirstStepType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsFirstStep(/*{  }: CheckoutDetailsFirstStepType*/) {
  return (
    <>
      <div className="book-now__details-1">
        <CheckoutHeading label={`Contact Details`} number={1} />
        <div className="book-now__details-1__content">

          <p className="book-now__details-1__p color-blue-lighter">We’ll use this information to send you confirmation
            and
            updates about your
            booking!</p>
          <ButtonLoginOrSignup />
          <CheckoutFormContactDetails />
        </div>
      </div>
    </>
  );
}
