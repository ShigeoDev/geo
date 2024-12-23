import { useEffect, useState } from "react";

export default function SubmitButtion({ checkCoords, userCoords }: { checkCoords: Function, userCoords: { userLat: number, userLng: number } | null }) {

  useEffect(() => {
    document.addEventListener('keydown', (event) => checkCoords(event))
  }, []);

  if (userCoords) {
    return (
      <button className="h-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3 transition-colors ease-in duration-150 text-3xl"
        onClick={(event) => checkCoords(event)}>
        Submit
      </button>
    );
  }
  else {
    return (
      <button className="h-16 bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-full mt-3 transition-colors ease-in duration-150 text-3xl"
        onClick={(event) => checkCoords(event)}>
        Place Pin on Map
      </button>
    );
  }
}
