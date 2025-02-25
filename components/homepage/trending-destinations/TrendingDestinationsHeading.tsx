// 'use client';
import './TrendingDestinations.scss';
/*interface TrendingDestinationsHeadingInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TrendingDestinationsHeading(/*{  }: TrendingDestinationsHeadingInterface*/) {
  return (
    <>
      <span className="subheading">Newest</span>
      <div className="trending-destinations-heading-wrapper flex flex-align-center">
        <motion.h2
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="secondary-heading">Newest
          destinations
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href={`/tours?filter=new`} className="link">See all</Link>
        </motion.div>
      </div>
    </>
  )
    ;
}
