// 'use client';

/*type SkeletonRatingType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonRatingType = {
  extraInfo?: boolean;
}

export default function SkeletonRating({ extraInfo }: SkeletonRatingType) {
  return (
    <>
      <div style={{
        display: 'flex',
        gap: '4rem',
        marginTop: `4rem`
      }}>
        <div style={{ display: 'flex', gap: '.5rem', alignItems: `center` }}>
          <Skeleton variant="circular" width={14} height={14} />
          <Skeleton variant="circular" width={14} height={14} />
          <Skeleton variant="circular" width={14} height={14} />
          <Skeleton variant="circular" width={14} height={14} />
          <Skeleton variant="circular" width={14} height={14} />
          <div style={{ display: 'flex', gap: `.5rem` }}>
            <Skeleton
              animation="wave"
              height={13}
              width="3rem"
            />
            <Skeleton
              animation="wave"
              height={13}
              width="3rem"
            />
          </div>
        </div>
        {extraInfo && (
          <>
            <div>
              <Skeleton variant="rounded" width={70} height={11} />
            </div>
            <div>
              <Skeleton variant="rounded" width={70} height={11} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
