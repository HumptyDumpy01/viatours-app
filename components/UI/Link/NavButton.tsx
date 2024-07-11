// 'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface NavButtonInterface {
  pathName: string;
  children: ReactNode;
  marked?: boolean;
}

export default function NavButton(props: NavButtonInterface) {
  return (
    <Link href={props.pathName}
          className={`link navigation__link ${props.marked ? `link-marked  link-log-in` : ``}`}>{props.children}</Link>
  );
}
