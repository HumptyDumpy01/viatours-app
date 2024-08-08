'use client';

import './Header.scss';
import MainNavigation from '@/components/MainLayout/Navigation/MainNavigation';
import NavigationBurger from '@/components/MainLayout/Navigation/NavigationBurger';
import React, { useEffect, useState } from 'react';
import NavSideBar from '@/components/MainLayout/Sidebar/NavSideBar';
import { SessionProvider } from 'next-auth/react';

/*interface HeaderInterface {
  // children: ReactNode;
}*/

export default function Header(/*{  }: HeaderInterface*/) {

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
    <SessionProvider>
      <header className={`header ${isSticky ? `sticky` : undefined}`}>
        <MainNavigation />
      </header>
      <div className={`header-placeholder`}></div>
      <NavigationBurger />
      <NavSideBar />
    </SessionProvider>
  );
}
