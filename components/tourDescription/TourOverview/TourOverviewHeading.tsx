// 'use client';

type TourOverviewHeadingType = {
  overview: string;
  // children: ReactNode;
}

import IconIon from '@/components/UI/IonIcon/IconIon';

export default function TourOverviewHeading({ overview }: TourOverviewHeadingType) {
  return (
      <section className="description__tour-tour-overview">
        <h2 className="secondary-heading margin-bottom-small">Tour Overview</h2>
        <p className="paragraph">{overview}</p>
        <div className="flex flex-align-center btn--book-now-container">
          <button className="btn btn--book-now">Book Now
            <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow"></IconIon>
          </button>
        </div>
      </section>
  );
}
