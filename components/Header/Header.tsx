import headerLogo from '@/assets/images/navigation/logo-1.svg';
import friesMenuImg from '@/assets/images/fries-menu.png';
import closeMenuImg from '@/assets/images/close-menu.svg';
import userIcon from '@/assets/images/user-icon.svg';
import './Header.scss';
import Image from 'next/image';
import NavButton from '@/components/UI/NavButton';

// 'use client';

/*interface HeaderInterface {
  // children: ReactNode;
}*/

export default function Header(/*{  }: HeaderInterface*/) {
  return (
    <>
      <header className={`header`}>
        <nav className={`navigation container`}>
          <div className={`navigation__ul flex`}>
            <div className={`navigation-wrapper flex flex-align-center`}>
              <Image priority src={headerLogo} alt="viatours logo" className={`logo navigation__logo`} />
              <label>
                <input type="search" className={`navigation--search`}
                       placeholder="Search destinations or activities" />
              </label>
              <div className={`navigation--search-wrapper`}>
                <svg className={`icon--search`} xmlns="http://www.w3.org/2000/svg" width="20" height="19"
                     viewBox="0 0 20 19"
                     fill="none">
                  <path
                    d="M14.9622 14.8319L18.2999 18.1695M17.3365 9.04623C17.3365 13.5835 13.6705 17.2614 9.14951 17.2614C4.62743 17.2614 0.961426 13.5835 0.961426 9.04732C0.961426 4.50789 4.62743 0.831055 9.14843 0.831055C13.6705 0.831055 17.3365 4.50898 17.3365 9.04623Z"
                    stroke="#EB662B" strokeWidth="1.62548" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className={`navigation-wrapper-2 flex flex-align-center`}>
              <NavButton pathName={`/tours`}>All Tours</NavButton>
              <NavButton pathName={`/articles`}>Tour Articles</NavButton>
              <NavButton pathName={`/account-settings/wishlist`}>Wishlist</NavButton>
              <NavButton pathName={`/sign-up`}>Sign up</NavButton>
              <NavButton marked pathName={`/log-in`}>Log in</NavButton>
            </div>
          </div>
          <div className={`navigation__responsive`}>
            <div className={`navigation__menu-container`}>
              <Image width={120} height={120} src={friesMenuImg} alt="menu icon"
                     className={`nav-icon nav-icon--menu-icon`} />
              <Image priority src={closeMenuImg} alt="close menu icon"
                     className={`nav-icon nav-icon--close-menu-icon`} />
            </div>
            <Image priority src={headerLogo} alt="viatours logo" className={`logo navigation__logo`} />
            <div className={`nav-icon-wrapper flex flex-align-center`}>
              {/*// @ts-ignore*/}
              <ion-icon name="search-outline" className={`nav-icon nav-icon--search`}></ion-icon>
              <Image priority src={userIcon} alt="user icon" className={`nav-icon nav-icon--user-icon`} />
            </div>
          </div>
        </nav>
      </header>
      <div className={`header-placeholder`}></div>
    </>
  );
}
