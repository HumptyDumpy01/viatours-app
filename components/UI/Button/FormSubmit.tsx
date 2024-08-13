'use client';

import '../../homepage/cta-2/CTASecondary.scss';
import { motion } from 'framer-motion';

import { useFormStatus } from 'react-dom';

interface FormSubmitInterface {
  btnClassName: string;
  btnTextIsPending: string;
  btnTextDefault: string;
  // children: ReactNode;
}

export default function FormSubmit({ btnClassName, btnTextIsPending, btnTextDefault }: FormSubmitInterface) {
  const status = useFormStatus();
  const isPending = status.pending;

  return (
    <>
      <motion.button
        whileHover={{ x: 20 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        style={{ fontFamily: `Inter` }}
        className={btnClassName}
        disabled={isPending}>{!isPending ? btnTextDefault : btnTextIsPending}</motion.button>
    </>
  );
}
