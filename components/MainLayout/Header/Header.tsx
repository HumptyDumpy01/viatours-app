'use client';

import './Header.scss';
import MainNavigation from '@/components/MainLayout/Navigation/MainNavigation';
import NavigationBurger from '@/components/MainLayout/Navigation/NavigationBurger';
import React, { useEffect, useState } from 'react';
import NavSideBar from '@/components/MainLayout/Sidebar/NavSideBar';

/*interface HeaderInterface {
  // children: ReactNode;
}*/

export default function Header(/*{  }: HeaderInterface*/) {

  /* IMPORTANT: USE CONDITION WHETHER THE isSticky true or not, and
  *   apply different styles for sticky nav
  *    e.g.  <header className={`header ${isSticky ? `sticky` : undefined}`}> */

  /*
  INFO: CSS STYLES NEEDED

  // added a sticky class to the navigation
  .sticky {
  position: fixed;
  height: 8rem;
  margin-top: -1rem;
  padding: 1.6rem 0 0 1.6rem;
  top: 0;
  z-index: 999;
  background-color: var(--clr-white);
  opacity: 0.97;

}*/

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
      <header className={`header ${isSticky ? `sticky` : undefined}`}>
        <MainNavigation />
      </header>
      <div className={`header-placeholder`}></div>
      <NavigationBurger />
      <NavSideBar />
    </>
  );
}
