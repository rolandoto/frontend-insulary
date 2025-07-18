import { useParams } from "react-router";
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Layout from "../../dashboard/layout"
import { useDispatch, useSelector } from "react-redux";
import ActionsBranches from "../../../Actions/ActionsBranches";
import React, { Suspense, useEffect } from "react";
import Error from "../../../ui/Error";
import { InvoicesTableSkeleton } from "../../../ui/skeleton";
import ActionsClient from "../../../Actions/ActionsClient";

const UpadateBranches =() =>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const {PostBranchesById} =   ActionsBranches()
    const {PostClient} =   ActionsClient()

    const { accessToken} = useSelector(
        (state) => state.Refrestoken
    );

    const {branchById,branchError } = useSelector((state) => state.branches);
    const {loading,error} = useSelector((state) => state.clients);

     const LazyTable = React.lazy(() =>
            new Promise((resolve) => {
            setTimeout(() => resolve(import("../../../ui/Branches/edit-form")), 500);
            })
    );

    const fillContent =() =>{
    if(loading){
         return <InvoicesTableSkeleton />
    }
    if(branchError){
        return <Error />
    }
    
    return       <Suspense  fallback={<InvoicesTableSkeleton />}>
                    <LazyTable branches={branchById} />
                </Suspense>
    }


    useEffect(() => {
            PostBranchesById({id,token:accessToken}); // asegúrate de que esto sea un thunk
             PostClient({query:"",currentPage:1,token:accessToken})
    }, [dispatch]);


    return <>   
            <Layout>
                <main>
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Sucursales', href: '/dashboard/branches' },
                    {
                        label: 'Actualizar Sucursal',
                        href: `/dashboard/branches/${id}/edit`,
                        active: true,},
                    ]}
                />
                </main>
                {fillContent()}
            </Layout>
        </>

}

export default UpadateBranches