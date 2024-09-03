// 'use client';

import React from 'react';
import '@/app/checkout/page.scss';
import CheckoutDetailsFirstStep from '@/components/checkout/checkout-details/CheckoutDetailsFirstStep';
import CheckoutDetailsSecondStep from '@/components/checkout/checkout-details/CheckoutDetailsSecondStep';
import CheckoutDetailsThirdStep from '@/components/checkout/checkout-details/CheckoutDetailsThirdStep';
import CheckoutOverall from '@/components/checkout/checkout-overall/CheckoutOverall';
import BookWithConfidence from '@/components/UI/Layout/BookWithConfidence';
import { MeetingPointType } from '@/app/tours/[id]/page';

export type OrderInterface = {
  date: string;
  time: string;
  adultTickets: number;
  youthTickets: number;
  childrenTickets: number;
  servicePerBooking?: 'on';
  servicePerPerson?: 'on';
  totalPrice: number;
  tourId: string;
  tourTitle: string;
  meetingPoint: MeetingPointType;
}

export default function CheckoutDetails({ tour, order }: { tour: any, order: OrderInterface }) {

  return (
    <>
      <div className="book-now__details">
        <CheckoutDetailsFirstStep />
        <CheckoutDetailsSecondStep tour={tour} order={order} />
        <CheckoutDetailsThirdStep order={order} />
      </div>
      <div className="book-now__overall-container">
        <CheckoutOverall tour={tour} order={order} />
        <BookWithConfidence />
      </div>
    </>
  );
}