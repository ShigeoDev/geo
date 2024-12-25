import StreetViewPanorama from './StreetViewPanorama';
import { useEffect, useState } from 'react';
import MiniMap from './MiniMap';
import SubmitButtion from './SubmitButton';
import Scoreboard from './Scoreboard';

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1);  // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
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

export default function ParentComponent({ data, unlimited, setPage, setTotal}: { data: data, unlimited: boolean, setPage: Function, setTotal: Function}) {

  const [userCoords, setUserCoords] = useState<{ userLat: number, userLng: number } | null>(null);

  const [showScore, setShowScore] = useState<Boolean>(false);
  const [score, setScore] = useState<number>(0);

  const[count, setCount] = useState<number>(0);

  const locationNumber = Math.random() * data.customCoordinates.length;
  const randomLocation = data.customCoordinates[Math.floor(locationNumber)];

  const [{ lat, lng }, setCoords] = useState<{ lat: number, lng: number }>({ lat: randomLocation.lat, lng: randomLocation.lng });

  function checkCoords(event: MouseEvent | KeyboardEvent): void {
    if (userCoords) {
      if (event.type === 'click' || (event.type === 'keydown' && (event as KeyboardEvent).key === ' ')) {
        const distance = getDistanceFromLatLonInKm(userCoords.userLat, userCoords.userLng, lat, lng);

        const caluculatedValue = Math.ceil(5000 * (Math.E ** (-10 * distance / 14916.862)))
        setScore(caluculatedValue);
        setShowScore(true);
      }
    }
  }

  function goNext() {
    setTotal((prev: number) => prev + score);
    setShowScore(false);
    setUserCoords(null);
    setCoords({ lat: randomLocation.lat, lng: randomLocation.lng });
    setCount(count + 1);
  }

  if (!unlimited) {
    useEffect(() => {
      if (count === 5) {
        setPage('end');
      }
    }, [count]);
  }

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      checkCoords(event)
    });
  }, [userCoords]);


  if (showScore && userCoords) {
    return (
      <Scoreboard score={score} userLat={userCoords.userLat} userLng={userCoords.userLng} lat={lat} lng={lng} goNext={goNext} />
    );
  }
  else {
    return (
      <div>
        <div className='h-[35rem] w-[45rem] scale-50 absolute bottom-[5rem] right-12 z-10 flex flex-col transition opacity-70 ease-in-out duration-300 transform origin-bottom-right hover:scale-100 hover:opacity-100'>
          <MiniMap setUserCoords={setUserCoords} />
          <SubmitButtion checkCoords={checkCoords} userCoords={userCoords} />
        </div>
        {lat && lng && <StreetViewPanorama lat={lat} lng={lng} />}
      </div>
    );
  }
}
