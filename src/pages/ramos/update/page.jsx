import { useParams } from "react-router";
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Layout from "../../dashboard/layout"
import { useDispatch, useSelector } from "react-redux";
import ActionsRamos from "../../../Actions/ActionsRamos";
import React, { Suspense, useEffect } from "react";
import Error from "../../../ui/Error";
import { InvoicesTableSkeleton } from "../../../ui/skeleton";

const UpadateRamos =() =>{
    const { id } = useParams();
     const dispatch = useDispatch();
    const { accessToken} = useSelector(
            (state) => state.Refrestoken);
    const {ramosById,ramosError,isLoadingRamos } = useSelector((state) => state.ramos);
    const { PostRamosById } = ActionsRamos();


    const LazyTable = React.lazy(() =>
            new Promise((resolve) => {
                setTimeout(() => resolve(import("../../../ui/ramos/editRamosForm")), 500);
            })
    );

    
       useEffect(() => {
            PostRamosById({id,token:accessToken}); 
        }, [dispatch]);


    const fillContent =() =>{
        if(isLoadingRamos){
                return <InvoicesTableSkeleton />
        }
        if(ramosError){
            return <Error />
        }
        
        return   <Suspense  fallback={<InvoicesTableSkeleton />}>
                    <LazyTable ramosById={ramosById} />
                </Suspense>
        }

    return <>   
            <Layout>
                <main>
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Ramos', href: '/dashboard/ramos' },
                    {
                        label: 'Actualizar ramos',
                        href: `/dashboard/ramos/${id}/edit`,
                        active: true,}]}/>
                </main>
             {fillContent()}
            </Layout>
        </>

}

export default UpadateRamos