import { Map } from "@vis.gl/react-google-maps";

export default function MiniMap() {

  return (
    <Map defaultCenter={{lng: 0, lat:0}} defaultZoom={0} disableDefaultUI={true} clickableIcons={false} />
  );
}
