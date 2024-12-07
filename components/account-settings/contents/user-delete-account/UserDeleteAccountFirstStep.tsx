'use client';

import { FormEvent, useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { useCartDispatch } from '@/store/hooks';
import { deleteAccountSliceActions } from '@/store/deleteAccountSlice';

type UserDeleteAccountFirstStepType = {
  userEmail: string;
  // children: ReactNode;
}

export default function UserDeleteAccountFirstStep({ userEmail }: UserDeleteAccountFirstStepType) {
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isPending, startTransition] = useTransition();
  const dispatch = useCartDispatch();

  if (!userEmail) {
    console.error(`User Email is not provided`);
    return;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { confirmPassword: string };

    if (results.confirmPassword.trim() === ``) {
      setErrorMessage(`Please enter your password`);
      return;
    }
    // Create an API endpoint to check if the password is correct,
    // pass an email from the session and the password from the form
    // if the password is correct, return true, else return an error message
    startTransition(async () => {
      const response = await fetch(`/api/is-password-correct`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ userEmail: userEmail, userPassword: results.confirmPassword })
      }).then(res => res.json());

      if (response.error) {
        setErrorMessage(response.message);
        return;
      }
      setErrorMessage(``);
      // Send a verification code to the email address and redirect to the next step
      const sendingVerificationCode = await fetch(`/api/create-delete-account-token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ userEmail })
      }).then(res => res.json());

      if (sendingVerificationCode.error) {
        setErrorMessage(sendingVerificationCode.message);
        return;
      }

      dispatch(deleteAccountSliceActions.setUserEmail(userEmail));
      dispatch(deleteAccountSliceActions.setDeleteAccountStage(2));
    });
  }


  return (
    <>
      <h2 className="delete-account__heading tertiary-heading">Delete Account</h2>
      <p className="delete-account__text margin-bottom-34px">Before we proceed with account deletion, <b>we want to
        ensure
        it’s you</b>.
        Please enter your account password below:</p>
      <div className={`flex`}>
        {errorMessage && <p className="paragraph paragraph-error">{errorMessage}</p>}
      </div>
      <div className="delete-account__form flex flex-direction-column">
        <label htmlFor="confirm-password-input" className="delete-account__label">Confirm your password</label>
        <div className="delete-account__input-wrapper flex">
          <form onSubmit={handleSubmit} className="flex delete-account__input-form">
            <input name={`confirmPassword`} disabled={isPending} type="password" id="confirm-password-input"
                   className="delete-account__input"
                   placeholder="Password"
                   required />
            <motion.button
              disabled={isPending}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: `spring`, stiffness: 260, damping: 20 }}
              className={`delete-account__button${isPending ? `-disabled` : ``}`} id="confirm-password">{
              isPending ? `Confirming...` : `Confirm`
            }
            </motion.button>
          </form>
        </div>
      </div>
    </>
  );
}
