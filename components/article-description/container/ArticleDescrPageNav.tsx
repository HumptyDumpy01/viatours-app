// 'use client';

/*type ArticleDescrPageNavType = {
  // children: ReactNode;
}*/

import Link from 'next/link';

export default function ArticleDescrPageNav(/*{  }: ArticleDescrPageNavType*/) {
  return (
    <>
      <div className="tour-article-descr__nav">
        <div className="flex flex-align-center">
          <Link href="#" className="inline-block">Home &gt;</Link>
          <Link href="#" className="inline-block">Tour Articles &gt;</Link>
          <Link href="#" className="inline-block highlighted">Wonders of the World: Colosseum</Link>
        </div>
        <div className="flex flex-align-center">
          <p className="tour-article-descr__nav-tag">
            The Newest & Hot Articles
          </p>
        </div>
      </div>
    </>
  );
}
