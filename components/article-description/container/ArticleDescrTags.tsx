'use client';

import { TypesType } from '@/lib/mongodb';
import { motion } from 'framer-motion';

type ArticleDescrTagsType = {
  types: TypesType[]
  // children: ReactNode;
}
export default function ArticleDescrTags({ types }: ArticleDescrTagsType) {
  return (
    <>
      <div className="tour-article-descr__tag-container">
        <div className="tour-article-descr__tag flex flex-align-center gap-14px">
          {/* PARSE THE REAL TAG AND INJECT IT HERE */}
          {types.map(function(type) {
            return (
              <>
                {type === `trips` &&
                  <motion.span whileTap={{ scale: .9 }} transition={{ type: 'spring', stiffness: 300 }}
                               className="tour-article-descr__tag-text tag-trips">Trips</motion.span>}
                {type === `culture` &&
                  <motion.span whileTap={{ scale: .9 }} transition={{ type: 'spring', stiffness: 300 }}
                               className="tour-article-descr__tag-text tag-culture">Culture</motion.span>}
                {type === `nature` &&
                  <motion.span whileTap={{ scale: .9 }} transition={{ type: 'spring', stiffness: 300 }}
                               className="tour-article-descr__tag-text tag-nature">Nature</motion.span>}
                {type === `historic` &&
                  <motion.span whileTap={{ scale: .9 }} transition={{ type: 'spring', stiffness: 300 }}
                               className="tour-article-descr__tag-text tag-historic">Historic</motion.span>}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
