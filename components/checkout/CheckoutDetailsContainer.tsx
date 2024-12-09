'use client';

/*type CheckoutDetailsContainerType = {
  // children: ReactNode;
}*/

import CheckoutDetails, { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import React, { useEffect, useState } from 'react';
import { TourInterface } from '@/app/tours/[id]/page';
import { notFound } from 'next/navigation';
import CheckoutLoadingPage from '@/app/checkout/loading';
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useCartDispatch } from '@/store/hooks';
import { backdropSliceActions } from '@/store/backdropSlice';

export default function CheckoutDetailsContainer(/*{  }: CheckoutDetailsContainerType*/) {

  const [order, setOrder] = useState<OrderInterface | null>(null);
  const [tour, setTour] = useState<TourInterface>();
  const [loading, setLoading] = useState(true);

  const dispatch = useCartDispatch();

  useEffect(() => {
    dispatch(backdropSliceActions.setBackdropOpen(false));
    const orderData = localStorage.getItem('order');
    if (!orderData) {
      notFound();
    } else {
      const parsedOrder = JSON.parse(orderData);
      setOrder(parsedOrder);

      const response = fetch('/api/get-tour-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: parsedOrder.tourId })
      }).then((response) => {
        if (!response.ok) {
          console.error('Failed to fetch tour data');
          // throw new Error('Failed to fetch tour data');
        }
        return response.json();
      }).then((data) => {
        if (data.error) {
          console.error(data.message);
          // throw new Error(data.message);
        }
        setTour(data.response.currTour);
        setLoading(false);
        return data.response;
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
