'use client';

import {APIProvider} from '@vis.gl/react-google-maps';
import StreetViewPanorama from './StreetViewPanorama';

export function StreetView() {
  
  const place = {lat: 37.7749, lng: -122.4194};

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
      <StreetViewPanorama />
    </APIProvider>
  );
}
