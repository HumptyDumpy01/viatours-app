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
};

export default function SkeletonText({ widths, height, marginBottom }: SkeletonTextType) {
  return (
    <p className={`paragraph ${classes['skeleton-tour-overview']}`}
       style={{ marginBottom: marginBottom ? marginBottom : `2rem` }}>
      {widths.map((width, index) => (
        <Skeleton key={index} variant="rounded" width={width} height={height} />
      ))}
    </p>
  );
}
