'use client';

/*interface TravelArticlesInterface {
  // children: ReactNode;
}*/
import TravelArticlesHeading from '@/components/homepage/travel-articles/TravelArticlesHeading';
import ArticleCard from '@/components/UI/Card/ArticleCard';
import { DummyArticleType } from '@/data/DUMMY_ARTICLES';
import { formatDate } from '@/lib/helpers/formatDate';
import { fetchArticles } from '@/lib/api/fetchArticles';
import { useEffect, useState } from 'react';
import SkeletonCardClipped from '@/components/skeletons/Card/SkeletonCardClipped';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
};

const item = {
  transition: { type: 'spring', stiffness: 100, damping: 10 },
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 }
};

export default function TravelArticles(/*{  }: TravelArticlesInterface*/) {
  const [articles, setArticles] = useState<DummyArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchArticles(3).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      viewport={{ once: false }}
    >
      <TravelArticlesHeading />
      <div className="travel-articles__articles grid">
        {loading && <>
          <SkeletonCardClipped />
          <SkeletonCardClipped />
          <SkeletonCardClipped />
        </>}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={container}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          className="travel-articles__articles grid">
          {!loading && articles.map((item) =>
            <ArticleCard
              imgSrc={item.images[0]}
              key={item.id}
              href={`/articles/1`}
              tag={item.tags[0]}
              date={formatDate(item.date)}
              author={`${item.author.name} ${item.author.lastName}`}
              title={item.title} />
          )}
        </motion.div>
        {!loading && articles.length === 0 && <p>No articles found</p>}

      </div>
    </motion.div>
  );
}
