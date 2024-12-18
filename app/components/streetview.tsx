'use client';

import {APIProvider} from '@vis.gl/react-google-maps';

export function StreetView() {
  

  return (
    <APIProvider apiKey={process.env.MAP_KEY}>

    </APIProvider>
  );
}
