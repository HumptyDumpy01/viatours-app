// 'use client';
import './CustomerReviews.scss';
import CustomerReviewOverallRating from '@/components/tourDescription/CustomerReviews/CustomerReviewOverallRating';

type CustomerReviewsType = {
  rating: {
    overall: number;
    location: number;
    amenities: number;
    food: number;
    price: number;
    rooms: number;
    tourOperator: number;
  };
  // children: ReactNode;
}

export default function CustomerReviews({ rating }: CustomerReviewsType) {
  return (
    <section className="customer-reviews">
      <h2 className="secondary-heading customer-reviews-heading">Customer Reviews</h2>
      <div className="customer-reviews__rating-wrapper grid grid-two-cols">
        <CustomerReviewOverallRating tableHead={'head'} icon={`happy-smile`} rate={rating.overall}
                                     heading={`Overall Rating`} />
        <CustomerReviewOverallRating icon={`map`} rate={rating.location}
                                     heading={`Location`} />

        <CustomerReviewOverallRating icon={`icecream`} rate={rating.amenities}
                                     heading={`Amenities`} />
        <CustomerReviewOverallRating icon={`food`} rate={rating.food}
                                     heading={`Food`} />
        <CustomerReviewOverallRating icon={`wallet`} rate={rating.price}
                                     heading={`Price`} />
        <CustomerReviewOverallRating tableHead={`end`} icon={`apartment`} rate={rating.rooms}
                                     heading={`Rooms`} />
        <CustomerReviewOverallRating tableHead={`end`} icon={`phone`} rate={rating.tourOperator}
                                     heading={`Tour Operator`} />
      </div>
    </section>
  );
}
