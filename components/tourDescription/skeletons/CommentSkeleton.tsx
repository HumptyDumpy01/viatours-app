// 'use client';

/*type CommentSkeletonType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';

export default function CommentSkeleton(/*{  }: CommentSkeletonType*/) {
  return (
    <>
      <div className={`comments-wrapper`}>
        <div className="comments__username flex flex-space-between flex-align-center">
          <div className="comments__username-logo-and-name flex flex-align-center gap-sm">
            <div>
              <Skeleton animation={`wave`} variant="circular" width={`4.8rem`} height={`4.8rem`} />
            </div>
            <p className="comments__username-name">
              <Skeleton variant="text" width={'10rem'} height={`3rem`} />
            </p>
          </div>
          <span className="comments__username-date">
            <Skeleton variant="text" width={`10.6rem`} height={`3rem`} />
          </span>
        </div>
        <div className="comments__content">
          <div className="comments__content-rating-and-title flex  gap-sm flex-align-center">
            <div className="rating-stars flex flex-align-center gap-7px">
              {/*make a loop for the rating. We should output five stars, empty or filled
            depending on the rating*/}
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
            </div>
            <h3 className="comments__content-title">
              <Skeleton variant="text" width={`20rem`} height={`3rem`} />
            </h3>
          </div>
          <p className="comments__content-paragraph">
            <Skeleton animation={`wave`} variant="text" width={`100%`} height={`3rem`} />
            <Skeleton animation={`wave`} variant="text" width={`100%`} height={`3rem`} />
            <Skeleton animation={`wave`} variant="text" width={`100%`} height={`3rem`} />
          </p>
          <div className={`flex gap-13px`}>
            <Skeleton animation={`wave`} className="comments__content-images-wrapper-skeleton" />
            <Skeleton animation={`wave`} className="comments__content-images-wrapper-skeleton" />
            <Skeleton animation={`wave`} className="comments__content-images-wrapper-skeleton" />
          </div>
          <div className="comments__content-reaction">
            <button className={`comments__content-reaction-btn`}>
              <span
                className={`comments__content-reaction-btn--helpful`}>
                <Skeleton animation={`wave`} variant="text" width={`3rem`} height={`2rem`} />
              </span>
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="text" width={`6rem`} height={`2rem`} />
            </button>
            <button className={`comments__content-reaction-btn`}>
              <span
                className={`comments__content-reaction-btn--helpful`}>
                <Skeleton animation={`wave`} variant="text" width={`3rem`} height={`2rem`} />
              </span>
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="text" width={`6rem`} height={`2rem`} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
