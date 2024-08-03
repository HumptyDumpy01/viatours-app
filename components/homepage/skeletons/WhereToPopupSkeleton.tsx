// 'use client';

/*type WhereToPopupSkeletonType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';

export default function WhereToPopupSkeleton(/*{  }: WhereToPopupSkeletonType*/) {
  return (
    <div className={`where-to-popup-loading-screen`}>
      {/*<Lottie animationData={animationData} />*/}
      <div className="where-to-popup__element where-to-popup__element--location flex flex-align-center">
        {/*<div className="where-to-popup__location-icon-wrapper">*/}
        <div className="">
          <Skeleton animation={`wave`} variant={`rectangular`} width={`5.3rem`} height={`5.3rem`} sx={{
            borderRadius: `12px`
          }} />
        </div>
        <div className="where-to-popup__element__data">
          <Skeleton variant={`text`} width={`100%`} height={`2.9rem`} />
          <Skeleton variant={`text`} width={`20%`} height={`2rem`} />
        </div>
      </div>
    </div>
  );
}
