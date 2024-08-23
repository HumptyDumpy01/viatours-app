// 'use client';

/*type UserDeleteAccountFirstStepType = {
  // children: ReactNode;
}*/

import { motion } from 'framer-motion';

export default function UserDeleteAccountFirstStep(/*{  }: UserDeleteAccountFirstStepType*/) {
  return (
    <>
      <h2 className="delete-account__heading tertiary-heading">Delete Account</h2>
      <p className="delete-account__text margin-bottom-34px">Before we proceed with account deletion, <b>we want to
        ensure
        it’s you</b>.
        Please enter your account password below:</p>
      <div className="delete-account__form flex flex-direction-column">
        <label htmlFor="confirm-password-input" className="delete-account__label">Confirm your password</label>
        <div className="delete-account__input-wrapper flex">
          <form action="#" className="flex delete-account__input-form">
            <input type="password" id="confirm-password-input" className="delete-account__input"
                   placeholder="Password"
                   required />
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: `spring`, stiffness: 260, damping: 20 }}
              className="delete-account__button" id="confirm-password">Confirm
            </motion.button>
          </form>
        </div>
      </div>
    </>
  );
}
