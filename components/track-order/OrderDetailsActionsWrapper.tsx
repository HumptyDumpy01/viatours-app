'use client';

/*type OrderDetailsActionsWrapperType = {
  // children: ReactNode;
}*/

import classes from '@/components/track-order/orderDetailsActions/OrderDetailsActions.module.scss';
import OrderDetailsActionsStageOne from '@/components/track-order/orderDetailsActions/OrderDetailsActionsStageOne';
import OrderDetailsActionsStageTwo from '@/components/track-order/orderDetailsActions/OrderDetailsActionsStageTwo';
import { useCartSelector } from '@/store/hooks';

export default function OrderDetailsActionsWrapper(/*{  }: OrderDetailsActionsWrapperType*/) {

  const currentStage = useCartSelector((state) => state.trackOrder.orderStage);

  if (currentStage !== 2) {
    return null;
  }

  return (
    <>
      <div className={classes[`order-details-actions-container`]}>
        <h2 className={classes[`order-details-actions-heading`]}>Actions</h2>
        <OrderDetailsActionsStageOne />
        <OrderDetailsActionsStageTwo />
      </div>
    </>
  );
}
