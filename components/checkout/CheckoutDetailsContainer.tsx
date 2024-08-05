'use client';

/*type CheckoutDetailsContainerType = {
  // children: ReactNode;
}*/

import CheckoutDetails, { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import React, { useEffect, useState } from 'react';
import { TourInterface } from '@/data/DUMMY_TOURS';
import { notFound } from 'next/navigation';
import { getTourById } from '@/lib/mongodb';
import CheckoutLoadingPage from '@/app/checkout/loading';

export default function CheckoutDetailsContainer(/*{  }: CheckoutDetailsContainerType*/) {

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
    <div className="book-now grid container">
      <CheckoutDetails tour={tour} order={order} />
    </div>
  );
}
