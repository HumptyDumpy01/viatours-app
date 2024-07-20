// 'use client';

/*type SkeletonPageNavType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonPageNavType = {
  width: number;
  height: number;
  amount: number;
  // children: ReactNode;
}

export default function SkeletonPageNav({ amount, height, width }: SkeletonPageNavType) {
  return (
    <div style={{ display: 'flex', gap: `1rem` }}>
      {[...Array(amount)].map((_, index) => (
        <Skeleton key={index} variant="text" sx={{ fontSize: '1rem', width, height }} />
      ))}
    </div>
  );
}
