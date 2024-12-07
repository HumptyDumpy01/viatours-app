'use client';

/*type CheckoutDetailsContainerType = {
  // children: ReactNode;
}*/

import CheckoutDetails, { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import React, { useEffect, useState } from 'react';
import { TourInterface } from '@/app/tours/[id]/page';
import { notFound } from 'next/navigation';
import { getTourById } from '@/lib/mongodb';
import CheckoutLoadingPage from '@/app/checkout/loading';
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';

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
          console.error('Tour not found');
          // throw new Error('Tour not found');
        }
        setTour(tour);
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
    <SessionProvider>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="book-now grid container">
        <CheckoutDetails tour={tour} order={order} />
      </motion.div>
    </SessionProvider>
  );
}
