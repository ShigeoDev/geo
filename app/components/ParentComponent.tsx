import StreetViewPanorama from './StreetViewPanorama';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import data from '../../data/data.json';
import MiniMap from './MiniMap';
import SubmitButtion from './SubmitButton';

export default function ParentComponent() {

  const streetViewLibrary = useMapsLibrary('streetView');

  type StreetViewPanoramaData = google.maps.StreetViewPanoramaData | null;

  const [streetViewData, setStreetViewData] = useState<StreetViewPanoramaData>(null);
  const [render, setRender] = useState<Boolean>(false);

  const locations = JSON.parse(JSON.stringify(data));

  const locationNumber = Math.random() * locations.length;
  const randomLocation = locations[Math.floor(locationNumber)];

  useEffect(() => {


    if (streetViewLibrary) {
      const streetViewService = new streetViewLibrary.StreetViewService();

      // Vancouver Coords
      //const randLat = Math.random() * 0.6 - 0.3 + 49.241359;
      //const randLng = Math.random() * 0.6 - 0.3 - 123.112261;

      const randLat = Math.random() * 180 - 90;
      const randLng = Math.random() * 360 - 180;

      console.log(randLat, randLng);

      const request = {
        location: { lat: randLat, lng: randLng },
        radius: 1000,
        sources: [streetViewLibrary.StreetViewSource.GOOGLE],
      };
      streetViewService.getPanorama(request, (data, status) => {
        if (status === 'OK') {
          console.log(data);
          setStreetViewData(data);
        } else {
          console.log('Street View data not found for this location');
          setRender(!render);
        }
      });
    }
  }, [streetViewLibrary, render]);

  const lat = streetViewData?.location?.latLng?.lat();
  const lng = streetViewData?.location?.latLng?.lng();

  return (
    <div>
      <div className='h-96 w-96 absolute bottom-[5rem] right-12 z-10 flex flex-col'>
        <MiniMap />
        <SubmitButtion />
      </div>
      {lat && lng && <StreetViewPanorama lat={lat} lng={lng} />}
    </div>
  );
}
