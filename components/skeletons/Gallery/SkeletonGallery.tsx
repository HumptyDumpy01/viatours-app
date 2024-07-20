// 'use client';
import '@/components/UI/Gallery/Gallery.scss';
/*type SkeletonGalleryType = {
  // children: ReactNode;
}*/
import { Skeleton } from '@mui/material';
import React from 'react';

export default function SkeletonGallery(/*{  }: SkeletonGalleryType*/) {
  return (
    <div className="description__gallery">
      <div className="description__gallery-images grid">
        <div className="description__gallery-img-1">
          <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
            borderTopRightRadius: `0`,
            borderBottomRightRadius: `0`
          }} />
        </div>
        <div className="description__gallery-images-container-1 grid grid-two-cols">
          <div className={`description__gallery-img-2`}>
            <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
              borderTopLeftRadius: `0`,
              borderBottomLeftRadius: `0`,
              borderBottomRightRadius: `0`
            }} />
          </div>
          <div className={`description__gallery-img-3`}>
            <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
              borderRadius: `0`
            }} />
          </div>
          <div className={`description__gallery-img-4`}>
            <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
              borderTopRightRadius: `0`,
              borderTopLeftRadius: `0`,
              borderBottomLeftRadius: `0`
            }} />
          </div>
        </div>
      </div>
      <span className={`description__gallery--see-all-skeleton`}>
                  <Skeleton animation={`wave`} variant="rounded" width={`11rem`} height={`3.7rem`}
                            sx={{ borderRadius: `100rem` }} />
            </span>
    </div>
  );
}
