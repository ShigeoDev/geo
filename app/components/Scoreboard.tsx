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

  const distance = getDistanceFromLatLonInKm(userLat, userLng, lat, lng);

  const zoom = Math.max(6 * (1 - (distance / 14916.862) ** 1.8), 1);

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
        strokeWeight: 1,
      });
    }
  }, [map]);

  return (
    <div className='h-screen w-screen'>
      <div className='h-5/6'>
        <Map defaultCenter={center} defaultZoom={zoom} mapId={'67eb1e82a659a5f6'} disableDefaultUI={true} minZoom={1}>
          <AdvancedMarker position={{ lat: userLat, lng: userLng }}>
            <Pin background={'blue'} borderColor={'indigo'} glyphColor={'white'} />
          </AdvancedMarker>
          <AdvancedMarker position={{ lat: lat, lng: lng }}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1/6 flex flex-row justify-center items-center gap-10">
        <div>
          <div className="text-center text-white font-bold text-4xl w-52">
            {distance.toFixed(2)} km
          </div>
          <div className="text-center text-white font-semibold text-sm">
            from location
          </div>
        </div>
        <div className="align-middle text-center">
          <button onClick={() => goNext()} className="hover:scale-105 transition ease-in-out duration-150 bg-white rounded-md w-60 h-16 text-indigo-600 font-bold text-2xl shadow-md">
            Next
          </button>
        </div>
        <div className="text-center text-white font-bold text-4xl w-52">
          {score} pts
        </div>
      </div>
    </div>
  );
}
