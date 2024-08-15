'use client';
import closeMenuIcon from '@/assets/images/homepage/close-menu.svg';
import Image from 'next/image';
import './MainNavigation.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { navigationSliceActions } from '@/store/navigationSlice';
import NavBurgerLink from '@/components/UI/Link/NavBurgerLink';
import { signOut, useSession } from 'next-auth/react';

/*interface NavigationBurgerInterface {
  // children: ReactNode;
}*/
export default function NavigationBurger(/*{  }: NavigationBurgerInterface*/) {
  const isOpen = useCartSelector((state) => state.navigation.navIsOpen);
  const dispatch = useCartDispatch();

  const { data: session, status } = useSession();

  function handleCloseNavigation() {
    dispatch(navigationSliceActions.toggleNavigation(`close`));
  }

  return (
    <div className="navigation-background" id={isOpen ? 'nav-open' : ''} onClick={handleCloseNavigation}>
      <ul className="navigation-background__list" id={isOpen ? `nav-list-open` : ''}>
        <li>
          <NavBurgerLink pathname={`/`}>Home</NavBurgerLink>
        </li>
        <li>
          <NavBurgerLink pathname={`/tours`}>All Tours</NavBurgerLink>
        </li>
        <li>
          <NavBurgerLink pathname={`/articles`}>Tour Articles</NavBurgerLink>
        </li>
        <li>
          {/*<NavBurgerLink pathname={`/account-settings?page=wishlist`}>Wishlist</NavBurgerLink>*/}
          <a className={`burger-link`}
             href="/account-settings?page=wishlist">Wishlist</a>
        </li>
        {session && (
          <>
            <li>
              <NavBurgerLink onMouseUp={() => signOut()} marked={`true`} pathname={``}>Log Out</NavBurgerLink>
            </li>
          </>
        )}
        {!session && (
          <li>
            <NavBurgerLink marked={`true`} pathname={`/login`}>Log in</NavBurgerLink>
          </li>
        )}
      </ul>
      <Image priority src={closeMenuIcon} alt="close menu icon" className="navigation-background-close-icon" />
    </div>
  );
}
