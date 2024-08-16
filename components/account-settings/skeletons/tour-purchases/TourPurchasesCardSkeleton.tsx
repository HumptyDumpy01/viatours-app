// 'use client';

/*type TourPurchasesCardSkeletonType = {
  // children: ReactNode;
}*/

import { Skeleton } from '@mui/material';
import React from 'react';

export default function TourPurchasesCardSkeleton(/*{  }: TourPurchasesCardSkeletonType*/) {
  return (
    <>
      <div className="tour-purchases__card-skeleton grid">
        <div className="tour-purchases__card-tour flex flex-direction-column">
          <div className={`tour-purchases__card-details-1--front`}>
            <div className="tour-purchases__card-tour-img">
              <Skeleton animation={`wave`} className="tour-purchases__card-tour-img-skeleton"
                        variant="rectangular"
                        width={`23rem`}
                        height={`16rem`} />
            </div>

            <div className="padding-7px">
              <div className="tour-purchases__card-tour-location flex gap-sm flex-align-center">
                <Skeleton variant="circular" width={`1.4rem`} height={`1.4rem`} />
                <p className="tour-purchases__card-tour-location-name">
                  <Skeleton variant="text" width={`7rem`} />
                </p>
              </div>
              <h2 className="tour-purchases__card-tour--title">
                <Skeleton variant="text" width={`15rem`} />
                <Skeleton variant="text" width={`10rem`} />
              </h2>
              <div className="tour-purchases__card-tour-rating-wrapper flex gap-sm flex-align-center">
                <div className="tour-purchases__card-tour-rating-stars gap-7px">
                  <Skeleton variant="circular" width={`1.4rem`} height={`1.4rem`} />
                  <Skeleton variant="circular" width={`1.4rem`} height={`1.4rem`} />
                  <Skeleton variant="circular" width={`1.4rem`} height={`1.4rem`} />
                  <Skeleton variant="circular" width={`1.4rem`} height={`1.4rem`} />
                  <Skeleton variant="circular" width={`1.4rem`} height={`1.4rem`} />
                </div>
                <div className="tour-purchases__card-tour-rating-count-wrapper">
                    <span className="tour-purchases__card-tour-rating-count inline-block">
                      <Skeleton variant="text" width={`4rem`} />
                      </span>
                </div>
              </div>
              <div
                className="tour-purchases__card-tour-price-see-more-and-duration flex flex-space-between flex-align-center">
                <p className="tour-purchases__card-tour-duration">
                  <Skeleton variant="text" width={`5rem`} />
                </p>
                <p className="tour-purchases__card-tour-duration">
                  <Skeleton variant="text" width={`5rem`} />
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*SECOND COLUMN*/}
        <div className="tour-purchases__card-details-1">
          <div className="tour-purchases__card-details-1__date flex flex-align-center">
            <p
              className="tour-purchases__card-details-1__date-value uppercase">
              <Skeleton variant="circular" width={`4rem`} height={`4rem`} />
            </p>
            <div className="flex flex-direction-column">
              <p className="tour-purchases__card-details-1__date-title">
                <Skeleton variant="text" width={`5rem`} />
              </p>
              <p
                className="tour-purchases__card-details-1__date-info">
                <Skeleton variant="text" width={`7rem`} />
              </p>
            </div>
          </div>
          <div className="tour-purchases__card-details-1__amount-of-tickets flex gap-sm flex-align-center">
            <p className="tour-purchases__card-details-1__amount-of-tickets-title">
              <Skeleton variant="text" width={`15rem`} />
            </p>
            <p className="tour-purchases__card-details-1__amount-of-tickets-count">
              <Skeleton variant="text" width={`2rem`} />
            </p>
          </div>
          <div className="tour-purchases__card-details-1__tickets">
            <div className="tour-purchases__card-details-1__tickets-adult flex gap-sm flex-align-center">
              <Skeleton variant="circular" width={`1.6rem`} height={`1.6rem`} />
              <p className="tour-purchases__card-details-1__tickets-adult-title">
                <Skeleton variant="text" width={`8rem`} />
              </p>
              <p className="tour-purchases__card-details-1__tickets-adult-count">
                <Skeleton variant="text" width={`2rem`} />
              </p>
            </div>
          </div>
          <div className="tour-purchases__card-details-1__tickets">
            <div className="tour-purchases__card-details-1__tickets-adult flex gap-sm flex-align-center">
              <Skeleton variant="circular" width={`1.6rem`} height={`1.6rem`} />
              <p className="tour-purchases__card-details-1__tickets-adult-title">
                <Skeleton variant="text" width={`7rem`} />
              </p>
              <p className="tour-purchases__card-details-1__tickets-adult-count">
                <Skeleton variant="text" width={`2rem`} />
              </p>
            </div>
          </div>
          <div className="tour-purchases__card-details-1__tickets">
            <div className="tour-purchases__card-details-1__tickets-adult flex gap-sm flex-align-center">
              <Skeleton variant="circular" width={`1.6rem`} height={`1.6rem`} />
              <p className="tour-purchases__card-details-1__tickets-adult-title">
                <Skeleton variant="text" width={`5rem`} />
              </p>
              <p className="tour-purchases__card-details-1__tickets-adult-count">
                <Skeleton variant="text" width={`2rem`} />
              </p>
            </div>
          </div>
          <div className="tour-purchases__card-details-1__btns grid">
            <div className={`flex gap-15px justify-items-center`}>
              <Skeleton variant="rounded" width={`16rem`} height={`4.5rem`} />
            </div>
            <div className={`flex gap-15px justify-items-center`}>
              <Skeleton variant="rounded" width={`13rem`} height={`4.5rem`} />
            </div>
          </div>
        </div>
        {/*THIRD COLUMN*/}
        <div className="tour-purchases__card-details-2-skeleton">
          <div
            className="tour-purchases__card-details-2__status margin-top-3rem flex flex-direction-column">
            <p className="tour-purchases__card-details-2__status-title-skeleton uppercase">
              <Skeleton variant="text" width={`7rem`} />
            </p>
            <p
              className="tour-purchases__card-details-2__status-info-skeleton uppercase booked status-state">
              <Skeleton variant="text" width={`6rem`} />
            </p>
          </div>
          <div
            className="tour-purchases__card-details-2__status margin-top-3rem flex flex-direction-column">
            <p className="tour-purchases__card-details-2__status-title-skeleton uppercase">
              <Skeleton variant="text" width={`7rem`} />
            </p>
            <p
              className="tour-purchases__card-details-2__status-info-skeleton uppercase booked status-state">
              <Skeleton variant="text" width={`6rem`} />
            </p>
          </div>
          <div className="tour-purchases__card-details-2__total">
            <p className="tour-purchases__card-details-2__total-title uppercase">
              <Skeleton variant="text" width={`7rem`} />
            </p>
            <p
              className="tour-purchases__card-details-2__total-info-skeleton uppercase font-weight-bold">
              <Skeleton variant="text" width={`7rem`} />
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
