'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import ParentComponent from '../components/ParentComponent';
import { useEffect, useState } from 'react';
import StartingPage from '../components/StartingPage';
import worldData from '../../data/worldData.json'; 
import vancouverData from '../../data/vancouverData.json';

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

export default function Play() {

  const [page, setPage] = useState<'play' | 'end' | 'options'>('options');
  const [options, setOptions] = useState<Options>({unlimited: false, map: 'world'});

  const [data, setData] = useState<data>(JSON.parse(JSON.stringify(worldData)));

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (options.map === 'world') {
      setData(JSON.parse(JSON.stringify(worldData)));
    }
    else if (options.map === 'vancouver') {
      setData(JSON.parse(JSON.stringify(vancouverData)));
    }
  }, [options]);

  if (page === 'play') {
    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
        <ParentComponent data={data} unlimited={options.unlimited} setPage={setPage} setTotal={setTotal}/>
      </APIProvider>
    );
  }
  else if (page === 'options') {
    return (
      <StartingPage setPage={setPage} setOptions={setOptions} options={options} />
    )
  }
  else {
    return (
      <div>
        <h1>{total}</h1>
      </div>
    );
  }
}
