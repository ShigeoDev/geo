import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export default function StreetViewPanorama({lat, lng}: {lat: number, lng: number}) {

  const streetViewLibrary = useMapsLibrary('streetView');


  useEffect(() => {
    if (streetViewLibrary) {
      new streetViewLibrary.StreetViewPanorama(
        document.getElementById("street-view-panorama") as HTMLElement,
        {
          position: { lat, lng },
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
          disableDefaultUI: true,
          linksControl: true,
          showRoadLabels: false,
          motionTrackingControl: false,

        }
      );
    }
  }, [streetViewLibrary]);

  return <div id="street-view-panorama" className="h-screen" />;
}
