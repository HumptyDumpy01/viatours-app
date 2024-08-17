'use client';
import '@/app/register/page.scss';
import { motion } from 'framer-motion';

/*type RegisterHeadingType = {
  // children: ReactNode;
}*/

export default function RegisterHeading(/*{  }: RegisterHeadingType*/) {
  return (
    <>
      <motion.h1
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="register__heading secondary-heading">Register new account!
      </motion.h1>
      <p className="register__paragraph">Our subscribers receive first dibs on limited-time discounts and flash sales.
        Imagine saving on that dream beachfront resort or that thrilling mountain expedition!</p>
    </>
  );
}
