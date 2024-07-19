// 'use client';
import classes from './SkeletonCardClipped.module.scss';
/*type SkeletonCardClippedType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';

export default function SkeletonCardClipped(/*{  }: SkeletonCardClippedType*/) {
  return (
    <div className={classes[`skeleton-card-clipped-container`]}>
      <Skeleton className={classes[`image-container`]} animation={`wave`} variant="rectangular" width={`100%`} />
      <div style={{
        display: `flex`,
        gap: `1rem`,
        marginBottom: `1rem`
      }}>
        {/*<Skeleton width="30%" height={24} />*/}
        {/*<Skeleton width="40%" height={24} />*/}
      </div>
      <div>
        <Skeleton className={classes[`subtitle`]} />
        <Skeleton animation={`wave`} className={classes[`title-1`]} />
        <Skeleton animation={`wave`} className={classes[`title-2`]} />
      </div>
    </div>
  );
}
