'use client';

import '@/app/login/forgot-password/page.scss';
import './ForgotPasswordStepThree.scss';
import ForgotPasswordHeading from '@/components/forgot-password/ForgotPasswordHeading';
import { FormEvent, useState, useTransition } from 'react';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { forgotPasswordSliceActions } from '@/store/forgotPasswordSlice';
/*type ForgotPasswordStepThreeType = {
  // children: ReactNode;
}*/

export default function ForgotPasswordStepThree(/*{  }: ForgotPasswordStepThreeType*/) {
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [isPending, startTransition] = useTransition();
  const userEmail = useCartSelector((state) => state.forgotPassword.userEmail);

  const dispatch = useCartDispatch();

  function handleTogglePasswordVisibility() {
    setPasswordIsVisible(prevState => !prevState);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { newPassword: string, confirmNewPassword: string };

    // Validate the password and confirm if passwords match
    if (!results.newPassword || results.newPassword.trim() === ``) {
      setErrorMessage(`Please enter a valid password`);
      return;
    }
    if (results.newPassword !== results.confirmNewPassword) {
      setErrorMessage(`Passwords do not match`);
      return;
    }

    if (results.newPassword.length < 6) {
      setErrorMessage(`Password must be at least 6 characters long`);
      return;
    }

    // create an api endpoint to change the user password.
    // pass user email from slice and the new password
    // if successful, change the forgotPasswordStage to 4
    // if not, return an error message
    startTransition(async () => {
      const response = await fetch(`/api/change-user-password`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          userEmail,
          password: results.newPassword,
          confirmPassword: results.confirmNewPassword
        })
      }).then((res) => res.json());

      if (response.error) {
        setErrorMessage(response.message);
        return;
      }

      setErrorMessage(``);
      dispatch(forgotPasswordSliceActions.setUserEmail(``));
      dispatch(forgotPasswordSliceActions.setForgotPasswordStage(4));
    });
  }


  return (
    <>
      <ForgotPasswordHeading
        subheading={`step 3 of 4`}
        heading={`Set a new password`}
        text={`Remember, a strong password includes a mix of uppercase and lowercase letters, numbers, and special characters. Avoid using easily guessable information like birthdays or common words.`}
      />
      <div className={`flex`}>
        {errorMessage && <p className="paragraph paragraph-error">{errorMessage}</p>}
      </div>
      <form onSubmit={handleSubmit}
            className="forgot-password__form flex-direction-column align-items-start flex gap-1rem">
        {/*THIRD STEP*/}
        <div className="new-password-wrapper">
          <label htmlFor="new-password"></label>
          <input name={`newPassword`} disabled={isPending} type={passwordIsVisible ? `text` : `password`}
                 id="new-password"
                 className="forgot-password__input forgot-password__input-password"
                 placeholder="Your new password"
                 required />
          {!passwordIsVisible &&
            <svg onClick={handleTogglePasswordVisibility}
                 className="new-password--show-password-icon show-password cursor-pointer"
                 xmlns="http://www.w3.org/2000/svg"
                 width="20" height="18"
                 viewBox="0 0 20 18" fill="none">
              <path
                d="M8.2 4.4C8.76501 4.14103 9.37848 4.0047 10 4C11.1935 4 12.3381 4.47411 13.182 5.31802C14.0259 6.16193 14.5 7.30653 14.5 8.5C14.4997 9.03013 14.4014 9.55563 14.21 10.05L17 12.64C18.2456 11.4558 19.2626 10.0524 20 8.5C20 8.5 17 1.5 10 1.5C8.62109 1.49277 7.25681 1.78268 6 2.35L8.2 4.4ZM2 0.5L1 1.5L3.55 3.9C2.05582 5.16612 0.846054 6.7337 0 8.5C0 8.5 3 15.5 10 15.5C11.6192 15.5067 13.2144 15.1079 14.64 14.34L18 17.5L19 16.5L2 0.5ZM10 13C8.80653 13 7.66193 12.5259 6.81802 11.682C5.97411 10.8381 5.5 9.69347 5.5 8.5C5.50552 7.727 5.71231 6.96877 6.1 6.3L7.63 7.74C7.54763 7.98509 7.50377 8.24147 7.5 8.5C7.49899 8.907 7.59776 9.30805 7.78767 9.66804C7.97758 10.028 8.25284 10.336 8.58934 10.5649C8.92585 10.7939 9.31335 10.9368 9.71792 10.9813C10.1225 11.0258 10.5318 10.9704 10.91 10.82L12.45 12.27C11.7218 12.7467 10.8703 13.0004 10 13Z"
                fill="#EB662B" />
            </svg>
          }
          {passwordIsVisible &&
            <svg onClick={handleTogglePasswordVisibility}
                 className="new-password&#45;&#45;show-password-icon hide-password cursor-pointer"
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
                 height="18" viewBox="0 0 20 18" fill="none">
              <path
                d="M10 5.7C9.27668 5.7 8.58299 5.995 8.07153 6.5201C7.56006 7.0452 7.27273 7.75739 7.27273 8.5C7.27273 9.24261 7.56006 9.9548 8.07153 10.4799C8.58299 11.005 9.27668 11.3 10 11.3C10.7233 11.3 11.417 11.005 11.9285 10.4799C12.4399 9.9548 12.7273 9.24261 12.7273 8.5C12.7273 7.75739 12.4399 7.0452 11.9285 6.5201C11.417 5.995 10.7233 5.7 10 5.7ZM10 13.1667C8.79447 13.1667 7.63832 12.675 6.78588 11.7998C5.93344 10.9247 5.45455 9.73768 5.45455 8.5C5.45455 7.26232 5.93344 6.07534 6.78588 5.20017C7.63832 4.325 8.79447 3.83333 10 3.83333C11.2055 3.83333 12.3617 4.325 13.2141 5.20017C14.0666 6.07534 14.5455 7.26232 14.5455 8.5C14.5455 9.73768 14.0666 10.9247 13.2141 11.7998C12.3617 12.675 11.2055 13.1667 10 13.1667ZM10 1.5C5.45455 1.5 1.57273 4.40267 0 8.5C1.57273 12.5973 5.45455 15.5 10 15.5C14.5455 15.5 18.4273 12.5973 20 8.5C18.4273 4.40267 14.5455 1.5 10 1.5Z"
                fill="#EB662B" />
            </svg>
          }
        </div>
        <div className="new-password-confirmation-wrapper">
          <label htmlFor="new-password-confirmation"></label>
          <input name={`confirmNewPassword`} disabled={isPending} type={`password`} id="new-password-confirmation"
                 className="forgot-password__input forgot-password__input-password"
                 placeholder="Confirm your new password"
                 required />

          <svg className="new-password-confirmation-wrapper-icon" xmlns="http://www.w3.org/2000/svg" width="20"
               height="18" viewBox="0 0 20 18" fill="none">
            <path
              d="M16.75 1.5C17.612 1.5 18.4386 1.84241 19.0481 2.4519C19.6576 3.0614 20 3.88805 20 4.75V12.25C20 13.112 19.6576 13.9386 19.0481 14.5481C18.4386 15.1576 17.612 15.5 16.75 15.5H3.25C2.8232 15.5 2.40059 15.4159 2.00628 15.2526C1.61197 15.0893 1.25369 14.8499 0.951902 14.5481C0.650112 14.2463 0.410719 13.888 0.247391 13.4937C0.0840626 13.0994 0 12.6768 0 12.25V4.75C0 4.3232 0.0840626 3.90059 0.247391 3.50628C0.410719 3.11197 0.650112 2.75369 0.951902 2.4519C1.25369 2.15011 1.61197 1.91072 2.00628 1.74739C2.40059 1.58406 2.8232 1.5 3.25 1.5H16.75ZM15.72 6.72L15 7.44L14.28 6.72C14.2113 6.64631 14.1285 6.58721 14.0365 6.54622C13.9445 6.50523 13.8452 6.48318 13.7445 6.48141C13.6438 6.47963 13.5438 6.49816 13.4504 6.53588C13.357 6.5736 13.2722 6.62974 13.201 6.70096C13.1297 6.77218 13.0736 6.85701 13.0359 6.9504C12.9982 7.04379 12.9796 7.14382 12.9814 7.24452C12.9832 7.34522 13.0052 7.44454 13.0462 7.53654C13.0872 7.62854 13.1463 7.71134 13.22 7.78L13.939 8.5L13.219 9.218C13.1493 9.28767 13.0939 9.37039 13.0562 9.46143C13.0184 9.55248 12.999 9.65008 12.9989 9.74865C12.9989 9.84722 13.0182 9.94483 13.0559 10.0359C13.0936 10.127 13.1488 10.2098 13.2185 10.2795C13.2882 10.3492 13.3709 10.4046 13.4619 10.4423C13.553 10.4801 13.6506 10.4995 13.7491 10.4996C13.8477 10.4996 13.9453 10.4803 14.0364 10.4426C14.1275 10.4049 14.2103 10.3497 14.28 10.28L15 9.56L15.72 10.28C15.8622 10.4125 16.0502 10.4846 16.2445 10.4812C16.4388 10.4777 16.6242 10.399 16.7616 10.2616C16.899 10.1242 16.9777 9.93882 16.9812 9.74452C16.9846 9.55022 16.9125 9.36217 16.78 9.22L16.06 8.5L16.78 7.78C16.9125 7.63783 16.9846 7.44978 16.9812 7.25548C16.9777 7.06118 16.899 6.87579 16.7616 6.73838C16.6242 6.60097 16.4388 6.52225 16.2445 6.51882C16.0502 6.5154 15.8622 6.58752 15.72 6.72ZM10.22 6.72L9.5 7.44L8.78 6.72C8.71134 6.64631 8.62854 6.58721 8.53654 6.54622C8.44454 6.50523 8.34523 6.48318 8.24452 6.48141C8.14382 6.47963 8.04379 6.49816 7.9504 6.53588C7.85701 6.5736 7.77218 6.62974 7.70096 6.70096C7.62974 6.77218 7.5736 6.85701 7.53588 6.9504C7.49816 7.04379 7.47963 7.14382 7.48141 7.24452C7.48318 7.34522 7.50523 7.44454 7.54622 7.53654C7.58721 7.62854 7.64631 7.71134 7.72 7.78L8.439 8.5L7.719 9.218C7.5783 9.3587 7.49926 9.54952 7.49926 9.7485C7.49926 9.94748 7.5783 10.1383 7.719 10.279C7.8597 10.4197 8.05052 10.4987 8.2495 10.4987C8.44848 10.4987 8.6393 10.4197 8.78 10.279L9.5 9.56L10.22 10.28C10.2887 10.3537 10.3715 10.4128 10.4635 10.4538C10.5555 10.4948 10.6548 10.5168 10.7555 10.5186C10.8562 10.5204 10.9562 10.5018 11.0496 10.4641C11.143 10.4264 11.2278 10.3703 11.299 10.299C11.3703 10.2278 11.4264 10.143 11.4641 10.0496C11.5018 9.95621 11.5204 9.85618 11.5186 9.75548C11.5168 9.65477 11.4948 9.55546 11.4538 9.46346C11.4128 9.37146 11.3537 9.28866 11.28 9.22L10.56 8.5L11.28 7.78C11.4125 7.63783 11.4846 7.44978 11.4812 7.25548C11.4777 7.06118 11.399 6.87579 11.2616 6.73838C11.1242 6.60097 10.9388 6.52225 10.7445 6.51882C10.5502 6.5154 10.3622 6.58752 10.22 6.72ZM6.25 10.75C6.25 10.5511 6.17098 10.3603 6.03033 10.2197C5.88968 10.079 5.69891 10 5.5 10H3.75C3.55109 10 3.36032 10.079 3.21967 10.2197C3.07902 10.3603 3 10.5511 3 10.75C3 10.9489 3.07902 11.1397 3.21967 11.2803C3.36032 11.421 3.55109 11.5 3.75 11.5H5.5C5.69891 11.5 5.88968 11.421 6.03033 11.2803C6.17098 11.1397 6.25 10.9489 6.25 10.75Z"
              fill="#EB662B" />
          </svg>
        </div>
        <button disabled={isPending} className={`btn btn--forgot-btn-1 ${isPending ? `btn--submit-disabled` : ``}`}
                id="btn-confirm">{isPending ? `Applying...` : `Apply`}
        </button>
        {/*<Link href={`/login/forgot-password/done`} className="btn btn--forgot-btn-1">Done</Link>*/}
      </form>
    </>
  );
}
