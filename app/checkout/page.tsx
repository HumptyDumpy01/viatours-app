'use client';

import React, { useEffect, useState } from 'react';
import './page.scss';
import CheckoutDetails, { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import { getTourById } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { TourInterface } from '@/data/DUMMY_TOURS';
import CheckoutLoadingPage from '@/app/checkout/loading';

export default function CheckoutPage() {
  const [order, setOrder] = useState<OrderInterface | null>(null);
  const [tour, setTour] = useState<TourInterface>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const orderData = localStorage.getItem('order');
    if (!orderData) {
      notFound();
    } else {
      const parsedOrder = JSON.parse(orderData);
      setOrder(parsedOrder);

      getTourById(parsedOrder.tourId).then((tour) => {
        if (!tour) {
          throw new Error('Tour not found');
        }
        setTour(tour);
        console.log(tour);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <CheckoutLoadingPage />;
  }

  // TODO: ADD A SEPARATE PAGE FOR ERROR HANDLING
  if (!order || !tour) {
    return <div>Error loading order or tour data</div>;
  }

  return (
    <section className="book-now-container">
      <div className="book-now grid container">
        <CheckoutDetails tour={tour} order={order} />
      </div>
    </section>
  );
}