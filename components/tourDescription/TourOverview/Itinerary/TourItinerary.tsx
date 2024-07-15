'use client';

import './TourItinerary.scss';
import ItineraryItem from '@/components/tourDescription/TourOverview/Itinerary/ItineraryItem';

type TourItineraryType = {
  itinerary: {
    title: string;
    description: string;
  }[];
  // children: ReactNode;
}

export default function TourItinerary({ itinerary }: TourItineraryType) {

  return (
    <section className="description__tour-overview-itinerary">
      <h2 className="secondary-heading margin-bottom-small">Itinerary</h2>
      <div className="description__tour-overview-itinerary-list">
        {itinerary.map((item, index) => {
          if (itinerary.length - 1 === index || index === 0) {
            return <>
              <ItineraryItem type={`flag`} itinerary={{
                title: item.title, description: item.description
              }
              } />
            </>;
          } else {
            return <>
              <ItineraryItem type={`default`} itinerary={{
                title: item.title, description: item.description
              }
              } />
            </>;
          }
        })}
      </div>
    </section>
  );
}
