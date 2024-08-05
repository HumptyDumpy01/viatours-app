// 'use client';

import '@/app/checkout-details/page.scss';
import Link from 'next/link';
/*type CheckoutDetailsThanksForPurchaseType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsThanksForPurchase(/*{  }: CheckoutDetailsThanksForPurchaseType*/) {
  return (
    <>
      <h1 className="thanks-for-purchase__heading">Thanks for
        Purchase!</h1>
      <p className="thanks-for-purchase__text">Your upcoming adventure promises to be
        unforgettable! <br /> Please <u>keep an
          eye
          on
          your inbox</u> for further updates and travel information!</p>
      <div className="flex flex-align-center gap-25px margin-bottom-41px">
        <Link href={`/tours`} type="button" className="btn thanks-for-purchase__btn thanks-for-purchase__btn--1">Keep
          Shopping
        </Link>
        <button type="button" className="btn thanks-for-purchase__btn thanks-for-purchase__btn--2">Track Status
        </button>
      </div>
    </>
  );
}
