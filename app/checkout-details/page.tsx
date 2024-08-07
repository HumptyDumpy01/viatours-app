'use client';

import './page.scss';
import '@/components/checkout-details/Cols/CheckoutDetailsSecondCol.scss';
import CheckoutDetailsFirstCol from '@/components/checkout-details/Cols/CheckoutDetailsFirstCol';
import CheckoutDetailsSecondCol from '@/components/checkout-details/Cols/CheckoutDetailsSecondCol';
import { notFound, useRouter } from 'next/navigation';
import { useCartDispatch } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { checkoutSliceActions } from '@/store/checkoutSlice';
import LoadingCheckoutDetails from '@/app/checkout-details/loading';

type ThanksForPurchaseType = {
  searchParams: {
    orderId: string,
  }
  // children: ReactNode;
}

export default function ThanksForPurchase({ searchParams }: ThanksForPurchaseType) {
  const {
    orderId
  } = searchParams;
  const dispatch = useCartDispatch();

  const [orderData, setOrderData] = useState<{
    order: {
      _id: string,
      booking: {
        tickets: {
          overall: number,
          adultTickets: number,
          youthTickets: number,
          childrenTickets: number
        },
        date: string,
        totalPrice: number
      },
      extraDetails: {
        promoApplied: boolean,
        tourDiscount: number,
        createdAt: string,
        state: {
          status: string
        }
      },
      tourTitle: string
    }
  }>();
  const [loading, setLoading] = useState<boolean>(true);

  // if no params are passed
  if (!orderId) {
    notFound();
  }

  useEffect(() => {

    dispatch(checkoutSliceActions.clearCheckoutForms());

    async function handleOrder() {
      const fetchedOrder = await fetch(`/api/handle-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ perform: 'fetchById', id: new Object(orderId) })
      });

      const fetchedOrderData = await fetchedOrder.json();

      if (!fetchedOrderData) {
        setLoading(false);
        notFound();
      }
      setOrderData(fetchedOrderData);

      if (fetchedOrderData.order.extraDetails.state.status === `pending`) {

        // update the status to paid
        const updateStatus = await fetch(`/api/handle-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ perform: 'changeStatus', id: new Object(orderId) })
        });

        if (!updateStatus) {
          setLoading(false);
          throw new Error(`Failed to update order status.`);
        }

        console.log(fetchedOrderData.order, `fetchedOrderData`);
        console.log(`updateStatus`, updateStatus.json());

        // TODO: email the user about the order
        const sendEmail = await fetch(`/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order: {
              ...fetchedOrderData.order,
              extraDetails: {
                ...fetchedOrderData.order.extraDetails,
                state: {
                  status: `booked`,
                  confirmed: true,
                  paid: true,
                  refunded: false,
                  cancelled: false
                }
              }
            }
          })
        });


      }
    }

    handleOrder();

    setLoading(false);

  }, []);

  if (loading) {
    return <LoadingCheckoutDetails />;
  }


  return (
    <section className="thanks-for-purchase-container">
      <div className="thanks-for-purchase grid">
        <div className="thanks-for-purchase-col-1">
          <CheckoutDetailsFirstCol />
        </div>
        {(orderData && !loading) && (
          <>
            <CheckoutDetailsSecondCol
              promoApplied={orderData.order.extraDetails.promoApplied}
              tourDiscount={orderData.order.extraDetails.tourDiscount}
              totalTickets={orderData.order.booking.tickets.overall}
              adultTickets={orderData.order.booking.tickets.adultTickets}
              youthTickets={orderData.order.booking.tickets.youthTickets}
              childrenTickets={orderData.order.booking.tickets.childrenTickets}
              totalPrice={orderData.order.booking.totalPrice}
              tourTitle={orderData.order.tourTitle}
              orderId={orderData.order._id}
              orderDate={new Date(orderData.order.extraDetails.createdAt).toLocaleString()}
            />
          </>
        )}
      </div>
    </section>
  );
}
