'use client';

import { useCartSelector } from '@/store/hooks';
import classes from '@/components/track-order/orderDetailsActions/OrderDetailsActions.module.scss';
import { OrderDetailsType } from '@/store/trackOrderSlice';
import { motion } from 'framer-motion';

type OrderDetailsActionsBtnsType = {
  // children: ReactNode;
  handleRequestRefund: () => void;
  handleRequestCancellation: () => void;
  isPending: boolean;
  error: boolean;
}

export default function
  OrderDetailsActionsBtns({
                            handleRequestRefund,
                            handleRequestCancellation,
                            isPending,
                            error
                          }: OrderDetailsActionsBtnsType) {

  const {
    refundAvailable,
    refundRequested,
    cancellationAvailable,
    cancellationRequested
  } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;


  return (
    <>
      <div className={`${classes[`order-details-actions-btns`]} ${!error ? `margin-top-big` : ``}`}>
        <div className={`flex margin-bottom-21px`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: `spring`, stiffness: 300, damping: 20 }}
            disabled={!refundAvailable || isPending}
            onClick={refundAvailable ? handleRequestRefund : undefined}
            className={`${classes[`order-details-actions-btn`]}
             ${!refundAvailable || isPending ? `${classes[`disabled`]}` : ``} ${classes[`refund`]}`}>
            {refundRequested ? `Refund Requested` : `Request a Refund`}
          </motion.button>
        </div>
        <div className={`flex`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: `spring`, stiffness: 300, damping: 20 }}
            disabled={!cancellationAvailable || isPending}
            onClick={cancellationAvailable ? handleRequestCancellation : undefined}
            className={`${classes[`order-details-actions-btn`]} 
             ${!cancellationAvailable || isPending ? `${classes[`disabled`]}` : ``}
             ${classes[`cancellation`]}`}>{cancellationRequested ? `Cancellation Requested` : `Request a Cancellation`}
          </motion.button>
        </div>
      </div>
    </>
  );
}
