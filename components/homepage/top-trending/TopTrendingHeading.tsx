// 'use client';
import './TopTrending.scss';
import Link from 'next/link';
/*interface TopTrendingHeadingInterface {
  // children: ReactNode;
}*/
export default function TopTrendingHeading(/*{  }: TopTrendingHeadingInterface*/) {
  return (
    <div className="top-trending__heading-wrapper container flex flex-space-between">
      <h2 className="secondary-heading top-trending-heading heading-scale-effect">Top Trending</h2>
      <Link href={`/tours?query=top`} className="link">See all</Link>
    </div>
  );
}
