import { useEffect } from "react";
import ActionsClient from "../../Actions/ActionsClient";
import { useSelector } from "react-redux";
import { UpdateCustomers } from "./buttons";
import users  from "../../../public/customers/evil-rabbit.png"
import { InvoicesTableSkeleton } from "../skeleton";

export default  function Table({query,currentPage}) {

    const {PostClient,PostClientPages} =   ActionsClient()
    const {clients,loading}= useSelector((state) => state.clients )
    
    const { accessToken} = useSelector(
      (state) => state.Refrestoken
    );
    
    useEffect(() => {
        const fetch = () => {
        PostClient({ query, currentPage,token:accessToken});
        PostClientPages({query,token:accessToken});
        };
        fetch();
    }, [query, currentPage]);

  if(loading)  return  <InvoicesTableSkeleton />
 
  return (
    <div className="mt-6 flow-root">
        <div className="mt-6 flow-root">
      <div className="block w-full align-middle">
        <div className="modern-table-shell p-2 md:pt-0">
          <div className="md:hidden">
            {clients?.length ? clients?.map((client) => (
              <div
                key={client.id}
                className="modern-mobile-card mb-3 w-full p-4">
                <div className="flex items-center justify-between  border-gray-200  border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <img
                        src={users}
                        className="mr-2 rounded-full"
                        alt={`${client.nombre}'s profile picture`}
                      />
                      <p>{client.nombre}</p>
                    </div>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                        {client.amount}
                    </p>
                    <p>{client.date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCustomers id={client.id} />
                  </div>
                </div>
              </div>
            )) : (
              <div className="modern-empty-state rounded-xl bg-white">No hay clientes para mostrar.</div>
            )}
          </div>
          <div className="modern-table-wrapper hidden md:block">
            <table className="modern-table min-w-[980px] table-auto text-sm text-gray-700">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Cliente
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Documento
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dirección
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    ciudad
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    email
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {clients?.length ? clients?.map((client) => (
                <tr
                key={client.id}
                  className="w-full align-middle text-sm">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    <img
                        src={users}
                        className="mr-2 w-8 rounded-full"
                        alt={`${client.nombre}'s profile picture`}
                      />
                     {client.nombre}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {client.nit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {client.direccion}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {client.ciudad}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {client.email}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <UpdateCustomers id={client.id} />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="modern-empty-state">
                    No hay clientes para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
