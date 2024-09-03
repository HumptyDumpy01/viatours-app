'use client';

import '../card-second-col/ActivityDetailsCard.scss';
import ActivityDetailsHeading from '@/components/checkout/card/card-first-col/ActivityDetailsHeading';
import ActivityDetailsRating from '@/components/checkout/card/card-first-col/ActivityDetailsRating';
import ActivityDetailsCardFooter from '@/components/checkout/card/card-first-col/ActivityDetailsCardFooter';
import ActivityDetailsDate from '@/components/checkout/card/card-second-col/ActivityDetailsDate';
import { TourInterface } from '@/app/tours/[id]/page';
import { OrderInterface } from '@/components/checkout/checkout-details/CheckoutDetails';
import { CldImage } from 'next-cloudinary';

type ActivityDetailsCardType = {
  order: OrderInterface;
  tour: TourInterface;

  // children: ReactNode;
}


export default function ActivityDetailsCard(props: ActivityDetailsCardType) {

  return (
    <div className={`book-now__details-2__activity-details`}>
      <a target={`_blank`} className={`text-decoration-none`} href={`/tours/${props.tour._id}`}>
        <figure className="book-now__details-2__activity-details__card grid">
          {/* @ts-ignore*/}
          <div className={`book-now__details-2__activity-details__card-img-container`}>
            <CldImage sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill src={props.tour.images[0]}
                      alt={props.tour.title}
                      className="book-now__details-2__activity-details__card-img" />
          </div>
          {/* @ts-ignore*/}
          {/*<img src={props.tour.images[0].src} alt={props.tour.title}*/}
          {/*     className="book-now__details-2__activity-details__card-img" />*/}
          <ActivityDetailsHeading title={props.tour.title} country={props.tour.country} city={props.tour.city} />
          <ActivityDetailsRating rating={props.tour.rating.overall} reviewCount={props.tour.reviews} />
          <ActivityDetailsCardFooter priceFrom={props.tour.price.children} duration={props.tour.duration} />
        </figure>
      </a>
      <ActivityDetailsDate order={props.order} />
    </div>
  );
}
