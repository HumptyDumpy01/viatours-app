'use client';

import ForgotPasswordHeading from '@/components/forgot-password/ForgotPasswordHeading';
import { FormEvent, useState, useTransition } from 'react';
import { useCartDispatch } from '@/store/hooks';
import { forgotPasswordSliceActions } from '@/store/forgotPasswordSlice';

export default function ForgotPasswordStepOne() {
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isPending, startTransition] = useTransition();
  const dispatch = useCartDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { email: string };

    if (results.email.trim() === `` || !results || !results.email.includes(`@`)) {
      setErrorMessage(`Please enter a valid email address`);
      return;
    }

    startTransition(async () => {
      // Create an API endpoint to check if the email exists in the database,
      // if not, return an error message, if exists, then return true
      const user = await fetch(`/api/fetch-user`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ userEmail: results.email, options: { email: 1, password: 1 } })
      });
      const userData = await user.json();

      if (!userData.resp) {
        setErrorMessage(`User does not exist. Please enter a valid email address!`);
        return;
      }

      // This means the user logged in via the provider, and he did not set the password manually.
      // In this case, he should not be able to reset the password.
      if (userData.result[0].password === null) {
        setErrorMessage(`Users logged in via provider cannot manually reset their password, till they set a password 
        via account settings.`);
        return;
      }

      // send a verification code to the email address
      const response = fetch(`/api/generate-recovery-code-token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ userEmail: userData.result[0].email || userData.email })
      });

      //  and change the forgotPasswordStage to 2
      setErrorMessage(``);
      dispatch(forgotPasswordSliceActions.setUserEmail(userData.result[0].email || userData.email));
      dispatch(forgotPasswordSliceActions.setForgotPasswordStage(2));
    });

  }


  return (
    <>
      <ForgotPasswordHeading
        subheading={`DO NOT WORRY! WE’LL HANDLE THAT`}
        heading={`Forgot your password?`}
        text={`No worries! We’ve got you covered. Simply enter your registered email address
        below, and we’ll send a secure verification code to help you reset your password.`}
      />
      <div className={`flex`}>
        {errorMessage && <p className="paragraph paragraph-error">{errorMessage}</p>}
      </div>
      <form onSubmit={handleSubmit} className="forgot-password__form flex gap-1rem">
        <div className="input-wrapper">

          <label htmlFor="email"></label>
          <input disabled={isPending} type="email" id="email" name={`email`}
                 className="forgot-password__input forgot-password__input-email"
                 placeholder="Enter your email address"
                 required />
        </div>
        <button disabled={isPending}
                className={`btn btn--forgot-btn-1 ${isPending ? `btn--submit-disabled` : ``}`}>
          {isPending ? `Sending...` : `Send`}
        </button>
        {/*<Link href={`/login/forgot-password/confirm-password`} className="btn btn--forgot-btn-1">Send</Link>*/}
      </form>
    </>
  );
}