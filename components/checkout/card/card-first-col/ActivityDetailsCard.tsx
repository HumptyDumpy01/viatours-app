'use client';

import '../card-second-col/ActivityDetailsCard.scss';
import ActivityDetailsHeading from '@/components/checkout/card/card-first-col/ActivityDetailsHeading';
import ActivityDetailsRating from '@/components/checkout/card/card-first-col/ActivityDetailsRating';
import ActivityDetailsCardFooter from '@/components/checkout/card/card-first-col/ActivityDetailsCardFooter';
import ActivityDetailsDate from '@/components/checkout/card/card-second-col/ActivityDetailsDate';
import { TourInterface } from '@/data/DUMMY_TOURS';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';

type ActivityDetailsCardType = {
  order: OrderInterface;
  tour: TourInterface;

  // children: ReactNode;
}


export default function ActivityDetailsCard(props: ActivityDetailsCardType) {

  return (
    <div className="book-now__details-2__activity-details">
      <figure className="book-now__details-2__activity-details__card grid">
        {/* @ts-ignore*/}
        <img src={props.tour.images[0].src} alt={props.tour.title}
             className="book-now__details-2__activity-details__card-img" />
        <ActivityDetailsHeading title={props.tour.title} country={props.tour.country} city={props.tour.city} />
        <ActivityDetailsRating rating={props.tour.rating.overall} reviewCount={props.tour.reviewed} />
        <ActivityDetailsCardFooter priceFrom={props.tour.price.children} duration={props.tour.duration[0]} />
      </figure>
      <ActivityDetailsDate order={props.order} />
    </div>
  );
}
