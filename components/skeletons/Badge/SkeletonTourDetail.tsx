// 'use client';

/*type SkeletonTourDetailType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';

export default function SkeletonTourDetail(/*{  }: SkeletonTourDetailType*/) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Skeleton variant="circular" width={14} height={14} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem'
      }}>
        <Skeleton variant="rounded" width={50} height={10} />
        <Skeleton variant="rounded" width={50} height={10} />
      </div>
    </div>
  );
}
