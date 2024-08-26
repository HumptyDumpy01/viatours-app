// 'use client';
import './page.scss';
import ArticleDescrPageNav from '@/components/article-description/container/ArticleDescrPageNav';
import ArticleDescrTags from '@/components/article-description/container/ArticleDescrTags';
import ArticleDescrHeading from '@/components/article-description/container/ArticleDescrHeading';
import ArticleDescrStats from '@/components/article-description/container/ArticleDescrStats';
import ArticleDescrExtraInfo from '@/components/article-description/container/ArticleDescrExtraInfo';
import ArticleDescrSlider from '@/components/article-description/container/ArticleDescrSlider';

import ArticleDescrContent from '@/components/article-description/content/ArticleDescrContent';
import ArticleDescText from '@/components/article-description/content/ArticleDescText';
import ArticleDescrSecondColumn from '@/components/article-description/content/ArticleDescrSecondColumn';
import ArticleDescrCharity from '@/components/article-description/article-descr-charity/ArticleDescrCharity';
import ArticleDescrAd from '@/components/article-description/article-descr-ad/ArticleDescrAd';
import ArticleDescrComments from '@/components/article-description/comments/ArticleDescrComments';
import YouMightAlsoLike from '@/components/article-description/you-might-also-like/YouMightAlsoLike';
import ArticleDescrLeaveReply from '@/components/article-description/leave-reply/ArticleDescrLeaveReply';
import sliderImg1 from '@/assets/images/article-descr/slider/slider-img-1.png';
import sliderImg2 from '@/assets/images/article-descr/slider/slider-img-2.png';
import sliderImg3 from '@/assets/images/article-descr/slider/slider-img-3.png';
import sliderImg4 from '@/assets/images/article-descr/slider/slider-img-4.png';
import sliderImg5 from '@/assets/images/article-descr/slider/slider-img-5.png';
import Image from 'next/image';

interface ArticleDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

export default function ArticleDescription({ params }: ArticleDescriptionInterface) {
  const id = params.id;
  return (
    <>
      <section className="tour-article-descr-container">
        <div className="tour-article-descr container">
          <ArticleDescrPageNav />
          <ArticleDescrTags />
          <ArticleDescrHeading />
          <ArticleDescrStats />
          <ArticleDescrExtraInfo />
          <ArticleDescrSlider
            images={[sliderImg1.src, sliderImg2.src, sliderImg3.src, sliderImg4.src, sliderImg5.src]} />
        </div>
      </section>
      <ArticleDescrContent>
        <ArticleDescText />
        <ArticleDescrSecondColumn />
      </ArticleDescrContent>
      <ArticleDescrCharity />
      <ArticleDescrAd />
      <ArticleDescrComments />
      <ArticleDescrLeaveReply />
      <YouMightAlsoLike />
    </>
  );
}
