'use client';

import './page.scss';
import '@/components/checkout-details/Cols/CheckoutDetailsSecondCol.scss';
import CheckoutDetailsFirstCol from '@/components/checkout-details/Cols/CheckoutDetailsFirstCol';
import CheckoutDetailsSecondCol from '@/components/checkout-details/Cols/CheckoutDetailsSecondCol';
import { notFound } from 'next/navigation';
import { useCartDispatch } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { checkoutSliceActions } from '@/store/checkoutSlice';
import LoadingCheckoutDetails from '@/app/checkout-details/loading';
import { getUser } from '@/lib/mongodb';
import SessionProviderContainer from '@/components/UI/Provider/SessionProviderContainer';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@mui/material';

type ThanksForPurchaseType = {
  searchParams: {
    orderId: string,
    userEmail: string
  }
  // children: ReactNode;
}

export default function ThanksForPurchase({ searchParams }: ThanksForPurchaseType) {
  const {
    orderId,
    userEmail
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
      contactDetails: {
        firstName: string,
        lastName: string,
        email: string,
        getEmailsWithOffers: boolean,
        phone: string
      }
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
  const [error, setError] = useState<boolean>(false);

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
        setError(true);
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
          setError(true);
          throw new Error(`Failed to update order status.`);
        }

        console.log(fetchedOrderData.order, `fetchedOrderData`);
        console.log(`updateStatus`, updateStatus.json());

        const isUserExists = await getUser({ email: userEmail }, { email: 1, _id: 0 });


        if (isUserExists.length === 0 && fetchedOrderData.order.contactDetails.getEmailsWithOffers) {
          // if the user is not signed up, then add it to the newsletter
          const pushEmailToNewsletter = await fetch(`/api/newsletter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: fetchedOrderData.order.contactDetails.email,
              method: `ADD`
            })
          });

          const addEmailToNewsletterData = await pushEmailToNewsletter.json();

          if (addEmailToNewsletterData.error) {
            throw new Error(`Failed to add email to newsletter.`);
          }
        }

        // if not, then just return. No need to save it onto user history.
        // This is the benefit for authenticated users.
        if (isUserExists.length > 0) {

          // send back the inserted order id to user's orders array
          const addOrderIdToUser = await fetch(`/api/add-order-id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            // in a body tag wer simply define the data that should be submitted
            body: JSON.stringify({
              orderId: fetchedOrderData.order._id,
              userEmail: userEmail,
              tourId: fetchedOrderData.order.tourId,
              tourTitle: fetchedOrderData.order.tourTitle,
              userPhoneNumber: fetchedOrderData.order.contactDetails.phone,
              getEmailsWithOffers: fetchedOrderData.order.contactDetails.getEmailsWithOffers
            })
          });
        }

        // email the user about the order

        const sendEmail = await fetch(`/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: fetchedOrderData.order.contactDetails.email,
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
        }).then(res => res.json());

        if (sendEmail.error) {
          console.error(`Failed to send email to user.`);
        }


      }
    }

    handleOrder().catch(err => {
      if (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    });

    setLoading(false);

  }, []);

  if (loading) {
    return <LoadingCheckoutDetails />;
  }


  return (
    <section className="thanks-for-purchase-container">
      <div className="thanks-for-purchase grid">
        <div className="thanks-for-purchase-col-1">
          <SessionProviderContainer>
            <CheckoutDetailsFirstCol />
          </SessionProviderContainer>
        </div>
        <AnimatePresence>
          {(orderData && !loading && !error) && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
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
            </motion.div>
          )}
          {(loading && !orderData && !error) && (
            <div style={{ marginBottom: `3rem` }}>
              <Skeleton variant="rectangular" animation={`wave`}
                        sx={{ width: '84%', height: '60rem', borderRadius: `12px` }} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
