import { ReactNode } from 'react';

type ForgotPasswordFormType = {
  children: ReactNode;
}

export default function ForgotPasswordForm({ children }: ForgotPasswordFormType) {
  return (
    <>
      {children}
    </>
  );
}
