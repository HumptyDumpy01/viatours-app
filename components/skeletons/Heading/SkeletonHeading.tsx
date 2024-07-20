// 'use client';
import classes from './SkeletonHeading.module.scss';
/*type SkeletonHeadingType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonHeadingType = {
  width: number | string;
  height: number | string;
  amount: number;
  marginTop?: number | string;
  marginBottom?: number | string;
}

export default function SkeletonHeading({ width, amount, height, marginTop, marginBottom }: SkeletonHeadingType) {
  return (
    <div className={classes[`skeleton-heading`]} style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      {[...Array(amount)].map((_, index) => (
        <Skeleton key={index} variant="rounded" sx={{ width: width, height: height }} />
      ))}
      {/*<Skeleton variant="rounded" sx={{ width: '50%', height: 30 }} />*/}
    </div>
  );
}
