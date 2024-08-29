'use client';
import './ArticlesContainer.scss';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

type ArticlesContainerType = {
  children: ReactNode;
}

export default function ArticlesContainer({ children }: ArticlesContainerType) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="travel-articles-container">
      {children}
    </motion.section>
  );
}
