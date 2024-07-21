// 'use client';
import classes from './CheckoutDetailsSteps.module.scss';
/*type CheckoutDetailsStepsType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import React from 'react';

export default function SkeletonCheckoutDetailsSteps(/*{  }: CheckoutDetailsStepsType*/) {
  return (
    <>
      <div className={classes[`skeleton-container`]}>
        <Skeleton variant={`circular`} width={`5.3rem`} height={`5.3rem`} />
        <div style={{
          marginTop: `2rem`
        }}>
          <SkeletonText widths={[`14rem`]} height={20} />
        </div>
      </div>
    </>
  );
}
