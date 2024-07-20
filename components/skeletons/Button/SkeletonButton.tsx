// 'use client';

/*type SkeletonButtonType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';

type SkeletonButtonType = {
  width: number | string;
  height: number | string;
  borderRadius: number | string;
  // children: ReactNode;
}

export default function SkeletonButton({ width, height, borderRadius }: SkeletonButtonType) {
  return (
    <div style={{ display: `flex`, justifyContent: `center` }}>
      <Skeleton animation={`wave`} variant="rounded" width={width} height={height} sx={{
        borderRadius: borderRadius
      }} />
    </div>
  );
}
