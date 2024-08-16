// 'use client';

import '@/components/account-settings/contents/user-tour-purchases/UserTourPurchases.scss';
import React from 'react';
import TourPurchasesCardSkeleton
  from '@/components/account-settings/skeletons/tour-purchases/TourPurchasesCardSkeleton';
/*type UserTourPurchasesSkeletonType = {
  // children: ReactNode;
}*/

export default function UserTourPurchasesSkeleton(/*{  }: UserTourPurchasesSkeletonType*/) {
  return (
    <>
      <div className="tour-purchases-skeleton">
        <div className="tour-purchases__heading-wrapper flex flex-space-between">
          <div className="tour-purchases__cards-wrapper">
            <TourPurchasesCardSkeleton />
            <TourPurchasesCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
