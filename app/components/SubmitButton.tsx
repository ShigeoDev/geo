import { useEffect } from "react";

type checkCoords = (event: React.MouseEvent | KeyboardEvent) => void;

type submitButtonProps = {
  checkCoords: checkCoords,
  userCoords: { userLat: number, userLng: number } | null
}

export default function SubmitButtion({ checkCoords, userCoords }: submitButtonProps) {

  useEffect(() => {
    document.addEventListener('keydown', (event) => checkCoords(event))
  }, []);

  if (userCoords) {
    return (
      <button className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3 transition-colors ease-in duration-150 text-3xl"
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
