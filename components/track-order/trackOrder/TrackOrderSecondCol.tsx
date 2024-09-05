'use client';
import classes from '@/app/track-order/page.module.scss';
/*type TrackOrderSecondColType = {
  // children: ReactNode;
}*/
import Lottie from 'lottie-react';
import TravellerAnimation from '@/animations/traveller.json';
import React from 'react';
import { motion } from 'framer-motion';

export default function TrackOrderSecondCol(/*{  }: TrackOrderSecondColType*/) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ type: `spring`, stiffness: 100, damping: 20 }}
        className={classes[`track-order-second-col`]}>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Lottie animationData={TravellerAnimation} />
        </motion.div>
      </motion.div>
    </>
  );
}
