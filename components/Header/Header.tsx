import './Header.scss';
import MainNavigation from '@/components/Header/MainNavigation';
// 'use client';

/*interface HeaderInterface {
  // children: ReactNode;
}*/

export default function Header(/*{  }: HeaderInterface*/) {
  return (
    <>
      <header className={`header`}>
        <MainNavigation />
      </header>
      <div className={`header-placeholder`}></div>
    </>
  );
}
