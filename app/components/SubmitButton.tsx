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
      <button className="lg:h-16 h-12 lg:rounded-full lg:text-3xl text-xl
        bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 transition-colors ease-in duration-150 w-full"
        onClick={(event) => checkCoords(event)}>
        Submit
      </button>
    );
  }
  else {
    return (
      <button className="lg:h-16 h-12 lg:rounded-full lg:text-3xl text-xl
        bg-gray-500 text-gray-200 font-bold py-2 px-4 mt-3 transition-colors ease-in duration-150 w-full"
        onClick={(event) => checkCoords(event)}>
        Place Pin on Map
      </button>
    );
  }
}
