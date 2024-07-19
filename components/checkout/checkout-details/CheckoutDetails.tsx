import React, { useEffect, useState } from 'react';
import '@/app/checkout/page.scss';
import CheckoutDetailsFirstStep from '@/components/checkout/checkout-details/CheckoutDetailsFirstStep';
import CheckoutDetailsSecondStep from '@/components/checkout/checkout-details/CheckoutDetailsSecondStep';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';
import CheckoutDetailsThirdStep from '@/components/checkout/checkout-details/CheckoutDetailsThirdStep';
import CheckoutOverall from '@/components/checkout/checkout-overall/CheckoutOverall';
import BookWithConfidence from '@/components/UI/Layout/BookWithConfidence';

export type OrderInterface = {
  date: string;
  time: string;
  adultTickets: number;
  youthTickets: number;
  childrenTickets: number;
  service_per_booking?: 'on';
  service_per_person?: 'on';
  totalPrice: number;
  tourId: number | string;
}

export default function CheckoutDetails() {
  const [order, setOrder] = useState<OrderInterface | null>(null);
  const [loading, setLoading] = useState(true); // Step 1: Introduce a loading state

  useEffect(() => {
    setLoading(true); // Step 2: Set loading to true initially
    const orderData = localStorage.getItem('order');
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
    setLoading(false); // Step 4: Set loading to false after fetching data
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Step 5: Conditional rendering based on loading state
  }

  if (!order) {
    console.log('Order not found');
    return null;
  }

  const tour = DUMMY_TOURS.find((item) => item.id === order.tourId);

  if (!tour) {
    throw new Error('Tour not found');
  }

  return (
    <>
      <div className="book-now__details">
        <CheckoutDetailsFirstStep />
        <CheckoutDetailsSecondStep tour={tour} order={order} />
        <CheckoutDetailsThirdStep />
      </div>

      <div className="book-now__overall-container">
        <CheckoutOverall tour={tour} order={order} />
        <BookWithConfidence />
      </div>
    </>
  );
}