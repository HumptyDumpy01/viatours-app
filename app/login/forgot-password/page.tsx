'use client';

import './page.scss';
import ForgotPasswordStepOne from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepOne';
import ForgotPasswordStepTwo from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepTwo';
import ForgotPasswordStepThree from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepThree';
import ForgotPasswordStepFour from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordStepFour';
import { useCartSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

export default function ForgotPasswordPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const forgotPasswordStage = useCartSelector((state) => state.forgotPassword.forgotPasswordStage);

  if (!isMounted) {
    return null; // Return null during SSR
  }

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