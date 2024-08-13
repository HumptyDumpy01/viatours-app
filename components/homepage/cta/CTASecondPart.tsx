'use client';

/*interface CTASecondPartInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASecondPart(/*{  }: CTASecondPartInterface*/) {
  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: `spring`, stiffness: 100 }}
        viewport={{ once: true }}
        className="cta__left-side">
        <motion.h2
          whileHover={{ scale: 1.1 }}
          transition={{ type: `spring`, stiffness: 100 }}
          className="secondary-heading cta__heading">Grab up
          to <span>90% off</span>
          on your favorite
          Destinations
        </motion.h2>
        <p className="paragraph paragraph-cta">Limited time offers, don&apos;t miss the opportunity</p>
        <motion.div
          whileHover={{ scale: 1.1, x: 10 }}
          transition={{ type: `spring`, stiffness: 100 }}
          whileTap={{ scale: 0.9, x: -10 }}
        >
          <Link href={`/tours?filter=onsale:5-20,onsale:20-40,onsale:40-90`} className="btn btn--cta">Search Now <span
            className="icon-arr">&rarr;</span></Link>
        </motion.div>
      </motion.div>
    </>
  );
}
