'use client';

import './PopularThingsToDo.scss';
import './PopularThingsGallery.scss';
import PopularThingsHeading from '@/components/homepage/popular-things-to-do/PopularThingsHeading';
import PopularThingsGallery from '@/components/homepage/popular-things-to-do/PopularThingsGallery';
import { motion } from 'framer-motion';

export default function PopularThingsToDo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      viewport={{ once: false }}
    >
      <PopularThingsHeading />
      <PopularThingsGallery />
    </motion.div>
  );
}