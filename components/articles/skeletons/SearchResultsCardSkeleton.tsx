// 'use client';
import '@/components/articles/card/ArticlesCard.scss';
import { Skeleton } from '@mui/material';

type SearchResultsCardSkeletonType = {
  mode?: `light` | `dark`;
  // children: ReactNode;
}

export default function SearchResultsCardSkeleton({ mode }: SearchResultsCardSkeletonType) {
  return (
    <>
      {mode === `dark` && (
        <figure className="travel-articles__the-newest__card grid search-article-card">
          <div className="travel-articles__card-hover link search-results-anchor">
          <span className="inline-block travel-articles__the-newest__card-tag">
            <Skeleton animation={`wave`} sx={{ backgroundColor: `#d9d9d9`, borderRadius: `100rem` }} width={`7rem`}
                      height={`3.5rem`}
                      variant="rectangular" />
          </span>
            <Skeleton animation={`wave`} className={`travel-articles__the-newest__card-img`} variant="rectangular" />
            <div className="travel-articles__the-newest__card-info flex">
            <span className="travel-articles__the-newest__card-info__date inline-block">
              <Skeleton width={`7rem`} height={`2rem`} variant="rounded" />
            </span>
              <span className="travel-articles__the-newest__card-info__author inline-block">
              <Skeleton width={`14rem`} height={`2rem`} variant="rounded" />
            </span>
            </div>
            <h3 className="travel-articles__the-newest__card-heading">
              <div className={`flex flex-direction-column gap-7px`}>
                <Skeleton width={`90%`} height={`2rem`} variant="rounded" />
                <Skeleton width={`50%`} height={`2rem`} variant="rounded" />
              </div>
            </h3>
          </div>
        </figure>

      )}
      {mode === `light` && (
        <figure className="travel-articles__the-newest__card grid search-article-card">
          <div className="travel-articles__card-hover link search-results-anchor">
          <span className="inline-block travel-articles__the-newest__card-tag">
            <Skeleton animation={`wave`} sx={{ backgroundColor: `#565656`, borderRadius: `100rem` }} width={`7rem`}
                      height={`3.5rem`}
                      variant="rectangular" />
          </span>
            <Skeleton animation={`wave`} sx={{ backgroundColor: `#f5f5f5` }}
                      className={`travel-articles__the-newest__card-img`} variant="rectangular" />
            <div className="travel-articles__the-newest__card-info flex">
            <span className="travel-articles__the-newest__card-info__date inline-block">
              <Skeleton sx={{ backgroundColor: `#f5f5f5` }} width={`7rem`} height={`2rem`} variant="rounded" />
            </span>
              <span className="travel-articles__the-newest__card-info__author inline-block">
              <Skeleton sx={{ backgroundColor: `#f5f5f5` }} width={`14rem`} height={`2rem`} variant="rounded" />
            </span>
            </div>
            <h3 className="travel-articles__the-newest__card-heading">
              <div className={`flex flex-direction-column gap-7px`}>
                <Skeleton sx={{ backgroundColor: `#f5f5f5` }} width={`90%`} height={`2rem`} variant="rounded" />
                <Skeleton sx={{ backgroundColor: `#f5f5f5` }} width={`50%`} height={`2rem`} variant="rounded" />
              </div>
            </h3>
          </div>
        </figure>

      )}
    </>
  );
}
