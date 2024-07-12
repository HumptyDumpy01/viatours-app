// 'use client';
import './CustomerReviews.scss';
/*interface CustomerReviewsHeadingInterface {
  // children: ReactNode; }*/
export default function CustomerReviewsHeading(/*{  }: CustomerReviewsHeadingInterface*/) {
  return (
    <>
      <div className="customer-reviews__heading">
        <h2 className="secondary-heading customer-reviews__heading heading-scale-effect">Customer Reviews</h2>
      </div>
    </>
  );
}
