'use client';

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
import { AnimatePresence, motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
};

const item = {
  transition: { type: 'spring', stiffness: 100, damping: 10 },
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 }
};

/*interface MainNavigationInterface {
  // children: ReactNode;
}*/
export default function MainNavigation(/*{  }: MainNavigationInterface*/) {

  const { data: session, status } = useSession();

  let userName = '';
  if (session) {
    // console.log(`Current session: `, session);
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
    <AnimatePresence>
      <motion.nav
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`navigation container ${isSticky ? `sticky` : undefined}`}>
        <motion.div
          variants={item}
          className={`navigation__ul flex`}>
          <motion.div
            variants={item}
            className={`navigation-wrapper flex flex-align-center`}>
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05, transition: { type: `spring`, stiffness: 100, damping: 10 } }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`navigation--logo-wrapper`}>
              <Link href={`/`}>
                <Image priority src={headerLogo} alt="viatours logo" className={`logo navigation__logo`} />
              </Link>
            </motion.div>
            <motion.form
              variants={item}
              onSubmit={handleSubmit}>
              <label>
                <motion.input
                  variants={item}
                  whileFocus={{
                    scale: 1.02,
                    transition: { type: `spring`, duration: .3, stiffness: 300, damping: 20 }
                  }}
                  type="search"
                  name={`searchTerm`}
                  className={`navigation--search`}
                  placeholder="Search destinations or activities" />
              </label>
            </motion.form>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            transition={{ type: 'spring', stiffness: 100 }}
            className={`navigation-wrapper-2 flex flex-align-center`}>
            <NavButton pathname={`/`}>Home</NavButton>
            <NavButton pathname={`/tours`}>Tours</NavButton>
            <NavButton pathname={`/articles`}>Tour Articles</NavButton>
            <NavButton pathname={`/account-settings?page=wishlist`}>Wishlist</NavButton>
            {/*@ts-ignore*/}
            {(session && status !== `loading`) && (
              <NavButton onClick={() => signOut()} marked={`true`} pathname={`/`}>Log Out</NavButton>
            )}

            {/* @ts-ignore*/}
            {(!session && status !== `loading`) && (
              <NavButton marked={'true'} pathname={`/login`}>Log in</NavButton>
            )}

            {status === `loading` && (
              <motion.div
                variants={item}
              >
                <Skeleton variant={`rectangular`} width={`8rem`} height={`4.4rem`} sx={{ borderRadius: `1000px` }} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        <NavigationResponsive />
      </motion.nav>
    </AnimatePresence>
  );
}
