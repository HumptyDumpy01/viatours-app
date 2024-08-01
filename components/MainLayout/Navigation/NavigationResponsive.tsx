'use client';

import headerLogo from '@/assets/images/homepage/navigation/logo-1.svg';
import friesMenuImg from '@/assets/images/homepage/fries-menu.png';
import closeMenuImg from '../../../assets/images/homepage/close-menu.svg';
import userIcon from '../../../assets/images/homepage/user-icon.svg';
import './MainNavigation.scss';
import Image from 'next/image';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { navigationSliceActions } from '@/store/navigationSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/*interface NavigationBurgerInterface {
  // children: ReactNode;
}*/

export default function NavigationResponsive(/*{  }: NavigationBurgerInterface*/) {
  const isOpen = useCartSelector((state) => state.navigation.navIsOpen);
  const dispatch = useCartDispatch();

  function openNavBurger() {
    // console.log(`openNavBurger clicked`);
    dispatch(navigationSliceActions.toggleNavigation(`open`));
    // console.log(`Executing isOpen: `, isOpen);
  }

  function openSideNav() {
    // console.log(`openSideNav clicked`);
    dispatch(navigationSliceActions.toggleSideNavigation(`open`));
  }

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    const stickyThreshold = window.innerHeight * 2;
    setIsSticky(position > stickyThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <div className={`navigation__responsive ${isSticky ? `navigation__responsive--sticky` : undefined}`}>
        <div className="navigation__menu-container">
          <Image width={120} height={120} src={friesMenuImg} alt="menu icon"
                 className={`nav-icon nav-icon--menu-icon`} onClick={openNavBurger} />
          <Image priority src={closeMenuImg} alt="close menu icon"
                 className={`nav-icon nav-icon--close-menu-icon`} />
        </div>
        <Link href={`/`}>
          <Image priority src={headerLogo} alt="viatours logo" className={`logo navigation__logo`} />
        </Link>
        <div className="nav-icon-wrapper flex flex-align-center">
          {/* @ts-ignore*/}
          {/*<ion-icon name="search-outline" className="nav-icon nav-icon--search"></ion-icon>*/}
          <button className={`btn`} onClick={openSideNav}>
            <Image priority src={userIcon} alt="user icon" className={`nav-icon nav-icon--user-icon`} />
          </button>
        </div>
      </div>
    </>
  );
}
