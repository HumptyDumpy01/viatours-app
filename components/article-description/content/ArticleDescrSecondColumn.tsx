// 'use client';
import topStoriesImg1 from '@/assets/images/article-descr/top-stories/top-stories-img-1.png';
import topStoriesImg2 from '@/assets/images/article-descr/top-stories/top-stories-img-2.png';
import topStoriesImg3 from '@/assets/images/article-descr/top-stories/top-stories-img-3.png';

import topCreatorImg1 from '@/assets/images/article-descr/top-creators/top-creator-img-1.svg';
import topCreatorImg2 from '@/assets/images/article-descr/top-creators/top-creator-img-2.svg';
import topCreatorImg3 from '@/assets/images/article-descr/top-creators/top-creator-img-3.svg';

import ArticleContentCard from '@/components/article-description/content/ArticleContentCard';
import ArticleContentTopCreatorCard from '@/components/article-description/content/ArticleContentTopCreatorCard';
/*type ArticleDescrSecondColumnType = {
  // children: ReactNode;
}*/

export default function ArticleDescrSecondColumn(/*{  }: ArticleDescrSecondColumnType*/) {
  return (
    <>
      <div className="tour-articles-descr__content-2">
        <h3 className="tour-articles-descr__content-2__heading">Top Stories</h3>

        <div className="travel-articles__the-top-articles__card-wrapper">
          <ArticleContentCard imgUrl={topStoriesImg1.src} />
          <ArticleContentCard imgUrl={topStoriesImg2.src} />
          <ArticleContentCard imgUrl={topStoriesImg3.src} />
        </div>

        <div className="tour-articles-descr__content-2__top-creators">
          <h3 className="tour-articles-descr__content-2__heading">Top Creators</h3>
          <div className="tour-articles-descr__content-2__top-creators-wrapper">
            <ArticleContentTopCreatorCard imgUrl={topCreatorImg1.src} />
            <ArticleContentTopCreatorCard imgUrl={topCreatorImg2.src} />
            <ArticleContentTopCreatorCard imgUrl={topCreatorImg3.src} />
          </div>
        </div>
      </div>
    </>
  );
}
