import { useState } from "react";
import { Button } from "../../ui/button";
import { IoKeyOutline } from "react-icons/io5";
import { BackLogin } from "../../ui/customers/buttons";
import UseUsers from "../../hooks/UseUsers";

export default function ConfirmCodePage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
     const { logiVeirfyCode,isError } = UseUsers();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().length !== 6) {
      setError("El código debe tener 6 dígitos");
      return;
    }
    setError("");
    logiVeirfyCode({code})
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-2xl">
        {/* Encabezado con logo */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white font-bold text-xl shadow">
            I
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            INSULARI
          </h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Verificar código
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Te enviamos un código de verificación a tu correo electrónico.
              Ingrésalo a continuación para continuar.
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="peer block w-full rounded-lg border border-gray-300 py-3 pl-12 pr-3 text-center text-lg font-mono tracking-widest outline-none focus:ring-2 focus:ring-black focus:border-black"
              placeholder="000000"
              maxLength={6}
            />
            <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-black" />
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}

          <Button className="w-full py-3 text-base">Confirmar código</Button>
        </form>
            {isError&& <p className="mt-2 text-sm text-red-500" >
                      Error en el codigo
            </p>}
        <BackLogin />
      </div>
    </main>
  );
}