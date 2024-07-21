// 'use client';
import classes from './SkeletonPhoneInput.module.scss';
/*type SkeletonPhoneInputType = {
  // children: ReactNode;
}*/
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import { Skeleton } from '@mui/material';
import React from 'react';

export default function SkeletonPhoneInput(/*{  }: SkeletonPhoneInputType*/) {
  return (
    <>
      <SkeletonText widths={[`12rem`]} height={21} marginTop={`2rem`} marginBottom={`1rem`} />
      <div className={classes[`skeleton-container`]}>
        <div>
          <Skeleton variant={`rounded`} animation={`wave`} width={`23.4rem`} height={57} sx={{
            borderRadius: `12px`
          }} />
        </div>
        <div>
          <Skeleton variant={`rounded`} animation={`wave`} width={`35rem`} height={57} sx={{
            borderRadius: `12px`
          }} />
        </div>
      </div>
    </>
  );
}
