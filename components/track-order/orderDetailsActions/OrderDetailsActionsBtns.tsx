// 'use client';

/*type OrderDetailsActionsBtnsType = {
  // children: ReactNode;
}*/

import classes from '@/components/track-order/orderDetailsActions/OrderDetailsActions.module.scss';

export default function OrderDetailsActionsBtns(/*{  }: OrderDetailsActionsBtnsType*/) {
  return (
    <>
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
    </>
  );
}
