// 'use client';
import '@/components/tours/figures/Figures.scss';
import classes from './SkeletonCardHorizontal.module.scss';
/*type SkeletonCardHorizontalType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import React from 'react';

export default function SkeletonCardHorizontal(/*{  }: SkeletonCardHorizontalType*/) {
  return (
    <>
      <div className="all-tours__content__figures__figure-wrapper" id={classes[`skeleton-card-horizontal`]}>
        <div className={classes[`skeleton-card-horizontal-img`]}>
          <Skeleton sx={{
            width: '28rem',
            height: '28rem',
            // add media query for smaller screens
            '@media (max-width: 66.4375em)': {
              width: '33rem',
              height: '35rem',
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            },
            '@media (max-width: 58.375em)': {
              width: '50rem',
              height: '40rem'
            },
            '@media (max-width: 40.6875em)': {
              width: '100%'
            }
          }} variant="rectangular" animation={`wave`} className={classes[`skeleton-card-horizontal-img`]} />
        </div>
        {/*<div className={classes[`skeleton-details-container`]}>*/}

        {/*</div>*/}
        <div className={classes[`skeleton-details-container`]}>
          <Skeleton className={classes[`subheading`]} />
          <Skeleton className={classes[`title`]} />
          <div className={classes[`stars-container`]}>
            <Skeleton variant="circular" width={17} height={17} />
            <Skeleton variant="circular" width={17} height={17} />
            <Skeleton variant="circular" width={17} height={17} />
            <Skeleton variant="circular" width={17} height={17} />
            <Skeleton variant="circular" width={17} height={17} />
            <Skeleton variant="rounded" width={40} height={17} />
          </div>
          <div className={classes[`description-container`]}>
            <Skeleton animation={`wave`} className={classes[`description-text-1`]} />
            <Skeleton animation={`wave`} className={classes[`description-text-2`]} />
            <Skeleton animation={`wave`} className={classes[`description-text-3`]} />
          </div>
          <div className={classes[`badges-container`]}>
            <Skeleton
              animation={`wave`}
              height={30}
              width={`15rem`}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation={`wave`}
              height={30}
              width={`10rem`}
              style={{ marginBottom: 6 }}
            />
          </div>
        </div>
        <div className={classes[`center-container`]}>
          <Skeleton className={classes[`day-badge`]} />
          <div className={classes[`center-container`]}>
            <Skeleton sx={{
              width: '7rem',
              height: '3rem'
            }} />

            <Skeleton sx={{
              width: '10rem',
              height: '3rem'
            }} />

            <Skeleton className={classes[`btn`]} />
          </div>
        </div>
      </div>
    </>
  );
}
