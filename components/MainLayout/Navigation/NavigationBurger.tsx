'use client';
import closeMenuIcon from '@/assets/images/close-menu.svg';
import Image from 'next/image';
import './MainNavigation.scss';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { navigationSliceActions } from '@/store/navigationSlice';
import NavBurgerLink from '@/components/UI/NavBurgerLink';

/*interface NavigationBurgerInterface {
  // children: ReactNode;
}*/
export default function NavigationBurger(/*{  }: NavigationBurgerInterface*/) {
  const isOpen = useCartSelector((state) => state.navigation.navIsOpen);
  const dispatch = useCartDispatch();

  function handleCloseNavigation() {
    dispatch(navigationSliceActions.toggleNavigation(`close`));
  }

  return (
    <div className="navigation-background" id={isOpen ? 'nav-open' : ''} onClick={handleCloseNavigation}>
      <ul className="navigation-background__list" id={isOpen ? `nav-list-open` : ''}>
        <li>
          <NavBurgerLink pathName={`/tours`}>All Tours</NavBurgerLink>
        </li>
        <li>
          <NavBurgerLink pathName={`/articles`}>Tour Articles</NavBurgerLink>
        </li>
        <li>
          <NavBurgerLink pathName={`/account-settings/wishlist`}>Wishlist</NavBurgerLink>
        </li>
        <li>
          <NavBurgerLink pathName={`/sign-up`}>Sign up</NavBurgerLink>
        </li>
        <li>
          <NavBurgerLink marked pathName={`/log-in`}>Log in</NavBurgerLink>
        </li>
      </ul>
      <Image priority src={closeMenuIcon} alt="close menu icon" className="navigation-background-close-icon" />
    </div>
  );
}
