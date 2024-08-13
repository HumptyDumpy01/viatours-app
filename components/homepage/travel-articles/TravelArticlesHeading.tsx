'use client';
import './TravelArticles.scss';
/*interface TravelArticlesHeadingInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TravelArticlesHeading(/*{  }: TravelArticlesHeadingInterface*/) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="travel-articles__heading-wrapper flex flex-space-between">
        <motion.h2
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="heading-secondary travel-articles__heading">Travel Articles
        </motion.h2>
        <Link href={`/articles`} className="link">See all</Link>
      </motion.div>
    </>
  );
}
