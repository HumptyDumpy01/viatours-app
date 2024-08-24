// 'use client';
import './TopArticlesContainer.scss';
import TopArticlesHeading from '@/components/articles/top-articles/TopArticlesHeading';
import BtnBulky from '@/components/UI/Button/BtnBulky';
import TopArticlesCardContainer from '@/components/articles/top-articles/card/TopArticlesCardContainer';
/*type TopArticlesContainerType = {
  // children: ReactNode;
}*/

export default function TopArticlesContainer(/*{  }: TopArticlesContainerType*/) {
  return (
    <div className="travel-articles__the-top-articles-container flex">
      <div className="travel-articles__the-top-articles">
        <TopArticlesHeading />
        <BtnBulky mode={`left`} />
        <BtnBulky mode={`right`} />
        <TopArticlesCardContainer />
      </div>
    </div>
  );
}
