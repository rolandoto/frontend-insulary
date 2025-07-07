import React from  "react"
import Layout from "../../dashboard/layout"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import FormUsers from "../../../ui/users/create-users-form"


const CreateUsersForm =() =>{

    

    return <>
        <Layout>
            <Breadcrumbs
            breadcrumbs={[
            {label: 'Usuarios', href: '/dashboard/users' },
            {label: 'Crear Usuario',href: '/dashboard/customers/create',active: true,},
            ]}
        />
            <FormUsers/>
        </Layout>
        </>

}

export default CreateUsersForm