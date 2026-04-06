
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { InvoicesTableSkeleton } from "../skeleton";
import { UpdateAmparos, UpdateBranches } from "../customers/buttons";
import users  from "../../../public/customers/evil-rabbit.png"
import ActionsAmparos from "../../Actions/ActionsAmparos";

export default  function Table({query,currentPage}) {

    const {PostBranches,PostAmparosTotalPages} =   ActionsAmparos()
    const {loading,amparos}= useSelector((state) => state.amparos)
    const {accessToken} = useSelector((state) => state.Refrestoken);

    useEffect(() => {
        const fetch = () => {
        PostBranches({ query, currentPage,token:accessToken});
        PostAmparosTotalPages({query,token:accessToken});
        };
        fetch();
    }, [query, currentPage]);
    
    if(loading)  return  <InvoicesTableSkeleton />
   
  return (
    <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="modern-table-shell p-2 md:pt-0">
            <div className="md:hidden">
                {amparos?.length ? amparos?.map((client) => (
                <div
                    key={client.id}
                    className="modern-mobile-card mb-3 w-full p-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
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
                        <p className="text-xl font-medium">{client.telefono}</p>
                        <p>{client.codigo}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <UpdateAmparos id={client.id} />
                    </div>
                    </div>
                </div>
                )) : (
                    <div className="modern-empty-state rounded-xl bg-white">No hay amparos para mostrar.</div>
                )}
            </div>
            <div className="modern-table-wrapper hidden md:block">
            <table className="modern-table min-w-full table-auto text-sm text-gray-700">
                <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Código
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Nombre
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Editar
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                {amparos?.length ? amparos?.map((client) => (
                    <tr
                    key={client.id}
                    className="w-full align-middle text-sm"
                    >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                        <img
                            src={users}
                            className="mr-2 w-8 rounded-full"
                            alt={`${client.nombre}'s profile picture`}
                        />
                        {client.id}
                        </div>
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                        {client.nombre}
                    </td>
                        <td className="whitespace-nowrap pl-2">
                            <div className="flex ">
                            <UpdateAmparos id={client.id} />
                            </div>
                        </td>
                    </tr>
                    )) : (
                        <tr>
                            <td colSpan={3} className="modern-empty-state">
                                No hay amparos para mostrar.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
            </div>
        </div>
        </div>
  );
}
