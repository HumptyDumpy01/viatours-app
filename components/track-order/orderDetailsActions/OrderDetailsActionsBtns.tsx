'use client';

import { useCartSelector } from '@/store/hooks';
import classes from '@/components/track-order/orderDetailsActions/OrderDetailsActions.module.scss';
import { OrderDetailsType } from '@/store/trackOrderSlice';

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
    cancellationAvailable
  } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;


  return (
    <>
      <div className={`${classes[`order-details-actions-btns`]} ${!error ? `margin-top-big` : ``}`}>
        <div className={`flex margin-bottom-21px`}>
          <button
            disabled={!refundAvailable || isPending}
            onClick={refundAvailable ? handleRequestRefund : undefined}
            className={`${classes[`order-details-actions-btn`]}
             ${!refundAvailable || isPending ? `${classes[`disabled`]}` : ``} ${classes[`refund`]}`}>Request
            a
            Refund
          </button>
        </div>
        <div className={`flex`}>
          <button
            disabled={!cancellationAvailable || isPending}
            onClick={cancellationAvailable ? handleRequestCancellation : undefined}
            className={`${classes[`order-details-actions-btn`]} 
             ${!cancellationAvailable || isPending ? `${classes[`disabled`]}` : ``}
             ${classes[`cancellation`]}`}>Request
            a
            Cancellation
          </button>
        </div>
      </div>
    </>
  );
}
