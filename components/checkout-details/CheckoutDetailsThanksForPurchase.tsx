'use client';

import '@/app/checkout-details/page.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
/*type CheckoutDetailsThanksForPurchaseType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsThanksForPurchase(/*{  }: CheckoutDetailsThanksForPurchaseType*/) {


  const { data: session, status } = useSession();

  return (
    <>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="thanks-for-purchase__heading">Thanks for
        Purchase!
      </motion.h1>
      <p className="thanks-for-purchase__text">Your upcoming adventure promises to be
        unforgettable! <br /> Please <u>keep an
          eye
          on
          your inbox</u> for further updates and travel information!</p>
      <div className="flex flex-align-center gap-25px margin-bottom-41px">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href={`/tours`} type="button" className="btn thanks-for-purchase__btn thanks-for-purchase__btn--1">Keep
            Shopping
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href={session ? `/account-settings?page=tour-purchases` : `/track-order`} type="button"
                className="btn thanks-for-purchase__btn thanks-for-purchase__btn--2">Track
            Status
          </Link>
        </motion.div>
      </div>
    </>
  );
}
