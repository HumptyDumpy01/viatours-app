'use client';

import React, { useEffect, useState } from 'react';
import './page.scss';
import CheckoutDetails, { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import CheckoutLoadingPage from '@/app/checkout/loading';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';

export default function CheckoutPage() {

  const [order, setOrder] = useState<OrderInterface | null>(null);
  const [loading, setLoading] = useState(true); // Step 1: Introduce a loading state


  useEffect(() => {
    setLoading(true); // Step 2: Set loading to true initially
    async function fetchData() {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderData = localStorage.getItem('order');
      if (orderData) {
        setOrder(JSON.parse(orderData));
      }
      setLoading(false); // Step 4: Set loading to false after fetching data
    }

    fetchData();
  }, []);

  if (loading) {
    return <CheckoutLoadingPage />; // Step 3: Show loading page while fetching data
  }

  if (!order) {
    console.log('Order not found');
    return null;
  }

  const tour = DUMMY_TOURS.find((item) => item._id === order.tourId);

  if (!tour) {
    throw new Error('Tour not found');
  }

  return (
    <section className="book-now-container">
      <div className="book-now grid container">
        <CheckoutDetails tour={tour} order={order} />
      </div>
    </section>
  );
}