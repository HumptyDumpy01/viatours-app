// 'use client';
import './CustomerReviews.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';

type CustomerReviewOverallRatingType = {
  icon:
    `happy-smile` |
    `map` |
    `icecream` |
    `food` |
    `wallet` |
    `apartment` |
    `phone`;
  rate: number;
  heading: string;
  tableHead?: `default` | `head` | `end`;
  // children: ReactNode;
}

export default function CustomerReviewOverallRating({ icon, rate, heading, tableHead = `default` }: CustomerReviewOverallRatingType) {
  let label: string = ``;
  if (rate === 0) {
    label = `No reviews`;
  }
  console.log(`Executing rate: `, rate);

  if (rate >= 1 && rate < 3) {
    label = `Poor`;
  }
  if (rate >= 3 && rate < 4) {
    label = `Fair`;
  }
  if (rate >= 4 && rate < 4.5) {
    label = `Very Good`;
  }
  if (rate >= 4.5 && rate <= 5) {
    label = `Excellent`;
  }
  const cssHeadingStyle = tableHead === `head` ?
    `customer-reviews__rating-header-wrapper` : tableHead === `end` ? `customer-reviews__rating-header-wrapper--2--end` : `customer-reviews__rating-header-wrapper--2`;

  return (
    <div
      className={`grid grid-two-cols ${cssHeadingStyle}`}>
      <div className="customer-reviews__rating-header flex flex-space-between">
        <div className="flex flex-align-center gap-md">
          <div className="customer-reviews__rating-header-icon">
            {icon === `happy-smile` && <IconIon type={`happyOutline`} className="icon icon--overall-rate"></IconIon>}
            {icon === `map` && <IconIon type={`mapOutline`} className="icon icon--overall-rate"></IconIon>}
            {icon === `icecream` && <IconIon type={`iceCreamOutline`} className="icon icon--overall-rate"></IconIon>}
            {icon === `food` && <IconIon type={`restaurantOutline`} className="icon icon--overall-rate"></IconIon>}
            {icon === `wallet` && <IconIon type={`walletOutline`} className="icon icon--overall-rate"></IconIon>}
            {icon === `apartment` && <IconIon type={`businessOutline`} className="icon icon--overall-rate"></IconIon>}
            {icon === `phone` && <IconIon type={`callOutline`} className="icon icon--overall-rate"></IconIon>}
          </div>
          <div className="customer-reviews__rating-header-overall">
            <p className="customer-reviews__rating-header-overall-text">{heading}</p>
            <p className="customer-reviews__rating-header-overall-text-span">{label}</p>
          </div>
        </div>
      </div>
      <span className="customer-reviews__rating-header-overall-rate">
              {rate.toFixed(1)}</span>
    </div>
  );
}
