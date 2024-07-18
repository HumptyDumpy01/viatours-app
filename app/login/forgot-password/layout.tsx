// import { ReactNode } from 'react';

import React from 'react';
import ForgotPasswordFirstCol from '@/components/forgot-password/ForgotPasswordCols/ForgotPasswordFirstCol';
import ForgotPasswordSecondCol from '@/components/forgot-password/ForgotPasswordCols/ForgotPasswordSecondCol';

interface ForgotPasswordLayoutType {
  // children: ReactNode;
}

export default function
  ForgotPasswordLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <section className="forgot-password-container container">
        <div className="forgot-password grid">
          <ForgotPasswordFirstCol>
            {children}
          </ForgotPasswordFirstCol>
          <ForgotPasswordSecondCol />
        </div>
      </section>
    </>
  );
}