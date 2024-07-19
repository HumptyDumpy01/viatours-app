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
    <>
      <TravelArticlesHeading />
      <div className="travel-articles__articles grid">
        {loading && <>
          <SkeletonCardClipped />
          <SkeletonCardClipped />
          <SkeletonCardClipped />
        </>}
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
        {!loading && articles.length === 0 && <p>No articles found</p>}

      </div>
    </>
  );
}
