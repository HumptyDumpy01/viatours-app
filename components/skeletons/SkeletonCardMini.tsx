// 'use client';

/*type SkeletonCardMiniType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';
import classes from './SkeletonCardMini.module.scss';

export default function SkeletonCardMini(/*{  }: SkeletonCardMiniType*/) {
  return (
    <>
      <div className={classes[`skeleton-mini-container`]}>
        <Skeleton variant="circular" width={100} animation={`wave`} height={100} sx={{ marginBottom: `1rem` }} />
        <Skeleton variant="text" sx={{ fontSize: '1.7rem', height: `20px`, width: `80px` }} />
        <Skeleton variant="text" sx={{ fontSize: '1.4rem', height: `15px`, width: `60px` }} />
      </div>
    </>
  );
}
