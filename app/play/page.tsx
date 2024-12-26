'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import ParentComponent from '../components/ParentComponent';
import { useEffect, useState } from 'react';
import StartingPage from '../components/StartingPage';
import worldData from '../../data/worldData.json';
import vancouverData from '../../data/vancouverData.json';
import EndPage from '../components/EndPage';

type Options = {
  unlimited: boolean;
  map: string;
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

type coords = {
  lat: number,
  lng: number
}

export default function Play() {

  const [page, setPage] = useState<'play' | 'end' | 'options'>('options');
  const [options, setOptions] = useState<Options>({ unlimited: false, map: 'world' });

  const [data, setData] = useState<data>(JSON.parse(JSON.stringify(worldData)));
  const [scoreConstant, setScoreConstant] = useState<number>(14916.862);

  const [locations, setLocations] = useState<Array<Array<coords>>>([]);

  const [mapSettings, setMapSettings] = useState<{ center: { lat: number, lng: number }, zoom: number }>({ center: { lat: 0, lng: 0 }, zoom: 1 });

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (options.map === 'world') {
      setData(JSON.parse(JSON.stringify(worldData)));
      setMapSettings({ center: { lat: 0, lng: 0 }, zoom: 1 });
      setScoreConstant(14916.862);
    }
    else if (options.map === 'vancouver') {
      setData(JSON.parse(JSON.stringify(vancouverData)));
      setMapSettings({ center: { lat: 49.2827, lng: -123.1207 }, zoom: 10 });
      setScoreConstant(60);
    }
  }, [options]);

  if (page === 'play') {
    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
        <ParentComponent data={data} unlimited={options.unlimited} setPage={setPage} setTotal={setTotal} mapSettings={mapSettings} scoreConstant={scoreConstant} setLocations={setLocations}/>
      </APIProvider>
    );
  }
  else if (page === 'options') {
    return (
      <StartingPage setPage={setPage} setOptions={setOptions} options={options} />
    )
  }
  else {
    console.log(mapSettings);
    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
        <EndPage locations={locations} mapSettings={mapSettings} total={total} setPage={setPage} setTotal={setTotal} setLocations={setLocations}/>
      </APIProvider>
    );
  }
}
