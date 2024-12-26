import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-r from-blue-500 to-indigo-600">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center text-white">
        <h1 className="text-6xl font-extrabold mb-4">
          PinThePlace
        </h1>

        <p className="mt-3 text-2xl font-semibold">
          Explore the World through Street View
        </p>

        <div className="mt-6">
          <Link href="/play" className="px-6 py-3 text-xl font-bold bg-white text-indigo-600 rounded-md shadow-md hover:bg-indigo-100 transition-all">
              Start Playing
          </Link>
        </div>
      </main>
    </div>
  );
}

