// 'use client';

type ActivityDetailsRatingType = {
  rating: number;
  reviewCount: number;
  // children: ReactNode;
}

import Stars from '@/components/UI/Layout/Stars';

export default function ActivityDetailsRating({ rating, reviewCount }: ActivityDetailsRatingType) {
  return (
    <>
      <div
        className="book-now__details-2__activity-details__card-rating-container">

        <div className="flex gap-7px">
          <Stars rating={rating} />
        </div>
        <p className="book-now__details-2__activity-details__card__rating">{rating} (<span
          className="inline-block book-now__details-2__activity-details__card__rating-count">{reviewCount}</span>)
        </p>
      </div>
    </>
  );
}
