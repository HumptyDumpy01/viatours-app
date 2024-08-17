'use client';

import './TourOverview.scss';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type DescriptionOverviewType = {
  sideBar: ReactNode;
  children: ReactNode;
}

export default function DescriptionOverview({ children, sideBar }: DescriptionOverviewType) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 40 }}
      viewport={{ once: false }}
      className="description__tour-overview grid">
      <div className="description__tour-overview-wrapper-1">
        {children}
      </div>
      {sideBar}
    </motion.section>
  )
    ;
}
