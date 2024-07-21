// 'use client';
import classes from './SkeletonCheckBoxUltra.module.scss';
/*type SkeletonCheckBoxUltraType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import React from 'react';

type SkeletonCheckBoxUltraType = {
  widths: (string | number)[];
  // children: ReactNode;
}

export default function SkeletonCheckBoxUltra({ widths }: SkeletonCheckBoxUltraType) {
  return (
    <>
      <div className={classes[`skeleton-checkbox-ultra-container`]}>
        <Skeleton variant={`rounded`} animation={`wave`} width={'2rem'} height={'2rem'} />
        <div className={classes[`skeleton-checkbox-ultra-label-container`]}>
          {widths.map(function(width, index) {
            return (
              <SkeletonText key={index} marginBottom={`0`} marginTop={`0`} widths={[width]} height={10} />
            );
          })}
        </div>
      </div>
    </>
  );
}
