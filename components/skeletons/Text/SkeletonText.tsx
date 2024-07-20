// 'use client';

import classes from '../skeletons.module.scss';
import { Skeleton } from '@mui/material';
/*type SkeletonTextType = {
  // children: ReactNode;
}*/

type SkeletonTextType = {
  widths: (number | string)[]; // Array of widths
  height: number | string;
  marginBottom?: number | string;
  marginTop?: number | string;
  animation?: 'wave' | 'pulse' | false;
};

export default function SkeletonText({ widths, height, marginBottom, marginTop, animation }: SkeletonTextType) {
  return (
    <p className={`paragraph ${classes['skeleton-tour-overview']}`}
       style={{ marginBottom: marginBottom ? marginBottom : `2rem`, marginTop: marginTop }}>
      {widths.map((width, index) => (
        <Skeleton key={index} animation={animation} variant="rounded" width={width} height={height} />
      ))}
    </p>
  );
}
