
type utilitiesButtonProps = {
  enabled:  () => void
}

export default function UtilitiesButton({enabled} : utilitiesButtonProps) {

  return (
    <div className="w-[100px] h-[100px] bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center align-middle rounded-full shadow-md">
      <button className="w-full h-full" onClick={() => enabled()}>
        {'🚩'}
      </button>
    </div>
  );
}
