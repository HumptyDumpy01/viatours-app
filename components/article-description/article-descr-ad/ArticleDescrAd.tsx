// 'use client';

import nextArticleImg from '@/assets/images/article-descr/next-article/next-article.png';
import './ArticleDescrAd.scss';

/*type ArticleDescrAdType = {
  // children: ReactNode;
}*/

export default function ArticleDescrAd(/*{  }: ArticleDescrAdType*/) {
  return (
    <>
      <div className="tour-article-descr__ad-container">
        <div className="tour-article-descr__ad container grid">
          <div className="tour-article-descr__ad__first-col">
            <h3 className="tour-article-descr__ad__heading">7 Reasons to Plan a Trip to Lowa in 2024</h3>
            <p className="tour-article-descr__ad__par">River cruises, railroad adventures, and Frank Lloyd Wright
              architecture.</p>
            <a href="#" className="link tour-article-descr__ad__btn">Read Now
              <svg className="tour-article-descr__ad__btn__icon" xmlns="http://www.w3.org/2000/svg" width="13"
                   height="12"
                   viewBox="0 0 13 12" fill="none">
                <path d="M6.82642 1.1543L11.7493 6.07722L6.82642 11.0001M11.0656 6.07722H1.08301" stroke="white"
                      strokeWidth="1.64098" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <img src={nextArticleImg.src}
               alt="a woman lionizing an awesome landscape with hundreds of balloons.."
               className="tour-article-descr__ad__second-col__img" />
        </div>
      </div>
    </>
  );
}
