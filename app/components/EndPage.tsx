import { Map, AdvancedMarker, Pin, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

type coords = {
  lat: number,
  lng: number
}

type mapSettings = {
  center: { lat: number, lng: number },
  zoom: number
}

export default function EndPage({ locations, mapSettings, total, setPage, setTotal, setLocations}: { locations: Array<Array<coords>>, mapSettings: mapSettings, total: number, setPage: Function, setTotal: Function, setLocations: Function}) {

  console.log(locations[0][0]);

  const MapLibrary = useMapsLibrary('maps');
  const map = useMap();

  useEffect(() => {

    if (map && MapLibrary) {
      locations.forEach((location) => {
        new MapLibrary.Polyline({
          map: map,
          clickable: false,
          draggable: false,
          path: [{ lat: location[0].lat, lng: location[0].lng }, { lat: location[1].lat, lng: location[1].lng }],
          strokeColor: 'black',
          strokeWeight: 1,
        });
      });
    }

  }, [map, MapLibrary]);

  return (
    <div className='h-screen w-screen'>
      <div className='h-5/6'>
        <Map defaultCenter={mapSettings.center} defaultZoom={mapSettings.zoom + 1} mapId={'67eb1e82a659a5f6'} disableDefaultUI={true} minZoom={1}>
          {locations.map((location, index) => {
            return (
              <div key={index}>
                <AdvancedMarker position={{ lat: location[0].lat, lng: location[0].lng }}>
                  <Pin background={'blue'} borderColor={'indigo'} glyphColor={'white'} />
                </AdvancedMarker>
                <AdvancedMarker position={{ lat: location[1].lat, lng: location[1].lng }}>
                  <Pin />
                </AdvancedMarker>
              </div>
            );
          })}
        </Map>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1/6 flex flex-row justify-center items-center gap-10">
        <div>
          <div className="text-center text-white font-bold text-4xl w-52">
            {/* Space for button in Middle */}
          </div>
        </div>
        <div className="align-middle text-center">
          <button onClick={() => {
            setPage('options');
            setTotal(0);
            setLocations([]);
          }} className="hover:scale-105 transition ease-in-out duration-150 bg-white rounded-md w-60 h-16 text-indigo-600 font-bold text-2xl shadow-md">
            Play Again
          </button>
        </div>
        <div className="text-center text-white font-bold text-4xl w-52">
          {total} pts
        </div>
      </div>
    </div>
  );
}
