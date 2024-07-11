'use client';

import './Header.scss';
import MainNavigation from '@/components/MainLayout/Navigation/MainNavigation';
import store from '@/store/store';
import { Provider } from 'react-redux';
import NavigationBurger from '@/components/MainLayout/Navigation/NavigationBurger';
import React from 'react';
import NavSideBar from '@/components/MainLayout/Sidebar/NavSideBar';

/*interface HeaderInterface {
  // children: ReactNode;
}*/

export default function Header(/*{  }: HeaderInterface*/) {
  return (
    <>
      <Provider store={store}>
        <header className={`header`}>
          <MainNavigation />
        </header>
        <div className={`header-placeholder`}></div>
        <NavigationBurger />
        <NavSideBar />
      </Provider>
    </>
  );
}
