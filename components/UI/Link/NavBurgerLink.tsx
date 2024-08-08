'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import './NavBurgerLink.scss';
import '@/components/MainLayout/Navigation/MainNavigation.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { navigationSliceActions } from '@/store/navigationSlice';
import { usePathname } from 'next/navigation';

interface NavBurgerLinkInterface {
  pathname: string;
  marked?: `true` | `false`;
  children: ReactNode;
}

export default function NavBurgerLink(props: NavBurgerLinkInterface) {

  const isOpen = useCartSelector((state) => state.navigation.navIsOpen);
  const dispatch = useCartDispatch();
  // @ts-ignore
  const currentPath = usePathname();

  const isActive = currentPath === props.pathname;

  function handleCloseNavigation() {
    dispatch(navigationSliceActions.toggleNavigation(`close`));
  }

  return (
    <Link onClick={handleCloseNavigation}
          className={`burger-link ${(isActive && props.pathname !== `/login`) ? `active` : ``} ${props.marked === `true` ? `link-marked` : ``}`}
          href={props.pathname}>{props.children}</Link>
  );
}
