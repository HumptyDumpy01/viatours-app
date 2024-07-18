'use client';

import './page.scss';
import { notFound } from 'next/navigation';
import CheckoutDetails from '@/components/checkout/CheckoutDetails';
/*type CheckoutPageType = {
  // children: ReactNode;
}*/

export default function CheckoutPage(/*{  }: CheckoutPageType*/) {

  // if the local storage does not contain the tourOrder, redirect to the homepage
  if (!localStorage.getItem(`order`)) {
    notFound();
  }
  const order = JSON.parse(localStorage.getItem(`order`)!);
  console.log(`Executing order: `, order);

  return (
    <section className="book-now-container">
      <div className="book-now grid container">
        <CheckoutDetails />
      </div>
    </section>
  );
}
