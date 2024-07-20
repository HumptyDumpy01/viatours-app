// 'use client';

/*type SkeletonSecondaryHeadingType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonSecondaryHeadingType = {
  width: number | string;
  height: number | string;
  amount: number;
  marginTop?: number | string;
  marginBottom?: number | string;
}

export default function
  SkeletonSecondaryHeading({
                             marginTop,
                             amount,
                             height,
                             width,
                             marginBottom
                           }: SkeletonSecondaryHeadingType) {
  return (
    <h1 className={`secondary-heading`} style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      {[...Array(amount)].map((_, index) => (
        <Skeleton key={index} variant="rounded" width={width} height={height} />
      ))}
      {/*<Skeleton variant="rounded" width={140} height={20} />*/}
    </h1>
  );
}
