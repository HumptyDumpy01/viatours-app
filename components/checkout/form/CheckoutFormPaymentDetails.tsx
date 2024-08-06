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

    const newOrder = await createdOrder.json() as {
      message: string;
      results: { acknowledged: boolean; insertedId: string; }
    };

    if (!newOrder.results.acknowledged) {
      setErrorMessage(newOrder.message);
      setLoading(false);
      return;
    }

    const fetchedOrder = await fetch(`http://localhost:3000/api/handle-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ perform: 'fetchById', id: newOrder.results.insertedId })
    });

    const fetchedOrderData = await fetchedOrder.json();

    // throw new Error(`ERROR!`);

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/checkout-details?orderId=${newOrder.results.insertedId}`
      }
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);

      // TODO: Write logic to delete the order if payment fails

      return;
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