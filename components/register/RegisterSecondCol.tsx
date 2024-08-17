'use client';

/*type RegisterSecondColType = {
  // children: ReactNode;
}*/

import RegisterHeading from '@/components/register/RegisterHeading';
import RegisterForm from '@/components/register/RegisterForm';
import { motion } from 'framer-motion';

export default function RegisterSecondCol(/*{  }: RegisterSecondColType*/) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
    >
      <div className="register__second-col">
        <RegisterHeading />
        <RegisterForm />
      </div>
    </motion.div>
  );
}
