// 'use client';
import './PopularThingsToDo.scss';
import './PopularThingsGallery.scss';
/*interface PopularThingsHeadingInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PopularThingsHeading(/*{  }: PopularThingsHeadingInterface*/) {
  return (
    <>
      <div className="popular-things-to-do__heading-wrapper flex flex-space-between flex-align-center">
        <motion.h2
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="secondary-heading popular-things-to-do-heading">Popular things to
          do
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
