// 'use client';
import '@/app/checkout/page.scss';
import CheckoutDetailsFirstStep from '@/components/checkout/CheckoutDetailsFirstStep';
/*type CheckoutDetailsType = {
  // children: ReactNode;
}*/

export default function CheckoutDetails(/*{  }: CheckoutDetailsType*/) {
  return (
    <div className="book-now__details">
      <CheckoutDetailsFirstStep />
    </div>
  );
}
