// 'use client';

import classes from './OrderDetailsActions.module.scss';
import NeedHelp from '@/components/track-order/needHelp/NeedHelp';
import OrderDetailsActionsStageOne from '@/components/track-order/orderDetailsActions/OrderDetailsActionsStageOne';
import { useCartSelector } from '@/store/hooks';
import OrderDetailsActionsStageTwo from '@/components/track-order/orderDetailsActions/OrderDetailsActionsStageTwo';
import { OrderDetailsType } from '@/store/trackOrderSlice';
import MeetingPoint from '@/components/track-order/trackOrder/MeetingPoint';
import { AnimatePresence, motion } from 'framer-motion';
/*type OrderDetailsActionsType = {
  // children: ReactNode;
}*/

export default function OrderDetailsActions(/*{  }: OrderDetailsActionsType*/) {
  const actionsStage = useCartSelector((state) => state.trackOrder.actionsStage.stage);
  const { location } = useCartSelector((state) => state.trackOrder.orderDetails) as OrderDetailsType;

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      viewport={{ once: true }}
      transition={{ type: `spring`, stiffness: 100, damping: 20 }}
      className={classes[`order-details-actions-container`]}>
      <h2 className={classes[`order-details-actions-heading`]}>Actions</h2>
      <AnimatePresence>
        {actionsStage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ type: `spring`, stiffness: 100, damping: 20 }}
          >
            <OrderDetailsActionsStageOne />
          </motion.div>
        )}
      </AnimatePresence>
      {actionsStage !== 1 && (
        <>
          <OrderDetailsActionsStageTwo />
        </>
      )}
      <MeetingPoint coordinates={{ lat: location.googleMap.location.lat, lng: location.googleMap.location.lng }} />
      <NeedHelp />
    </motion.div>
  );
}
