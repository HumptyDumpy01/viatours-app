// 'use client';

/*type SkeletonButtonDefaultType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonButtonDefaultType = {
  animation: `wave` | `pulse` | false;
  variant: `rounded` | `circular` | `rectangular`;
  borderRadius?: string;
  marginTop?: string;
  width: string;
  height: string;
}

export default function
  SkeletonButtonDefault({
                          animation,
                          variant,
                          borderRadius,
                          marginTop,
                          width,
                          height
                        }: SkeletonButtonDefaultType) {
  return (
    <>
      <Skeleton variant={variant} animation={animation} width={width} height={height} sx={{
        borderRadius: borderRadius ? borderRadius : `12px`,
        marginTop: marginTop
      }} />
    </>
  );
}
