// 'use client';

import classes from '../skeletons.module.scss';
import { Skeleton } from '@mui/material';
/*type SkeletonTextType = {
  // children: ReactNode;
}*/

type SkeletonTextType = {
  widths: (number | string)[]; // Array of widths
  height: number | string;
};

export default function SkeletonText({ widths, height }: SkeletonTextType) {
  return (
    <p className={`paragraph ${classes['skeleton-tour-overview']}`}>
      {widths.map((width, index) => (
        <Skeleton key={index} variant="rounded" width={width} height={height} />
      ))}
    </p>
  );
}
