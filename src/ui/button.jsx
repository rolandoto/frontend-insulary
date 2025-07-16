import clsx from 'clsx';
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteCasos } from '../lib/actions';
import { useSelector } from 'react-redux';

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
