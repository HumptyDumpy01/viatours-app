// 'use client';
import classes from './Picker.module.scss';
/*type PickerType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonPickerType = {
  borderBottom?: string;
  // children: ReactNode;
}

export default function SkeletonPicker({ borderBottom }: SkeletonPickerType) {
  return (
    <>
      <div className={classes[`picker-container`]} style={{
        // borderBottom: `1px solid #e0e0e0`
        borderBottom: borderBottom
      }}>
        <Skeleton variant="circular" width={14} height={14} />
        <div className={classes[`picker-content`]}>
          <Skeleton variant="rounded" width={50} height={10} />
          <Skeleton variant="rounded" width={70} height={10} />
        </div>
      </div>
    </>
  );
}
