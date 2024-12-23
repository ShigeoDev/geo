import { useEffect } from "react";

export default function SubmitButtion({ checkCoords, userCoords }: { checkCoords: Function, userCoords: { userLat: number, userLng: number } | null }) {

  useEffect(() => {
    document.addEventListener('keydown', (event) => checkCoords(event))
  }, []);

  if (userCoords) {
    return (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl mt-3"
        onClick={(event) => checkCoords(event)}>
        Submit
      </button>
    );
  }
  else {
    return (
      <button className="bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded-3xl mt-3"
        onClick={(event) => checkCoords(event)}>
        Place Pin on Map
      </button>
    );
  }
}
