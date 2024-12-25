import { ChangeEventHandler, useEffect, useState } from "react";

type Options = {
  unlimited: boolean;
  map: string;
}

export default function StartingPage({ setPage, setOptions, options }: { setPage: Function, setOptions: Function, options: Options}) {

  const [localOptions, setLocalOptions] = useState<Options>(options);

  useEffect(() => {

    setOptions(localOptions);

  }, [localOptions])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <button className="text-6xl font-bold" onClick={() => setPage('play')}>
          Play
        </button>
        <p className="mt-3 text-2xl">
          Options
        </p>
        <div className="mt-6">
          <div>
            <input type="radio" id="Unlimited" name="length" value="unlimited" checked={options.unlimited === true} onChange={() => setLocalOptions({unlimited: true, map: localOptions.map})}/>
            <label htmlFor="Unlimited">Unlimited</label>
            <input type="radio" id="Limited" name="length" checked={options.unlimited === false} value="limited" onChange={() => setLocalOptions({unlimited: false, map: localOptions.map})}/>
            <label htmlFor="Limited">Limited</label>
          </div>
          <div>
            <input type="radio" id="World" name="map" value="world" checked={options.map === "world"} onChange={() => setLocalOptions({unlimited: localOptions.unlimited, map: "world"})}/>
            <label htmlFor="World">World</label>
            <input type="radio" id="Vancouver" name="map" value="vancouver" checked={options.map === "vancouver"} onChange={() => setLocalOptions({unlimited: localOptions.unlimited, map: "vancouver"})}/>
            <label htmlFor="Vancouver">Vancouver</label>
          </div>
        </div>
      </main>
    </div>
  );
}
