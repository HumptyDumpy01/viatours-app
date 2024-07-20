// 'use client';

/*type SkeletonExtraPriceType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

export default function SkeletonExtraPrice(/*{  }: SkeletonExtraPriceType*/) {
  return (
    <div style={{ marginBottom: `5rem` }}>
      <p className="paragraph paragraph--descr flex">
        <Skeleton variant="rounded" width={25} height={14} />
        <span><Skeleton variant="rounded" width={14} height={14} /></span>
        <Skeleton variant="rounded" width={25} height={14} />
        <span><Skeleton variant="rounded" width={14} height={14} /></span>
      </p>
    </div>
  );
}
