'use client';
import React, { Suspense, useEffect } from "react"
import { useParams } from "react-router";
import Breadcrumbs from "../../../ui/Breadcrumbs";
import Layout from "../../dashboard/layout";
import ActionsClient from "../../../Actions/ActionsClient";
import { useSelector } from "react-redux";
import { InvoicesTableSkeleton } from "../../../ui/skeleton";
import Error from "../../../ui/Error";
import ActionsRamos from "../../../Actions/ActionsRamos";
import ActionsIntermederies from "../../../Actions/ActionsIntermederies";
import ActionsBranches from "../../../Actions/ActionsBranches";
import { Toaster } from "sonner";

export default function UpadateCases( ) {
  
    const { id } = useParams();
    const { PostCasesById ,PostClient,PostCasosEstados} = ActionsClient();
    const { accessToken } = useSelector((state) => state.Refrestoken);
    const { loading,casosById, isLoadingCasos, casosError } = useSelector((state) => state.clients);
    const {fetchRamos,fetchAmparos} =ActionsRamos()
    const  {PostIntermederies} =ActionsIntermederies()
    const {PostBranches} =   ActionsBranches()


    const LazyTable = React.lazy(() => import("../../../ui/casos/edit-form"));

        useEffect(() => {
                PostCasesById({id,token:accessToken}); // asegúrate de que esto sea un thunk
                PostClient({query:"",currentPage:1,token:accessToken})
                PostIntermederies({query:"",currentPage:1,token:accessToken})
                PostIntermederies({query:"",currentPage:1,token:accessToken})
                PostBranches({query:"",currentPage:1,token:accessToken})
                fetchRamos({query:"",token:accessToken})
                fetchAmparos({query:"",token:accessToken})
                PostCasosEstados({query:"",token:accessToken})
          }, []);

    const fillContent =() =>{
        if(isLoadingCasos){
           return   <InvoicesTableSkeleton />
        }
        if(casosError){
            return <Error />
        }
        
        return        <Suspense  fallback={<InvoicesTableSkeleton />}>
                            <LazyTable  cases={casosById} />
                        </Suspense>
       }

  return (
          <Layout>
            <main className="w-full">
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Casos', href: '/dashboard/casos' },
                    {
                        label: 'Actualizar Caso',
                        href: `/dashboard/casos/${id}/edit`,
                        active: true,},
                    ]}
                />
                <div className="mb-4 mt-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h1 className="text-2xl font-semibold text-slate-900">Actualizar caso</h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Edita la información por secciones para que todo sea más rápido, claro y fácil de validar.
                  </p>
                </div>
            </main>
            {fillContent()}            
        </Layout>
  );
}
