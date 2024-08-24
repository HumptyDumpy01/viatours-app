'use client';

import './UserDeleteAccount.scss';
import { motion } from 'framer-motion';
import UserDeleteAccountFirstStep
  from '@/components/account-settings/contents/user-delete-account/UserDeleteAccountFirstStep';
import UserDeleteAccountSecondStep
  from '@/components/account-settings/contents/user-delete-account/UserDeleteAccountSecondStep';
import { useCartSelector } from '@/store/hooks';

type UserDeleteAccountType = {
  userEmail: string;
  // children: ReactNode;
}

export default function UserDeleteAccount({ userEmail }: UserDeleteAccountType) {
  const deleteAccountStage = useCartSelector((state) => state.deleteAccount.deleteAccountStage);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ type: `spring`, stiffness: 100, damping: 10, duration: 0.5 }}
        className="delete-account-container">
        {deleteAccountStage === 1 && (
          <UserDeleteAccountFirstStep userEmail={userEmail} />
        )}
        {deleteAccountStage === 2 && (
          <UserDeleteAccountSecondStep userEmail={userEmail} />
        )}
      </motion.div>
    </>
  );
}
