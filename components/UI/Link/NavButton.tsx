'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavButtonInterface = {
  pathname: string;
  children: ReactNode;
  marked?: `true` | `false`;
} & ComponentPropsWithoutRef<'a'>;

export default function NavButton(props: NavButtonInterface) {
  // @ts-ignore
  const currentPath = usePathname();

  const isActive = currentPath === props.pathname;

  return (
    <Link {...props} href={props.pathname}
          className={`link navigation__link ${(isActive && props.pathname !== `/login`) ? 'active' : ''} ${props.marked === `true` ? 'link-marked link-log-in' : ''}`}>
      {props.children}
    </Link>
  );
}