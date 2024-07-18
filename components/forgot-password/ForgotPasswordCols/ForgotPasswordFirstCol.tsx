// 'use client';

import { ReactNode } from 'react';
import ForgotPasswordForm from '@/components/forgot-password/ForgotPasswordForm/ForgotPasswordForm';

type ForgotPasswordFirstColType = {
  children: ReactNode;
}

export default function ForgotPasswordFirstCol({ children }: ForgotPasswordFirstColType) {
  return (
    <div className="forgot-password__first-col">
      <ForgotPasswordForm>
        {children}
      </ForgotPasswordForm>
    </div>
  );
}
