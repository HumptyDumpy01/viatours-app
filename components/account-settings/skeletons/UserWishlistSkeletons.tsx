// 'use client';

/*type UserWishlistItemsType = {
  // children: ReactNode;
}*/

import UserWishlistSkeleton from '@/components/account-settings/skeletons/UserWishlistSkeleton';

export default function UserWishlistItemsSkeletons(/*{  }: UserWishlistItemsType*/) {
  return (
    <div className={`wishlist-items-skeleton grid`}>
      <UserWishlistSkeleton />
      <UserWishlistSkeleton />
      <UserWishlistSkeleton />
      <UserWishlistSkeleton />
    </div>
  );
}
