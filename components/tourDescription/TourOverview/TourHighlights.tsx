'use client';

import Iconion from '@/components/UI/IonIcon/IconIon';
import { motion } from 'framer-motion';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';

type TourHighlightsType = {
  tour_highlights: string[];
  // children: ReactNode;
}

export const item = {
  transition: { type: 'spring', stiffness: 100, damping: 10 },
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 }
};
export default function TourHighlights({ tour_highlights }: TourHighlightsType) {
  return (
    <section className="description__tour-overview-highlights-wrapper">
      <h3 className="tertiary-heading margin-bottom-small">Tour highlights</h3>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="description__tour-overview-highlights">
        {tour_highlights.map((highlight, index) => (
          <motion.li
            variants={item}
            key={highlight}>
            <Iconion type={`ellipse`} className="icon icon--dot"></Iconion>
            {highlight}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
