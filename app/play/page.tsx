'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import ParentComponent from '../components/ParentComponent';

export default function Play() {

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
      <ParentComponent />
    </APIProvider>
  );
}
