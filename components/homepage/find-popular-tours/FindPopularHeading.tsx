'use client';
import './FindPopularTours.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';

/*interface FindPopularHeadingInterface {
  // children: ReactNode;
}*/


export default function FindPopularHeading(/*{  }: FindPopularHeadingInterface*/) {
  return (
    <>
      <span className="subheading inline-block margin-bottom-small">top destinations</span>
      <div className="find-popular-tours-heading-wrapper flex flex-space-between flex-align-center">
        <motion.h2
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: `spring`, stiffness: 260, damping: 20 }}
          className="secondary-heading find-popular-tours__heading">Find
          Popular Tours
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href={`/tours?filter=popular`} className="link">See all</Link>
        </motion.div>
      </div>
    </>
  );
}
