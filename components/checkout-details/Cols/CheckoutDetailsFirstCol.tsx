// 'use client';
import '@/app/checkout-details/page.scss';
import CheckoutDetailsThanksForPurchase from '@/components/checkout-details/CheckoutDetailsThanksForPurchase';
import CheckoutDetailsSupport from '@/components/checkout-details/CheckoutDetailsSupport';
/*type CheckoutDetailsFirstColType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsFirstCol(/*{  }: CheckoutDetailsFirstColType*/) {
  return (
    <>
      <CheckoutDetailsThanksForPurchase />
      <CheckoutDetailsSupport />
    </>
  );
}
