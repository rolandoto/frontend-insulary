import Layout from "../../dashboard/layout"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import Form from "../../../ui/casos/create-form"

const CreateCasesForm =() =>{


    return  <Layout>
                <Breadcrumbs
                breadcrumbs={[
                {label: 'Casos', href: '/dashboard/casos' },
                {label: 'Crear Casos',href: '/dashboard/casos/create',active: true,},
                ]}
            />
                <Form/>
            </Layout>

}

export default CreateCasesForm