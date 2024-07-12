// 'use client';
import './FindPopularTours.scss';
import Link from 'next/link';
/*interface FindPopularHeadingInterface {
  // children: ReactNode;
}*/
export default function FindPopularHeading(/*{  }: FindPopularHeadingInterface*/) {
  return (
    <>
      <span className="subheading inline-block margin-bottom-small">top destinations</span>
      <div className="find-popular-tours-heading-wrapper flex flex-space-between flex-align-center">
        <h2 className="secondary-heading find-popular-tours__heading heading-scale-effect">Find Popular Tours</h2>
        <Link href={`/tours`} className="link">See all</Link>
      </div>
    </>
  );
}
