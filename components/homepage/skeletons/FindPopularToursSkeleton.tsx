// 'use client';

/*type FindPopularToursSkeletonType = {
  // children: ReactNode;
}*/

import SkeletonCardFull from '@/components/skeletons/Card/SkeletonCardFull';

export default function FindPopularToursSkeleton(/*{  }: FindPopularToursSkeletonType*/) {
  return (
    <>
      <div className="find-popular-tours__tours-wrapper flex">
        <div className="find-popular-tours__figure-wrapper--1">
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
          <SkeletonCardFull />
        </div>
      </div>
    </>
  );
}
