// 'use client';
import '@/app/tours/page.scss';
import { Fragment } from 'react';
import Link from 'next/link';

type PageNavigationType = {
  links: {
    href: string;
    label: string;
  }[]
  subheading: string;
  // children: ReactNode;
}

export default function PageNavigation({ links, subheading }: PageNavigationType) {
  return (
    <>
      <div className="all-tours__navigation__wrapper flex flex-align-center flex-space-between">
        <div className="all-tours__navigation">
          {links.map((link, index) =>
            <Fragment key={index}>
              <Link href={link.href} className="all-tours__navigation__second--span">{link.label}</Link>
              {index < links.length - 1 && <span>&gt; &nbsp;</span>
              }
            </Fragment>
          )}
        </div>
        <div className="all-tours__navigation__second">
          <span className="all-tours__navigation__second--span">{subheading}</span>
        </div>
      </div>
    </>
  );
}
