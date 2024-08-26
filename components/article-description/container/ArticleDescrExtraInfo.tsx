// 'use client';
import authorLogoImg from '@/assets/images/article-descr/author/author-logo.svg';
import Link from 'next/link';
/*type ArticleDescrExtraInfoType = {
  // children: ReactNode;
}*/

export default function ArticleDescrExtraInfo(/*{  }: ArticleDescrExtraInfoType*/) {
  return (
    <>
      <div className="tour-article-descr__extra-info">
        <Link href="#" className="tour-article-descr__extra-info__author flex flex-align-center text-decor-none">
          <img src={authorLogoImg.src} alt="autor logo"
               className="tour-article-descr__extra-info__author-img" />
          <div className="grid tour-article-descr__extra-info__author-credentials">
            <p className="tour-article-descr__extra-info__author-name">Nika Jackson</p>
            <p className="tour-article-descr__extra-info__author-employment">Travel writer</p>
          </div>
        </Link>
        <div className="tour-article-descr__extra-info__actions flex flex-align-center">
          <p className="tour-article-descr__extra-info__actions-min-read">2 minutes read</p>
          <button type="button" className="btn tour-article-descr__extra-info__actions-share">Share</button>
          <button type="button" className="btn tour-article-descr__extra-info__actions-save">Save</button>
        </div>
      </div>
    </>
  );
}
