// 'use client';

import topArticleImg1 from '@/assets/images/articles/top-articles/top-articles-1.png';
import topArticleImg2 from '@/assets/images/articles/top-articles/top-articles-2.png';
import topArticleImg3 from '@/assets/images/articles/top-articles/top-articles-3.png';
import topArticleImg4 from '@/assets/images/articles/top-articles/top-articles-4.png';
import topArticleImg5 from '@/assets/images/articles/top-articles/top-articles-5.png';
import topArticleImg6 from '@/assets/images/articles/top-articles/top-articles-6.png';
import topArticleImg7 from '@/assets/images/articles/top-articles/top-articles-7.png';
import topArticleImg8 from '@/assets/images/articles/top-articles/top-articles-8.png';
import topArticleImg9 from '@/assets/images/articles/top-articles/top-articles-9.png';

/*type TopArticlesCardContainerType = {
  // children: ReactNode;
}*/
import TopArticlesCard from '@/components/articles/top-articles/card/TopArticlesCard';

export default function TopArticlesCardContainer(/*{  }: TopArticlesCardContainerType*/) {
  return (
    <>
      <TopArticlesCard imageUrl={topArticleImg1} />
      <TopArticlesCard imageUrl={topArticleImg2} />
      <TopArticlesCard imageUrl={topArticleImg3} />
      <TopArticlesCard imageUrl={topArticleImg4} />
      <TopArticlesCard imageUrl={topArticleImg5} />
      <TopArticlesCard imageUrl={topArticleImg6} />
      <TopArticlesCard imageUrl={topArticleImg7} />
      <TopArticlesCard imageUrl={topArticleImg8} />
      <TopArticlesCard imageUrl={topArticleImg9} />
    </>
  );
}
