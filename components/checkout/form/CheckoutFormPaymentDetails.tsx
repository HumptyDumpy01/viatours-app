'use client';
import convertToCurrency from '@/lib/convertToCurrency';
import React, { useEffect, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import classes from './CheckoutFormPaymentDetails.module.scss';

type CheckoutFormPaymentDetailsType = {
  amount: number;
  // children: ReactNode;
}

export default function CheckoutFormPaymentDetails({ amount }: CheckoutFormPaymentDetailsType) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: convertToCurrency(amount) })
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
      });

  }, [amount]);

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
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`
      }
    });

    if (error) {
      setErrorMessage(error.message);
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
    </form>);
}
