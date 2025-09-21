'use client';

import { CiUser } from "react-icons/ci";
import { Link } from "react-router";
import { Button } from "../button";
import {  createCases } from "../../lib/actions";
import { useActionState, useEffect } from "react";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";
import ActionsClient from "../../Actions/ActionsClient";
import ActionsIntermederies from "../../Actions/ActionsIntermederies";
import ActionsBranches from "../../Actions/ActionsBranches";
import ActionsRamos from "../../Actions/ActionsRamos";
import { MdOutlineDateRange } from "react-icons/md";

export default function Form( ) {
 
    const { accessToken} = useSelector(
    (state) => state.Refrestoken
    );  
    const initialState ={message:"",errors:{}};
    const createWithToken = createCases.bind(null,accessToken);
    const {ClientFilter} = useSelector((state) => state.clients);
    const {loading,intermediariesFilter}= useSelector((state) => state.intermederies)
    const {Ramos,amparosFilter}= useSelector((state) => state.ramos)
    const {branchesFilter}= useSelector((state) => state.branches)
    const {PostClient} =   ActionsClient()
    const  {PostIntermederies} =ActionsIntermederies()
    const {PostBranches} =   ActionsBranches()
    const dispatch = useDispatch();
     const [message, formAction, isPending] = useActionState(createWithToken,initialState);
    const {fetchRamos,fetchAmparos} =ActionsRamos()

      useEffect(() => {
            PostClient({query:"",currentPage:1,token:accessToken}),
            PostIntermederies({query:"",currentPage:1,token:accessToken}),
            PostBranches({query:"",currentPage:1,token:accessToken})
            fetchRamos({query:"",token:accessToken})
            fetchAmparos({query:"",token:accessToken})
        }, [dispatch]);
      
  
  return (
   <form action={formAction}>
    <Toaster richColors position="top-center" />
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
    <div className="mb-4">
      <label htmlFor="clientId" className="mb-2 block text-sm font-medium">
        Cliente / Aseguradora  <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          id="clientId"
          name="clientId"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="client-error"
          onChange={(e) => {
            // Filtrar sucursales cuando cambie el cliente
            const selectedClientId = e.target.value;
            const branchSelect = document.getElementById('branchId');
            const intermediarySelect = document.getElementById('intermediaryId');
            

            branchSelect.value = '';
            intermediarySelect.value = '';
            

            const branchOptions = branchSelect.querySelectorAll('option:not(:first-child)');
            branchOptions.forEach(option => {
              const branch = branchesFilter.find(b => b.id.toString() === option.value);
              if (branch && branch.id.toString() === selectedClientId) {
                option.style.display = 'block';
              } else {
                option.style.display = 'none';
              }
            });
          }}
        >
          <option value="" disabled>
            Seleccione el cliente
          </option>
          {ClientFilter.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.NOMBRE}
            </option>
          ))}
        </select>
        <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="client-error" aria-live="polite" aria-atomic="true">
        {message.errors?.clientId &&
          message.errors.clientId.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    
   
  <div className="mb-4">
  <label
    htmlFor="branchId"
    className="mb-2 block text-sm font-medium"
  >
    Sucursal <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <select
      id="branchId"
      name="branchId"
      required
      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
      aria-describedby="branch-error"
    >
      <option value="" disabled>
        Seleccione la sucursal
      </option>
      {branchesFilter.map((branch,e) => (
        <option 
          key={e} 
          value={branch.id}
          data-client-id={branch.clientId}
          style={{display: 'none'}} // Inicialmente ocultas
        >
          {branch.nombre}
        </option>
      ))}
    </select>
    <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
  </div>
  <div id="branch-error" aria-live="polite" aria-atomic="true">
    {message.errors?.branchId &&
      message.errors.branchId.map((error) => (
        <p className="mt-2 text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
  </div>
</div>

    <div className="mb-4">
      <label htmlFor="intermediaryId" className="mb-2 block text-sm font-medium">
      Intermediario <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          id="intermediaryId"
          name="intermediaryId"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="intermediary-error"
        >
          <option value="" disabled>
            Seleccione el intermediario
          </option>
          {intermediariesFilter.map((intermediary) => (
            <option key={intermediary.id} value={intermediary.id}>
              {intermediary.nombre}
            </option>
          ))}
        </select>
        <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="intermediary-error" aria-live="polite" aria-atomic="true">
        {message.errors?.intermediaryId &&
          message.errors.intermediaryId.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="name" className="mb-2 block text-sm font-medium">
        Asignador <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="allocator"
          name="allocator"
          placeholder="Ingrese su nombre"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="allocator-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="allocator-error" aria-live="polite" aria-atomic="true">
        {message.errors?.allocator &&
          message.errors.allocator.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>


    <div className="relative flex items-center justify-center">
      <div className="flex-grow border-t border-black"></div>
        <span className="mx-4 bg-white px-3 text-sm font-medium text-black">ASEGURADO</span>
      <div className="flex-grow border-t border-black"></div>
    </div>
    <div className="mb-4 mt-4">
      <label htmlFor="nameAsegurado" className="mb-2 block text-sm font-medium">
        Nombres  <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="nameAsegurado"
          name="nameAsegurado"
          placeholder="Nombre"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="code-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {message.errors?.nameAsegurado &&
          message.errors.nameAsegurado.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="typeDocument_asegurado" className="mb-2 block text-sm font-medium">
      Tipo de documento <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          id="typeDocument_asegurado"
          name="typeDocument_asegurado"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="typeDocument-error"
        >
          <option value="" disabled>
            Seleccione el Tipo de documento
          </option>
          {["C.E","Nit","C.E","Otro"].map((intermediary,e) => (
            <option key={e} value={intermediary}>
              {intermediary}
            </option>
          ))}
        </select>
        <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="typeDocument-error" aria-live="polite" aria-atomic="true">
        {message.errors?.typeDocument_asegurado &&
          message.errors.typeDocument_asegurado.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="Document_asegurado" className="mb-2 block text-sm font-medium">
        Numero de documento <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Document_asegurado"
          name="Document_asegurado"
          placeholder="Ingrese su número de documento"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Document-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Document-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Document_asegurado &&
          message.errors.Document_asegurado.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="telefono_asegurado" className="mb-2 block text-sm font-medium">
        Teléfono  <span className="text-red-500">*</span>
      </label> 
      <div className="relative mt-2 rounded-md">
        <input
          id="telefono_asegurado"
          name="telefono_asegurado"
          placeholder="Ingrese su número de teléfono"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="telefono-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="telefono-error" aria-live="polite" aria-atomic="true">
        {message.errors?.telefono_asegurado &&
          message.errors.telefono_asegurado.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  <div className="mb-4">
      <label htmlFor="addres_asegurado" className="mb-2 block text-sm font-medium">
        Dirección <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="addres_asegurado"
          name="addres_asegurado"
          placeholder="Ingrese su dirección"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="addres-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="addres-error" aria-live="polite" aria-atomic="true">
        {message.errors?.addres_asegurado &&
          message.errors.addres_asegurado.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="correo_asegurado" className="mb-2 block text-sm font-medium">
        Correo <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="correo_asegurado"
          name="correo_asegurado"
          placeholder="Ingrese su correo electrónico"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="correo-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="correo-error" aria-live="polite" aria-atomic="true">
        {message.errors?.correo_asegurado &&
          message.errors.correo_asegurado.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>


    <div className="mb-4">
      <label htmlFor="poliza_asegurado" className="mb-2 block text-sm font-medium">
        Poliza Afectada <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="poliza_asegurado"
          name="poliza_asegurado"
          placeholder="Ingrese su póliza afectada"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="poliza-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="poliza-error" aria-live="polite" aria-atomic="true">
        {message.errors?.poliza_asegurado &&
          message.errors.poliza_asegurado.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

      <div className="mb-4">
      <label htmlFor="ramo_asegurado" className="mb-2 block text-sm font-medium">
        Ramo <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          id="ramo_asegurado"
          name="ramo_asegurado"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="Ramo-error"
        >
          <option value="" disabled>
            Seleccione el Ramo
          </option>
          {Ramos.map((intermediary) => (
            <option key={intermediary.id} value={intermediary.id}>
              {intermediary.nombre}
            </option>
          ))}
        </select>
        <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="Ramo-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Ramo &&
          message.errors.Ramo.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="amparos_asegurado" className="mb-2 block text-sm font-medium">
        Amparos <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          id="amparos_asegurado"
          name="amparos_asegurado"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="amparos-error"
        >
          <option value="" disabled>
            Seleccione el Ramo
          </option>
          {amparosFilter.map((intermediary) => (
            <option key={intermediary.id} value={intermediary.id}>
              {intermediary.nombre}
            </option>
          ))}
        </select>
        <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="Ramo-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Ramo &&
          message.errors.Ramo.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    
    <div className="relative flex items-center justify-center">
        <div className="flex-grow border-t border-black"></div>
          <span className="mx-4 bg-white px-3 text-sm font-medium text-black">TOMADOR</span>
        <div className="flex-grow border-t border-black"></div>
    </div>

   <div className="mb-4 mt-4">
      <label htmlFor="name_tomador" className="mb-2 block text-sm font-medium">
        Nombres <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="name_tomador"
          name="name_tomador"
          placeholder="Nombre"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="code-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {message.errors?.name_tomador &&
          message.errors.name_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="typeDocument_tomador" className="mb-2 block text-sm font-medium">
      Tipo de documento <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          id="typeDocument_tomador"
          name="typeDocument_tomador"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="intermediary-error"
        >
          <option value="" disabled>
            Seleccione el Tipo de documento
          </option>
          {["C.E","Nit","C.E","Otro"].map((intermediary,e) => (
            <option key={e} value={intermediary}>
              {intermediary}
            </option>
          ))}
        </select>
        <HiOutlineUserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="typeDocument-error" aria-live="polite" aria-atomic="true">
        {message.errors?.typeDocument_tomador &&
          message.errors.typeDocument_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="Document_tomador" className="mb-2 block text-sm font-medium">
        Numero de documento <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Document_tomador"
          name="Document_tomador"
          placeholder="Ingrese su número de documento"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Document-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Document-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Document_tomador &&
          message.errors.Document_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="telefono_tomador" className="mb-2 block text-sm font-medium">
        Teléfono <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="telefono_tomador"
          name="telefono_tomador"
          placeholder="Ingrese su número de teléfono"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="telefono-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="telefono-error" aria-live="polite" aria-atomic="true">
        {message.errors?.telefono_tomador &&
          message.errors.telefono_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  <div className="mb-4">
      <label htmlFor="addres_tomador" className="mb-2 block text-sm font-medium">
        Dirección <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="addres_tomador"
          name="addres_tomador"
          placeholder="Ingrese su dirección"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="addres-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="addres-error" aria-live="polite" aria-atomic="true">
        {message.errors?.addres_tomador &&
          message.errors.addres_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="correo_tomador" className="mb-2 block text-sm font-medium">
        Correo <span className="text-red-500">*</span>
      </label> 
      <div className="relative mt-2 rounded-md">
        <input
          id="correo_tomador"
          name="correo_tomador"
          placeholder="Ingrese su correo electrónico"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="correo-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="correo-error" aria-live="polite" aria-atomic="true">
        {message.errors?.correo_tomador &&
          message.errors.correo_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="fechaSiniestro_tomador" className="mb-2 block text-sm font-medium">
        Fecha de Siniestro <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="fechaSiniestro_tomador"
          name="fechaSiniestro_tomador"
          type="date"
          placeholder="Ingrese la fecha del siniestro"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="fechaSiniestro-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <MdOutlineDateRange color="black"  className="pointer-events-none absolute right-1 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="fechaSiniestro-error" aria-live="polite" aria-atomic="true">
        {message.errors?.fechaSiniestro_tomador &&
          message.errors.fechaSiniestro_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="fechaAviso_tomador" className="mb-2 block text-sm font-medium">
        Fecha de Aviso <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="fechaAviso_tomador"
          name="fechaAviso_tomador"
          type="date"
          placeholder="Ingrese la fecha de aviso"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="fechaAviso-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
           <MdOutlineDateRange color="black"  className="pointer-events-none absolute right-1 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="fechaAviso-error" aria-live="polite" aria-atomic="true">
        {message.errors?.fechaAviso_tomador &&
          message.errors.fechaAviso_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="fechaAsignacion_tomador" className="mb-2 block text-sm font-medium">
        Fecha de Asignación <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="fechaAsignacion_tomador"
          name="fechaAsignacion_tomador"
          type="date"
          placeholder="Ingrese la fecha de asignación"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="fechaAsignacion-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
       <MdOutlineDateRange color="black"  className="pointer-events-none absolute right-1 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="fechaAsignacion-error" aria-live="polite" aria-atomic="true">
        {message.errors?.fechaAsignacion_tomador &&
          message.errors.fechaAsignacion_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

 <div className="relative flex items-center justify-center">
        <div className="flex-grow border-t border-black"></div>
        <div className="flex-grow border-t border-black"></div>
    </div>

   <div className="mb-4 mt-5">
      <label htmlFor="relato_hechos" className="mb-2 block text-sm font-medium">
        Relato de los Hechos <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="relato_hechos"
          name="relato_hechos"
          type="text"
          placeholder="Ingrese el relato de los hechos"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="relato_hechos-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="relato_hechos-error" aria-live="polite" aria-atomic="true">
        {message.errors?.relato_hechos &&
          message.errors.relato_hechos.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    <div className="mb-4 mt-5">
      <label htmlFor="Caso" className="mb-2 block text-sm font-medium">
       Caso <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Caso"
          name="Caso"
          type="text"
          placeholder="Ingrese el caso"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Caso-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Caso-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Caso &&
          message.errors.Caso.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

<div className="mb-4 mt-5">
      <label htmlFor="Placa_Asegurada" className="mb-2 block text-sm font-medium">
       Placa Asegurada <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Placa_Asegurada"
          name="Placa_Asegurada"
          type="text"
          placeholder="Ingrese la placa asegurada"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Placa_Asegurada-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Placa_Asegurada-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Placa_Asegurada &&
          message.errors.Placa_Asegurada.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

<div className="mb-4 mt-5">
      <label htmlFor="Valor_Reserva" className="mb-2 block text-sm font-medium">
        Valor Reserva <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Valor_Reserva"
          name="Valor_Reserva"
          type="text"
          placeholder="Ingrese el valor de reserva"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Valor_Reserva-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Valor_Reserva-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Valor_Reserva &&
          message.errors.Valor_Reserva.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

<div className="mb-4 mt-5">
      <label htmlFor="Valor_Indemnización" className="mb-2 block text-sm font-medium">
        Valor Indemnización <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Valor_Indemnización"
          name="Valor_Indemnización"
          type="text"
          placeholder="Ingrese el valor de indemnización"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Valor_Indemnización-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Valor_Indemnización-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Valor_Indemnización &&
          message.errors.Valor_Indemnización.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

<div className="mb-4 mt-5">
      <label htmlFor="Siniestro" className="mb-2 block text-sm font-medium">
       Siniestro <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Siniestro"
          name="Siniestro"
          type="text"
          placeholder="Ingrese el siniestro"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Siniestro-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Siniestro-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Siniestro &&
          message.errors.Siniestro.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

<div className="mb-4 mt-5">
      <label htmlFor="Placa_Tercero" className="mb-2 block text-sm font-medium">
       Placa Tercero <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Placa_Tercero"
          name="Placa_Tercero"
          type="text"
          placeholder="Ingrese la placa del tercero"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Placa_Tercero-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Placa_Tercero-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Placa_Tercero &&
          message.errors.fechaAsignacion_tomador.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    <div className="mb-4 mt-5">
      <label htmlFor="Carpeta" className="mb-2 block text-sm font-medium">
       Carpeta <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="Carpeta"
          name="Carpeta"
          type="text"
          placeholder="Ingrese la carpeta"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="Carpeta-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="Carpeta-error" aria-live="polite" aria-atomic="true">
        {message.errors?.Carpeta &&
          message.errors.Carpeta.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    <div className="mb-4 mt-5">
      <label htmlFor="generador_carga" className="mb-2 block text-sm font-medium">
       Generador de carga <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="generador_carga"
          name="generador_carga"
          type="text"
          placeholder="Ingrese la carpeta"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="generador_carga-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="generador_carga-error" aria-live="polite" aria-atomic="true">
        {message.errors?.generador_carga &&
          message.errors.generador_carga.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    <div className="mb-4 mt-5">
      <label htmlFor="litisoft" className="mb-2 block text-sm font-medium">
       Litisoft
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="litisoft"
          name="litisoft"
          type="text"
          placeholder="Ingrese la carpeta"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
          aria-describedby="litisoft-error"
        />
        <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="litisoft-error" aria-live="polite" aria-atomic="true">
        {message.errors?.litisoft &&
          message.errors.litisoft.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

        <div className="mb-4 mt-5">
              <label htmlFor="referencia_uib" className="mb-2 block text-sm font-medium">
              Referencia uib
              </label>
              <div className="relative mt-2 rounded-md">
                <input
                  id="referencia_uib"
                  name="referencia_uib"
                  type="text"
                  placeholder="Ingrese la carpeta"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
                  aria-describedby="referencia_uib-error"
                />
                <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="referencia_uib-error" aria-live="polite" aria-atomic="true">
                {message.errors?.referencia_uib &&
                  message.errors.referencia_uib.map((error) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
                    <div className="mb-4 mt-5">
              <label htmlFor="nombre_tercero" className="mb-2 block text-sm font-medium">
              Nombre tercero
              </label>
              <div className="relative mt-2 rounded-md">
                <input
                  id="nombre_tercero"
                  name="nombre_tercero"
                  type="text"
                  placeholder="Ingrese la carpeta"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
                  aria-describedby="nombre_tercero-error"
                />
                <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="nombre_tercero-error" aria-live="polite" aria-atomic="true">
                {message.errors?.nombre_tercero &&
                  message.errors.nombre_tercero.map((error) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>


            <div className="mb-4 mt-5">
              <label htmlFor="apoderado" className="mb-2 block text-sm font-medium">
                Apoderado
              </label>
              <div className="relative mt-2 rounded-md">
                <input
                  id="apoderado"
                  name="apoderado"
                  type="text"
                  placeholder="Ingrese la carpeta"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-1 placeholder:text-gray-500"
                  aria-describedby="apoderado-error"
                />
                <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="apoderado-error" aria-live="polite" aria-atomic="true">
                {message.errors?.apoderado &&
                  message.errors.apoderado.map((error) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

  </div>


  
  <div className="mt-6 flex justify-end gap-4">
    <Link
      to="/dashboard/casos"
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
      Cancelar
    </Link>
    <Button type="submit">Crear Casos</Button>
  </div>
</form>
  );
}
