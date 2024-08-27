// 'use client';

type ArticleDescrPageNavType = {
  title: string;
  tags: []
  // children: ReactNode;
}

import Link from 'next/link';

export default function ArticleDescrPageNav({ title, tags }: ArticleDescrPageNavType) {
  return (
    <>
      <div className="tour-article-descr__nav">
        <div className="flex flex-align-center">
          <Link href={`/`} className="inline-block">Home &gt;</Link>
          <Link href={`/articles`} className="inline-block">Tour Articles &gt;</Link>
          <Link href={`/articles/1`} className="inline-block highlighted">{title}</Link>
        </div>
        <div className="flex flex-align-center">
          <p className="tour-article-descr__nav-tag">
            {/* TODO:  PARSE THE REAL TAG AND INJECT IT HERE */}
            The Newest & Hot Articles
          </p>
        </div>
      </div>
    </>
  );
}
