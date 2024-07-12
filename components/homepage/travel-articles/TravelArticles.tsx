// 'use client';

import travelArticleImg1 from '@/assets/images/homepage/travelArticles/travelArticle_1.svg';
import travelArticleImg2 from '@/assets/images/homepage/travelArticles/travelArticle_2.svg';
import travelArticleImg3 from '@/assets/images/homepage/travelArticles/travelArticle_3.svg';

/*interface TravelArticlesInterface {
  // children: ReactNode;
}*/
import TravelArticlesHeading from '@/components/homepage/travel-articles/TravelArticlesHeading';
import ArticleCard from '@/components/UI/Card/ArticleCard';

export default function TravelArticles(/*{  }: TravelArticlesInterface*/) {
  return (
    <>
      <TravelArticlesHeading />
      <div className="travel-articles__articles grid">
        <ArticleCard
          imgSrc={travelArticleImg1}
          href="/articles/1"
          tag="Travel"
          date="July 20, 2021"
          author="John Doe"
          title="Kenya vs Tanzania Safari: The Better African Safari Experience" />
        <ArticleCard
          imgSrc={travelArticleImg2}
          href="/articles/2"
          tag="Travel"
          date="July 20, 2021"
          author="John Doe"
          title="Exploring the Serengeti: A Wildlife Adventure" />
        <ArticleCard
          imgSrc={travelArticleImg3}
          href="/articles/3"
          tag="Travel"
          date="July 20, 2021"
          author="John Doe"
          title="Into the Wild: An Unforgettable Safari Journey" />

      </div>
    </>
  );
}
