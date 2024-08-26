// 'use client';

/*type ArticlesNavigationType = {
  // children: ReactNode;
}*/

import Link from 'next/link';

export default function ArticlesNavigation(/*{  }: ArticlesNavigationType*/) {
  return (
    <>
      <div className="travel-articles__navigation">
        <Link href={`/`} className="inline-block">Home &gt;</Link>
        <Link href={`/articles`} className="inline-block highlighted">Travel Articles</Link>
      </div>
    </>
  );
}
