'use client';

/*type formCompTempType = {
  // children: ReactNode;
}*/
import React, { useState } from 'react';

export default function FormCompTemp(/*{  }: formCompTempType*/) {

  const [loading, setLoading] = useState<boolean>(false);

  const dummyOrder = {
    _id: '123',
    booking: {
      tickets: {
        overall: 2,
        adultTickets: 1,
        youthTickets: 1,
        childrenTickets: 0
      },
      time: '10:00',
      date: '2021-09-20',
      totalPrice: 200
    },
    extraDetails: {
      promoApplied: false,
      tourDiscount: 0,
      createdAt: '2021-09-20',
      state: {
        status: 'booked'
      }
    },
    tourTitle: 'Dummy Tour',
    meetingPoint: {
      title: 'Dummy Meeting Point',
      state: 'Dummy State',
      country: 'Dummy Country'
    }
  };

  async function handleSendEmail() {
    setLoading(true);
    // TODO: email the user about the order
    const sendEmail = await fetch(`http://localhost:3000/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order: dummyOrder })
    });

    setLoading(false);
  }

  return (
    <>
      <form onSubmit={handleSendEmail}>
        <button type="submit">Send Email</button>
        {loading && <p>Sending...</p>}
      </form>
    </>
  );
}
