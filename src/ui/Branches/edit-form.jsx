'use client';

import { CiUser } from "react-icons/ci";
import { Link } from "react-router";
import { Button } from "../button";
import {  updatebranches } from "../../lib/actions";
import { useActionState } from "react";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";

export default function EditIntermederiesForm({ branches }) {
  const { accessToken} = useSelector(
    (state) => state.Refrestoken
  );  
    const initialState ={message:"",errors:{}};
    const updateWithId = updatebranches.bind(null,branches.id,accessToken);
    const [message, formAction, isPending] = useActionState(updateWithId,initialState);
    const {ClientFilter} = useSelector((state) => state.clients);

  return (
    <form action={formAction}  >
         <Toaster richColors position="top-center" />

    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nombre 
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="name"
            name="name"
            placeholder="Ingrese su nombre"
            defaultValue={branches.nombre}
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
          Codigo
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="code"
            name="code"
            placeholder="Ingrese su número de documento"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="code-error"
            defaultValue={branches.codigo}
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        <div id="code-error" aria-live="polite" aria-atomic="true">
              {message.errors?.code &&
                message.errors.code.map((error) => (
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
            defaultValue={branches.direccion}
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
            defaultValue={branches.telefono}
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
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                Cliente
            </label>
            <div className="relative">
                <select
                id="clientId"
                name="clientId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                defaultValue={branches.idcliente}
                >
                <option value="" disabled>
                    Selecione el rol
                </option>
                {ClientFilter.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                    {customer.NOMBRE}
                    </option>
                ))}
                </select>
                <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
                {message.errors?.clientId &&
                    message.errors.clientId.map((error) => (
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
      <Button type="submit">Actualizar Sucursal</Button>
    </div>
  </form>
  );
}
