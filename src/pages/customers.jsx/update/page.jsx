import React, { Suspense, useEffect } from "react"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import { useParams } from "react-router"
import Layout from "../../dashboard/layout"
import EditCustomersForm from "../../../ui/customers/edit-form"
import ActionsClient from "../../../Actions/ActionsClient"
import { useDispatch, useSelector } from "react-redux"
import { InvoicesTableSkeleton } from "../../../ui/skeleton"
import NotFound from "../no-found/not-found"
import Error from "../../../ui/Error"



const UpadateCustomers =() =>{
    const dispatch = useDispatch();
    const {PostClientById} =   ActionsClient()
    const { id } = useParams();
    const { accessToken} = useSelector(
        (state) => state.Refrestoken
      );
    const { clientById, isLoadingClient, clientError } = useSelector((state) => state.clients);
    useEffect(() => {
            PostClientById({id,token:accessToken}); // asegúrate de que esto sea un thunk
      }, [dispatch]);


      
const LazyTable = React.lazy(() =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("../../../ui/customers/edit-form")), 500);
    })
  );

   const fillContent =() =>{
    if(isLoadingClient){
        <InvoicesTableSkeleton />
    }
    if(clientError){
        return <Error />
    }
    
    return        <Suspense  fallback={<InvoicesTableSkeleton />}>
                    <LazyTable  customers={clientById} />
                </Suspense>
   }

    return <>   
            <Layout>
                <main>
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Clientes', href: '/dashboard/customers' },
                    {
                        label: 'Actualizar cliente',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,},
                    ]}
                />
                </main>
            {fillContent()}
                
            </Layout>
        </>

}

export default UpadateCustomers