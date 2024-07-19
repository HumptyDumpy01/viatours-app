// 'use client';
import './TopTrending.scss';
import Link from 'next/link';

interface TopTrendingHeadingInterface {
  subheading?: string;
  heading: string;
  href?: string;
  // children: ReactNode;
}

export default function TopTrendingHeading({ heading, subheading, href }: TopTrendingHeadingInterface) {
  return (
    <>
      <div>
        <div className="top-trending__heading-wrapper container flex flex-space-between">
          <div>
            {subheading && (
              <span className={`subheading inline-block`}>{subheading}</span>
            )}
            <h2 className="secondary-heading margin-top-big top-trending-heading heading-scale-effect">{heading}</h2>
          </div>
          {href &&
            <Link href={href} className="link">See all</Link>
          }
        </div>
      </div>
    </>
  );
}
