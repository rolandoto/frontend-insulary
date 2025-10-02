import Breadcrumbs from "../../../ui/Breadcrumbs"
import Form from "../../../ui/ramos/create-form"
import Layout from "../../dashboard/layout"

const CreateRamosForm =() =>{

    return <>
        <Layout>
           <Breadcrumbs
                breadcrumbs={[
                { label: 'Ramos', href: '/dashboard/ramos' },
                {
                    label: 'Crear ramos',
                    href: `/dashboard/ramos/create`,
                    active: true,}]}/>
        <Form/>
        </Layout>
        </>
}


export default CreateRamosForm