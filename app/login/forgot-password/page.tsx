'use client';

import './page.scss';
import ForgotPasswordStepOne from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepOne';
import ForgotPasswordStepTwo from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepTwo';
import ForgotPasswordStepThree from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepThree';
import ForgotPasswordStepFour from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepFour';
import { useCartSelector } from '@/store/hooks';
/*type ForgotPasswordPageType = {
  // children: ReactNode;
}*/

export default function ForgotPasswordPage(/*{  }: ForgotPasswordPageType*/) {
  const forgotPasswordStage = useCartSelector((state) => state.forgotPassword.forgotPasswordStage);

  return (
    <>
      {forgotPasswordStage === 1 && (
        <ForgotPasswordStepOne />
      )}
      {forgotPasswordStage === 2 && (
        <ForgotPasswordStepTwo />
      )}
      {forgotPasswordStage === 3 && (
        <ForgotPasswordStepThree />
      )}
      {forgotPasswordStage === 4 && (
        <ForgotPasswordStepFour />
      )}
    </>
  );
}
