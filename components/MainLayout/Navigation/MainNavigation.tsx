import Image from 'next/image';
import headerLogo from '@/assets/images/navigation/logo-1.svg';
import './MainNavigation.scss';
import NavButton from '@/components/UI/NavButton';
import NavigationResponsive from '@/components/MainLayout/Navigation/NavigationResponsive';
import Link from 'next/link';

// 'use client';

/*interface MainNavigationInterface {
  // children: ReactNode;
}*/
export default function MainNavigation(/*{  }: MainNavigationInterface*/) {
  return (
    <nav className={`navigation container`}>
      <div className={`navigation__ul flex`}>
        <div className={`navigation-wrapper flex flex-align-center`}>
          <Link href={`/`}>
            <Image priority src={headerLogo} alt="viatours logo" className={`logo navigation__logo`} />
          </Link>
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
      <NavigationResponsive />
    </nav>
  );
}
