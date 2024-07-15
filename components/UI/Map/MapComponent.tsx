// MapComponent.tsx
'use client';
import React from 'react';
import './Map.scss';
import { AdvancedMarker, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';

type MapComponentType = {
  mapId: string;
  apiKey: string;
  locations: { key: string, location: google.maps.LatLngLiteral }[];
}

type Poi = { key: string, location: google.maps.LatLngLiteral }
const PoiMarkers = (props: { pois: Poi[] }) => {
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
          {/*<Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />*/}
          <Pin background={'#ef5b1b'} glyphColor={'#fff'} borderColor={'#fff'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default function MapComponent({ mapId, apiKey, locations }: MapComponentType) {

  const tourLocations: Poi[] = [
    ...locations
    // { key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108 } },
    // { key: 'tarongaZoo', location: { lat: -33.8472767, lng: 151.2188164 } },
    // { key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 } },
    // { key: 'hyderPark', location: { lat: -33.8690081, lng: 151.2052393 } },
    // { key: 'theRocks', location: { lat: -33.8587568, lng: 151.2058246 } },
    // { key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 } },
    // { key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 } },
    // { key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 } },
    // { key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 } },
    // { key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 } },
    // { key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 } },
    // { key: 'kingStreetWharf', location: { lat: -33.8665445, lng: 151.1989808 } },
    // { key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 } },
    // { key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 } },
    // { key: 'barangaroo', location: { lat: -33.8605523, lng: 151.1972205 } }
  ];

  return (
    <APIProvider apiKey={apiKey}>
      <section className="description__tour-overview-map">
        <h2 className="secondary-heading margin-bottom-small">Tour Map</h2>
        <div className="description__tour-overview-map-container">
          <div id="map">
            <Map
              defaultZoom={13}
              defaultCenter={tourLocations[0].location}
              mapId={mapId}>
              <PoiMarkers pois={tourLocations} />
            </Map>
          </div>
        </div>
      </section>
    </APIProvider>
  );
}