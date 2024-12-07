import React from 'react';
import './Map.scss';
import MapComponent from '@/components/UI/Map/MapComponent';

type Location = {
  googleMap: {
    key: string;
    location: google.maps.LatLngLiteral;
  };
};

interface GoogleMapProps {
  locations: Location[];
}

export default function GoogleMap({ locations }: GoogleMapProps) {

  return (
    <MapComponent
      apiKey={String(process.env.GOOGLE_MAP_API_KEY)}
      mapId={String(process.env.GOOGLE_MAP_ID)}
      locations={locations}
      // You might need to pass locations to MapComponent if it's used there
    />
  );
}