import { useParams } from "react-router";
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Layout from "../../dashboard/layout"
import { useDispatch, useSelector } from "react-redux";
import React, { Suspense, useEffect } from "react";
import { InvoicesTableSkeleton } from "../../../ui/skeleton";
import ActionsAmparos from "../../../Actions/ActionsAmparos";

const UpadateAmparos =() =>{
    const { id } = useParams();
    const {PostAmparosById}  = ActionsAmparos()
    const {amparosById,amparosError,isLoadingAmparos } = useSelector((state) => state.amparos);
    const dispatch = useDispatch();
    const LazyTable = React.lazy(() =>
            new Promise((resolve) => {
                setTimeout(() => resolve(import("../../../ui/amparos/editAmparosForm")), 500);
            })
    );

    const { accessToken} = useSelector(
            (state) => state.Refrestoken);
    
    //

    useEffect(() => {
        PostAmparosById({id,token:accessToken}); 
    }, [dispatch]);

     const fillContent =() =>{
        if(isLoadingAmparos){
             return <InvoicesTableSkeleton />
        }
        if(amparosError){
            return <Error />
        }
        
        return   <Suspense  fallback={<InvoicesTableSkeleton />}>
                    <LazyTable amparosById={amparosById} />
                </Suspense>
        }



    return <>   
            <Layout>
                <main>
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Amparos', href: '/dashboard/amparos' },
                    {
                        label: 'Actualizar amparos',
                        href: `/dashboard/amparos/${id}/edit`,
                        active: true,}]}/>
                </main>
              {fillContent()}
            </Layout>
        </>

}

export default UpadateAmparos