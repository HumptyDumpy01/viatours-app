// 'use client';
import Iconion from '@/components/UI/IonIcon/IconIon';

type TourHighlightsType = {
  tour_highlights: string[];
  // children: ReactNode;
}

export default function TourHighlights({ tour_highlights }: TourHighlightsType) {
  return (
    <section className="description__tour-overview-highlights-wrapper">
      <h3 className="tertiary-heading margin-bottom-small">Tour highlights</h3>
      <ul className="description__tour-overview-highlights">
        {tour_highlights.map((highlight, index) => (
          <li key={highlight}>
            <Iconion type={`ellipse`} className="icon icon--dot"></Iconion>
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );
}
