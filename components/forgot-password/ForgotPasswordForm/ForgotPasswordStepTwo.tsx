'use client';
import '@/app/login/forgot-password/page.scss';
import ForgotPasswordHeading from '@/components/forgot-password/ForgotPasswordHeading';
import { FormEvent, useState, useTransition } from 'react';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { forgotPasswordSliceActions } from '@/store/forgotPasswordSlice';
/*type ForgotPasswordStepTwoType = {
  // children: ReactNode;
}*/

export default function ForgotPasswordStepTwo(/*{  }: ForgotPasswordStepTwoType*/) {
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isPending, startTransition] = useTransition();
  const userEmail = useCartSelector((state) => state.forgotPassword.userEmail);

  const dispatch = useCartDispatch();

  async function handleValidateCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { code: string };

    if (results.code.trim() === `` || !results || results.code.length !== 6 || isNaN(Number(results.code))) {
      setErrorMessage(`Please enter a valid 6-digit code`);
      return;
    }
    if (userEmail.trim() === ``) {
      setErrorMessage(`Please enter a valid email address`);
      return;
    }

    // create an api endpoint to verify the code
    // extract the email entered previously from slice and the code entered here
    // if code is correct, then change the forgotPasswordStage to 3
    // if not, then return an error message
    startTransition(async () => {
      const response = await fetch(`/api/verify-recover-password-token`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          userEmail,
          userToken: results.code
        })
      }).then((res) => res.json());

      if (response.error) {
        setErrorMessage(response.message);
        return;
      }
      setErrorMessage(``);

      dispatch(forgotPasswordSliceActions.setForgotPasswordStage(3));
    });

  }


  return (
    <>
      <ForgotPasswordHeading
        subheading={`step 2 of 4`}
        heading={`Done! Check your email
      for a recovery code!`}
        text={`Please check your email inbox for the code. If it doesn't arrive promptly, don't forget to check your spam folder.`}
      />
      <div className={`flex`}>
        {errorMessage && <p className="paragraph paragraph-error">{errorMessage}</p>}
      </div>
      <form onSubmit={handleValidateCode} className="forgot-password__form flex gap-1rem">
        {/*SECOND STAGE*/}
        <div className="input-wrapper">
          <label htmlFor="code"></label>
          <input name={`code`} disabled={isPending} type="password" id="code"
                 className="forgot-password__input forgot-password__input-code"
                 placeholder="Code"
                 required />
        </div>
        <button disabled={isPending} className={`btn btn--forgot-btn-1 ${isPending ? `btn--submit-disabled` : ``}`}
                id="btn-confirm">{isPending ? `Wait...` : `Confirm`}
        </button>

        {/*<Link href={`/login/forgot-password/set-new-password`} className="btn btn--forgot-btn-1">Confirm</Link>*/}
      </form>
    </>
  );
}
