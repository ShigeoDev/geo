'use client';

import {APIProvider, useMapsLibrary} from '@vis.gl/react-google-maps';
import StreetViewPanorama from '../components/StreetViewPanorama';
import { useEffect } from 'react';

export default function Play() {
  
  const streetViewLibrary = useMapsLibrary('streetView');
  
  useEffect(() => {
    if (!streetViewLibrary) return;
    const service = new streetViewLibrary.StreetViewService();
    service.getPanorama(
      {
        sources: streetViewLibrary.StreetViewSource.OUTDOOR,
      }
    ) 
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
      <StreetViewPanorama />
    </APIProvider>
  );
}
