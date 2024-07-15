// MapComponent.tsx
'use client';
import React, { useEffect, useState } from 'react';
import './Map.scss';
import { AdvancedMarker, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';

type MapComponentType = {
  mapId: string;
  apiKey: string;
  lat: number; // New prop for latitude
  lng: number; // New prop for longitude
}

type Poi = { key: string, location: google.maps.LatLngLiteral }

export default function MapComponent({ mapId, apiKey, lat, lng }: MapComponentType) {
  const [locations, setLocations] = useState<Poi[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch(`/api/maps?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      // Assuming the API returns an array of locations with { key, lat, lng }
      const pois = data.map((item, index) => ({
        key: `poi-${index}`,
        location: { lat: item.lat, lng: item.lng }
      }));
      setLocations(pois);
    };

    fetchLocations();
  }, [lat, lng]);

  const PoiMarkers = (props: { pois: Poi[] }) => {
    return (
      <>
        {props.pois.map((poi: Poi) => (
          <AdvancedMarker
            key={poi.key}
            position={poi.location}>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
      </>
    );
  };

  return (
    <APIProvider apiKey={apiKey}>
      <section className="description__tour-overview-map">
        <h2 className="secondary-heading margin-bottom-small">Tour Map</h2>
        <div className="description__tour-overview-map-container">
          <div id="map">
            <Map
              defaultZoom={13}
              defaultCenter={{ lat, lng }}
              mapId={mapId}>
              <PoiMarkers pois={locations} />
            </Map>
          </div>
        </div>
      </section>
    </APIProvider>
  );
}