// 'use client';
import '@/components/articles/top-articles/card/TopArticlesCard.scss';
import { Skeleton } from '@mui/material';

export default function TopArticlesCardSkeleton() {
  return (
    <div className="link travel-articles__card-hover">
      <figure className="travel-articles__the-top-articles__card">
        <span className="inline-block travel-articles__the-top-articles-tag">
        </span>
        <div className="travel-articles__the-top-articles__card-img">
          <Skeleton variant="rectangular" width={`100%`} height={`100%`} />
        </div>
        <div className="travel-articles__the-top-articles__card-info">
          <h3 className="travel-articles__the-top-articles__card-heading">
            <Skeleton variant="text" width={`100%`} height={30} sx={{ backgroundColor: `#F4F4F4` }} />
          </h3>
          <div className="travel-articles__the-top-articles__card-info__location-and-time flex">
                <span
                  className="travel-articles__the-top-articles__card-info__location flex flex-align-center gap-5px">
                  <Skeleton variant="circular" width={20} height={20} sx={{ backgroundColor: `#F4F4F4` }} />
                  <Skeleton variant="text" width={50} height={20} sx={{ backgroundColor: `#F4F4F4` }} />
                </span>
            <span className="travel-articles__the-top-articles__card-info__time flex flex-align-center gap-5px">
                <span
                  className="travel-articles__the-top-articles__card-info__location flex flex-align-center gap-5px">
                  <Skeleton variant="circular" width={20} height={20} sx={{ backgroundColor: `#F4F4F4` }} />
                  <Skeleton variant="text" width={50} height={20} sx={{ backgroundColor: `#F4F4F4` }} />
                </span>
            </span>
          </div>
          <div className="travel-articles__the-top-articles__card-info__author">
            <p className="travel-articles__the-top-articles__card-info__author__p">
              <Skeleton variant="text" width={100} height={20} sx={{ backgroundColor: `#F4F4F4` }} />
            </p>
          </div>
        </div>
      </figure>
    </div>
  );
}
