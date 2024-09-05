// 'use client';

type TrackOrderFirstColType = {
  currentStage: number;
  // children: ReactNode;
}

import classes from '@/app/track-order/page.module.scss';
import EnterOrderIdStage from '@/components/track-order/EnterOrderIdStage';
import React from 'react';
import OrderDetailsStage from '@/components/track-order/OrderDetailsStage';
import { motion } from 'framer-motion';

export default function TrackOrderFirstCol({ currentStage }: TrackOrderFirstColType) {

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ type: `spring`, stiffness: 100, damping: 20 }}
        className={classes[`track-order-container-first-col`]}>
        {currentStage === 1 && (
          <EnterOrderIdStage />
        )}
        {currentStage === 2 && (
          <OrderDetailsStage />
        )}
      </motion.div>
    </>
  );
}
