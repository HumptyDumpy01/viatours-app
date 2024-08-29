// 'use client';

type ArticleDescrStatsType = {
  rating: number;
  location: string;
  views: string;
  // children: ReactNode;
}

import Stars from '@/components/UI/Layout/Stars';

export default function ArticleDescrStats({ rating, views, location }: ArticleDescrStatsType) {
  return (
    <>
      <div className="tour-article-descr__rating-container">
        <div className="tour-article-descr__rating flex">
          <div className={`margin-right-very-small flex`}>
            <Stars rating={rating} />
          </div>
          <div className="">
            <div className="flex flex-align-center gap-24px">
              <p className="flex flex-align-center tour-article-descr__location">
                {location}
              </p>
              <p
                className="flex flex-align-center tour-article-descr__views">{views} viewed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
