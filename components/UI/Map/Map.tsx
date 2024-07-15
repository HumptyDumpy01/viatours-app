import React from 'react';
import './Map.scss';
import MapComponent from '@/components/UI/Map/MapComponent';

// Example static latitude and longitude for demonstration
export default function GoogleMap({location}: {location: google.maps.LatLngLiteral}) {
  return (
    <MapComponent
      apiKey={String(process.env.GOOGLE_MAP_API_KEY)}
      mapId={String(process.env.GOOGLE_MAP_ID)}
    />
  );
}