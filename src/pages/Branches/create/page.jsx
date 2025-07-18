import { useDispatch, useSelector } from "react-redux"
import ActionsClient from "../../../Actions/ActionsClient"
import Form from "../../../ui/Branches/create-form"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Layout from "../../dashboard/layout"
import { useEffect } from "react"
import { InvoicesTableSkeleton } from "../../../ui/skeleton"

const CreateBranchesForm =() =>{
        const { accessToken} = useSelector(
                (state) => state.Refrestoken
            );  
    const {PostClient} =   ActionsClient()
    const dispatch = useDispatch();

    const {loading,error} = useSelector((state) => state.clients);

    useEffect(() => {
        PostClient({query:"",currentPage:1,token:accessToken})
    }, [dispatch]);

     const fillContent =() =>{
        if(loading){
             return <InvoicesTableSkeleton />
        }
        if(error){
            return <Error />
        }
        
        return           <Form />
    }
    

    return <>
        <Layout>
            <Breadcrumbs
            breadcrumbs={[
            {label: 'Sucursales', href: '/dashboard/branches' },
            {label: 'Crear sucursales',href: '/dashboard/branches/create',active: true,},
            ]}
        />
        {fillContent()}
        </Layout>
        </>

}


export default CreateBranchesForm