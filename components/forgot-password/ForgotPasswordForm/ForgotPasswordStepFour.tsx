import '@/app/login/forgot-password/page.scss';
import './ForgotPasswordStepThree.scss';
import ForgotPasswordHeading from '@/components/forgot-password/ForgotPasswordHeading';
import Link from 'next/link';
/*type ForgotPasswordStepFourType = {
  // children: ReactNode;
}*/

export default function ForgotPasswordStepFour(/*{  }: ForgotPasswordStepFourType*/) {

  return (
    <>
      <ForgotPasswordHeading
        subheading={`step 4 of 4`}
        heading={`Done!`}
        text={`That's it! Try to sign! We do hope you'll be able to login again.`}
      />

      <Link href={`/login`} className="btn btn--book-now text-align-center">Sign in</Link>
    </>
  );
}
