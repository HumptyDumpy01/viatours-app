import React from 'react';
import './page.scss';
import CheckoutDetailsContainer from '@/components/checkout/CheckoutDetailsContainer';

export const metadata = {
  title: `Proceed with the booking!`,
  description: `This is the checkout page where you can proceed with the booking of your Viatours tour.`
};

export default function CheckoutPage() {
  return (
    <section className="book-now-container">
      <CheckoutDetailsContainer />
    </section>
  );
}