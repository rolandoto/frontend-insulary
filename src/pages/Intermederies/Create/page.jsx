import Breadcrumbs from "../../../ui/Breadcrumbs"
import Form from "../../../ui/intermederies/create-form"

import Layout from "../../dashboard/layout"

const CreateIntermederiesForm =() =>{

    return <>
        <Layout>
            <Breadcrumbs
            breadcrumbs={[
            {label: 'Intermederiarios', href: '/dashboard/intermederies' },
            {label: 'Crear Intermederiarios',href: '/dashboard/intermederies/create',active: true,},
            ]}
        />
        <Form/>
        </Layout>
        </>

}


export default CreateIntermederiesForm