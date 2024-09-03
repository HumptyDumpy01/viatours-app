'use client';

/*type OrderDetailsActionsStageOneType = {
  // children: ReactNode;
}*/

import classes from '@/components/track-order/orderDetailsActions/OrderDetailsActions.module.scss';
import OrderDetailsActionsBtns from '@/components/track-order/orderDetailsActions/OrderDetailsActionsBtns';
import { useState, useTransition } from 'react';

export default function OrderDetailsActionsStageOne(/*{  }: OrderDetailsActionsStageOneType*/) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>(`Error! You cannot request a refund for this order.`);

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
      <OrderDetailsActionsBtns />
    </>
  );
}
