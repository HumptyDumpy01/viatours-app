// 'use client';

/*type ArticleDescrStatsType = {
  // children: ReactNode;
}*/

import Stars from '@/components/UI/Layout/Stars';

export default function ArticleDescrStats(/*{  }: ArticleDescrStatsType*/) {
  return (
    <>
      <div className="tour-article-descr__rating-container">
        <div className="tour-article-descr__rating flex">
          <div className={`margin-right-very-small flex`}>
            <Stars rating={4.5} />
          </div>
          <div className="">
            <div className="flex flex-align-center gap-24px">
              <p className="flex flex-align-center tour-article-descr__location">
                Colosseum, Rome, Italy
              </p>
              <p className="flex flex-align-center tour-article-descr__views">1K+ viewed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
