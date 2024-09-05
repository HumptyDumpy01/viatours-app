'use client';

/*type OrderDetailsActionsStageOneType = {
  // children: ReactNode;
}*/

import classes from '@/components/track-order/orderDetailsActions/OrderDetailsActions.module.scss';
import OrderDetailsActionsBtns from '@/components/track-order/orderDetailsActions/OrderDetailsActionsBtns';
import { useState, useTransition } from 'react';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { OrderDetailsType, trackOrderSliceActions } from '@/store/trackOrderSlice';

export default function OrderDetailsActionsStageOne(/*{  }: OrderDetailsActionsStageOneType*/) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>(``);
  const { _id } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;

  const dispatch = useCartDispatch();

  const {
    refundAvailable,
    cancellationAvailable
  } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;


  function handleRequestRefund() {
    if (!refundAvailable) {
      setError(`Error! You cannot request a refund for this order.`);
      return;
    }

    /*  generate a token confirmation to request a refund and send it to user email defined
    *   in the order.
    *   2. Swap the Ui to the next stage*/
    startTransition(async () => {

      const response = await fetch(`/api/generate-order-action-confirmation-token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          orderId: _id.toString(),
          type: `refund`
        })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.message || `Error! Failed to generate a token for the cancellation request.`);
        return;
      }

      // Swap the Ui to the next stage
      dispatch(trackOrderSliceActions.setActionsStage({
        stage: 2,
        type: `refund`
      }));
    });

  }

  function handleRequestCancellation() {
    if (!cancellationAvailable) {
      setError(`Error! You cannot request a cancellation for this order.`);
      return;
    }

    // Create an api endpoint to generate a token confirmation to
    // request a cancellation and send it to the user email defined in the order.
    startTransition(async () => {

      const response = await fetch(`/api/generate-order-action-confirmation-token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          orderId: _id.toString(),
          type: `cancellation`
        })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.message || `Error! Failed to generate a token for the cancellation request.`);
        return;
      }

      // Swap the Ui to the next stage
      dispatch(trackOrderSliceActions.setActionsStage({
        stage: 2,
        type: `cancellation`
      }));
    });


  }

  return (
    <>
      <p className={classes[`order-details-actions-par`]}>
        Here come Actions! You can request a <span
        className={`inline-block highlighted`}>cancellation of your order</span>, <span
        className={`inline-block highlighted`}>request a refund,</span> or
        contact our
        support team. If any of the requested actions are not available, the buttons would be greyed out.
      </p>
      {error && (
        <p className={`paragraph paragraph-error margin-top-3rem margin-bottom-36px`}>
          {error}
        </p>
      )}
      <OrderDetailsActionsBtns error={!!error} isPending={isPending}
                               handleRequestCancellation={handleRequestCancellation}
                               handleRequestRefund={handleRequestRefund} />
    </>
  );
}
