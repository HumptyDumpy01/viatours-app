// 'use client';

/*type EnterOrderIdStageType = {
  // children: ReactNode;
}*/

import classes from '@/app/track-order/page.module.scss';
import TrackOrderForm from '@/components/track-order/trackOrder/TrackOrderForm';
import React from 'react';
import { motion } from 'framer-motion';

export default function EnterOrderIdStage(/*{  }: EnterOrderIdStageType*/) {
  return (
    <>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ type: `spring`, stiffness: 100, damping: 20 }}
        className={classes[`track-order-heading`]}>Track your order in <span
        className={`inline-block highlighted`}>one click!</span>
      </motion.h1>
      <p className={classes[`track-order-par`]}>Simply enter your order ID below to get real-time updates on your
        order status. Also, you can &nbsp;
        <span className={`inline-block highlighted`}> request a refund</span> or <span
          className={`inline-block highlighted`}>cancel your purchase.</span></p>

      <TrackOrderForm />
    </>
  );
}
