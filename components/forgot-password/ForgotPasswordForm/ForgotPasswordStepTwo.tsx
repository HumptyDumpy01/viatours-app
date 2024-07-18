// 'use client';
import '@/app/login/forgot-password/page.scss';
import Link from 'next/link';
import ForgotPasswordHeading from '@/components/forgot-password/ForgotPasswordHeading';
/*type ForgotPasswordStepTwoType = {
  // children: ReactNode;
}*/

export default function ForgotPasswordStepTwo(/*{  }: ForgotPasswordStepTwoType*/) {
  return (
    <>
      <ForgotPasswordHeading
        subheading={`step 2 of 4`}
        heading={`Done! Check your email
      for a recovery code!`}
        text={`Please check your email inbox for the code. If it doesn't arrive promptly, don't forget to check your spam folder.`}
      />
      <form className="forgot-password__form flex gap-1rem">
        {/*SECOND STAGE*/}
        <div className="input-wrapper">
          <label htmlFor="code"></label>
          <input type="password" id="code" className="forgot-password__input forgot-password__input-code"
                 placeholder="Code"
                 required />
        </div>
        {/*<button className="btn btn--forgot-btn-1" id="btn-confirm">Confirm</button>*/}
        {/* TEMPORARY: THIS LINK SIMPLY REDIRECTS USER TO STEP 3. */}
        <Link href={`/login/forgot-password/set-new-password`} className="btn btn--forgot-btn-1">Confirm</Link>
      </form>
    </>
  );
}
