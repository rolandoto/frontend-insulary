import { useDispatch, useSelector } from "react-redux"
import ActionsClient from "../../../Actions/ActionsClient"
import Form from "../../../ui/amparos/create-form"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Layout from "../../dashboard/layout"
import { useEffect } from "react"
import { InvoicesTableSkeleton } from "../../../ui/skeleton"

const CreateAmparosForm =() =>{
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
        return <Form />
    }
    
    return <>
        <Layout>
           <Breadcrumbs
                               breadcrumbs={[
                               { label: 'Amparos', href: '/dashboard/amparos' },
                               {
                                   label: 'Crear amparos',
                                   href: `/dashboard/amparos/create`,
                                   active: true,}]}/>
        {fillContent()}
        </Layout>
        </>
}

export default CreateAmparosForm