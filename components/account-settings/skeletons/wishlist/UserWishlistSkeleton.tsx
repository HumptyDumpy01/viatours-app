// 'use client';

import { Skeleton } from '@mui/material';

/*type UserWishlistSkeletonType = {
  // children: ReactNode;
}*/

export default function UserWishlistSkeleton(/*{}: UserWishlistSkeletonType*/) {
  return (
    <div
      className="wishlist-items__item-skeleton">
      <div className="wishlist-items__img-wrapper">
        <Skeleton variant="rectangular" className={`wishlist-items__img-skeleton`} />
      </div>
      <div className="wishlist-items__info-wrapper">
        <div className="wishlist-items__info-location flex flex-align-center">
          <Skeleton variant="circular" width={20} height={20} />
          <span className="inline-block wishlist-items__info-location-span">
              <Skeleton variant="text" width={100} />
            </span>
        </div>
        <h2 className="wishlist-items__info-title">
          <Skeleton variant="text" width={200} />
        </h2>
        <div className="wishlist-items__info-rating flex flex-align-center">
          <div className={`flex gap-7px`}>
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="circular" width={16} height={16} />
          </div>
          <span className="inline-block wishlist-items__info-rating-rate">
              <Skeleton variant="text" width={40} />
          </span>
        </div>
        <div className="wishlist-items__info-price-and-duration flex flex-align-center flex-space-between">
            <span className="wishlist-items__info-duration">
              <Skeleton variant="text" width={100} />
            </span>
          <span className="wishlist-items__info-price">
              <Skeleton variant="text" width={70} />
            </span>
        </div>
      </div>
    </div>
  );
}
