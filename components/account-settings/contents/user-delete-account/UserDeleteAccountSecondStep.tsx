'use client';
import { motion } from 'framer-motion';
import { FormEvent, useState, useTransition } from 'react';
import { useCartDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

type UserDeleteAccountSecondStepType = {
  userEmail: string;
  // children: ReactNode;
}

export default function UserDeleteAccountSecondStep({ userEmail }: UserDeleteAccountSecondStepType) {

  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isPending, startTransition] = useTransition();
  const dispatch = useCartDispatch();
  const router = useRouter();

  if (!userEmail) {
    console.error(`User Email is not provided`);
    return;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { code: string };

    if (results.code.trim() === `` || results.code.length !== 6) {
      setErrorMessage(`Please enter a valid code`);
      return;
    }
    // Verify the code
    // pass userEmail and the code he entered.
    // if correct, alert the user that the account will be deleted.
    // if incorrect, show an error message.
    startTransition(async () => {
      const response = await fetch(`/api/validate-delete-account-token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ userEmail, userToken: results.code })
      }).then(res => res.json());

      if (response.error) {
        setErrorMessage(response.message);
        return;
      }
      // delete user account.
      // pass userEmail to the server and delete the account.
      const deleteUserAccount = await fetch(`/api/delete-user-account`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ userEmail })
      }).then(res => res.json());

      if (deleteUserAccount.error) {
        setErrorMessage(deleteUserAccount.message);
        return;
      }
      await signOut();
      // router.push(`/?account-deleted=true`);

      setErrorMessage(``);


    });
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ type: `spring`, stiffness: 100, damping: 10, duration: 0.5 }}
    >
      <h2 className="delete-account__heading tertiary-heading">We are almost done! <br /> Please enter the Verification
        Code</h2>
      <p className="delete-account__text">We sent a verification code to your registered email
        address: <b className={`highlighted`}>{userEmail}</b>.
        Please check your inbox (or spam folder, just in case) for the code.</p>
      <form onSubmit={handleSubmit} className="delete-account__form flex flex-direction-column">
        <label htmlFor="code" className="delete-account__label"></label>

        <div className={`flex`}>
          {errorMessage && <p className="paragraph paragraph-error">{errorMessage}</p>}
        </div>
        <div className="delete-account__input-wrapper flex">
          <input disabled={isPending} name={`code`} type="password" id="confirm-code-input"
                 className="delete-account__input width-156px"
                 placeholder="Code" required />
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            disabled={isPending}
            whileTap={{ scale: 0.95 }}
            transition={{ type: `spring`, stiffness: 260, damping: 20 }}
            className={`delete-account__button${isPending ? `-disabled` : ``} confirm-code`}>Confirm
          </motion.button>
        </div>
        <motion.button
          type={`button`}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: `spring`, stiffness: 260, damping: 20 }}
          className="btn delete-account__resend-code">Resend
        </motion.button>
        <p className="delete-account__confirmation-terms">By confirming, you understand that all your content and data
          associated with this account will be permanently removed.</p>
      </form>
    </motion.div>
  );
}
