'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonInterface {
  pathName: string;
  children: ReactNode;
  marked?: boolean;
}

export default function NavButton(props: NavButtonInterface) {
  // @ts-ignore
  const currentPath = usePathname();

  const isActive = currentPath === props.pathName;

  return (
    <Link href={props.pathName}
          className={`link navigation__link ${isActive ? 'active' : ''} ${props.marked ? 'link-marked link-log-in' : ''}`}>
      {props.children}
    </Link>
  );
}