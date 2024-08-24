// 'use client';
import './ArticlesTravellerReviews.scss';
import { type ReactNode } from 'react';

type ArticlesTravellerReviewsType = {
  children: ReactNode;
}

export default function ArticlesTravellerReviews({ children }: ArticlesTravellerReviewsType) {
  return (
    <section className="traveller-reviews-container">
      <div className="traveller-reviews container">
        {children}
      </div>
    </section>
  );
}
