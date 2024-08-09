// 'use client';

import userIcon from '@/assets/images/user-icon.svg';
import './NavSidebar.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import SidebarLink from '@/components/UI/Link/SidebarLink';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import SidebarBtn from '@/components/UI/Button/SidebarLink';
import CloseBtn from '@/components/UI/Button/CloseBtn';

export default function NavSideBar() {
  const sideNavOpen = useCartSelector((state) => state.navigation.sideNavIsOpen);
  const dispatch = useCartDispatch();


  const { data: session, status } = useSession();

  let userName = '';
  if (session) {
    // username should consist of the first letter of the first name and the last name
    // even if the user has one word name
    const name = session.user?.name?.split(' ');
    userName = name?.length === 1 ? name[0].charAt(0).toUpperCase() : `${name![0].charAt(0) + `.`}${name![1].charAt(0)}`.toUpperCase();
    console.log(`Session: `, session);
  }


  return (
    <>
      <aside className="user-actions-sidebar" id={sideNavOpen ? 'sidebar-open' : ''}>
        <div className="user-actions-sidebar__shape"></div>
        <CloseBtn />

        {!session && (
          <>
            <Image width={100} height={100} src={userIcon.src} alt="user icon"
                   className="user-actions-sidebar__user-icon" />
            <SidebarBtn label={`Log in`} href={`/login`} />
          </>
        )}
        {session && (
          <>
            <div className="user-actions-sidebar__user-auth-icon">
              {session?.user?.image &&
                <img className={`user-actions-sidebar-logo`} width={55} height={55} src={session.user.image}
                     alt="user icon" />}
              {!session?.user?.image &&
                userName
              }
            </div>
            <SidebarBtn onMouseUp={() => signOut()} label={`Sign Out`} href={``} />
          </>
        )}
        <div className="user-actions-sidebar__actions-container">
          <SidebarLink disabled label="Viatours Rewards" type="reward" pathName="" />
          <SidebarLink label="Wishlist" type="orange-heart" pathName="/account-settings/wishlist" />
          <SidebarLink label="Saved Articles" type="purple-heart" pathName="/account-settings/saved-articles" />
          <SidebarLink label="Account Settings" type="settings" pathName="/account-settings/" />
          <SidebarLink disabled label="" type="language" pathName="" />
          <SidebarLink disabled label="" type="currency" pathName="" />
        </div>
      </aside>
      <div className="user-actions-sidebar-background"></div>
    </>
  );
}