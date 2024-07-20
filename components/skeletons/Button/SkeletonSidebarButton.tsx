// 'use client';

/*type SkeletonSidebarButtonType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

export default function SkeletonSidebarButton(/*{  }: SkeletonSidebarButtonType*/) {
  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <Skeleton variant="circular" width={14} height={14} />
        <Skeleton variant="rounded" width={10} height={13} />
        <Skeleton variant="circular" width={14} height={14} />
      </div>
    </>
  );
}
