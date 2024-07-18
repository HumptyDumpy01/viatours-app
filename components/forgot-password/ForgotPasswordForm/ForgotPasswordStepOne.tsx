'use client';

import Link from 'next/link';
import ForgotPasswordHeading from '@/components/forgot-password/ForgotPasswordHeading';

export default function ForgotPasswordStepOne() {
  /* IMPORTANT: Outsource your entire form(!) with the useFormState as a standalone component.
      add a prop, e.g. action, and pass this prop to your useFormState as the first arg.
      Then add this form to your PostForm file, where you handle server action. Pass your server action
      to this newly created component.   */

  // Thus you would be able to use the error messages to inject them onto your form.
  // const [state, formAction] = useFormState(YOUR_SERVER_ACTION, { errors: null });

  // TODO: MAKE THIS FORM HANDLING THAT INCLUDES ALL 4 STEPS ON A SERVER SIDE.

  return (
    <>
      <ForgotPasswordHeading
        subheading={`DO NOT WORRY! WE’LL HANDLE THAT`}
        heading={`Forgot your password?`}
        text={`No worries! We’ve got you covered. Simply enter your registered email address
        below, and we’ll send a secure verification code to help you reset your password.`}
      />
      <form className="forgot-password__form flex gap-1rem">
        <div className="input-wrapper">
          <label htmlFor="email"></label>
          <input type="email" id="email" name={`email`} className="forgot-password__input forgot-password__input-email"
                 placeholder="Enter your email address"
                 required />
        </div>
        {/*<button className="btn btn--forgot-btn-1">Send</button>*/}
        {/* TEMPORARY: THIS LINK SIMPLY REDIRECTS USER TO STEP 2. */}
        <Link href={`/login/forgot-password/confirm-password`} className="btn btn--forgot-btn-1">Send</Link>
      </form>
    </>
  );
}