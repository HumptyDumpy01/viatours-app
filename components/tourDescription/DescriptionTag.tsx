'use client';

import '@/app/tours/[id]/page.scss';
import { motion } from 'framer-motion';

type DescriptionTagType = {
  type: string[];
  // children: ReactNode;
}

export default function DescriptionTag({ type }: DescriptionTagType) {

  return (
    <div className="description__tag flex">
      {type.map(function(item) {
        return (
          <motion.div
            whileTap={{ scale: 0.7, backfaceVisibility: 'hidden' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            key={item}>
            <span key={item} className="description__tag--text description__tag--text-1">{item}</span>
          </motion.div>
        );
      })}
      <motion.div
        whileTap={{ scale: 0.7, backfaceVisibility: 'hidden' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="description__tag--text description__tag--text-2">Free Cancellation
      </motion.div>
    </div>
  );
}
