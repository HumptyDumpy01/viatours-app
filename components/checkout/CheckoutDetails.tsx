// 'use client';
import '@/app/checkout/page.scss';
import CheckoutDetailsFirstStep from '@/components/checkout/CheckoutDetailsFirstStep';
import CheckoutDetailsSecondStep from '@/components/checkout/CheckoutDetailsSecondStep';
/*type CheckoutDetailsType = {
  // children: ReactNode;
}*/

export default function CheckoutDetails(/*{  }: CheckoutDetailsType*/) {
  return (
    <div className="book-now__details">
      <CheckoutDetailsFirstStep />
      <CheckoutDetailsSecondStep />
    </div>
  );
}
