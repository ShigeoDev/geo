import { useEffect, useState } from "react";

type Options = {
  unlimited: boolean;
  map: string;
}

export default function StartingPage({ setPage, setOptions, options }: { setPage: Function, setOptions: Function, options: Options }) {

  const [localOptions, setLocalOptions] = useState<Options>(options);

  useEffect(() => {
    setOptions(localOptions);
  }, [localOptions]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-r from-blue-500 to-indigo-600">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center text-white">
        <button
          className="px-6 py-3 text-2xl font-bold bg-white text-indigo-600 rounded-md shadow-md hover:bg-indigo-100 transition-all"
          onClick={() => setPage('play')}
        >
          Play
        </button>
        <p className="mt-6 text-2xl font-semibold">Options</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div className="flex flex-col items-start">
            <p className="font-bold">Length:</p>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                id="Unlimited"
                name="length"
                value="unlimited"
                checked={options.unlimited}
                onChange={() => setLocalOptions({ unlimited: true, map: localOptions.map })}
                className="mr-2 accent-pink-500"
              />
              Unlimited
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                id="Limited"
                name="length"
                value="limited"
                checked={!options.unlimited}
                onChange={() => setLocalOptions({ unlimited: false, map: localOptions.map })}
                className="mr-2 accent-pink-500"
              />
              Limited
            </label>
          </div>

          <div className="flex flex-col items-start">
            <p className="font-bold">Map:</p>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                id="World"
                name="map"
                value="world"
                checked={options.map === 'world'}
                onChange={() => setLocalOptions({ unlimited: localOptions.unlimited, map: 'world' })}
                className="mr-2 accent-pink-500"
              />
              World
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                id="Vancouver"
                name="map"
                value="vancouver"
                checked={options.map === 'vancouver'}
                onChange={() => setLocalOptions({ unlimited: localOptions.unlimited, map: 'vancouver' })}
                className="mr-2 accent-pink-500"
              />
              Vancouver
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}

