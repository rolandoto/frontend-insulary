
import { useSelector } from "react-redux";
import ActionsCasos from "../../Actions/ActionsCasos";
import { useEffect } from "react";
import users  from "../../../public/customers/evil-rabbit.png"
import { UpdateCases, UpdateCustomers, UploadDocumentCases } from "../customers/buttons";
import { InvoicesTableSkeleton } from "../skeleton";
import moment from "moment";
import SemaforoEstado from "./Trafficlight";
import { DeleteCasos } from "../button";
import { Toaster } from "sonner";

export default  function Table({query,currentPage}) {

    const {casos,loading}= useSelector((state) => state.Casos )
    const { accessToken} = useSelector(
        (state) => state.Refrestoken
      );
  
    const {PostCasos,PostCasostPages} = ActionsCasos()

      
    useEffect(() => {
        const fetch = () => {
            PostCasos({ query, currentPage,token:accessToken});
            PostCasostPages({query,token:accessToken})
        };
        fetch();
    }, [query, currentPage]);

    if(loading)  return  <InvoicesTableSkeleton />

  return (
    <div className="mt-6 flow-root">
        <Toaster richColors position="top-center" />
        <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="modern-table-shell p-2 md:pt-0">
            <div className="md:hidden">
                {casos?.length ? casos?.map((client) => {
                       const dateAsing  =moment(client.asignacion).format('DD-MM-YYYY')
             
                return <div
                    key={client.id}
                    className="modern-mobile-card mb-3 w-full p-4">
                    <div className="flex items-center justify-between  border-gray-200  border-b pb-4">
                    <div>
                        <div className="mb-2 flex items-center">
                        <img
                            src={users}
                            className="mr-2 rounded-full"
                            alt={`${client.cliente}'s profile picture`}
                        />
                        <p>  {client.cliente}</p>
                        </div>
                     
                    </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                    <div>
                        <p className="text-xl font-medium">
                            {client.amount}
                        </p>
                        <p>{dateAsing}</p>
                    </div>
                    <div>
                  
                    </div>
                    <div className="flex justify-end gap-2">
                        <UpdateCustomers id={client.id} />
                        <DeleteCasos id={client.id} />
                    </div>
                    </div>
                </div>
                   }) : (
                    <div className="modern-empty-state rounded-xl bg-white">No hay casos para mostrar.</div>
                   )}
            </div>
            <div className="modern-table-wrapper hidden md:block">
            <table className="modern-table min-w-full table-auto text-sm text-gray-700">
                <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Numero	
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Cliente
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Intermediario
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Caso
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Poliza
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Asegurado
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Siniestro
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Placa
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Asignación
                    </th>
                
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                {casos?.length ? casos?.map((client) => {

                    const dateAsing  =moment(client.asignacion).format('DD-MM-YYYY')
                  
                    return    <tr
                    key={client.id}
                    className="w-full align-middle text-sm">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                        <img
                            src={users}
                            className="mr-2 w-4 rounded-full"
                            alt={`${client.nombre}'s profile picture`}
                        />
                        {client.numero}
                        </div>
                    </td>
                    
                   <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                     {client.cliente}
                    </td>
                     <td  className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                    {client.Intermediario}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                    {client.caso}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                    {client.poliza}
                    </td>
                   <td  className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                    {client.asegurado}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                    {client.siniestro}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                    {client.placa_asegurada}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] px-3 py-3">
                    {dateAsing}
                    </td>
                    <SemaforoEstado nombreEstado={client.estado} />
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                            <UploadDocumentCases id={client.id}  />
                            <UpdateCases id={client.id} />
                            <DeleteCasos id={client.id} />
                        </div>
                    </td>
                    </tr>
                }) : (
                  <tr>
                    <td colSpan={10} className="modern-empty-state">
                      No hay casos para mostrar.
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
