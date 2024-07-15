// 'use client';
import './TourItinerary.scss';
import IconIon from '@/components/UI/IonIcon/IconIon';

type TourItineraryType = {
  itinerary: {}
  // children: ReactNode;
}

export default function TourItinerary({}: TourItineraryType) {
  return (
    <section className="description__tour-overview-itinerary">
      <h2 className="secondary-heading margin-bottom-small">Itinerary</h2>
      <div className="description__tour-overview-itinerary-list">
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
        <div className="description__tour-overview-itinerary-list__item list__item--2">
          <div className="h3-wrapper">
            <div className="description__tour-overview-itinerary-list__item-shape--2"></div>
            <h3 className="description__tour-overview-itinerary__h3">Day 2: Temples & River Cruise</h3>
            <p className="paragraph hidden-p">We will visit the most iconic temples in the city in the morning. In the
              afternoon,
              we
              will take a relaxing river cruise and enjoy the city's skyline.</p>
          </div>
        </div>
        <div className="description__tour-overview-itinerary-list__item list__item--3">
          <div className="h3-wrapper">
            <div className="description__tour-overview-itinerary-list__item-shape--2"></div>
            <h3 className="description__tour-overview-itinerary__h3">Day 3: Massage & Overnight Train</h3>
            <p className="paragraph hidden-p">Like on all of our trips, we can collect you from the airport when you
              land
              and take
              you directly to your hotel. The first Day is just a check-in Day so you have this freedom to explore the
              city and get settled in.</p>
          </div>
        </div>
        <div className="description__tour-overview-itinerary-list__item list__item--4">
          <div className="h3-wrapper">
            <div className="description__tour-overview-itinerary-list__item-shape--2">
            </div>
            <h3 className="description__tour-overview-itinerary__h3">Day 4: Khao Sok National Park</h3>
            <p className="paragraph hidden-p">We will spend the day exploring Khao Sok National Park, one of the
              country's
              most
              beautiful nature reserves. You will see a variety of wildlife and enjoy the stunning scenery.</p>
          </div>
        </div>
        <div className="description__tour-overview-itinerary-list__item list__item--5">
          <div className="h3-wrapper">
            <div className="description__tour-overview-itinerary-list__item-shape--2"></div>
            <h3 className="description__tour-overview-itinerary__h3">Day 5: Travel to Koh Phangan</h3>
            <p className="paragraph hidden-p">We will travel to the beautiful island of Koh Phangan. You can spend the
              day
              at the
              beach, try water sports, or just relax and enjoy the island's laid-back atmosphere.</p>
          </div>
        </div>
        <div className="description__tour-overview-itinerary-list__item list__item--6">
          <div className="h3-wrapper">
            <div className="description__tour-overview-itinerary-list__item-shape--2"></div>
            <h3 className="description__tour-overview-itinerary__h3">Day 6: Morning Chill & Muay Thai Lesson</h3>
            <p className="paragraph hidden-p">Start the day with a relaxing morning at your leisure. In the afternoon,
              we
              will have
              a Muay Thai lesson where you can learn the basics of this traditional Thai martial art.</p>
          </div>
        </div>
        <div className="description__tour-overview-itinerary-list__item list__item--7">
          <div className="h3-wrapper">
            <div className="description__tour-overview-itinerary-list__item-shape--1">
              <IconIon type={`flagOutline`} className="icon icon--flag" />
            </div>
            <h3 className="description__tour-overview-itinerary__h3">Day 7: Island Boat Trip</h3>
            <p className="paragraph hidden-p">We will take a boat trip around the island, visiting secluded beaches and
              snorkeling
              spots. It's the perfect way to end your trip with us.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
