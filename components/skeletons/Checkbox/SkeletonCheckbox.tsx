// 'use client';
import classes from './SkeletonCheckbox.module.scss';
/*type SkeletonCheckboxType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonCheckboxType = {
  extraInfo?: boolean;
  // children: ReactNode;
}

export default function SkeletonCheckbox({ extraInfo }: SkeletonCheckboxType) {
  return (
    <div className={classes[`skeleton-checkbox-container`]}>
      <div style={{ display: `flex`, gap: `1rem` }}>
        <Skeleton variant="rounded" width={14} height={14} />
        <Skeleton variant="rounded" width={100} height={14} />
      </div>
      {extraInfo && (
        <Skeleton variant="rounded" width={25} height={14} />
      )}
    </div>
  );
}
