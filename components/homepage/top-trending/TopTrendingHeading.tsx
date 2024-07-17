// 'use client';
import './TopTrending.scss';
import Link from 'next/link';

interface TopTrendingHeadingInterface {
  heading: string;
  href?: string;
  // children: ReactNode;
}

export default function TopTrendingHeading({ heading, href }: TopTrendingHeadingInterface) {
  return (
    <div className="top-trending__heading-wrapper container flex flex-space-between">
      <h2 className="secondary-heading top-trending-heading heading-scale-effect">{heading}</h2>
      {href &&
        <Link href={href} className="link">See all</Link>
      }
    </div>
  );
}
