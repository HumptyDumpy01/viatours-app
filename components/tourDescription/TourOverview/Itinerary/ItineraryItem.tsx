// 'use client';

import IconIon from '@/components/UI/IonIcon/IconIon';

type ItineraryItemType = {
  type: `flag` | `default`;
  // children: ReactNode;
}

export default function ItineraryItem({ type }: ItineraryItemType) {

  if (type === `flag`) {
    return (
      <div className="description__tour-overview-itinerary-list__item list__item--1">
        <div className="h3-wrapper">
          <div className="description__tour-overview-itinerary-list__item-shape--1">
            <IconIon type={`flagOutline`} className="icon icon--flag" />
          </div>
          <h3 className="description__tour-overview-itinerary__h3">Day 1: Airport Pickup</h3>
          <p className="paragraph">Our team will be waiting for you at the airport to take you to your hotel. You can
            rest
            after your flight and start exploring the city at your own pace.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    </>
  );
}
