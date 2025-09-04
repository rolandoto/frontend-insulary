import React, { useEffect } from "react"
import Layout from "../../dashboard/layout"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "../../../ui/skeleton";
import ActionsClient from "../../../Actions/ActionsClient";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Error from "../../../ui/Error";

const LazyTable = React.lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import("../../../ui/casos/tableDocument")), 500);
  })
);

const DocumentCases =() =>{
    const {PostCasosDocument,PostDocument} = ActionsClient();
    const { accessToken } = useSelector((state) => state.Refrestoken);
    const { id } = useParams();
    const { casosDocument,loadingCasosDocument,errorCasosDocument } = useSelector((state) => state.clients);
    

    useEffect(() => {
        PostCasosDocument({id,token:accessToken})
        PostDocument({id,token:accessToken})
    },[]);

     const fillContent =() =>{
            if(loadingCasosDocument){
               return   <InvoicesTableSkeleton />
            }
            if(errorCasosDocument){
                return <Error />
            }
            
            return        <Suspense  fallback={<InvoicesTableSkeleton />}>
                                <LazyTable  casosDocument={casosDocument} />
                            </Suspense>
    }

    return  <Layout>
                <Breadcrumbs
                breadcrumbs={[
                {label: 'Casos', href: '/dashboard/casos' },
                {label: `Documento casos  #${id}`,href: '/dashboard/casos/create',active: true,},
                ]}
            />
                {fillContent()}
  
            </Layout>

}

export default DocumentCases