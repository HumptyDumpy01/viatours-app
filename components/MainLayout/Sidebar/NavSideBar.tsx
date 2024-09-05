// 'use client';

import userIcon from '@/assets/images/user-icon.svg';
import './NavSidebar.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import SidebarLink from '@/components/UI/Link/SidebarLink';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import SidebarBtn from '@/components/UI/Button/SidebarLink';
import CloseBtn from '@/components/UI/Button/CloseBtn';
import Link from 'next/link';

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
    // console.log(`Session: `, session);
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
              {/*{session?.user?.image &&*/}
              {/*  <img className={`user-actions-sidebar-logo`} width={55} height={55} src={session.user.image}*/}
              {/*       alt="user icon" />}*/}
              {/*{!session?.user?.image &&*/}
              {userName}
              {/*}*/}
            </div>
            <SidebarBtn onMouseUp={() => signOut()} label={`Sign Out`} href={``} />
          </>
        )}
        <div className="user-actions-sidebar__actions-container">
          <SidebarLink disabled label="Viatours Rewards" type="reward" pathName="" />

          <div
            className={`user-actions-sidebar__actions-element flex flex-align-center gap-sm }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
              <g clipPath="url(#clip0_729_5404)">
                <path
                  d="M15.7008 4.74822C15.7008 9.70226 8.56522 13.7122 8.26134 13.8778C8.18125 13.9222 8.09173 13.9454 8.00078 13.9454C7.90984 13.9454 7.82031 13.9222 7.74022 13.8778C7.43634 13.7122 0.300781 9.70226 0.300781 4.74822C0.302055 3.58489 0.751548 2.46958 1.55065 1.64698C2.34974 0.824376 3.43319 0.361663 4.56328 0.360352C5.98297 0.360352 7.22597 0.988807 8.00078 2.0511C8.77559 0.988807 10.0186 0.360352 11.4383 0.360352C12.5684 0.361663 13.6518 0.824376 14.4509 1.64698C15.25 2.46958 15.6995 3.58489 15.7008 4.74822Z"
                  fill="#EB662B" />
              </g>
              <defs>
                <clipPath id="clip0_729_5404">
                  <rect width="16" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <a className={`user-actions-sidebar__actions-link`}
               href="/account-settings?page=wishlist">Wishlist</a>
          </div>
          {/*<SidebarLink label="Wishlist" type="orange-heart" pathName="/account-settings?page=wishlist" />*/}

          <div
            className={`user-actions-sidebar__actions-element flex flex-align-center gap-sm }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
              <g clipPath="url(#clip0_729_5404)">
                <path
                  d="M15.7008 4.74822C15.7008 9.70226 8.56522 13.7122 8.26134 13.8778C8.18125 13.9222 8.09173 13.9454 8.00078 13.9454C7.90984 13.9454 7.82031 13.9222 7.74022 13.8778C7.43634 13.7122 0.300781 9.70226 0.300781 4.74822C0.302055 3.58489 0.751548 2.46958 1.55065 1.64698C2.34974 0.824376 3.43319 0.361663 4.56328 0.360352C5.98297 0.360352 7.22597 0.988807 8.00078 2.0511C8.77559 0.988807 10.0186 0.360352 11.4383 0.360352C12.5684 0.361663 13.6518 0.824376 14.4509 1.64698C15.25 2.46958 15.6995 3.58489 15.7008 4.74822Z"
                  fill="#4A43C4" />
              </g>
              <defs>
                <clipPath id="clip0_729_5404">
                  <rect width="16" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <a className={`user-actions-sidebar__actions-link`}
               href="/account-settings?page=saved-articles">Saved Articles</a>
          </div>
          {/*<SidebarLink label="Saved Articles" type="purple-heart" pathName="/account-settings?page=saved-articles" />*/}
          {/*<SidebarLink label="Account Settings" type="settings" pathName="/account-settings?page=profile" />*/}

          <div
            className={`user-actions-sidebar__actions-element flex flex-align-center gap-sm }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path
                d="M37 8H11C9.89543 8 9 8.89543 9 10V42C9 43.1046 9.89543 44 11 44H37C38.1046 44 39 43.1046 39 42V10C39 8.89543 38.1046 8 37 8Z"
                stroke="#EB662B" strokeWidth="4" strokeLinejoin="round" />
              <path d="M18 4V10M30 4V10M16 19H32M16 27H28M16 35H24" stroke="#EB662B" strokeWidth="4"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link className={`user-actions-sidebar__actions-link`}
                  href={`/track-order`}>Track Order</Link>
          </div>

          <div
            className={`user-actions-sidebar__actions-element flex flex-align-center gap-sm }`}>
            <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.9497 8.78334C13.9831 8.53334 13.9997 8.275 13.9997 8C13.9997 7.73334 13.9831 7.46667 13.9414 7.21667L15.6331 5.9C15.706 5.83992 15.7558 5.75642 15.774 5.66373C15.7922 5.57103 15.7778 5.47489 15.7331 5.39167L14.1331 2.625C14.086 2.54131 14.0107 2.47698 13.9208 2.44343C13.8308 2.40987 13.7318 2.40925 13.6414 2.44167L11.6497 3.24167C11.2331 2.925 10.7914 2.65834 10.2997 2.45834L9.99973 0.341669C9.98497 0.246277 9.93649 0.159342 9.86309 0.0966492C9.7897 0.0339567 9.69625 -0.000334587 9.59973 2.46116e-06H6.39973C6.19973 2.46116e-06 6.04139 0.141669 6.00806 0.341669L5.70806 2.45834C5.21639 2.65834 4.76639 2.93334 4.35806 3.24167L2.36639 2.44167C2.18306 2.375 1.97473 2.44167 1.87473 2.625L0.283059 5.39167C0.183059 5.56667 0.216393 5.78334 0.383059 5.9L2.07473 7.21667C2.03306 7.46667 1.99973 7.74167 1.99973 8C1.99973 8.25834 2.01639 8.53334 2.05806 8.78334L0.366393 10.1C0.293496 10.1601 0.243687 10.2436 0.225453 10.3363C0.207219 10.429 0.221687 10.5251 0.266393 10.6083L1.86639 13.375C1.96639 13.5583 2.17473 13.6167 2.35806 13.5583L4.34973 12.7583C4.76639 13.075 5.20806 13.3417 5.69973 13.5417L5.99973 15.6583C6.04139 15.8583 6.19973 16 6.39973 16H9.59973C9.79973 16 9.96639 15.8583 9.99139 15.6583L10.2914 13.5417C10.7831 13.3417 11.2331 13.075 11.6414 12.7583L13.6331 13.5583C13.8164 13.625 14.0247 13.5583 14.1247 13.375L15.7247 10.6083C15.8247 10.425 15.7831 10.2167 15.6247 10.1L13.9497 8.78334ZM7.99973 11C6.34973 11 4.99973 9.65 4.99973 8C4.99973 6.35 6.34973 5 7.99973 5C9.64973 5 10.9997 6.35 10.9997 8C10.9997 9.65 9.64973 11 7.99973 11Z"
                fill="#EB662B" />
            </svg>
            <a className={`user-actions-sidebar__actions-link`}
               href="/account-settings?page=profile">Account Settings</a>
          </div>
          <SidebarLink disabled label="" type="language" pathName="" />
          <SidebarLink disabled label="" type="currency" pathName="" />
        </div>
      </aside>
      <div className="user-actions-sidebar-background"></div>
    </>
  );
}