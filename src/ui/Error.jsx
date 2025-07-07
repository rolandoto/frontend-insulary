import { useNavigate } from "react-router";

export default function Error() {


    const navigate = useNavigate();

    const handleReset = () => {
        navigate(0); // Fuerza una recarga de la ruta actual
      };


    return (
        <main className="flex h-full flex-col items-center justify-center">
        <h2 className="text-center">¡Algo salió mal!</h2>
        <button
          className="mt-4 rounded-md bg-[#df0209] px-4 py-2 text-sm cursor-pointer text-white transition-colors hover:bg-[#ff8b8f]"
          onClick={handleReset}
        >
          Intentar de nuevo
        </button>
      </main>
    );
  }