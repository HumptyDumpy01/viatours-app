// 'use client';
import classes from './SkeletonCardFull.module.scss';
/*type SkeletonCardFullType = {
  // children: ReactNode;
}*/
import { Avatar, Skeleton, Typography } from '@mui/material';

export default function SkeletonCardFull(/*{  }: SkeletonCardFullType*/) {
  return (
    <figure className="find-popular-tours__figure skeleton">
      <Skeleton variant="rectangular" width="100%" animation={`wave`} height={`16rem`} sx={{ borderRadius: `12px` }} />
      <div className={classes[`skeleton-card-container`]}>
        <div className={classes[`skeleton-card-full`]}>
          <Skeleton animation={`wave`} sx={{
            width: `2rem`,
            height: `2rem`,
            borderRadius: `50%`,
            marginRight: `1rem`
          }} variant="circular">
            <Avatar />
          </Skeleton>
          <Skeleton width={`60%`}>
            <Typography>.</Typography>
          </Skeleton>

        </div>
        <div className={classes[`skeleton-card-title`]}>
          <Skeleton height={20} width={`90%`}>
            <Typography>.</Typography>
          </Skeleton>

          <Skeleton height={20} width={`80%`}>
            <Typography>.</Typography>
          </Skeleton>

          <Skeleton height={20} width={`60%`}>
            <Typography>.</Typography>
          </Skeleton>
        </div>
        <div className={classes[`skeleton-card-rating-container`]}>
          <div className={classes[`skeleton-card-stars`]}>
            <Skeleton variant="circular" width={14} height={14} />
            <Skeleton variant="circular" width={14} height={14} />
            <Skeleton variant="circular" width={14} height={14} />
            <Skeleton variant="circular" width={14} height={14} />
            <Skeleton variant="circular" width={14} height={14} />
          </div>
          <div className={`skeleton-card-rating`}>
            <Skeleton height={22} width={40}>
              <Typography>.</Typography>
            </Skeleton>
          </div>
        </div>
        <div className={classes[`skeleton-card-bottom`]}>
          <Skeleton variant="rounded" animation={`wave`} width={`100%`} height={20} />
        </div>

      </div>
    </figure>
  );
}
