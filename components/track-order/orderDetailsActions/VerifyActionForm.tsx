'use client';

type VerifyActionFormType = {
  action: {
    type: `cancellation` | `refund`;
    stage: 1 | 2 | 3;
  }
  // children: ReactNode;
}

import classes from '@/app/track-order/page.module.scss';
import { FormEvent, useState, useTransition } from 'react';

export default function VerifyActionForm({ action }: VerifyActionFormType) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>(``);
  const [success, setSuccess] = useState<string>(`Success! The request for refund/cancellation is sent.`);

  console.log(`action.stage`, action.stage);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());

    // resetting the form
    // currObject.reset();
    // output
    console.log(results);
  }

  return (
    <form onSubmit={handleSubmit}>
      {action.stage === 2 && (
        <>
          {error && (
            <div className={`flex margin-top-3rem`}>
              {error && <p className={`paragraph paragraph-error`}>{error}</p>}
            </div>
          )}
          <label className={`${classes[`label`]}`} htmlFor={`orderId`}>Enter Verification Code</label>
          <form onSubmit={handleSubmit} className={`flex ${classes['track-order-input-container']} margin-bottom-42px`}>
            <input name={`code`} className={`${classes[`input`]}`} type={`password`} id={`orderId`} required
                   placeholder={`6-digit code`} />
            <button type={`submit`} className={classes[`track-order-track-btn`]}>Verify</button>
          </form>
        </>
      )}
    </form>
  );
}
