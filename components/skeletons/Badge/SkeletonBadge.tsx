// 'use client';

/*type SkeletonBadgeType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonBadgeType = {
  width: number;
  height: number;
  amount: number;
  // children: ReactNode;
}

export default function SkeletonBadge({ width, height, amount }: SkeletonBadgeType) {
  return (
    <div style={{ display: `flex`, gap: `1.3rem` }}> {[...Array(amount)].map((_, index) => (
      <Skeleton key={index} variant="rounded" sx={{ width, height, borderRadius: `100rem` }} />
    ))}
    </div>
  );
}
