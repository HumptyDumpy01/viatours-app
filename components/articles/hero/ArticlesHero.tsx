'use client';
import { motion } from 'framer-motion';
/*type ArticlesHeroType = {
  // children: ReactNode;
}*/
import HeroArticlesForm from '@/components/articles/hero/HeroArticlesForm';

export default function ArticlesHero(/*{  }: ArticlesHeroType*/) {
  return (
    <>
      <div className="articles-hero container text-align-center">
        <motion.h1
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', duration: 1 }}
          className="articles-hero__heading main-heading">Welcome to <br />
          Viatours Travel Articles!
        </motion.h1>
        <p className="articles-hero__text">From local escapes to far-flung adventures</p>
        <HeroArticlesForm />
      </div>
    </>
  );
}
