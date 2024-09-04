'use client';

import { useCartSelector } from '@/store/hooks';
import classes from '@/components/track-order/orderDetailsActions/OrderDetailsActions.module.scss';
import { OrderDetailsType } from '@/store/trackOrderSlice';

type OrderDetailsActionsBtnsType = {
  // children: ReactNode;
  handleRequestRefund: () => void;
  handleRequestCancellation: () => void;
}

export default function
  OrderDetailsActionsBtns({
                            handleRequestRefund,
                            handleRequestCancellation
                          }: OrderDetailsActionsBtnsType) {

  const {
    refundAvailable,
    cancellationAvailable
  } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;


  return (
    <>
      <div className={`${classes[`order-details-actions-btns`]}`}>
        <div className={`flex margin-bottom-21px`}>
          <button
            disabled={!refundAvailable}
            onClick={refundAvailable ? handleRequestRefund : undefined}
            className={`${classes[`order-details-actions-btn`]}
             ${!refundAvailable ? `${classes[`disabled`]}` : ``} ${classes[`refund`]}`}>Request
            a
            Refund
          </button>
        </div>
        <div className={`flex`}>
          <button
            disabled={!cancellationAvailable}
            onClick={cancellationAvailable ? handleRequestCancellation : undefined}
            className={`${classes[`order-details-actions-btn`]} 
             ${!cancellationAvailable ? `${classes[`disabled`]}` : ``}
             ${classes[`cancellation`]}`}>Request
            a
            Cancellation
          </button>
        </div>
      </div>
    </>
  );
}
