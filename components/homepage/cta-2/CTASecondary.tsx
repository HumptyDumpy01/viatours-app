'use client';

/*interface CTASecondaryInterface {
  // children: ReactNode;
}*/
import CTA2FirstCol from '@/components/homepage/cta-2/CTA2FirstCol';
import CTA2SecondCol from '@/components/homepage/cta-2/CTA2SecondCol';
import { motion } from 'framer-motion';

export default function CTASecondary(/*{  }: CTASecondaryInterface*/) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      viewport={{ once: false }}
      className="cta-secondary-wrapper grid">
      <CTA2FirstCol />
      <CTA2SecondCol />
    </motion.div>
  );
}
