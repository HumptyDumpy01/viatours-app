'use client';

/*type TrackOrderFormType = {
  // children: ReactNode;
}*/

import classes from '@/app/track-order/page.module.scss';
import { FormEvent, useState, useTransition } from 'react';
import { useCartDispatch } from '@/store/hooks';
import { trackOrderSliceActions } from '@/store/trackOrderSlice';
import { AnimatePresence, motion } from 'framer-motion';

export default function TrackOrderForm(/*{  }: TrackOrderFormType*/) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>(``);
  const dispatch = useCartDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { orderId: string };

    if (results.orderId.trim().length === 0) {
      setError(``);
      return;
    }

    if (results.orderId.length !== 24) {
      setError(`Please enter a valid Order ID`);
      return;
    }

    startTransition(async () => {

      /* Create an api endpoint that would retrieve the order details. */
      const response = await fetch(`/api/fetch-tracked-order-data`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ orderId: results.orderId.trim() })
      }).then((response) => response.json()).catch((error) => {
        console.error(`Fetch error:`, error);
        setError(`Failed to fetch order details!`);
        return;
      });

      if (response.error) {
        setError(response.message);
        return;
      }

      console.log(response.order);

      dispatch(trackOrderSliceActions.setOrderDetails(response.order));
      dispatch(trackOrderSliceActions.setOrderStage(2));

    });


    // output
    // console.log(results);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`flex`}>
        <AnimatePresence>
          {error &&
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className={`paragraph paragraph-error`}>{error}</motion.p>}
        </AnimatePresence>
      </div>
      <label className={classes[`label`]} htmlFor={`orderId`}>Enter your Order ID</label>
      <div className={`flex ${classes['track-order-input-container']}`}>
        <input disabled={isPending} name={`orderId`}
               className={`${classes[`input`]} ${isPending ? `disabled-input-field` : ``}`}
               type={`text`} id={`orderId`}
               placeholder={`24-chars expected`} />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: `spring`, stiffness: 100, damping: 20 }}
          disabled={isPending} type={`submit`}
          className={`${classes[`track-order-track-btn`]} ${isPending ? `${classes[`disabled`]}` : ``}`}>Track
          Order
        </motion.button>
      </div>
    </form>
  );
}
