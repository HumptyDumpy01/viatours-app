'use client';

import { TourInterface } from '@/data/DUMMY_TOURS';
import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import ActivityDetailsCard from '@/components/checkout/card/card-first-col/ActivityDetailsCard';
import CheckoutFormActivityDetails from '@/components/checkout/form/CheckoutFormActivityDetails';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import { useCartSelector } from '@/store/hooks';
import { AnimatePresence, motion } from 'framer-motion';


type CheckoutDetailsSecondStepType = {
  tour: TourInterface;
  order: OrderInterface;
  // children: ReactNode;
}

export default function CheckoutDetailsSecondStep({ tour, order }: CheckoutDetailsSecondStepType) {

  const openActivityDetails = useCartSelector((state) => state.checkout.openActivityDetails);
  console.log(openActivityDetails);

  return (
    <div className="book-now__details-2">
      <CheckoutHeading label={`Activity Details`} number={2} />
      <AnimatePresence>
        {openActivityDetails && (
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className={`book-now__details-2__content`}>
            <ActivityDetailsCard tour={tour} order={order} />
            <CheckoutFormActivityDetails
              languages={tour.languages}
              meetingPoint={tour.meetingPoint}
              adultTickets={order.adultTickets}
              childrenTickets={order.childrenTickets}
              youthTickets={order.youthTickets}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
