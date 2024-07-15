import React from 'react';
import './Map.scss';
import MapComponent from '@/components/UI/Map/MapComponent';

// Example static latitude and longitude for demonstration
const exampleLat = 48.8584; // Eiffel Tower latitude
const exampleLng = 2.2945; // Eiffel Tower longitude

export default function GoogleMap() {
  return (
    <MapComponent
      apiKey={String(process.env.GOOGLE_MAP_API_KEY)}
      mapId={String(process.env.GOOGLE_MAP_ID)}
      lat={exampleLat}
      lng={exampleLng}
    />
  );
}