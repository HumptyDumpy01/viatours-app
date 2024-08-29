'use client';

/*type ArticlesNavigationType = {
  // children: ReactNode;
}*/

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ArticlesNavigation(/*{  }: ArticlesNavigationType*/) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="travel-articles__navigation">
        <Link href={`/`} className="inline-block">Home &gt;</Link>
        <Link href={`/articles`} className="inline-block highlighted">Travel Articles</Link>
      </motion.div>
    </>
  );
}
