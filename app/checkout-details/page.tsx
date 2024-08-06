// 'use client';
import './page.scss';
import '@/components/checkout-details/Cols/CheckoutDetailsSecondCol.scss';
import CheckoutDetailsFirstCol from '@/components/checkout-details/Cols/CheckoutDetailsFirstCol';
import CheckoutDetailsSecondCol from '@/components/checkout-details/Cols/CheckoutDetailsSecondCol';
import { notFound } from 'next/navigation';

type ThanksForPurchaseType = {
  searchParams: {
    orderId: string,
  }
  // children: ReactNode;
}

export default async function ThanksForPurchase({ searchParams }: ThanksForPurchaseType) {
  const {
    orderId
  } = searchParams;

  const fetchedOrder = await fetch(`http://localhost:3000/api/handle-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ perform: 'fetchById', id: new Object(orderId) })
  });

  const fetchedOrderData = await fetchedOrder.json();

  if (!fetchedOrderData) {
    notFound();
  }

  if (fetchedOrderData.order.extraDetails.state.status === `pending`) {

    // update the status to paid
    const updateStatus = await fetch(`http://localhost:3000/api/handle-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ perform: 'changeStatus', id: new Object(orderId) })
    });

    if (!updateStatus) {
      throw new Error(`Failed to update order status.`);
    }

    console.log(fetchedOrderData.order, `fetchedOrderData`);
    console.log(`updateStatus`, updateStatus.json());

  }


  return (
    <section className="thanks-for-purchase-container">
      <div className="thanks-for-purchase grid">
        <div className="thanks-for-purchase-col-1">
          <CheckoutDetailsFirstCol />
        </div>
        <CheckoutDetailsSecondCol
          promoApplied={fetchedOrderData.order.extraDetails.promoApplied}
          tourDiscount={fetchedOrderData.order.extraDetails.tourDiscount}
          totalTickets={fetchedOrderData.order.booking.tickets.overall}
          adultTickets={fetchedOrderData.order.booking.tickets.adultTickets}
          youthTickets={fetchedOrderData.order.booking.tickets.youth}
          childrenTickets={fetchedOrderData.order.booking.tickets.childrenTickets}
          totalPrice={fetchedOrderData.order.booking.totalPrice}
          tourTitle={fetchedOrderData.order.tourTitle}
          orderId={fetchedOrderData.order._id}
          orderDate={fetchedOrderData.order.booking.date}
        />
      </div>
    </section>
  );
}
