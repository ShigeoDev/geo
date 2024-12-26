import { Map, AdvancedMarker, Pin, MapMouseEvent } from "@vis.gl/react-google-maps";
import { useState, Dispatch, SetStateAction } from "react";

type miniMapProps = {
  setUserCoords: Dispatch<SetStateAction<{ userLat: number, userLng: number } | null>>
  center?: { lat: number, lng: number },
  zoom?: number
}

export default function MiniMap({ setUserCoords, center = {lat: 0, lng: 0}, zoom=1 }: { setUserCoords: Function, center?: {lat: number, lng: number}, zoom?: number }) {

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

    <Map defaultCenter={center} defaultZoom={zoom} minZoom={1} 
      disableDefaultUI={true} clickableIcons={false} mapId={'67eb1e82a659a5f6'} 
      onClick={(event) => moveMarker(event)}>
      {coords &&
        <AdvancedMarker position={coords}>
          <Pin glyphColor={'white'} borderColor={'indigo'} background={'blue'}/>
        </AdvancedMarker>
      }
    </Map>
  );
}
