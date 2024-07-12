// 'use client';
import './TravelArticles.scss';
/*interface TravelArticlesHeadingInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';

export default function TravelArticlesHeading(/*{  }: TravelArticlesHeadingInterface*/) {
  return (
    <>
      <div className="travel-articles__heading-wrapper flex flex-space-between">
        <h2 className="heading-secondary travel-articles__heading heading-scale-effect">Travel Articles</h2>
        <Link href={`/articles`} className="link">See all</Link>
      </div>
    </>
  );
}
