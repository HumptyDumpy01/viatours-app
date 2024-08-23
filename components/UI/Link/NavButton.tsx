'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type NavButtonInterface = {
  pathname: string;
  children: ReactNode;
  marked?: `true` | `false`;
} & ComponentPropsWithoutRef<'a'>;

export default function NavButton(props: NavButtonInterface) {
  // @ts-ignore
  const currentPath = usePathname();

  const isActive = currentPath === props.pathname;

  return (
    <motion.div
      whileHover={{ scale: 1.2, color: `#EB662B` }}
      whileTap={{ scale: 0.9 }}
    >
      <Link {...props} href={props.pathname}
            className={`link navigation__link text-decoration-none ${((isActive && props.pathname !== `/login`) && !props.marked) ? 'active' : ''} 
            ${props.marked === `true` ? 'link-marked link-log-in' : ''}`}>
        {props.children}
      </Link>
    </motion.div>
  );
}