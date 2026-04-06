import React, { Suspense, useEffect } from "react"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import { useParams } from "react-router"
import Layout from "../../dashboard/layout"
import { useDispatch, useSelector } from "react-redux"
import { InvoicesTableSkeleton } from "../../../ui/skeleton"
import Error from "../../../ui/Error"
import ActionsIntermederies from "../../../Actions/ActionsIntermederies"

const UpadateIntermederies =() =>{
    const dispatch = useDispatch();
    const {PostIntermederiesById} =   ActionsIntermederies()
    const { id } = useParams();
    const { accessToken} = useSelector(
        (state) => state.Refrestoken
      );
    const { IntermederiesById, isLoadingIntermederies, IntermederiesError } = useSelector((state) => state.intermederies);

    useEffect(() => {
            PostIntermederiesById({id,token:accessToken}); // asegúrate de que esto sea un thunk
      }, [dispatch]);

    const LazyTable = React.lazy(() => import("../../../ui/intermederies/edit-form"));

   const fillContent =() =>{
    if(isLoadingIntermederies){
     return    <InvoicesTableSkeleton />
    }
    if(IntermederiesError){
        return <Error />
    }
    
    return       <Suspense  fallback={<InvoicesTableSkeleton />}>
                    <LazyTable   intermederies={IntermederiesById} />
                </Suspense>
   }

    return <>   
            <Layout>
                <main>
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Intermederios', href: '/dashboard/intermederies' },
                    {
                        label: 'Actualizar Intermederios',
                        href: `/dashboard/intermederies/${id}/edit`,
                        active: true,},
                    ]}
                />
                </main>
                {fillContent()}
            </Layout>
        </>

}

export default UpadateIntermederies