import { Map, useMap, AdvancedMarker, Pin, useMapsLibrary } from "@vis.gl/react-google-maps";
import { getDistanceFromLatLonInKm } from "./ParentComponent";
import { useEffect } from "react";

interface ScoreboardProps {
  score: number;
  userLat: number;
  userLng: number;
  lat: number;
  lng: number;
  goNext: Function;
}

export default function Scoreboard({ score, userLat, userLng, lat, lng, goNext }: ScoreboardProps) {

  const centerlat = (userLat + lat) / 2;
  const centerlng = (userLng + lng) / 2;
  const center = { lat: centerlat, lng: centerlng };

  const zoom = Math.max(6 * (1 - (getDistanceFromLatLonInKm(userLat, userLng, lat, lng) / 14916.862) ** 1.8), 1);

  const MapLibrary = useMapsLibrary('maps');
  const map = useMap();

  useEffect(() => {
    if (MapLibrary && map) {
      new MapLibrary.Polyline({
        map: map,
        clickable: false,
        draggable: false,
        path: [{ lat: userLat, lng: userLng }, { lat: lat, lng: lng }],
        strokeColor: 'black',
        strokeWeight: 4,
      });
    }
  }, [map]);

  return (
    <div className='h-screen w-screen'>
      <div className='h-5/6'>
        <Map defaultCenter={center} defaultZoom={zoom} mapId={'67eb1e82a659a5f6'} disableDefaultUI={true}>
          <AdvancedMarker position={{ lat: userLat, lng: userLng }}>
            <Pin background={'blue'} borderColor={'blue'} glyphColor={'blue'} />
          </AdvancedMarker>
          <AdvancedMarker position={{ lat: lat, lng: lng }}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
      <div className="bg-blue-300 h-1/6 flex flex-col">
        <div className="text-center">
          {score}
        </div>
        <div className="align-middle text-center">
          <button onClick={() => goNext()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
