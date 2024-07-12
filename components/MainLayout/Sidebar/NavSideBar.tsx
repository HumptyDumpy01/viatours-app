'use client';

// import userIcon from '@/assets/images/userActionsSidebar/user-icon.svg';
import closeIcon from '../../../assets/images/homepage/grab-up-banner/close-icon.svg';
import './NavSidebar.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { navigationSliceActions } from '@/store/navigationSlice';
import Link from 'next/link';
import SidebarLink from '@/components/UI/Link/SidebarLink';
import Image from 'next/image';

/*interface NavSideBarInterface {
  // children: ReactNode;
}*/
export default function NavSideBar(/*{  }: NavSideBarInterface*/) {
  const sideNavOpen = useCartSelector((state) => state.navigation.sideNavIsOpen);
  const dispatch = useCartDispatch();

  function handleCloseSidebar() {
    dispatch(navigationSliceActions.toggleSideNavigation(`close`));
  }

  return (
    <>
      <aside className="user-actions-sidebar" id={sideNavOpen ? `sidebar-open` : ``}>
        <div className="user-actions-sidebar__shape"></div>
        <div onClick={handleCloseSidebar}>
          <Image src={closeIcon} alt="close icon" className="user-actions-sidebar__close-btn" />
        </div>

        {/*<img src={userIcon.src} alt="user icon" className="user-actions-sidebar__user-icon" />*/}
        <div className="user-actions-sidebar__user-icon">
          N.B
        </div>
        <Link
          onClick={handleCloseSidebar}
          type="button"
          className="user-actions-sidebar__log-in-sign-up side-bar-link"
          href={`/log-in`}>Log in
        </Link>
        <div className="user-actions-sidebar__actions-container">
          <SidebarLink disabled label={`Viatours Rewards`} type={`reward`} pathName={``} />
          <SidebarLink label={`Wishlist`} type={`orange-heart`} pathName={`/account-settings/wishlist`} />
          <SidebarLink label={`Saved Articles`} type={`purple-heart`} pathName={`/account-settings/saved-articles`} />
          <SidebarLink label={`Account Settings`} type={`settings`} pathName={`/account-settings/`} />
          <SidebarLink disabled label={``} type={`language`} pathName={``} />
          <SidebarLink disabled label={``} type={`currency`} pathName={``} />
        </div>
      </aside>
      <div className="user-actions-sidebar-background"></div>
    </>
  );
}
