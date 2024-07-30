// 'use client';

/*type NewestDestinationsSkeletonType = {
  // children: ReactNode;
}*/

import SkeletonCardMini from '@/components/skeletons/Card/SkeletonCardMini';

export default function NewestDestinationsSkeleton(/*{  }: NewestDestinationsSkeletonType*/) {
  return (
    <>
      <div className="trending-destinations-figure-wrapper container-trending-destinations flex">
        <SkeletonCardMini />
        <SkeletonCardMini />
        <SkeletonCardMini />
        <SkeletonCardMini />
        <SkeletonCardMini />
        <SkeletonCardMini />
        <SkeletonCardMini />
        <SkeletonCardMini />
        <SkeletonCardMini />
      </div>
    </>
  );
}
