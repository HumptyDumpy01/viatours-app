'use client';

import './TourItinerary.scss';
import ItineraryItem from '@/components/tourDescription/TourOverview/Itinerary/ItineraryItem';
import { motion } from 'framer-motion';

type TourItineraryType = {
  itinerary: {
    title: string;
    description: string;
  }[];
  // children: ReactNode;
}

export default function TourItinerary({ itinerary }: TourItineraryType) {

  return (
    <motion.section
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="description__tour-overview-itinerary">
      <h2 className="secondary-heading margin-bottom-small">Itinerary</h2>
      <div className="description__tour-overview-itinerary-list">
        {itinerary.map((item, index) => {
          if (itinerary.length - 1 === index || index === 0) {
            return (
              <ItineraryItem key={item.description} type={`flag`} itinerary={{
                title: item.title, description: item.description
              }
              } />
            );
          } else {
            return (
              <ItineraryItem key={item.description} type={`default`} itinerary={{
                title: item.title, description: item.description
              }
              } />
            );
          }
        })}
      </div>
    </motion.section>
  );
}
