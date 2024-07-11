// 'use client';

import headerLogo from '@/assets/images/navigation/logo-1.svg';
import friesMenuImg from '@/assets/images/fries-menu.png';
import closeMenuImg from '@/assets/images/close-menu.svg';
import userIcon from '@/assets/images/user-icon.svg';
import './MainNavigation.scss';
import Image from 'next/image';

/*interface NavigationBurgerInterface {
  // children: ReactNode;
}*/

export default function NavigationResponsive(/*{  }: NavigationBurgerInterface*/) {
  return (
    <>
      <div className="navigation__responsive">
        <div className="navigation__menu-container">
          <Image width={120} height={120} src={friesMenuImg} alt="menu icon"
                 className={`nav-icon nav-icon--menu-icon`} />
          <Image priority src={closeMenuImg} alt="close menu icon"
                 className={`nav-icon nav-icon--close-menu-icon`} />
        </div>
        <Image priority src={headerLogo} alt="viatours logo" className={`logo navigation__logo`} />
        <div className="nav-icon-wrapper flex flex-align-center">
          {/* @ts-ignore*/}
          <ion-icon name="search-outline" className="nav-icon nav-icon--search"></ion-icon>
          <Image priority src={userIcon} alt="user icon" className={`nav-icon nav-icon--user-icon`} />
        </div>
      </div>
    </>
  );
}
