// 'use client';

/*type SkeletonInputType = {
  // children: ReactNode;
}*/

import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonInputType = {
  heightLabel: number | string;
  widthLabel: number | string;
  heightInput: number | string;
  widthInput: number | string;
  marginTopLabel?: number | string;
  marginBottomLabel?: number | string;
  animationInput: `wave` | `pulse` | false;
  // children: ReactNode;
}

export default function
  SkeletonInput({
                  heightInput,
                  widthInput,
                  widthLabel,
                  heightLabel,
                  marginBottomLabel,
                  marginTopLabel,
                  animationInput
                }: SkeletonInputType) {
  return (
    <div>
      <SkeletonText widths={[widthLabel]} height={heightLabel} marginTop={marginTopLabel}
                    marginBottom={marginBottomLabel} />
      <Skeleton variant={`rounded`} animation={animationInput} width={widthInput} height={heightInput} sx={{
        borderRadius: `12px`
      }} />
    </div>
  );
}
