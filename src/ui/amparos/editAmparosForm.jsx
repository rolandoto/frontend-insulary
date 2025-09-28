'use client';

import { CiUser } from "react-icons/ci";
import { Link } from "react-router";
import { Button } from "../button";
import {  updateAmparos, updateIntermederies } from "../../lib/actions";
import { useActionState } from "react";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

export default function EditIntermederiesForm({ amparosById }) {
  const { accessToken} = useSelector(
    (state) => state.Refrestoken
  );  
    const initialState ={message:"",errors:{}};
    const updateWithId = updateAmparos.bind(null,amparosById.id,accessToken);
    const [message, formAction, isPending] = useActionState(updateWithId,initialState);

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
                    defaultValue={amparosById.nombre}
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
            
            
            </div>
            <div className="mt-6 flex justify-end gap-4">
            <Link
                to="/dashboard/amparos"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Cancelar
            </Link>
            <Button type="submit">Actualizar Amparos</Button>
            </div>
    </form>
  );
}
