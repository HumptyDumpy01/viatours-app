'use client';

/*type TrackOrderFormType = {
  // children: ReactNode;
}*/

import classes from '@/app/track-order/page.module.scss';
import { FormEvent, useState, useTransition } from 'react';

export default function TrackOrderForm(/*{  }: TrackOrderFormType*/) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>(``);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    }

    /* TODO: Create an api endpoint that would retrieve the order details. */

    // output
    console.log(results);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`flex`}>
        {error && <p className={`paragraph paragraph-error`}>{error}</p>}
      </div>
      <label className={classes[`label`]} htmlFor={`orderId`}>Enter your Order ID</label>
      <div className={`flex ${classes['track-order-input-container']}`}>
        <input name={`orderId`} className={classes[`input`]} type={`text`} id={`orderId`}
               placeholder={`e.g 66cd917717fb802dfbc4e4a9`} />
        <button type={`submit`} className={classes[`track-order-track-btn`]}>Track Order</button>
      </div>
    </form>
  );
}
