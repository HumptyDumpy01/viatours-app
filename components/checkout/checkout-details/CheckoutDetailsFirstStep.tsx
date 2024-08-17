'use client';

import '@/app/checkout/page.scss';
import CheckoutHeading from '@/components/checkout/CheckoutHeading';
import ButtonLoginOrSignup from '@/components/UI/Button/ButtonLoginOrSignup';
import CheckoutFormContactDetails from '@/components/checkout/form/CheckoutFormContactDetails';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
/*type CheckoutDetailsFirstStepType = {
  // children: ReactNode;
}*/

export default function CheckoutDetailsFirstStep(/*{  }: CheckoutDetailsFirstStepType*/) {

  const { data: session, status } = useSession();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="book-now__details-1">
        <CheckoutHeading label={`Contact Details`} number={1} />
        <div className="book-now__details-1__content">

          <p className={`book-now__details-1__p color-blue-lighter ${session ? `margin-bottom-24px` : ``}`}>We’ll use
            this information to send you confirmation
            and
            updates about your
            booking!</p>
          {!session && (
            <>
              <ButtonLoginOrSignup />
            </>
          )}
          <CheckoutFormContactDetails />
        </div>
      </motion.div>
    </>
  );
}
