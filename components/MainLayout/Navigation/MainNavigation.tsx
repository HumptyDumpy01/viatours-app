import Image from 'next/image';
import headerLogo from '@/assets/images/homepage/navigation/logo-1.svg';
import './MainNavigation.scss';
import NavButton from '@/components/UI/Link/NavButton';
import NavigationResponsive from '@/components/MainLayout/Navigation/NavigationResponsive';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Skeleton } from '@mui/material';

// 'use client';

/*interface MainNavigationInterface {
  // children: ReactNode;
}*/
export default function MainNavigation(/*{  }: MainNavigationInterface*/) {

  const { data: session, status } = useSession();

  let userName = '';
  if (session) {
    const name = session.user?.name?.split(' ');
    userName = name?.length === 1 ? name[0].charAt(0).toUpperCase() : `${name![0].charAt(0) + `.`}${name![1].charAt(0)}`.toUpperCase();
  }

  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    const position = window.scrollY;
    const stickyThreshold = window.innerHeight * 0.35;
    setIsSticky(position > stickyThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries());
    // resetting the form
    currObject.reset();
    // output
    // console.log(results);
    // redirect to the search page
    router.push(`/tours?filter-search=${results.searchTerm}`);
  }


  return (
    <nav className={`navigation container ${isSticky ? `sticky` : undefined}`}>
      <div className={`navigation__ul flex`}>
        <div className={`navigation-wrapper flex flex-align-center`}>
          <Link href={`/`}>
            <Image priority src={headerLogo} alt="viatours logo" className={`logo navigation__logo`} />
          </Link>
          <form onSubmit={handleSubmit}>
            <label>
              <input type="search" name={`searchTerm`} className={`navigation--search`}
                     placeholder="Search destinations or activities" />
            </label>
          </form>
          <div className={`navigation--search-wrapper`}>

            <svg className={`icon--search icon ${isSticky ? `icon--search-sticky` : ``}`}
                 xmlns="http://www.w3.org/2000/svg" width="20"
                 height="19"
                 viewBox="0 0 20 19"
                 fill="none">
              <path
                d="M14.9622 14.8319L18.2999 18.1695M17.3365 9.04623C17.3365 13.5835 13.6705 17.2614 9.14951 17.2614C4.62743 17.2614 0.961426 13.5835 0.961426 9.04732C0.961426 4.50789 4.62743 0.831055 9.14843 0.831055C13.6705 0.831055 17.3365 4.50898 17.3365 9.04623Z"
                stroke="#EB662B" strokeWidth="1.62548" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className={`navigation-wrapper-2 flex flex-align-center`}>
          <NavButton pathname={`/`}>Home</NavButton>
          <NavButton pathname={`/tours`}>All Tours</NavButton>
          <NavButton pathname={`/articles`}>Tour Articles</NavButton>
          <NavButton pathname={`/account-settings/wishlist`}>Wishlist</NavButton>
          {/*@ts-ignore*/}
          {(session && status !== `loading`) && (
            <>
              <NavButton onClick={() => signOut()} marked={`true`} pathname={`/`}>Log Out</NavButton>
            </>
          )}
          {/* @ts-ignore*/}
          {(!session && status !== `loading`) && (
            <>
              <NavButton marked={'true'} pathname={`/login`}>Log in</NavButton>
            </>
          )}
          {status === `loading` && (
            <Skeleton variant={`rectangular`} width={`8rem`} height={`4.4rem`} sx={{ borderRadius: `1000px` }} />
          )}
        </div>
      </div>
      <NavigationResponsive />
    </nav>
  );
}
