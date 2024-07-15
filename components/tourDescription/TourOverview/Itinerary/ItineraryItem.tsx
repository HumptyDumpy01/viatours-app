// 'use client';

import IconIon from '@/components/UI/IonIcon/IconIon';
import { useState } from 'react';

type ItineraryItemType = {
  type: `flag` | `default`;
  itinerary: {
    title: string;
    description: string;
  };
  // children: ReactNode;
}

export default function ItineraryItem({ type, itinerary }: ItineraryItemType) {

  if (!type) {
    throw new Error(`Type is required for Itinerary Item!`);
  }

  const [descriptionVisibility, setDescriptionVisibility] = useState<boolean>(false);

  function toggleDescription() {
    setDescriptionVisibility((prev) => !prev);
  }

  if (type === `flag`) {
    return (
      <div className="description__tour-overview-itinerary-list__item">
        <div className="h3-wrapper">
          <div className="description__tour-overview-itinerary-list__item-shape--1">
            <IconIon type={`flagOutline`} className="icon icon--flag" />
          </div>
          <h3 onClick={toggleDescription} className="description__tour-overview-itinerary__h3">{itinerary.title}</h3>
          <p className="paragraph">{itinerary.description}</p>
        </div>
      </div>
    );
  }
  if (type === `default`) {
    return (
      <div className="description__tour-overview-itinerary-list__item">
        <div className="h3-wrapper">
          <div className="description__tour-overview-itinerary-list__item-shape--2"></div>
          <h3 onClick={toggleDescription} className="description__tour-overview-itinerary__h3">{itinerary.title}</h3>
          <p className={`paragraph ${!descriptionVisibility ? `hidden-p` : ``} `}>{itinerary.description}</p>
        </div>
      </div>
    );
  }
}
