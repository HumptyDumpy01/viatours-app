'use client';
import { motion } from 'framer-motion';

type UserDeleteAccountSecondStepType = {
  userEmail: string;
  // children: ReactNode;
}

export default function UserDeleteAccountSecondStep({ userEmail }: UserDeleteAccountSecondStepType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ type: `spring`, stiffness: 100, damping: 10, duration: 0.5 }}
    >
      <h2 className="delete-account__heading tertiary-heading">We are almost done! <br /> Please enter the Verification
        Code</h2>
      <p className="delete-account__text">We sent a verification code to your registered email
        address: <b className={`highlighted`}>{userEmail}</b>.
        Please check your inbox (or spam folder, just in case) for the code.</p>
      <div className="delete-account__form flex flex-direction-column">
        <label htmlFor="code" className="delete-account__label"></label>
        <div className="delete-account__input-wrapper flex">
          <input type="password" id="confirm-code-input" className="delete-account__input width-156px"
                 placeholder="Code" required />
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: `spring`, stiffness: 260, damping: 20 }}
            className="delete-account__button confirm-code">Confirm
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: `spring`, stiffness: 260, damping: 20 }}
          className="btn delete-account__resend-code">Resend
        </motion.button>
        <p className="delete-account__confirmation-terms">By confirming, you understand that all your content and data
          associated with this account will be permanently removed.</p>
      </div>
    </motion.div>
  );
}
