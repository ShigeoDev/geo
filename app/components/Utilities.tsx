import { Dispatch, SetStateAction, useRef } from "react";
import MiniMap from "./MiniMap";
import SubmitButtion from "./SubmitButton";
import UtilitiesButton from "./UtilitiesButton";

type checkCoords = (event: React.MouseEvent | KeyboardEvent) => void;

type utilitiesProps = {
  setUserCoords: Dispatch<SetStateAction<{ userLat: number, userLng: number } | null>>
  center?: { lat: number, lng: number },
  zoom?: number
  checkCoords: checkCoords,
  userCoords: { userLat: number, userLng: number } | null
}

export default function Utilities({ setUserCoords, center, zoom, checkCoords, userCoords }: utilitiesProps) {

  const button = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const enabled = () => {

    if (button.current && map.current && close.current && container.current) {
      button.current.classList.toggle('invisible');
      //map.current.classList.toggle('invisible');


      if (close.current.style.display === 'none') {
        close.current.style.display = 'flex';
      }
      else {
        close.current.style.display = 'none';
      }

      if (container.current.style.height === '66%') {
        container.current.style.height = '0%';
      }
      else {
        container.current.style.height = '66%';
      }
    }

  }

  return (
    <div ref={container} className="lg:h-[35rem] lg:w-[45rem] lg:bottom-[5rem] lg:right-12 
      absolute z-10 transition-all ease-in-out duration-700
      w-full h-0 bottom-0
      ">
      <div ref={button} className="lg:invisible lg:h-10 h-0 absolute bottom-[10rem] right-5">
        <UtilitiesButton enabled={enabled} />
      </div>
      <div ref={map} className="lg:w-full lg:h-full lg:scale-50 lg:flex lg:flex-col lg:transition lg:opacity-70 lg:ease-in-out lg:duration-300 lg:transform lg:origin-bottom-right lg:hover:scale-100 lg:hover:opacity-100 lg:visible
        w-full h-full">
        <MiniMap setUserCoords={setUserCoords} center={center} zoom={zoom} />
        <div className="
          absolute bottom-0 w-full z-20
          lg:static 
        ">
          <SubmitButtion checkCoords={checkCoords} userCoords={userCoords} />
        </div>
        <div ref={close} style={{display: 'none'}} className="absolute w-10 h-10 top-3 right-3 z-20 rounded-full bg-black justify-center items-center
          lg:invisible
        ">
          <button className="w-full h-full text-white text-center" onClick={enabled}>
            X
          </button>
        </div>
      </div>
    </div>);
}
