// 'use client';

import { ReactNode } from 'react';

interface SidebarLinkInterface {
  type: `reward` | `wishlist` | `purple-heart` | `orange-heart` | `settings`;
  children: ReactNode;
}

export default function SidebarLink({}: SidebarLinkInterface) {
  return (
    <>
    </>
  );
}
