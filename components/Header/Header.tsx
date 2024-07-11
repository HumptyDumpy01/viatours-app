'use client';

import './Header.scss';
import MainNavigation from '@/components/Header/Navigation/MainNavigation';
import store from '@/store/store';
import { Provider } from 'react-redux';
import NavigationBurger from '@/components/Header/Navigation/NavigationBurger';
import React from 'react';

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
      </Provider>
    </>
  );
}
