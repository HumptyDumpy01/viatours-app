// 'use client';
import './TrendingDestinations.scss';
/*interface TrendingDestinationsHeadingInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';

export default function TrendingDestinationsHeading(/*{  }: TrendingDestinationsHeadingInterface*/) {
  return (
    <>
      <span className="subheading">Newest</span>
      <div className="trending-destinations-heading-wrapper flex flex-space-between flex-align-center">
        <h2 className="secondary-heading heading-scale-effect">Newest destinations</h2>
        <Link href={`/tours`} className="link">See all</Link>
      </div>
    </>
  );
}
