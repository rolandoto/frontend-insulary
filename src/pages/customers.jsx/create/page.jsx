import React from "react"
import Layout from "../../dashboard/layout"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Form from "../../../ui/customers/create-form"

const CreateForm =() =>{

    return <>
        <Layout>
            <Breadcrumbs
            breadcrumbs={[
            {label: 'Clientes', href: '/dashboard/customers' },
            {label: 'Crear cliente',href: '/dashboard/customers/create',active: true,},
            ]}
        />

        <Form />

        </Layout>
        </>

}

export default CreateForm