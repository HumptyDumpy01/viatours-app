// 'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import './NavBurgerLink.scss';
import '../Header/Navigation/MainNavigation.scss';

interface NavBurgerLinkInterface {
  pathName: string;
  marked?: boolean;
  children: ReactNode;
}

export default function NavBurgerLink(props: NavBurgerLinkInterface) {
  return (
    <li>
      <Link className={`burger-link ${props.marked ? `link-marked` : ``}`} href={props.pathName}>{props.children}</Link>
    </li>
  );
}
