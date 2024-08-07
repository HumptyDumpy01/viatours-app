'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import './NavBurgerLink.scss';
import '@/components/MainLayout/Navigation/MainNavigation.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { navigationSliceActions } from '@/store/navigationSlice';
import { usePathname } from 'next/navigation';

interface NavBurgerLinkInterface {
  pathName: string;
  marked?: boolean;
  children: ReactNode;
}

export default function NavBurgerLink(props: NavBurgerLinkInterface) {

  const isOpen = useCartSelector((state) => state.navigation.navIsOpen);
  const dispatch = useCartDispatch();
  // @ts-ignore
  const currentPath = usePathname();

  const isActive = currentPath === props.pathName;

  function handleCloseNavigation() {
    dispatch(navigationSliceActions.toggleNavigation(`close`));
  }

  return (
    <Link onClick={handleCloseNavigation}
          className={`burger-link ${(isActive && props.pathName !== `/login`) ? `active` : ``} ${props.marked ? `link-marked` : ``}`}
          href={props.pathName}>{props.children}</Link>
  );
}
