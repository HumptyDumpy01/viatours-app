'use client';

import { motion } from 'framer-motion';
import './HeroTags.scss';
import { Dispatch, SetStateAction } from 'react';
import { TagType } from '@/components/articles/hero/HeroArticlesForm';
import { container } from '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases';
import { item } from '@/components/tourDescription/TourOverview/TourHighlights';

type HeroTagsType = {
  activeTag: string;
  setActiveTag: Dispatch<SetStateAction<TagType>>;
  // children: ReactNode;
}


export default function HeroTags({ activeTag, setActiveTag }: HeroTagsType) {

  function toggleActiveTag(tag: TagType) {
    setActiveTag(tag);
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="hero__article-tag-container">
      <motion.div
        variants={item}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        onClick={() => toggleActiveTag(`culture`)}
        className={`hero__article-tag culture flex flex-align-center
         ${activeTag === `culture` ? ` hero__article-tag--active` : ``}`}>
        Culture
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        variants={item}
        onClick={() => toggleActiveTag(`historic`)}
        className={`hero__article-tag culture flex flex-align-center 
        ${activeTag === `historic` ? ` hero__article-tag--active` : ``}`}>
        Historic
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        variants={item}
        onClick={() => toggleActiveTag(`nature`)}
        className={`hero__article-tag culture flex flex-align-center 
        ${activeTag === `nature` ? ` hero__article-tag--active` : ``}`}>
        Nature
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: `spring`, stiffness: 260, damping: 20 }}
        variants={item}
        onClick={() => toggleActiveTag(`trips`)}
        className={`hero__article-tag culture flex flex-align-center 
        ${activeTag === `trips` ? ` hero__article-tag--active` : ``}`}>
        Trips
      </motion.div>
    </motion.div>
  );
}
