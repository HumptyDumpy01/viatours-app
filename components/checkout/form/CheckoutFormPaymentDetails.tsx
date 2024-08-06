'use client';
import convertToCurrency from '@/lib/convertToCurrency';
import React, { useEffect, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import classes from './CheckoutFormPaymentDetails.module.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';

type CheckoutFormPaymentDetailsType = {
  order: OrderInterface;
  // children: ReactNode;
}

export default function CheckoutFormPaymentDetails({ order }: CheckoutFormPaymentDetailsType) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useCartDispatch();
  const contactDetails = useCartSelector((state) => state.checkout.contactDetails);
  const activityDetails = useCartSelector((state) => state.checkout.activityDetails);

  if (contactDetails === undefined || activityDetails === undefined) {
    throw new Error('Failed to get form details!');
  }


  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: convertToCurrency(order.totalPrice) })
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
      });

  }, [order.totalPrice]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const createdOrder = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contactDetails, activityDetails, order })
    });

    // returns acknowledged and _id
    const newOrder = await createdOrder.json() as {
      message: string;
      results: { acknowledged: boolean; insertedId: string; }
    };

    console.log(`Executing orderId: `, newOrder);

    if (!newOrder.results.acknowledged) {
      setErrorMessage(newOrder.message);
      setLoading(false);
      return;
    }

    // fetch the newly created order
    const fetchedOrder = await fetch(`http://localhost:3000/api/handle-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // in a body tag wer simply define the data that should be submitted
      body: JSON.stringify({ perform: 'fetchById', id: newOrder.results.insertedId })
    });

    const fetchedOrderData = await fetchedOrder.json();
    console.log(`Fetched Order: `, fetchedOrderData);

    // transform ISO date to a readable date

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/checkout-details?amount=${fetchedOrderData.order.booking.totalPrice}&promoApplied=${fetchedOrderData.order.extraDetails.promoApplied}&tourDiscount=
        ${fetchedOrderData.order.extraDetails.tourDiscount}&totalTickets=${fetchedOrderData.order.booking.tickets.overall}
        &adultTickets=${fetchedOrderData.order.booking.tickets.adultTickets}&childrenTickets=${fetchedOrderData.order.booking.tickets.childrenTickets}
        &youthTickets=${fetchedOrderData.order.booking.tickets.youthTickets}&totalPrice=${fetchedOrderData.order.booking.totalPrice}
        &tourTitle=${fetchedOrderData.order.tourTitle}&orderId=${fetchedOrderData.order._id}
        &orderDate=${new Date(fetchedOrderData.order.booking.date).toLocaleDateString()}`
      }
    });

    // check if stripe.confirmPayment returns a success


    if (error) {
      setErrorMessage(error.message);
    }

    const updateStatus = await fetch(`http://localhost:3000/api/handle-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ perform: 'changeStatus', id: newOrder.results.insertedId })
    });

    const updatedOrder = await updateStatus.json();

    if (!updatedOrder) {
      setErrorMessage('Failed to update order status.');
    }

    setLoading(false);

  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className={classes[`flex-center`]}>
        <div className={classes[`spinner text-surface dark-text-white`]} role="status">
          <span className={classes[`spinner-text`]}>Loading...</span>
        </div>
      </div>);
  }

  return (
    <form onSubmit={handleSubmit} className={classes[`form-container`]}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <p className={classes[`error-message`]}>{errorMessage}</p>}
      <button disabled={!stripe || loading} className={`btn--submit ${classes[`submit-button`]}`}>
        {loading ? `Processing` : `Proceed with the Payment`}
      </button>
    </form>
  );
}
