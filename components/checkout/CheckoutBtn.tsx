'use client';

import '@/app/checkout/page.scss';
import { motion } from 'framer-motion';

type CheckoutBtnType = {
  label: string;
  // children: ReactNode;
}

export default function CheckoutBtn({ label }: CheckoutBtnType) {
  return (
    <>
      <div className="flex">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="btn btn--next contact-details-next">{label}</motion.button>
      </div>
    </>
  );
}
