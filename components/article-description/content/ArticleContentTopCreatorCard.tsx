// 'use client';

type ArticleContentTopCreatorCardType = {
  imgUrl: string;
  // children: ReactNode;
}

import Link from 'next/link';

export default function ArticleContentTopCreatorCard({ imgUrl }: ArticleContentTopCreatorCardType) {
  return (
    <>
      <Link href="#"
            className="tour-article-descr__extra-info__author flex flex-align-center top-creators-container text-decoration-none">
        <img src={imgUrl}
             alt="author logo"
             className="tour-article-descr__extra-info__author-img top-creators-img" />
        <div className="grid tour-article-descr__extra-info__author-credentials">
          <p className="tour-article-descr__extra-info__author-name top-creators-author">Nika Jackson</p>
          <p className="tour-article-descr__extra-info__author-employment top-creators-employment">Travel
            writer</p>
        </div>
      </Link>
    </>
  );
}
