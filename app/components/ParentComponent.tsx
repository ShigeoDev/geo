import StreetViewPanorama from './StreetViewPanorama';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Scoreboard from './Scoreboard';
import Utilities from './Utilities';

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

type location = {
  panoId: string,
  lat: number,
  lng: number,
  heading: number,
  pitch: number,
  imageDate: string,
  links: Array<string>
}

type data = {
  customCoordinates: Array<location>
}

type mapSettings = {
  center: { lat: number, lng: number },
  zoom: number
}

type coords = {
  lat: number,
  lng: number
}

type ParentComponentProps = {
  data: data,
  unlimited: boolean,
  setPage: Dispatch<SetStateAction<'play' | 'end' | 'options'>>,
  setTotal: Dispatch<SetStateAction<number>>,
  mapSettings: mapSettings,
  scoreConstant: number,
  setLocations: Dispatch<SetStateAction<coords[][]>>
}

export default function ParentComponent({ data, unlimited, setPage, setTotal, mapSettings, scoreConstant, setLocations }: ParentComponentProps) {

  const [userCoords, setUserCoords] = useState<{ userLat: number, userLng: number } | null>(null);

  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const [count, setCount] = useState<number>(0);

  const locationNumber = Math.random() * data.customCoordinates.length;
  const randomLocation = data.customCoordinates[Math.floor(locationNumber)];

  const [{ lat, lng }, setCoords] = useState<{ lat: number, lng: number }>({ lat: randomLocation.lat, lng: randomLocation.lng });

  function checkCoords(event: React.MouseEvent | KeyboardEvent): void {
    if (userCoords) {
      if (event.type === 'click' || (event.type === 'keydown' && (event as KeyboardEvent).key === ' ')) {
        const distance = getDistanceFromLatLonInKm(userCoords.userLat, userCoords.userLng, lat, lng);

        const caluculatedValue = Math.ceil(5000 * (Math.E ** (-10 * distance / scoreConstant)))
        setScore(caluculatedValue);
        setShowScore(true);
      }
    }
  }

  function goNext() {
    setTotal((prev: number) => prev + score);
    setShowScore(false);
    if (userCoords) {
      setLocations((prev: Array<Array<{ lat: number, lng: number }>>) => {
        return [...prev, [{ lat: userCoords.userLat, lng: userCoords.userLng }, { lat, lng }]]
      });
    }
    setUserCoords(null);
    setCoords({ lat: randomLocation.lat, lng: randomLocation.lng });
    setCount(count + 1);
  }

  useEffect(() => {
    if (!unlimited) {
      if (count === 5) {
        setPage('end');
      }
    }
  }, [count]);

  useEffect(() => {

    if (userCoords && lat && lng) {
      setLocations((prev: Array<Array<{ lat: number, lng: number }>>) => {
        return [...prev, [{ lat: userCoords.userLat, lng: userCoords.userLng }, { lat, lng }]];
      })
    }

  }, [userCoords, lat, lng])


  if (showScore && userCoords) {
    return (
      <Scoreboard score={score} userLat={userCoords.userLat} userLng={userCoords.userLng} lat={lat} lng={lng} goNext={goNext} />
    );
  }
  else {
    return (
      <div>
        <Utilities
          setUserCoords={setUserCoords}
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          checkCoords={checkCoords}
          userCoords={userCoords} />
        {lat && lng && <StreetViewPanorama lat={lat} lng={lng} />}
      </div>
    );
  }
}
