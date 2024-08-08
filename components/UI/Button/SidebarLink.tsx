'use client';

import { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { navigationSliceActions } from '@/store/navigationSlice';
import { useCartDispatch } from '@/store/hooks';

type SidebarLinkType = {
  href: string;
  label: string;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'a'>;

export default function SidebarBtn({ href, label, ...props }: SidebarLinkType) {

  const dispatch = useCartDispatch();

  function handleCloseSidebar() {
    dispatch(navigationSliceActions.toggleSideNavigation('close'));
  }

  return (
    <Link
      {...props}
      onClick={handleCloseSidebar}
      type="button"
      className="user-actions-sidebar__log-in-sign-up side-bar-link"
      href={href}
    >
      {label}
    </Link>
  );
}
