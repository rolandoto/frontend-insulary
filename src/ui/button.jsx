import clsx from 'clsx';
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteCasos, uploadCasos } from '../lib/actions';
import { useSelector } from 'react-redux';
import { useActionState } from 'react';
import { Toaster } from 'sonner';

export function Button({ children, className,...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:[#df0209] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#df0209] active:bg-[#df0209] aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className)}>
      {children}
    </button>
  );
}



export function DeleteCasos({ id }) {
const { accessToken} = useSelector((state) => state.Refrestoken);  
const deleteCasosWithId = deleteCasos.bind(null,id,accessToken);

  return (
    <>
    <form  action={deleteCasosWithId} >
        <button   type="submit" className="rounded-md cursor-pointer border border-gray-200 p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <RiDeleteBin5Line  fontSize={25} className="w-5" />
        </button>
      </form>
    </>
  );
}





export function UploadCasos({ id }) {

  const { accessToken} = useSelector((state) => state.Refrestoken);  
  const  uploadCasosWitHId = uploadCasos.bind(null,id,accessToken);
  const initialState ={message:"",errors:{}};
 const [message, formAction, isPending] = useActionState(uploadCasosWitHId,initialState);

  return (
    <>
     <form action={formAction}   className="space-y-6">
       <Toaster richColors />
      {/* Nombre */}
      <div className="w-full">
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          id="name"
          name="name"
          placeholder="Ingrese el nombre"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-describedby="name-error"
        />
        {message.errors?.name &&
          message.errors.name.map((error) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      {/* Descripción */}
      <div className="w-full">
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Ingrese la descripción"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-describedby="description-error"
        />
        {message.errors?.description &&
          message.errors.description.map((error) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      {/* Archivo */}
      <div className="w-full">
        <label
          htmlFor="file"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Adjuntar archivo
        </label>
        <input
          type="file"
          id="file"
          name="file"
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-600 cursor-pointer"
          aria-describedby="file-error"
        />
        {message.errors?.file &&
          message.errors.file.map((error) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      {/* Botón */}
      <div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
        >
          Guardar
        </button>
      </div>
    </form> 
    </>
  );
}


