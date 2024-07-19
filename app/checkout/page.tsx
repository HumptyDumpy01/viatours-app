'use client';

import React, { useEffect } from 'react';
import './page.scss';
import { notFound } from 'next/navigation';
import CheckoutDetails from '@/components/checkout/checkout-details/CheckoutDetails';

export default function CheckoutPage() {
  useEffect(() => {
    // This code runs only on the client side
    const order = localStorage.getItem('order');
    if (!order) {
      notFound();
    }
  }, []);

  // Assuming you still want to use the order object below this point,
  // you should consider setting it in the state and using it from there.
  // This is just a placeholder example to parse the order after ensuring it exists.
  const order = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('order') || '{}') : null;

  return (
    <section className="book-now-container">
      <div className="book-now grid container">
        <CheckoutDetails />
      </div>
    </section>
  );
}