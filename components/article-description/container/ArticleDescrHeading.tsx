// 'use client';

import { ReactNode } from 'react';

type ArticleDescrHeadingType = {
  subHeading: string;
  heading: ReactNode;
  // children: ReactNode;
}

export default function ArticleDescrHeading({ subHeading, heading }: ArticleDescrHeadingType) {
  return (
    <>
      <div className="tour-article-descr__title-container">
        <span className="tour-article-descr__title-subheading subheading">{subHeading}</span>
        <h1 className="tour-article-descr__title">{heading}</h1>
      </div>
    </>
  );
}
