'use client';

import moment from "moment";
import { UploadCasos } from "../button";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Error from "../Error";
import { InvoicesTableSkeleton } from "../skeleton";
import { Trash2, Eye ,Search} from "lucide-react";
import { config } from "../../Config/Config";
import { useState } from "react";

export default function TableDocument({casosDocument}) {

    const dateAsing  =moment(casosDocument.fecha_asignacion).format('DD-MM-YYYY')
    const {id} =useParams()


     const { document,loadingDocument,errorDocument } = useSelector((state) => state.clients);

    const fillContent =() =>{
                if(loadingDocument){
                return   <InvoicesTableSkeleton />
                }
                if(errorDocument){
                    return <Error />
                }  
        }


          const [search, setSearch] = useState("");

          // Filtrar documentos por nombre (sin distinguir mayúsculas)
          const filteredDocs = document.filter((doc) =>
            doc.nombre.toLowerCase().includes(search.toLowerCase())
          );

    return  <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Cliente / Aseguradora</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Cliente:</span> {casosDocument.nombre}
                  </div>
                  <div>
                    <span className="font-semibold">Nit:</span>{casosDocument.nit}
                  </div>
                  <div>
                    <span className="font-semibold">Teléfono:</span>{casosDocument.telefono}
                  </div>
                  <div>
                    <span className="font-semibold">Ciudad:</span>{casosDocument.ciudad}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Dirección:</span> {casosDocument.direccion}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {casosDocument.email}
                  </div>
                  <div>
                    <span className="font-semibold">Intermediario:</span> {casosDocument.intermediarios_nombre}
                  </div>
                  <div>
                    <span className="font-semibold">Asignador:</span>{casosDocument.asignador}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-center mb-4">DOCUMENTOS</h2>
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Número</th>
                      <th className="p-2 text-left">Cliente</th>
                      <th className="p-2 text-left">Caso</th>
                      <th className="p-2 text-left">Póliza</th>
                      <th className="p-2 text-left">Asegurado</th>
                      <th className="p-2 text-left">Siniestro</th>
                      <th className="p-2 text-left">Placa</th>
                      <th className="p-2 text-left">Asignación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-b">
                      <td className="p-2">{casosDocument.numero}</td>
                      <td className="p-2">{casosDocument.nombre}</td>
                      <td className="p-2">{casosDocument.caso}</td>
                      <td className="p-2">{casosDocument.poliza}</td>
                      <td className="p-2">{casosDocument.asegurado_nombres}</td>
                      <td className="p-2">{casosDocument.siniestro}</td>
                      <td className="p-2">{casosDocument.placa_asegurada}</td>
                      <td className="p-2">{dateAsing}</td>
                    </tr>
                  </tbody>
                </table>

                    <UploadCasos id={id} />
              
              </div>

        {fillContent()}
          
           <div className="flex items-center justify-between mb-4">
              <div className="relative w-full ">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
              
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-left">
                  <th className="p-4 text-sm font-semibold text-gray-700">📄 Nombre</th>
                  <th className="p-4 text-sm font-semibold text-gray-700">📝 Descripción</th>
                  <th className="p-4 text-sm font-semibold text-gray-700 text-center w-44">⚡ Acciones</th>
                </tr>
              </thead>
            <tbody>
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc, index) => (
                <tr
                  key={doc.id ?? index}
                  className="border-b last:border-0 hover:bg-gray-50 transition duration-200"
                >
                  {/* Nombre */}
                  <td className="p-4 text-gray-900 font-medium text-sm">
                    {doc.nombre}
                  </td>

                  {/* Descripción */}
                  <td className="p-4 text-gray-700 text-sm">
                    <span
                      className="block max-w-[500px] truncate text-gray-600 italic"
                      title={doc.descripcion || ""}
                    >
                      {doc.descripcion || "—"}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* Ver documento */}
                      <button
                        onClick={() =>
                          window.open(`${config.serverRoute}/uploads/${doc.archivo}`, "_blank")
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs shadow-sm transition"
                      >
                        <Eye size={14} /> Ver
                      </button>

                      {/* Eliminar documento */}
                      <button
                        onClick={() => alert(`Eliminar ${doc.nombre}`)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs shadow-sm transition"
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-sm text-gray-500 italic"
                >
                  🚫 No hay documentos disponibles
                </td>
              </tr>
            )}
          </tbody>

            </table>
          </div>
        </div>

}



              
   