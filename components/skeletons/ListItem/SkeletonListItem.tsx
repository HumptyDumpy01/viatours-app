import { Skeleton } from '@mui/material';
import React from 'react';

type SkeletonListItemType = {
  widthsText: (number | string)[];
  heightText: number | string;
  widthCircle: number | string;
  amount?: number;
  marginTop?: number | string;
  marginBottom?: number | string;
}

export default function SkeletonListItem({
                                           marginBottom,
                                           marginTop,
                                           heightText,
                                           widthsText,
                                           widthCircle,
                                           amount
                                         }: SkeletonListItemType) {
  // Check if only one width is provided and amount is specified
  const isSingleWidthWithAmount = widthsText.length === 1 && amount !== undefined;

  return (
    <>
      {isSingleWidthWithAmount ? (
        // Render multiple skeletons with the same width
        [...Array(amount)].map((_, index) => (
          <li key={index}
              style={{ display: 'flex', alignItems: 'center', marginBottom, marginTop }}>
            <Skeleton variant="circular" width={widthCircle} height={widthCircle} />
            <Skeleton variant="rounded" width={widthsText[0]} height={heightText} />
          </li>
        ))
      ) : (
        // Render a skeleton for each width in widthsText
        widthsText.map((width, index) => (
          <li key={index}
              style={{ display: 'flex', alignItems: 'center', marginBottom, marginTop }}>
            <Skeleton variant="circular" width={widthCircle} height={widthCircle} />
            <Skeleton variant="rounded" width={width} height={heightText} />
          </li>
        ))
      )}
    </>
  );
}