
import { CiUser } from "react-icons/ci";
import { Link } from "react-router";
import { Button } from "../button";
import { createCustomers, createUsers } from "../../lib/actions";
import { useActionState, useEffect } from "react";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";
import ActionsUsers from "../../Actions/ActionsUsers";

export default function FormUsers() {


  const {PostUsersRole} = ActionsUsers()
  const { accessToken} = useSelector(
    (state) => state.Refrestoken
  );  
  const {roles} = useSelector(
    (state) => state.users
  );  

  useEffect(() => {
    const fetch = () => {
      PostUsersRole({token:accessToken});
    };
    fetch();
}, []);


  const initialState ={message:"",errors:{}};
  const createUsersWihToken = createUsers.bind(null,accessToken);
  const [message, formAction, isPending] = useActionState(createUsersWihToken,initialState);

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
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Contraseña
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="password"
            name="password"
            placeholder="Ingrese contraseña"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
            aria-describedby="password-error"
          />
          <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
      <div id="password-error" aria-live="polite" aria-atomic="true">
              {message.errors?.password &&
                message.errors.password.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
        </div>

      <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Tipo de Rol
          </label>
          <div className="relative">
            <select
              id="customer"
              name="usersId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Selecione el rol
              </option>
              {roles?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {message.errors?.usersId &&
                message.errors.usersId.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        </div>
    
  

    </div>
    
  
    <div className="mt-6 flex justify-end gap-4">
      <Link
        to="/dashboard/customers"
        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Cancelar
      </Link>
      <Button type="submit">Crear cliente</Button>
    </div>
  </form>
  
    
  );
}
