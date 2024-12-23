import { Map, AdvancedMarker, Pin, MapMouseEvent } from "@vis.gl/react-google-maps";
import { useState } from "react";



export default function MiniMap({ setUserCoords }: { setUserCoords: Function }) {

  const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);

  function moveMarker(event: MapMouseEvent) {
    if (event.type === 'click') {
      if (event.detail.latLng?.lat && event.detail.latLng?.lng) {
        setCoords({ lat: event.detail.latLng?.lat, lng: event.detail.latLng?.lng });
        setUserCoords({ userLat: event.detail.latLng?.lat, userLng: event.detail.latLng?.lng });
      }
    }
  };

  return (

    <Map defaultCenter={{ lng: 0, lat: 0 }} defaultZoom={1} minZoom={1} 
      disableDefaultUI={true} clickableIcons={false} mapId={'67eb1e82a659a5f6'} 
      onClick={(event) => moveMarker(event)}>
      {coords &&
        <AdvancedMarker position={coords}>
          <Pin />
        </AdvancedMarker>
      }
    </Map>
  );
}
