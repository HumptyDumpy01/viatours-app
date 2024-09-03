'use client';

/*interface TravelArticlesInterface {
  // children: ReactNode;
}*/
import TravelArticlesHeading from '@/components/homepage/travel-articles/TravelArticlesHeading';
import { useEffect, useState } from 'react';
import SkeletonCardClipped from '@/components/skeletons/Card/SkeletonCardClipped';
import { motion } from 'framer-motion';
import { ObjectId } from 'mongodb';
import { ArticleComment } from '@/app/articles/[id]/page';
import ArticleCard from '@/components/UI/Card/ArticleCard';
import { formatDate } from '@/lib/helpers/formatDate';

export type ArticleTypeFull = {
  _id: string;
  subtitle: string;
  title: string;
  images: string[]
  type: string[];
  tags: string[];
  rating: number[];
  views: number;
  location: {
    place: string;
    city: string;
    country: string;
  };
  author: ObjectId[];
  readTime: string;
  content: any;
  searchTerm: string;
  createdAt: string;
  comments: ArticleComment[];
}

type ArticleType = {
  _id: string;
  title: string;
  image: string;
  type: string[];
  author: string;
  createdAt: string;
}

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
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  async function fetchArticles() {
    const response = await fetch(`/api/fetch-articles`, {
      method: `POST`,
      body: JSON.stringify({
        limit: 3,
        project: {
          title: 1,
          image: 1,
          type: 1,
          createdAt: 1,
          author: 1
        }
      })
    });
    const data = await response.json();

    if (data.error) {
      setError(true);
      setLoading(false);
      return;
    }
    setArticles(data.articles);
    setLoading(false);
    setError(false);

  }


  useEffect(() => {
    fetchArticles();
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
          {(!loading && !error) && articles.map((item) =>
            <ArticleCard
              imgSrc={item.image}
              key={item._id}
              href={item._id}
              type={item.type}
              date={formatDate(item.createdAt)}
              author={item.author}
              title={item.title} />
          )}
        </motion.div>
        {(!loading && !error && articles.length === 0) && <p>No articles found</p>}
        {(error && !loading) && <p className={`subheading`}>There was an error fetching the articles!</p>}

      </div>
    </motion.div>
  );
}
