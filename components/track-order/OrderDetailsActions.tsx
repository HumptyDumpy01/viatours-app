'use client';

import classes from './OrderDetailsActions.module.scss';
import { useState, useTransition } from 'react';
import NeedHelp from '@/components/track-order/NeedHelp';
/*type OrderDetailsActionsType = {
  // children: ReactNode;
}*/

export default function OrderDetailsActions(/*{  }: OrderDetailsActionsType*/) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>(`Error! You cannot request a refund for this order.`);

  return (
    <div className={classes[`order-details-actions-container`]}>
      <h2 className={classes[`order-details-actions-heading`]}>Actions</h2>
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
      <div className={`${classes[`order-details-actions-btns`]}`}>
        <div className={`flex margin-bottom-21px`}>
          <button className={`${classes[`order-details-actions-btn`]} ${classes[`refund`]}`}>Request a Refund</button>
        </div>
        <div className={`flex`}>
          <button className={`${classes[`order-details-actions-btn`]} ${classes[`cancellation`]}`}>Request a
            Cancellation
          </button>
        </div>
      </div>
      <NeedHelp />
    </div>
  );
}
