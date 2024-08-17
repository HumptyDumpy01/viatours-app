'use client';

type LoginHeadingType = {
  message: string;
  // children: ReactNode;
}
import { motion } from 'framer-motion';

export default function LoginHeading({ message }: LoginHeadingType) {
  return (
    <>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        className="sign-in__second-col-title secondary-heading">Sign in to Viatours!
      </motion.h1>
      <p className={`sign-in__second-col-text-message`}>{message}</p>
      <p className="sign-in__second-col-text">Be the first to know about <u>new tour packages</u>, upcoming events,
        and
        exciting &nbsp;
        <u>destinations</u>. It’s like having a backstage pass to the world of travel.</p>
    </>
  );
}
