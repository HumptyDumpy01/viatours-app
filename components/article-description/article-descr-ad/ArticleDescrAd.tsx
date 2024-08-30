// 'use client';

import nextArticleImg from '@/assets/images/article-descr/next-article/next-article.png';
import './ArticleDescrAd.scss';
import Link from 'next/link';

type ArticleDescrAdType = {
  adArticle: {
    heading: string;
    text: string;
    imgUrl: string;
    id: string;
  }
  // children: ReactNode;
}

export default function ArticleDescrAd(/*{ adArticle }: ArticleDescrAdType*/) {

  const adArticle = {
    heading: `Journey Along the Timeless Great Wall of China`,
    text: `he Great Wall of China is not just a wall; it’s a symbol of the strength, ingenuity, and...`,
    imgUrl: nextArticleImg.src,
    id: `66cd8e0817fb802dfbc4e49c`
  };

  return (
    <>
      <div className="tour-article-descr__ad-container">
        <div className="tour-article-descr__ad container grid">
          <div className="tour-article-descr__ad__first-col">
            <h3 className="tour-article-descr__ad__heading">{adArticle.heading}</h3>
            <p className="tour-article-descr__ad__par">{adArticle.text}</p>
            <Link href={`/articles/${adArticle.id}`} className="link tour-article-descr__ad__btn">Read Now
              <svg className="tour-article-descr__ad__btn__icon" xmlns="http://www.w3.org/2000/svg" width="13"
                   height="12"
                   viewBox="0 0 13 12" fill="none">
                <path d="M6.82642 1.1543L11.7493 6.07722L6.82642 11.0001M11.0656 6.07722H1.08301" stroke="white"
                      strokeWidth="1.64098" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <img src={nextArticleImg.src}
               alt="a woman lionizing an awesome landscape with hundreds of balloons.."
               className="tour-article-descr__ad__second-col__img" />
        </div>
      </div>
    </>
  );
}
