import { Link } from "react-router";
import { FiPlus } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi2";
import { CiTrash } from "react-icons/ci";
import * as XLSX from 'xlsx';
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";

export function DownloadExcel  ({ data, filename }){
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, filename);
  };

  return (

      <button 
           className="flex cursor-pointer h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          size="lg" 
          onClick={exportToExcel}
          color={"green"}
          fontSize={30}>
        <PiMicrosoftExcelLogoLight fontSize={30} />
      </button>  
  
  );
};


export function CreateInvoice() {
    return (
      <Link
        to="/dashboard/invoices/create"
        className="flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:bg-bg-[#df0209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-[#df0209]"
      >
        <span className="hidden md:block">Crear cliente</span>{' '}
        <FiPlus className="h-5 md:ml-4" />
      </Link>
    );
  }
  export function CreateUsers() {
    return (
      <Link
        to="/dashboard/users/create"
        className="flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:bg-[#df0209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-[#df0209]"
      >
        <span className="hidden md:block">Crear Usuarios</span>{' '}
        <FiPlus className="h-5 md:ml-4" />
      </Link>
    );
  }


  export function CreateCustomers() {
    return (
      <Link
        to="/dashboard/customers/create"
        className="flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:bg-[#df0209] focus-visible:bg-[#df0209] focus-visible:bg-[#df0209] focus-visible:outline-offset-2 focus-visible:"
      >
        <span className="hidden md:block">Crear cliente</span>{' '}
        <FiPlus className="h-5 md:ml-4" />
      </Link>
    );
  }


   export function CreateIntermederies() {
    return (
      <Link
        to="/dashboard/intermederies/create"
        className="flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:bg-[#df0209] focus-visible:bg-[#df0209] focus-visible:bg-[#df0209] focus-visible:outline-offset-2 focus-visible:"
      >
        <span className="hidden md:block">Crear Intermediario</span>{' '}
        <FiPlus className="h-5 md:ml-4" />
      </Link>
    );
  }


     export function CreateBranches() {
    return (
      <Link
        to="/dashboard/branches/create"
        className="flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:bg-[#df0209] focus-visible:bg-[#df0209] focus-visible:bg-[#df0209] focus-visible:outline-offset-2 focus-visible:"
      >
        <span className="hidden md:block">Crear Sucursales</span>{' '}
        <FiPlus className="h-5 md:ml-4" />
      </Link>
    );
  }



  export function CreateCasos() {
    return (
      <Link
        to="/dashboard/casos/create"
        className="flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:bg-[#df0209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-[#df0209]"
      >
        <span className="hidden md:block">Crear Casos</span>{' '}
        <FiPlus className="h-5 md:ml-4" />
      </Link>
    );
  }
  
  export function UpdateInvoice({ id }) {
    return (
      <Link
        href="/dashboard/invoices" 
        className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
      >
        <HiOutlinePencil fontSize={25} className="w-5" />
      </Link>
    );
  }

export function UpdateCustomers({ id }) {
    return (
      <Link
        to={`/dashboard/customers/${id}/edit`}
        className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
      >
        <HiOutlinePencil fontSize={25} className="w-5" />
      </Link>
    );
  }


  export function UpdateCases({ id }) {
    return (
      <Link
        to={`/dashboard/casos/${id}/edit`}
        className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
      >
        <HiOutlinePencil fontSize={25} className="w-5" />
      </Link>
    );
  }


   export function UpdateIntermederies({ id }) {
    return (
      <Link
        to={`/dashboard/intermederies/${id}/edit`}
        className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
      >
        <HiOutlinePencil fontSize={25} className="w-5" />
      </Link>
    );
  }


   export function UpdateBranches({ id }) {
    return (
      <Link
        to={`/dashboard/branches/${id}/edit`}
        className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
      >
        <HiOutlinePencil fontSize={25} className="w-5" />
      </Link>
    );
  }


  export function UpdateUsers({ id }) {
    return (
      <Link
        to={`/dashboard/users/${id}/edit`}
        className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
      >
        <HiOutlinePencil fontSize={25} className="w-5" />
      </Link>
    );
  }
  


export function DeleteInvoice({ id }) {



    return (
      <>
      <form >
          <button   type="submit" className="rounded-md border border-gray-200 p-2 hover:bg-gray-100">
            <span className="sr-only">Delete</span>
            <CiTrash fontSize={25} className="w-5" />
          </button>
        </form>
      </>
    );
  }
  