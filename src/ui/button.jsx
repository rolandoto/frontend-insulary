import clsx from 'clsx';
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteCasos, uploadCasos } from '../lib/actions';
import { useSelector } from 'react-redux';
import { useActionState, useRef, useState } from 'react';
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
  const { accessToken } = useSelector((state) => state.Refrestoken);
  const uploadCasosWithId = uploadCasos.bind(null, id, accessToken);

  const initialState = { message: "", errors: {} };
  const [message, formAction, isPending] = useActionState(uploadCasosWithId, initialState);

  const [isDragging, setIsDragging] = useState(false);
  const [_, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  // Eventos de arrastrar
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);
  const fileInputRef = useRef(null);
  const input = fileInputRef.current;

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileError(""); // limpiar error
      const input = document.getElementById("file");
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      input.files = dataTransfer.files;
    }
  };


   const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  
  return (
    <>
      <form
        action={formAction}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="space-y-6">
        <Toaster richColors />

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
          {message.errors?.name?.map((error) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

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
          {message.errors?.description?.map((error) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div
          className={`w-full rounded-xl border-2 border-dashed transition-all duration-300 p-6 text-center cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-100 hover:bg-gray-50"
          }`}
          onClick={() => document.getElementById("file").click()}
>
          <input
            type="file"
            id="file"
            name="file"
            className="hidden"
            aria-describedby="file-error"
              ref={fileInputRef}

          onChange={(e) => setFile(e.target.files[0])}
          />


     {!input?.files?.length ? (
      <>
        {isDragging ? (
          <>
            <div className="text-blue-500 font-semibold text-lg">
              📄 Agrega cualquier elemento
            </div>
            <p className="text-gray-600 text-sm mt-2">
              gif, jpeg, jpg, png, webp, pdf, docx, xlsx, zip...
            </p>
          </>
        ) : (
          <>
            <div className="text-gray-500 font-medium text-lg">
              Arrastra un archivo aquí o haz clic para seleccionar
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Se aceptan todos los tipos de archivos
            </p>
          </>
        )}
      </>
    ) : (
      <div className="text-gray-700 font-medium">
        📎 Archivo seleccionado:{" "}
        <span className="text-blue-600">{input.files[0]?.name}</span>
         <p className="text-gray-500 text-sm mb-3">
            Tamaño: {formatBytes(input.files[0]?.size)} / Máx: 100 MB
          </p>
      </div>
    )}    
    
        </div>

        {fileError && (
          <p className="mt-1 text-xs text-red-500">{fileError}</p>
        )}
        {message.errors?.file?.map((error) => (
          <p className="mt-1 text-xs text-red-500" key={error}>
            {error}
          </p>
        ))}


        <div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-70"
          >
            {isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
}
