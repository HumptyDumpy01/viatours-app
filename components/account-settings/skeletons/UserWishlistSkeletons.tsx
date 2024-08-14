// 'use client';

/*type UserWishlistItemsType = {
  // children: ReactNode;
}*/

import UserWishlistSkeleton from '@/components/account-settings/skeletons/UserWishlistSkeleton';
import { useEffect, useState } from 'react';

export default function UserWishlistItemsSkeletons(/*{  }: UserWishlistItemsType*/) {

  const [applyJustifyCenter, setApplyJustifyCenter] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 570) {
      setApplyJustifyCenter(true);
    } else {
      setApplyJustifyCenter(false);
    }
  }, []);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 570) {
      setApplyJustifyCenter(true);
    } else {
      setApplyJustifyCenter(false);
    }
  });

  return (
    <div className={`wishlist-items grid ${applyJustifyCenter ? `justify-items-center` : ``}`}>
      <UserWishlistSkeleton />
      <UserWishlistSkeleton />
      <UserWishlistSkeleton />
      <UserWishlistSkeleton />
    </div>
  );
}
