// 'use client';

import classes from './OrderDetailsActions.module.scss';
import NeedHelp from '@/components/track-order/needHelp/NeedHelp';
import OrderDetailsActionsStageOne from '@/components/track-order/orderDetailsActions/OrderDetailsActionsStageOne';
import { useCartSelector } from '@/store/hooks';
import OrderDetailsActionsStageTwo from '@/components/track-order/orderDetailsActions/OrderDetailsActionsStageTwo';
import { OrderDetailsType } from '@/store/trackOrderSlice';
import MeetingPoint from '@/components/track-order/trackOrder/MeetingPoint';
/*type OrderDetailsActionsType = {
  // children: ReactNode;
}*/

export default function OrderDetailsActions(/*{  }: OrderDetailsActionsType*/) {
  const actionsStage = useCartSelector((state) => state.trackOrder.actionsStage.stage);
  const { location } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;

  return (
    <div className={classes[`order-details-actions-container`]}>
      <h2 className={classes[`order-details-actions-heading`]}>Actions</h2>
      {actionsStage === 1 && (
        <>
          <OrderDetailsActionsStageOne />
        </>
      )}
      {actionsStage !== 1 && (
        <>
          <OrderDetailsActionsStageTwo />
        </>
      )}
      <MeetingPoint coordinates={{ lat: location.googleMap.location.lat, lng: location.googleMap.location.lng }} />
      <NeedHelp />
    </div>
  );
}
