'use client';

import { CiUser } from "react-icons/ci";
import { Link } from "react-router";
import { Button } from "../button";
import { createCustomers, createIntermederies } from "../../lib/actions";
import { useActionState } from "react";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

export default function Form({ customers }) {

  const { accessToken} = useSelector(
    (state) => state.Refrestoken
  );  
  const initialState ={message:"",errors:{}};
  const createcustomersWihToken = createIntermederies.bind(null,accessToken);
  const [message, formAction, isPending] = useActionState(createcustomersWihToken,initialState);


  return (

    <form action={formAction}  >
    <Toaster richColors position="top-center" />
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nombre completo
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="name"
            name="name"
            placeholder="Ingrese su nombre"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="name-error"
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
              {message.errors?.name &&
                message.errors.name.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
      </div>
    
     
      <div className="mb-4">
        <label htmlFor="document" className="mb-2 block text-sm font-medium">
          Documento
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="document"
            name="document"
            placeholder="Ingrese su número de documento"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="document-error"
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        <div id="document-error" aria-live="polite" aria-atomic="true">
              {message.errors?.document &&
                message.errors.document.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
      </div>
  
      {/* Dirección */}
      <div className="mb-4">
        <label htmlFor="addres" className="mb-2 block text-sm font-medium">
          Dirección
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="addres"
            name="addres"
            placeholder="Ingrese su dirección"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="addres-error"
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div id="addres-error" aria-live="polite" aria-atomic="true">
              {message.errors?.addres &&
                message.errors.addres.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
      </div>
  

     
  
      {/* Teléfono */}
      <div className="mb-4">
        <label htmlFor="telefono" className="mb-2 block text-sm font-medium">
          Teléfono
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="telefono"
            name="telefono"
            placeholder="Ingrese su número de teléfono"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="telefono-error"
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div id="telefono-error" aria-live="polite" aria-atomic="true">
              {message.errors?.telefono &&
                message.errors.telefono.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
      </div>
  

      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Correo electrónico
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="email-error"
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      <div id="email-error" aria-live="polite" aria-atomic="true">
              {message.errors?.email &&
                message.errors.email.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
        </div>

     <div className="mb-4">
        <label htmlFor="Tipo" className="mb-2 block text-sm font-medium">
          Tipo
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="tipo"
            name="tipo"
            placeholder="Ingrese su Tipo"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="Tipo-error"
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div id="Tipo-error" aria-live="polite" aria-atomic="true">
              {message.errors?.tipo &&
                message.errors.tipo.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
      </div>

    </div>
  
    <div className="mt-6 flex justify-end gap-4">
      <Link
        to="/dashboard/intermederies"
        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Cancelar
      </Link>
      <Button  type="submit">Crear Intermediario</Button>
    </div>
  </form>
   
  );
}
